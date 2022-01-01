import { join } from "path";
import { Project, Node, SyntaxKind, TypeAliasDeclaration, ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, VariableDeclaration, TypeChecker } from "ts-morph";
import { ProjectNameNotConfiguredError } from "../../errors";
import { TsDocGenPageJSONUnion, TsDocGenPageUnion } from "../../types/docs";
import { ProjectDeclarationsMap, SourceFileDeclarationMap, TsDocGenProjectJSON, TSDocGenProjectProps } from "../../types/tsdocgen";
import TsDocGenContext from "../context";
import ClassDoc from "../documentation/ClassDoc";
import EnumDoc from "../documentation/EnumDoc";
import FunctionDoc from "../documentation/FunctionDoc";
import InterfaceDoc from "../documentation/InterfaceDoc";
import TypeAliasDoc from "../documentation/TypeAliasDoc";
import UnknownDoc from "../documentation/UnknownDoc";
import VariableDoc from "../documentation/VariableDoc";
import TsDocGenDocPage from "../page/DocPage";

class TsDocGenProject {
    public config: TSDocGenProjectProps;
    public name: string;
    private context: TsDocGenContext;
    private tsProject: Project;
    private checker: TypeChecker;
    private pages: TsDocGenPageUnion[];
    private json: TsDocGenProjectJSON;
    
    constructor(config: TSDocGenProjectProps) {
        this.config = config;
        this.tsProject = new Project({
            tsConfigFilePath: this.config.tsConfigFilePath,
        });
        this.checker = this.tsProject.getTypeChecker();
        this.context = new TsDocGenContext(this.checker);
        this.pages = this.createPages();
        this.name = this.config.projectName || this.config.packageJson.name || 'project';
        this.json = this.toJSON();
    }

    // ----------- Public Methods -----------

    public toJSON(): TsDocGenProjectJSON {
        return {
            config: this.config,
            pages: this.pages.map((page) => page.toJSON()),
        }
    }

    /**
     * Executes a callback for each source file
     * @param callback The callback too be called for each source file
     */
    public forEachPage(callback: (page: TsDocGenPageJSONUnion, config: TSDocGenProjectProps) => void) {
        const { config, pages } = this.json;

        pages.forEach((page) => {
            callback(page, config);
        });
    }

    // ----------- Private Methods -----------

    /**
     * Takes a `ts-morph` Node and converts it to a {@link Doc}
     * @param node A `ts-morph` Node.
     * @returns 
     */
    private buildDocs = (node: Node, sourceFileRelativePath: string) => {
        const kind = node.getKind();

        switch (kind) {
            case SyntaxKind.ClassDeclaration:
                return new ClassDoc(node as ClassDeclaration, this.context, sourceFileRelativePath);
            case SyntaxKind.FunctionDeclaration:
                return new FunctionDoc(node as FunctionDeclaration, this.context, sourceFileRelativePath);
            case SyntaxKind.TypeAliasDeclaration:
                return new TypeAliasDoc(node as TypeAliasDeclaration, this.context, sourceFileRelativePath);
            case SyntaxKind.InterfaceDeclaration:
                return new InterfaceDoc(node as InterfaceDeclaration, this.context, sourceFileRelativePath);
            case SyntaxKind.EnumDeclaration:
                return new EnumDoc(node as EnumDeclaration, this.context, sourceFileRelativePath);
            case SyntaxKind.VariableDeclaration:
                return new VariableDoc(node as VariableDeclaration, this.context, sourceFileRelativePath);
            default:
                return new UnknownDoc(node, this.context, sourceFileRelativePath);
        }
    }

    private getDeclarations = (): ProjectDeclarationsMap => {
        const map: ProjectDeclarationsMap = {};

        const sourceFiles = this.tsProject.addSourceFilesAtPaths([this.config.entryPoint]);

        for (const sourceFile of sourceFiles) {
            const rootDir = join(process.cwd(), this.config.rootDir);
            const path = sourceFile.getFilePath().replace(rootDir, '');
            const relativePath = sourceFile.getFilePath().replace(process.cwd(), '');

            map[path] = {
                path: path,
                sourceFile: sourceFile,
                exportedDeclarations: sourceFile.getExportedDeclarations(),
                relativePath: relativePath,
            }
        }

        return map;
    }

    /**
     * Builds pages using the project configuration and source files.
     * @returns An array of pages.
     */
    private createPages = () => {
        const { name: projectName = this.config.projectName } = this.config.packageJson;

        if (!projectName) {
            throw new ProjectNameNotConfiguredError(this.config.tsConfigFilePath);
        }

        const exportedDeclarations = this.getDeclarations();

        const sourceFileMap: SourceFileDeclarationMap = {};

        const pages: TsDocGenDocPage[] = [];

        for (const sourceFilePath in exportedDeclarations) {
            if (Object.prototype.hasOwnProperty.call(exportedDeclarations, sourceFilePath)) {
                const sourceFileResult = exportedDeclarations[sourceFilePath];

                const current = sourceFileMap[sourceFilePath] || {};

                sourceFileMap[sourceFilePath] = {
                    ...current,
                }

                for (const [, declarations] of sourceFileResult.exportedDeclarations) {


                    declarations.forEach((declaration) => {
                        const doc = this.buildDocs(declaration, sourceFileResult.relativePath);
                        const page = new TsDocGenDocPage(sourceFileResult, doc);

                        pages.push(page);
                    });

                }

            }
        }

        return pages;
    }
}

export default TsDocGenProject;
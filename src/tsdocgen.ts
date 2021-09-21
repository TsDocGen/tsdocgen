import { 
    ClassDeclaration, 
    EnumDeclaration, 
    ExportedDeclarations, 
    FunctionDeclaration, 
    InterfaceDeclaration, 
    Node, 
    Project, 
    SourceFile, 
    SyntaxKind, 
    TypeAliasDeclaration, 
    VariableDeclaration 
} from "ts-morph";
import { join } from "path";
import Config from "./models/Config";
import { ProjectDeclarationsMap, SourceFileDeclarationMap, TSDocGenProject, TSDocGenResult } from "./types/tsdocgen";
import { ProjectNameNotConfiguredError } from "./errors";
import ClassDoc from "./models/documentation/ClassDoc";
import EmitEvent from "./decorators/EmitEvent";
import FunctionDoc from "./models/documentation/FunctionDoc";
import TypeAliasDoc from "./models/documentation/TypeAliasDoc";
import InterfaceDoc from "./models/documentation/InterfaceDoc";
import EnumDoc from "./models/documentation/EnumDoc";
import VariableDoc from "./models/documentation/VariableDoc";
import UnknownDoc from "./models/documentation/UnknownDoc";
import Renderer from "./renderer";


/**
 * The TSDocGen Application. Handles traversing source files and converting them to
 * a documentation ready app.
 */
@EmitEvent('START_PROJECT')
class TSDocGen {

    /** The project config {@link Config} */
    public config: Config = new Config();

    /** The HTML Renderer */
    public renderer: Renderer = new Renderer();

    // Public Methods

    /**
     * Generates the documentation using the configuration options.
     */
     public generateDocumentation = async () => {
        const projects = this.config.projects;
        const projectMap: TSDocGenResult = {};

        for (const project of projects) {
            const [name, docs] = this.buildProjectTree(project);

            projectMap[name] = docs;
        }

        return projectMap;
    }

    // Private Methods

    /**
     * Takes a `ts-morph` Node and converts it to a {@link Doc}
     * @param node A `ts-morph` Node.
     * @returns 
     */
    private buildDocs = (node: Node) => {
        const kind = node.getKind();

        switch (kind) {
            case SyntaxKind.ClassDeclaration:
                return new ClassDoc(node as ClassDeclaration);
            case SyntaxKind.FunctionDeclaration:
                return new FunctionDoc(node as FunctionDeclaration);
            case SyntaxKind.TypeAliasDeclaration:
                return new TypeAliasDoc(node as TypeAliasDeclaration);
            case SyntaxKind.InterfaceDeclaration:
                return new InterfaceDoc(node as InterfaceDeclaration);
            case SyntaxKind.EnumDeclaration:
                return new EnumDoc(node as EnumDeclaration);
            case SyntaxKind.VariableDeclaration:
                return new VariableDoc(node as VariableDeclaration);
            default:
                return new UnknownDoc(node);
        }
    }

    private getDeclarationsForProject = (tsProject: Project, project: TSDocGenProject): ProjectDeclarationsMap => {
        const map: Record<string, { path: string, sourceFile: SourceFile, exportedDeclarations: ReadonlyMap<string, ExportedDeclarations[]> }> = {};

            const sourceFiles = tsProject.addSourceFilesFromTsConfig(project.tsConfigFilePath);

            for (const sourceFile of sourceFiles) {
                const path = sourceFile.getFilePath().replace(join(process.cwd(), project.rootDir), '');

                map[path] = {
                    path: path,
                    sourceFile: sourceFile,
                    exportedDeclarations: sourceFile.getExportedDeclarations(),
                }
            }

        return map;
    }

    /**
     * Builds an AST tree for a given typescript project.
     * @param project A project config
     * @returns The project name and the tree.
     */
    private buildProjectTree = (project: TSDocGenProject): [string, SourceFileDeclarationMap] => {
        const tsProject = new Project({
            tsConfigFilePath: project.tsConfigFilePath,
        });

        const { name: projectName = project.projectName } = project.packageJson;

        if (!projectName) {
            throw new ProjectNameNotConfiguredError(project.tsConfigFilePath);
        }

        const exportedDeclarations = this.getDeclarationsForProject(tsProject, project);

        const sourceFileMap: SourceFileDeclarationMap = {};

        for (const sourceFilePath in exportedDeclarations) {
            if (Object.prototype.hasOwnProperty.call(exportedDeclarations, sourceFilePath)) {
                const sourceFileResult = exportedDeclarations[sourceFilePath];
                
                sourceFileMap[sourceFilePath] = {
                    ...(sourceFileMap[sourceFilePath] || {}),
                }

                for (const [name, declarations] of sourceFileResult.exportedDeclarations) {
                    const doc = this.buildDocs(declarations[0]);
    
                    const docName = name === 'default' ? doc.name : name;

                    sourceFileMap[sourceFilePath] = {
                        ...(sourceFileMap[sourceFilePath] || {}),
                        [docName]: doc,
                    }
                }
            }
        }

        return [projectName, sourceFileMap];
    }
}

export default TSDocGen;

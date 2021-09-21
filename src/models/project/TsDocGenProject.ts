import { join } from "path";
import { ExportedDeclarations, Project, SourceFile, Node, SyntaxKind, TypeAliasDeclaration, ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, VariableDeclaration } from "ts-morph";
import { ProjectNameNotConfiguredError } from "../../errors";
import { DocUnionJSON } from "../../types/docs";
import { ProjectDeclarationsMap, SourceFileDeclarationMap, TsDocGenProjectJSON, TSDocGenProjectProps } from "../../types/tsdocgen";
import ClassDoc from "../documentation/ClassDoc";
import EnumDoc from "../documentation/EnumDoc";
import FunctionDoc from "../documentation/FunctionDoc";
import InterfaceDoc from "../documentation/InterfaceDoc";
import TypeAliasDoc from "../documentation/TypeAliasDoc";
import UnknownDoc from "../documentation/UnknownDoc";
import VariableDoc from "../documentation/VariableDoc";

class TsDocGenProject {
    public config: TSDocGenProjectProps;
    private tsProject: Project;
    public sourceFileDeclarationsMap: SourceFileDeclarationMap;

    constructor(config: TSDocGenProjectProps) {
        this.config = config;
        this.tsProject = new Project({
            tsConfigFilePath: this.config.tsConfigFilePath,
        });
        this.sourceFileDeclarationsMap = this.createProject();
    }

    public toJSON(): TsDocGenProjectJSON {
        const sourceFileDeclarationsMap = Object.keys(this.sourceFileDeclarationsMap).reduce((map, path) => {
            const docs = this.sourceFileDeclarationsMap[path];

            return {
                ...map,
                [path]: Object.keys(docs).reduce((map, name) => {
                    return {
                        ...map,
                        [name]: docs[name].toJSON()
                    }
                }, {} as Record<string, DocUnionJSON>)
            }
        }, {} as Record<string, Record<string, DocUnionJSON>>);

        return {
            config: this.config,
            sourceFileDeclarationsMap: sourceFileDeclarationsMap,
        }
    }

    /**
     * Executes a callback for each source file
     * @param callback The callback too be called for each source file
     */
    public forEachSourceFile(callback: (sourceFile: Record<string, DocUnionJSON>, config: TSDocGenProjectProps, path: string) => void) {
        const { config, sourceFileDeclarationsMap } = this.toJSON();

        for (const path in sourceFileDeclarationsMap) {
            if (Object.prototype.hasOwnProperty.call(sourceFileDeclarationsMap, path)) {
                const sourceFile = sourceFileDeclarationsMap[path];
                
                callback(sourceFile, config, path);
            }
        }
    }

    /**
     * Executes a callback for each doc.
     * @param callback The callback too be called for each doc
     */
    public forEachSourceDoc(callback: (doc: DocUnionJSON, config: TSDocGenProjectProps, sourceFile: Record<string, DocUnionJSON>, path: string) => void) {
        this.forEachSourceFile((sourceFile, config, path) => {
            for (const docName in sourceFile) {
                if (Object.prototype.hasOwnProperty.call(sourceFile, docName)) {
                    const doc = sourceFile[docName];
                    
                    callback(doc, config, sourceFile, path);
                }
            }
        });
    }

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
    
    private getDeclarations = (): ProjectDeclarationsMap => {
        const map: Record<string, { path: string, sourceFile: SourceFile, exportedDeclarations: ReadonlyMap<string, ExportedDeclarations[]> }> = {};

            const sourceFiles = this.tsProject.addSourceFilesFromTsConfig(this.config.tsConfigFilePath);

            for (const sourceFile of sourceFiles) {
                const path = sourceFile.getFilePath().replace(join(process.cwd(), this.config.rootDir), '');

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
     private createProject = (): SourceFileDeclarationMap => {
        const { name: projectName = this.config.projectName } = this.config.packageJson;

        if (!projectName) {
            throw new ProjectNameNotConfiguredError(this.config.tsConfigFilePath);
        }

        const exportedDeclarations = this.getDeclarations();

        const sourceFileMap: SourceFileDeclarationMap = {};

        for (const sourceFilePath in exportedDeclarations) {
            if (Object.prototype.hasOwnProperty.call(exportedDeclarations, sourceFilePath)) {
                const sourceFileResult = exportedDeclarations[sourceFilePath];
                
                const current = sourceFileMap[sourceFilePath] || {};

                sourceFileMap[sourceFilePath] = {
                    ...current,
                }

                for (const [name, declarations] of sourceFileResult.exportedDeclarations) {
                    const doc = this.buildDocs(declarations[0]);
    
                    const docName = name === 'default' ? doc.name : name;

                    const current = sourceFileMap[sourceFilePath] || {};

                    sourceFileMap[sourceFilePath] = {
                        ...current,
                        [docName]: doc,
                    }
                }
            }
        }

        return sourceFileMap;
    }
}

export default TsDocGenProject;
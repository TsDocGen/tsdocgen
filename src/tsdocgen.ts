import Config from "./models/Config";
import { ClassDeclaration, EnumDeclaration, ExportedDeclarations, FunctionDeclaration, InterfaceDeclaration, Node, Project, SyntaxKind, TypeAliasDeclaration, VariableDeclaration } from "ts-morph";
import { TSDocGenProject } from "./types";
import { ProjectNameNotConfiguredError } from "./errors";
import ClassDoc from "./models/documentation/ClassDoc";
import EmitEvent from "./decorators/EmitEvent";
import FunctionDoc from "./models/documentation/FunctionDoc";
import TypeAliasDoc from "./models/documentation/TypeAliasDoc";
import InterfaceDoc from "./models/documentation/InterfaceDoc";
import EnumDoc from "./models/documentation/EnumDoc";
import VariableDoc from "./models/documentation/VariableDoc";
import UnknownDoc from "./models/documentation/UnknownDoc";

/**
 * The TSDocGen Application. Handles traversing source files and converting them to
 * a documentation ready app.
 */
@EmitEvent('START_PROJECT')
class TSDocGen {
    // Private Methods

    /** The project config {@link Config} */
    private config: Config = new Config();

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

    private getDeclarations = (tsProject: Project, project: TSDocGenProject): ReadonlyMap<string, ExportedDeclarations[]>[] => {
        if (project.exportedDeclarationsOnly) {
            const entryPointFile = tsProject.getSourceFileOrThrow(project.entryPoint);

            return [entryPointFile.getExportedDeclarations()];
        }
        else {
            const result = [];

            const sourceFiles = tsProject.addSourceFilesFromTsConfig(project.tsConfigFilePath);

            for (const sourceFile of sourceFiles) {
                result.push(sourceFile.getExportedDeclarations());
            }

            return result;
        }
    }

    // private recursivelyBuildTree = (rootDirectories: Directory[], map: {} = {}): any => {
    //     return rootDirectories.reduce((currentMap, rootDirectory) => {
    //         const name = rootDirectory.getBaseName();

    //         return {
    //             ...currentMap,
    //             [name]: {},
    //         }
    //     }, map);
    // }

    /**
     * Builds an AST tree for a given typescript project.
     * @param project A project config
     * @returns The project name and the tree.
     */
    private buildProjectTree = (project: TSDocGenProject): [string, any] => {
        const tsProject = new Project({
            tsConfigFilePath: project.tsConfigFilePath,
        });

        const { name: projectName = project.projectName } = project.packageJson;

        if (!projectName) {
            throw new ProjectNameNotConfiguredError(project.tsConfigFilePath);
        }

        const exportedDeclarations = this.getDeclarations(tsProject, project);

        const tree = [];

        for (const exportedDeclarationsMap of exportedDeclarations) {
            for (const [name, declarations] of exportedDeclarationsMap) {
                const ast = declarations.map(this.buildDocs);

                tree.push({ name, ast: ast });
            }
        }

        // console.log(tree);

        return [projectName, tree];
    }

    /**
     * Generates the documentation using the configuration options.
     */
    public generateDocumentation = async () => {
        const projects = this.config.projects;
        const projectMap: Record<string, any> = {};

        for (const project of projects) {
            const [name, tree] = this.buildProjectTree(project);

            projectMap[name] = tree;
        }
    }
}

export default TSDocGen;

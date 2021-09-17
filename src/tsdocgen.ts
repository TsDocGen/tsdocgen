import Config from "./models/Config";
import { ExportedDeclarations, Project } from "ts-morph";
import buildAST from "./ast";
import { TSDocGenProject } from "./types";
import { ProjectNameNotConfiguredError } from "./errors";

/**
 * The TSDocGen Application. Handles traversing source files and converting them to
 * a documentation ready app.
 */
class TSDocGen {
    /** The project config {@link Config} */
    private config: Config = new Config();

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

    /**
     * Builds an AST tree for a given typescript project.
     * @param project A project config
     * @returns The project name and the tree.
     */
    private buildProjectTree = (project: TSDocGenProject): [string, any] => {
        const tsProject = new Project({
            tsConfigFilePath: project.tsConfigFilePath,
        });

        const { name: projectName = project.projectName} = project.packageJson;

        if (!projectName) {
            throw new ProjectNameNotConfiguredError(project.tsConfigFilePath);
        }
        
        const exportedDeclarations = this.getDeclarations(tsProject, project);

        const tree = [];

        for (const exportedDeclarationsMap of exportedDeclarations) {
            for (const [name, declarations] of exportedDeclarationsMap) {
                const ast = declarations.map(buildAST);

                // console.dir(ast[0].declarations[0])
                tree.push({ name, ast: ast });
            }
        }

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

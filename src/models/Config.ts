import { findConfigFile, readConfigFile, sys } from "typescript";
import type { TsConfig, TSDocGenConfig, TSDocGenProject } from "../types/tsdocgen";
import { TsConfigNotFoundError, TsDocGenConfigNotFoundError } from "../errors";
import { cosmiconfigSync } from 'cosmiconfig';
import getPackageJson from "../utils/getPackageJson";
import * as path from "path";

const finder = cosmiconfigSync('tsdocgen');

class Config {
  /** The {@link TSDocGenConfig} configation file.  */
  private tsDocGenConfig: TSDocGenConfig;

  /** The parsed projects defined in the {@link TSDocGenConfig}. */
  public projects: TSDocGenProject[];

  constructor() {
    this.tsDocGenConfig = this.getTsDocgenConfig();
    this.projects = this.getProjects();
  }

  // Public Methods

  /**
   * Returns the output directory specified in the config.
   */
  public getOutputDir = () => {
    const cwd = process.cwd();

    return path.join(cwd, this.tsDocGenConfig.outDir);
  }

  // Private Methods

  /**
   * Finds the path tsconfig.json file for the project.
   * @param path The path to the ts config relative to the cwd
   * @returns The absolute path to the tsconfig.json.
   */
  private getTsConfigPath = (path: string): string => {
    const cwd = process.cwd();

    const configFileName = findConfigFile(cwd, sys.fileExists, path);

    if (!configFileName) {
      throw new TsConfigNotFoundError(cwd);
    }

    return configFileName;
  };

  /**
   * Finds the tsconfig.json file for the project.
   * @returns The absolute path to the tsconfig.json.
   */
  private getTsDocgenConfig = (): TSDocGenConfig => {
    const cwd = process.cwd();

    const result = finder.search(cwd);

    if (result?.config) {
      return result.config;
    }
    else {
      throw new TsDocGenConfigNotFoundError(cwd);
    }
  };

  /**
   * Reads a `tsconfig.json` file and returns the parsed config.
   * @param path The path to the ts config relative to the cwd
   * @returns The parsed `tsconfig.json`
   */
  private getTsConfig = (path: string) => {
    const configFileName = this.getTsConfigPath(path);

    const configFile = readConfigFile(configFileName, sys.readFile);

    return configFile.config as TsConfig;
  };

  private getProjects = (): TSDocGenProject[] => {
    return this.tsDocGenConfig.projects.map((project) => {
      return {
        tsDocGenConfig: this.tsDocGenConfig,
        tsConfig: this.getTsConfig(project.tsConfig),
        packageJson: getPackageJson(project.packageJson),
        tsConfigFilePath: this.getTsConfigPath(project.tsConfig),
        entryPoint: project.entryPoint,
        exportedDeclarationsOnly: project.exportedDeclarationsOnly ?? true,
        projectName: project.projectName,
      }
    });
  }
}

export default Config;

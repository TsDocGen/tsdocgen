import * as path from "path";

/**  Signifies the a `tsconfig.json` file was not found in the project. */
export class TsConfigNotFoundError extends Error {
    /**
     * @param searchPath The file path that was used to search for the `tsconfig.json`.
     */
    constructor(searchPath: string) {
        super(`A tsconfig.json could not be found at: ${searchPath}`);

        this.name = 'TsConfigNotFoundError';
    }
}

/**  Signifies the a `tsdocgen.config.json` file was not found in the project. */
export class TsDocGenConfigNotFoundError extends Error {
    /**
     * @param searchPath The file path that was used to search for the `tsconfig.json`.
     */
    constructor(searchPath: string) {
        super(`A tsdocgen.config.json could not be found at: ${searchPath}`);

        this.name = 'TsDocGenConfigNotFoundError';
    }
}

/**  Signifies the a project name was not configured in package.json or the tsdocgen.config.js for a project. */
export class ProjectNameNotConfiguredError extends Error {
    /**
     * @param tsConfigPath The location of the tsconfig.json relative to the current working directory.
     */
    constructor(tsConfigPath: string) {
        const projectPath = path.join(process.cwd(), tsConfigPath);

        super(`A project name was not found in package.json or tsdocgen.config.js for: ${projectPath}`);

        this.name = 'ProjectNameNotConfiguredError';
    }
}
import type { JSONSchemaForNPMPackageJsonFiles } from "@schemastore/package";
import {
  ClassDeclaration,
  CompilerOptions,
  EnumDeclaration,
  FunctionDeclaration,
  InterfaceDeclaration,
  ModuleDeclaration,
  TypeAliasDeclaration,
  VariableDeclaration,
} from "typescript";

export interface DocJSON {
  name: string;
  jsDoc: {
      description: string;
      tags: TsDocGenDoc['tags'];
  }
};

export type TSDocGenProject = {
  tsDocGenConfig: TSDocGenConfig;
  tsConfig: TsConfig;
  packageJson: JSONSchemaForNPMPackageJsonFiles;
  entryPoint: string;
  tsConfigFilePath: string;
  exportedDeclarationsOnly: boolean;
  projectName?: string;
}

/**
 * The configration options for a TSDocGen project in {@link TSDocGenConfig}
 */
export type TSDocGenProjectConfig = {
  new (): void;
  /** a function */
  d: () => void;
  get g (): string;
  /** 
   * The location of the tsconfig.json file relative to the current working directory. 
   */
  tsConfig: string;
  /** 
   * The entry point file such as `index.ts`
   */
  entryPoint: string;
  /** 
   * The location of the package.json file relative to the current working directory. 
   */
  packageJson: string;
  /** 
   * A flag o determine whether or not to generate documentation for declarations that are explicity exported.
   * If set to `false` the entire project as defined in the `tsconfig.json` will be documented.
   */
  exportedDeclarationsOnly?: boolean;
  /**
   * An optional name for the project. If no project name is defined then the project name will
   * default to the name in `package.json`.
   */
  projectName?: string;
}

/** Configuration options for `tsdocgen.config.js`. */
export type TSDocGenConfig = {
  /**
   * An array of projects to generate documentation for.
   */
  projects: TSDocGenProjectConfig[];
  /**
   * The output directory of the documentation relative to the current working directory.
   */
  outDir: string;
};

export type TsConfig = CompilerOptions & {
  tsdocgen?: TSDocGenConfig;
};

export type Declaration =
  | ClassDeclaration
  | InterfaceDeclaration
  | TypeAliasDeclaration
  | EnumDeclaration
  | FunctionDeclaration
  | VariableDeclaration
  | ModuleDeclaration;

export type TsDocGenDoc = {
  description: string;
  tags: {
    tagName: string;
    text: string;
  }[]
};

export type ClassType = { new (...args: any[]): {} };

export type Test<D extends string = string> = {
  red: D;
};

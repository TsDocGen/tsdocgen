import type { JSONSchemaForNPMPackageJsonFiles } from "@schemastore/package";
import type { ExportedDeclarations, SourceFile } from "ts-morph";
import type {
  CompilerOptions,
} from "typescript";
import type TsDocGenTheme from "../theme/Theme";
import type { DocUnion, DocUnionJSON } from "./docs";

export interface BaseDocJSON<T extends string = string> {
  type: T;
  name: string;
  isDefaultExport: boolean;
  jsDoc: {
      description: string;
      tags: TsDocGenDoc['tags'];
  },
  isExported: boolean;
};

export type TSDocGenProjectProps = {
  tsDocGenConfig: TSDocGenConfig;
  tsConfig: TsConfig;
  packageJson: JSONSchemaForNPMPackageJsonFiles;
  entryPoint: string;
  tsConfigFilePath: string;
  exportedDeclarationsOnly: boolean;
  projectName?: string;
  rootDir: string;
}

/**
 * The configration options for a TSDocGen project in {@link TSDocGenConfig}
 */
export type TSDocGenProjectConfig = {
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
  /**
   * The root directory for a project.
   */
  rootDir: string;
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
  /** 
   * The name or location of the theme. 
   */
  theme: TsDocGenTheme;
};

export type TsConfig = CompilerOptions & {
  tsdocgen?: TSDocGenConfig;
};

export type TsDocGenDoc = {
  description: string;
  tags: {
    tag: string;
    tagName: string;
    text: string;
  }[]
};

export type ClassType = { new (...args: any[]): {} };

export interface SourceFileDeclarationMap extends Record<string, Record<string, DocUnion>> {

}

export interface TSDocGenResult {
    [x: string]: SourceFileDeclarationMap;
}

export interface SourceFileDeclarations { 
    path: string, 
    sourceFile: SourceFile, 
    exportedDeclarations: ReadonlyMap<string, ExportedDeclarations[]> 
}

export interface ProjectDeclarationsMap extends Record<string, SourceFileDeclarations> {};

export interface TsDocGenProjectJSON {
  config: TSDocGenProjectProps;
  sourceFileDeclarationsMap: Record<string, Record<string, DocUnionJSON>>;
}

/**
 * A factory function for creating urls for docs.
 * @param docName The name of the generated doc
 * @param docType The type of the generated doc such as `class` or `function`;
 * @param docPath The full path of the doc relative to the current working directory.
 */
 export type UrlFactory = (projectName: string, docName: string, docType: string, docPath: string) => string;

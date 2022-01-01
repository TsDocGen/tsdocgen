import type ClassDoc from "./../models/documentation/ClassDoc";
import type FunctionDoc from "./../models/documentation/FunctionDoc";
import type TypeAliasDoc from "./../models/documentation/TypeAliasDoc";
import type InterfaceDoc from "./../models/documentation/InterfaceDoc";
import type EnumDoc from "./../models/documentation/EnumDoc";
import type VariableDoc from "./../models/documentation/VariableDoc";
import type UnknownDoc from "./../models/documentation/UnknownDoc";
import type ConstructorDoc from "../models/documentation/ConstructorDoc";
import type SignatureDoc from "../models/documentation/SignatureDoc";
import type MethodDoc from "../models/documentation/MethodDoc";
import type PropertyDoc from "../models/documentation/PropertyDoc";
import type TsDocGenDocPage from "../models/page/DocPage";
import type { TsDocGenDocPageJSON } from "../models/page/DocPage";
import type TsDocGenReadMePage from "../models/page/ReadMePage";
import type { TsDocGenReadMePageJSON } from "../models/page/ReadMePage";
import type TsDocGenModulePage from "../models/page/ModulePage";
import type { TsDocGenModulePageJSON } from "../models/page/ModulePage";

export type DocUnion = ClassDoc | FunctionDoc | TypeAliasDoc | InterfaceDoc | EnumDoc | VariableDoc | UnknownDoc | MethodDoc | ConstructorDoc | SignatureDoc;

export type DocUnionJSON = ReturnType<DocUnion['toJSON']>;

export type DocType = DocUnion['type'];

export type ExportableDoc = ClassDoc | FunctionDoc | TypeAliasDoc | InterfaceDoc | EnumDoc | VariableDoc | UnknownDoc;

export type ExportableDocJSON = ReturnType<ExportableDoc['toJSON']>;

export type ExportableDocType = ExportableDoc['type'];

export type NonExportableDoc = ConstructorDoc | SignatureDoc | PropertyDoc | MethodDoc;

export type NonExportableDocJSON = ReturnType<NonExportableDoc['toJSON']>;

export type NonExportableDocType = NonExportableDoc['type'];

export interface ProjectDocs {
    name: string;
    docs: DocUnion[]
}

export type TsDocGenPageUnion = TsDocGenDocPage | TsDocGenReadMePage | TsDocGenModulePage;

export type TsDocGenPageJSONUnion = TsDocGenDocPageJSON | TsDocGenReadMePageJSON | TsDocGenModulePageJSON;

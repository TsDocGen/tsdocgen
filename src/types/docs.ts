import type ClassDoc from "./../models/documentation/ClassDoc";
import type FunctionDoc from "./../models/documentation/FunctionDoc";
import type TypeAliasDoc from "./../models/documentation/TypeAliasDoc";
import type InterfaceDoc from "./../models/documentation/InterfaceDoc";
import type EnumDoc from "./../models/documentation/EnumDoc";
import type VariableDoc from "./../models/documentation/VariableDoc";
import type UnknownDoc from "./../models/documentation/UnknownDoc";
import type { MethodDoc } from "..";
import type ConstructorDoc from "../models/documentation/ConstructorDoc";
import type SignatureDoc from "../models/documentation/SignatureDoc";

export type DocUnion = ClassDoc | FunctionDoc | TypeAliasDoc | InterfaceDoc | EnumDoc | VariableDoc | UnknownDoc | MethodDoc | ConstructorDoc | SignatureDoc;

export type DocUnionJSON = ReturnType<DocUnion['toJSON']>;

export type DocType = "function" | "class" | "type-alias" | "interface" | "enum" | "variable" | "unknown" | "method" | "signature" | "constructor";

export interface ProjectDocs {
    name: string;
    docs: DocUnion[]
}

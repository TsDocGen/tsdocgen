import ClassDoc from "./../models/documentation/ClassDoc";
import FunctionDoc from "./../models/documentation/FunctionDoc";
import TypeAliasDoc from "./../models/documentation/TypeAliasDoc";
import InterfaceDoc from "./../models/documentation/InterfaceDoc";
import EnumDoc from "./../models/documentation/EnumDoc";
import VariableDoc from "./../models/documentation/VariableDoc";
import UnknownDoc from "./../models/documentation/UnknownDoc";
import { MethodDoc } from "..";
import ConstructorDoc from "../models/documentation/ConstructorDoc";
import SignatureDoc from "../models/documentation/SignatureDoc";

export type DocUnion = ClassDoc | FunctionDoc | TypeAliasDoc | InterfaceDoc | EnumDoc | VariableDoc | UnknownDoc | MethodDoc | ConstructorDoc | SignatureDoc;

export type DocUnionJSON = ReturnType<DocUnion['toJSON']>;

export type DocType = "function" | "class" | "type-alias" | "interface" | "enum" | "variable" | "unknown" | "method" | "signature" | "constructor";

export interface ProjectDocs {
    name: string;
    docs: DocUnion[]
}

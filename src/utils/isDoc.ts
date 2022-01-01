import type { Node, Structure } from "ts-morph";
import type { ClassDoc } from "../models";
import type BaseDoc from "../models/documentation/BaseDoc";

export function isClassDoc(doc: BaseDoc<string, Node, Structure, any>): doc is ClassDoc {
    if (doc.type === "class") return true;
    return false;
}
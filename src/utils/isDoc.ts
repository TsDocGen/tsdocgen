import { Node, Structure } from "ts-morph";
import { ClassDoc } from "../models";
import BaseDoc from "../models/documentation/BaseDoc";

export function isClassDoc(doc: BaseDoc<string, Node, Structure>): doc is ClassDoc {
    if (doc.type === "class") return true;
    return false;
}
import { Node, Structure } from "ts-morph";
import { ClassDoc } from "../models";
import AbstractDoc from "../models/documentation/AbstractDoc";

export function isClassDoc(doc: AbstractDoc<string, Node, Structure>): doc is ClassDoc {
    if (doc.type === "class") return true;
    return false;
}
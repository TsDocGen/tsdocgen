import { Node, Structure } from "ts-morph";
import { ClassDoc } from "../models";
import AbstractDoc from "../models/documentation/AbstractDoc";

export function isClassDoc(doc: AbstractDoc<Node, Structure>): doc is ClassDoc {
    if (doc instanceof ClassDoc) return true;
    return false;
}
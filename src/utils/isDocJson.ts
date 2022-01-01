import type { ClassDocJSON } from "../models/documentation/ClassDoc";
import type { MethodDocJSON } from "../models/documentation/MethodDoc";
import type { DocUnionJSON } from "../types/docs";

export function isClassDocJSON(doc: DocUnionJSON): doc is ClassDocJSON {
    if (doc.type === "class") return true;
    return false;
}

export function isMethodDocJSON(doc: DocUnionJSON): doc is MethodDocJSON {
    if (doc.type === "method") return true;
    return false;
}
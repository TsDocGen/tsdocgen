import { Node, Structure } from "ts-morph";

interface NodeWithStructure<S extends Structure = Structure> extends Node {
    getStructure(): S
}

/**
 * Checks if a node has `getStructure` method.
 * @param node A `ts-morph` node.
 */
function isNodeWithStructure<S extends Structure = Structure>(node: Node): node is NodeWithStructure<S> {
    if ('getStructure' in node) {
        return true;
    }
    return false;
}

export default isNodeWithStructure;
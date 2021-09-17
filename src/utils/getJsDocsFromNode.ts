import {
  JSDoc,
  Node,
} from "ts-morph";

/**
 * Returns the JsDocs from a declaration or node.
 * @param node A declaration or node
 * @returns The JsDocs
 */
function getJsDocsFromNode(
  node: Node
): JSDoc[] {
  if (Node.isJSDocableNode(node)) {
    return node.getJsDocs();
  } else if (Node.isVariableDeclaration(node)) {
    return node.getVariableStatement()?.getJsDocs() ?? [];
  } else {
    return [];
  }
}

export default getJsDocsFromNode;

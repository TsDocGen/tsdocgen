import { TypeChecker, Node, ts } from "ts-morph";
import ParameterDoc from "../models/documentation/ParameterDoc";

/**
 * Gets the call, index or construct signatures
 */
 function getParameters(node: Node, checker: TypeChecker) {
    if (Node.isParameteredNode(node) || Node.isFunctionTypeNode(node)) {
        return node.getParameters().map((parameter) => {
            return new ParameterDoc(parameter, checker);
        });
    }

    if (Node.isPropertyDeclaration(node) || Node.isPropertySignature(node)) {
        const [arrowFunction] = node.getChildrenOfKind(ts.SyntaxKind.ArrowFunction);

        return arrowFunction?.getParameters().map((parameter) => {
            return new ParameterDoc(parameter, checker);
        }) ?? [];
    }

    return [];
}

export default getParameters;
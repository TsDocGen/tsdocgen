import { Node, ParameterDeclaration, ts } from "ts-morph";
import ParameterDoc from "../models/documentation/ParameterDoc";
import type TsDocGenContext from '../models/context';
import { TsDocGenDoc } from "..";
import findTagForDoc from "./findTagForDoc";
import type FunctionDoc from '../models/documentation/FunctionDoc';
import type MethodDoc from '../models/documentation/MethodDoc';
import type ConstructorDoc from '../models/documentation/ConstructorDoc';

function createParameterDoc(parameter: ParameterDeclaration, context: TsDocGenContext, tags: TsDocGenDoc['tags'], parent: FunctionDoc | MethodDoc | ConstructorDoc) {
    const doc = new ParameterDoc(parameter, context, parent);

    const tag = findTagForDoc(tags, doc.name, 'param');

    if (tag) doc.setDescription(tag.text);

    return doc;
}

/**
 * Gets the call, index or construct signatures
 */
function getParameters(node: Node, context: TsDocGenContext, tags: TsDocGenDoc['tags'], parent: FunctionDoc | MethodDoc | ConstructorDoc) {
    if (Node.isParameteredNode(node) || Node.isFunctionTypeNode(node)) {
        return node.getParameters().map((parameter) => {
            return createParameterDoc(parameter, context, tags, parent);
        });
    }

    if (Node.isPropertyDeclaration(node) || Node.isPropertySignature(node)) {
        const [arrowFunction] = node.getChildrenOfKind(ts.SyntaxKind.ArrowFunction);

        return arrowFunction?.getParameters().map((parameter) => {
            return createParameterDoc(parameter, context, tags, parent);
        }) ?? [];
    }
   
    return [];
}

export default getParameters;
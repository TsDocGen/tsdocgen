import { Node } from "ts-morph";
import TypeParameterDoc from "../models/documentation/TypeParameterDoc";
import { ClassType, TsDocGenDoc } from "../types/tsdocgen";
import type TsDocGenContext from '../models/context';
import findTagForDoc from "../utils/findTagForDoc";

/**
 * Gets the call, index or construct signatures
 */
function getTypeParameters(node: Node, context: TsDocGenContext, tags: TsDocGenDoc['tags']) {
    if (Node.isTypeParameteredNode(node)) {
        return node.getTypeParameters().map((typeParameter) => {
            const doc = new TypeParameterDoc(typeParameter, context);

            const tag = findTagForDoc(tags, doc.name, 'typeParam');

            if (tag) doc.setDescription(tag.text);
            
            return doc;
        });
    }
    return [];
}

/**
 * Attaches an array of {@link TypeParameterDoc}'s `typeParameters` to a Doc
 */
function AddTypeParameterDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.typeParameters = getTypeParameters(node, args[1], target.tags);

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithParamaters() {
                return {
                    ...toJSON(),
                    typeParameters: target.typeParameters.map((signature: TypeParameterDoc) => signature.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddTypeParameterDocs;


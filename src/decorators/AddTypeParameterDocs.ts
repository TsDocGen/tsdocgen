import { Node } from "ts-morph";
import TypeParameterDoc from "../models/documentation/TypeParameterDoc";
import { ClassType } from "../types/tsdocgen";

/**
 * Gets the call, index or construct signatures
 */
function getTypeParameters(node: Node) {
    if (Node.isTypeParameteredNode(node)) {
        return node.getTypeParameters().map((typeParameter) => {
            return new TypeParameterDoc(typeParameter)
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

            target.typeParameters = getTypeParameters(node);

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


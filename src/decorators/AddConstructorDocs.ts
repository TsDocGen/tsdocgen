import { Node } from "ts-morph";
import { ClassType } from "../types/tsdocgen";
import type TsDocGenContext from '../models/context';
import ConstructorDoc from "../models/documentation/ConstructorDoc";
import type ClassDoc from "../models/documentation/ClassDoc";

/**
 * Gets the call, index or construct signatures
 */
function getConstructors(node: Node, context: TsDocGenContext, parent: ClassDoc) {
    if (Node.isClassLikeDeclarationBase(node)) {
        return node.getConstructors().map((constructor) => {
            return new ConstructorDoc(constructor, context, parent);
        });
    }
    return [];
}

/**
 * Attaches an array of {@link TypeParameterDoc}'s `typeParameters` to a Doc
 */
function AddConstructorDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.constructors = getConstructors(node, args[1], target);

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithParamaters() {
                return {
                    ...toJSON(),
                    constructors: target.constructors.map((constructor: ConstructorDoc) => constructor.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddConstructorDocs;


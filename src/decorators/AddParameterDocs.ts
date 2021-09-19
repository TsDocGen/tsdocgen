import "reflect-metadata";
import { Node } from "ts-morph";
import ParameterDoc from "../models/documentation/ParameterDoc";
import { ClassType } from "../types";

/**
 * Gets the call, index or construct signatures
 */
function getParameters(node: Node) {
    if (Node.isParameteredNode(node)) {
        return node.getParameters().map((parameter) => {
            return new ParameterDoc(parameter)
        });
    }

    return [];
}

/**
 * Attaches an array of {@link ParameterDoc}'s `parameters` to a Doc
 */
function AddParameterDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.parameters = getParameters(node);

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithParamaters() {
                return {
                    ...toJSON(),
                    parameters: target.parameters.map((signature: ParameterDoc) => signature.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddParameterDocs;


import ParameterDoc from "../models/documentation/ParameterDoc";
import { ClassType } from "../types/tsdocgen";
import getParameters from "../utils/getParameters";

/**
 * Attaches an array of {@link ParameterDoc}'s `parameters` to a Doc
 */
function AddParameterDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.parameters = getParameters(node, args[2], target.tags, target);

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


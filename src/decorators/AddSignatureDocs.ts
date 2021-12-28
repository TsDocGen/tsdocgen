import { Node } from "ts-morph";
import SignatureDoc from "../models/documentation/SignatureDoc";
import { ClassType } from "../types/tsdocgen";
import type TsDocGenContext from '../models/context';

/**
 * Gets the call, index or construct signatures
 */
function getSignatures(node: Node, context: TsDocGenContext) {
    if (Node.isTypeElementMemberedNode(node)) {
        const signatures = [
            ...node.getCallSignatures(), 
            ...node.getIndexSignatures(), 
            ...node.getConstructSignatures()
        ];
        return signatures.map((signature) => {
            return new SignatureDoc(signature, context);
        });
    }

    return [];
}

/**
 * Attaches an array of {@link SignatureDoc}'s `signatures` to a Doc
 */
function AddSignatureDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.signatures = getSignatures(node, args[2]);

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithSignatures() {
                return {
                    ...toJSON(),
                    signatures: target.signatures.map((signature: SignatureDoc) => signature.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddSignatureDocs;


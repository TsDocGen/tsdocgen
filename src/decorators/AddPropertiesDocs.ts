import "reflect-metadata";
import { Node } from "ts-morph";
import PropertyDoc from "../models/documentation/PropertyDoc";
import { ClassType } from "../types";

function getProperties(node: Node) {
    if (Node.isTypedNode(node)) {
        const type = node.getTypeNode();

        if (Node.isTypeLiteralNode(type)) {
            return type.getProperties().map((property) => {
                return new PropertyDoc(property)
            });
        }

        return [];
    }

    if (Node.isTypeElementMemberedNode(node)) {
        return node.getProperties().map((property) => {
            return new PropertyDoc(property)
        });
    }

    if (Node.isClassLikeDeclarationBase(node)) {
        return node.getProperties().map((property) => {
            return new PropertyDoc(property)
        });
    }
    
    return [];
}

/**
 * Attaches an array of {@link PropertyDoc}'s `properties` to a Doc
 */
function AddPropertiesDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            target.properties = getProperties(node);

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithProperties() {
                return {
                    ...toJSON(),
                    properties: target.properties.map((property: PropertyDoc) => property.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddPropertiesDocs;


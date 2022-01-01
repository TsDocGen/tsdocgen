import { Node } from "ts-morph";
import MethodDoc from "../models/documentation/MethodDoc";
import PropertyDoc from "../models/documentation/PropertyDoc";
import { ClassType } from "../types/tsdocgen";
import type TsDocGenContext from '../models/context';

type PropertiesAndMethodsMap = {
    methods: MethodDoc[];
    properties: PropertyDoc[]
}

function convertArrowFunctionsToMethods(properties: PropertyDoc[]): PropertiesAndMethodsMap {
    return properties.reduce(({ methods, properties }, property) => {
        if (property.isArrowFunction) {
            return {
                methods: [...methods, property.convertToMethodDoc()],
                properties: properties,
            }  
        }
        return {
            methods: methods,
            properties: [...properties, property],
        }
    }, { methods: [], properties: []} as PropertiesAndMethodsMap)
}

function getPropertiesAndMethods(node: Node, context: TsDocGenContext, sourceFileRelativePath: string) {
    if (Node.isTypedNode(node)) {
        const type = node.getTypeNode();

        if (Node.isTypeLiteralNode(type)) {
            const properties = type.getProperties().map((property) => {
                return new PropertyDoc(property, context, sourceFileRelativePath)
            });
            return convertArrowFunctionsToMethods(properties);
        }
    }

    if (Node.isTypeElementMemberedNode(node)) {
        const properties = node.getProperties().map((property) => {
            return new PropertyDoc(property, context, sourceFileRelativePath)
        });
        return convertArrowFunctionsToMethods(properties);
    }

    if (Node.isClassLikeDeclarationBase(node)) {
        const properties = node.getProperties().map((property) => {
            return new PropertyDoc(property, context, sourceFileRelativePath)
        });
        return convertArrowFunctionsToMethods(properties);
    }
    
    return { methods: [], properties: [] };
}

/**
 * Attaches an array of {@link PropertyDoc}'s `properties` to a Doc. If the property
 * is an arrow function then the property will be converted to a {@link MethodDoc}.
 */
function AddPropertiesDocs<T extends ClassType>(constructor: T) {
    return class extends constructor {
        constructor(...args: any[]) {
            super(...args);

            const node = args[0];

            const target = this as any;

            const { methods, properties } = getPropertiesAndMethods(node, args[1], args[2]);

            target.properties = [...(target.properties || []), ...properties];
            target.methods = [...(target.methods || []), ...methods];

            const toJSON = target.toJSON.bind(this);

            target.toJSON = function toJSONWithProperties() {
                return {
                    ...toJSON(),
                    properties: target.properties.map((property: PropertyDoc) => property.toJSON()),
                    methods: target.methods.map((method: MethodDoc) => method.toJSON()),
                };
            }.bind(this);
        }
    }
}

export default AddPropertiesDocs;


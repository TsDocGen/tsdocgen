import { Structure, Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { BaseDocJSON } from "../../types/tsdocgen";
import BaseDoc from "./BaseDoc";

export interface DocJSON<T extends string = string> extends BaseDocJSON<T> {
    // signatures: ReturnType<SignatureDoc['toJSON']>[];
    // typeParameters: ReturnType<TypeParameterDoc['toJSON']>[];
    // parameters: ReturnType<ParameterDoc['toJSON']>[];
    // properties: ReturnType<PropertyDoc['toJSON']>[];
}

/**
 * The base representation for all documentation nodes.
 * 
 * @typeParam T The document type
 * @typeParam N Generic Node type from `ts-morph`
 * @typeParam S Generic Structure type from `ts-morph`
 */
@EmitDocEvent('CREATE_DOC')
class Doc<T extends string, N extends Node, S extends Structure = Structure> extends BaseDoc<T, N, S> {
    // public signatures!: SignatureDoc[];
    // public typeParameters!: TypeParameterDoc[];
    // public parameters!: ParameterDoc[];
    // public properties!: PropertyDoc[];

    public override toJSON(): DocJSON<T> {
        return {
            ...super.toJSON(),
        } as DocJSON<T>;
    }
}

export default Doc;

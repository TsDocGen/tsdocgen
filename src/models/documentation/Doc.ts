import { Structure, Node } from "ts-morph";
import AddParameterDocs from "../../decorators/AddParameterDocs";
import AddPropertiesDocs from "../../decorators/AddPropertiesDocs";
import AddSignatureDocs from "../../decorators/AddSignatureDocs";
import AddTypeParameterDocs from "../../decorators/AddTypeParameterDocs";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { AbstractDocJSON } from "../../types/tsdocgen";
import AbstractDoc from "./AbstractDoc";
import ParameterDoc from "./ParameterDoc";
import PropertyDoc from "./PropertyDoc";
import SignatureDoc from "./SignatureDoc";
import TypeParameterDoc from "./TypeParameterDoc";

export interface DocJSON extends AbstractDocJSON {
    signatures: ReturnType<SignatureDoc['toJSON']>;
    typeParameters: ReturnType<TypeParameterDoc['toJSON']>;
    parameters: ReturnType<ParameterDoc['toJSON']>;
    properties: ReturnType<PropertyDoc['toJSON']>;
}

/**
 * The base representation for all documentation nodes.
 * 
 * @typeParam N Generic Node type from `ts-morph`
 * @typeParam S Generic Structure type from `ts-morph`
 */
@AddPropertiesDocs
@AddSignatureDocs
@AddParameterDocs
@AddTypeParameterDocs
@EmitDocEvent('CREATE_DOC')
class Doc<N extends Node, S extends Structure = Structure> extends AbstractDoc<N, S> {
    public signatures!: SignatureDoc[];
    public typeParameters!: TypeParameterDoc[];
    public parameters!: ParameterDoc[];
    public properties!: PropertyDoc[];

    public override toJSON(): DocJSON {
        return {
            ...super.toJSON(),
        } as DocJSON;
    }
}

export default Doc;

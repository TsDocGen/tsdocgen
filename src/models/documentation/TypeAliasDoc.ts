import { TypeAliasDeclaration, TypeAliasDeclarationStructure } from "ts-morph";
import AddTypeParameterDocs from "../../decorators/AddTypeParameterDocs";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";
import TypeParameterDoc, { TypeParameterDocJSON } from "./TypeParameterDoc";
import type TsDocGenContext from '../context';

export interface TypeAliasDocJSON extends DocJSON<"type-alias"> {
    typeParameters: TypeParameterDocJSON[]
}

@AddTypeParameterDocs
@EmitDocEvent('CREATE_TYPE_ALIAS_DOC')
class TypeAliasDoc extends Doc<"type-alias",TypeAliasDeclaration, TypeAliasDeclarationStructure> {
    public typeParameters!: TypeParameterDoc[];

    constructor(node: TypeAliasDeclaration, context: TsDocGenContext) {
        super(node, "type-alias", context);
    }

    public override toString() {
        return '';
    }

    public override toJSON(): TypeAliasDocJSON {
        return {
            ...super.toJSON()
        } as TypeAliasDocJSON
    }
}

export default TypeAliasDoc;

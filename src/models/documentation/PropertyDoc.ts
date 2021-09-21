import { PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends AbstractDoc<
    "property",
    PropertyDeclaration | PropertySignature, 
    PropertyDeclarationStructure | PropertySignatureStructure
    > {
    constructor(node: PropertyDeclaration | PropertySignature) {
        super(node, "property");
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            isReadonly: this.structure?.isReadonly,
            returnType: this.getReturnType(),
        }
    }
}

export default PropertyDoc;

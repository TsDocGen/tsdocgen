import { PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends AbstractDoc<
    PropertyDeclaration | PropertySignature, 
    PropertyDeclarationStructure | PropertySignatureStructure
    > {
    constructor(node: PropertyDeclaration | PropertySignature) {
        super(node);

        // if (Node.isTypeNode(this.node)) {
        //     this.node.getProp
        // }
        console.log(this.node.getChildren())
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            type: this.structure?.type,
            hasQuestionToken: this.structure?.hasQuestionToken,
            isReadonly: this.structure?.isReadonly,
            returnType: this.getReturnType(),
        }
    }
}

export default PropertyDoc;

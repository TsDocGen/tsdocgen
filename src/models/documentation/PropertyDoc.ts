import { PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure, ts, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends AbstractDoc<
    "property",
    PropertyDeclaration | PropertySignature, 
    PropertyDeclarationStructure | PropertySignatureStructure
    > {
    public isArrowFunction: boolean;

    constructor(node: PropertyDeclaration | PropertySignature, checker: TypeChecker) {
        super(node, "property", checker);

        this.isArrowFunction = this.checkIfArrowFunction();
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            isReadonly: this.structure?.isReadonly,
            returnType: this.getReturnType(),
        }
    }

    private checkIfArrowFunction() {
        const initializer = this.node.getInitializer();

        if (initializer) {
            return ts.isArrowFunction(initializer.compilerNode);
        }

        return false;
    }
}

export default PropertyDoc;

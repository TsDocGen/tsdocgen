import { Node, PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure, ts, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends AbstractDoc<
    "property",
    PropertyDeclaration | PropertySignature, 
    PropertyDeclarationStructure | PropertySignatureStructure
    > {
    public isArrowFunction: boolean;
    public scope: string | undefined;

    constructor(node: PropertyDeclaration | PropertySignature, checker: TypeChecker) {
        super(node, "property", checker);

        this.isArrowFunction = this.checkIfArrowFunction();

        if (Node.isPropertyDeclaration(node)) {
            this.scope = node.getScope()
        }
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            isReadonly: this.structure?.isReadonly,
            returnType: this.getReturnType(),
            scope: this.scope
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

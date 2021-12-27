import { TypeChecker, TypeParameterDeclaration, TypeParameterDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_TYPE_PARAMETER_DOC')
class TypeParameterDoc extends AbstractDoc<"type-parameter", TypeParameterDeclaration, TypeParameterDeclarationStructure> {

    constructor(node: TypeParameterDeclaration, checker: TypeChecker) {
        super(node, "type-parameter", checker);
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            constraint: this.structure?.constraint,
            default: this.structure?.default,
        }
    }

    public override toString() {
        return '';
    }
}

export default TypeParameterDoc;

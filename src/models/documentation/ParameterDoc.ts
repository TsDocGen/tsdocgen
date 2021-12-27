import { ParameterDeclaration, ParameterDeclarationStructure, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PARAMETER_DOC')
class ParameterDoc extends AbstractDoc<"parameter",ParameterDeclaration, ParameterDeclarationStructure> {

    constructor(node: ParameterDeclaration, checker: TypeChecker) {
        super(node, "parameter", checker);
    }

    public override toJSON() {
        const { type, ...structure } = this.structure || {};
        return {
            ...super.toJSON(),
            ...structure,
            tsType: type,
        }
    }

    public override toString() {
        return '';
    }
}

export default ParameterDoc;

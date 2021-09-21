import { ParameterDeclaration, ParameterDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

@EmitDocEvent('CREATE_PARAMETER_DOC')
class ParameterDoc extends AbstractDoc<"parameter",ParameterDeclaration, ParameterDeclarationStructure> {

    constructor(node: ParameterDeclaration) {
        super(node, "parameter");
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            initializer: this.structure?.initializer,
            isRestParameter: this.structure?.isRestParameter,
            hasOverrideKeyword: this.structure?.hasOverrideKeyword,
        }
    }

    public override toString() {
        return '';
    }
}

export default ParameterDoc;

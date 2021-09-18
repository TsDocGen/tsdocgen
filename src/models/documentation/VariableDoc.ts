import { VariableDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_VARIABLE_DOC')
class VariableDoc extends Doc<VariableDeclaration> {

    constructor(node: VariableDeclaration) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default VariableDoc;

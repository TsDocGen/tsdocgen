import { FunctionDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_FUNCTION_DOC')
class FunctionDoc extends Doc<FunctionDeclaration> {

    constructor(node: FunctionDeclaration) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default FunctionDoc;

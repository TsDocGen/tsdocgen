import { InterfaceDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_INTERFACE_DOC')
class InterfaceDoc extends Doc<InterfaceDeclaration> {

    constructor(node: InterfaceDeclaration) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default InterfaceDoc;

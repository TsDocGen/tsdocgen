import { Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_UNKNOWN_DOC')
class UnknownDoc extends Doc<Node> {

    constructor(node: Node) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default UnknownDoc;

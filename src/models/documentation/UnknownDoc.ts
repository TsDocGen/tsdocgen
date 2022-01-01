import { Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";
import type TsDocGenContext from '../context';

@EmitDocEvent('CREATE_UNKNOWN_DOC')
class UnknownDoc extends Doc<"unknown", Node> {

    constructor(node: Node, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "unknown", context, sourceFileRelativePath);
    }

    public override toString() {
        return '';
    }
}

export default UnknownDoc;

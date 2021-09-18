import { MethodDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_METHOD_DOC')
class MethodDoc extends Doc<MethodDeclaration> {
    public isStatic: boolean;

    constructor(node: MethodDeclaration) {
        super(node);

        this.isStatic = node.isStatic();
    }

    public override toString = () => {
        return '';
    }
}

export default MethodDoc;

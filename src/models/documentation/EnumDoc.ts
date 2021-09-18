import { EnumDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_ENUM_DOC')
class EnumDoc extends Doc<EnumDeclaration> {

    constructor(node: EnumDeclaration) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default EnumDoc;

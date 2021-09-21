import { EnumDeclaration, EnumDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_ENUM_DOC')
class EnumDoc extends Doc<"enum",EnumDeclaration, EnumDeclarationStructure> {

    constructor(node: EnumDeclaration) {
        super(node, "enum");
    }

    public override toString() {
        return '';
    }
}

export default EnumDoc;

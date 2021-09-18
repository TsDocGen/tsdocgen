import { TypeAliasDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_TYPE_ALIAS_DOC')
class TypeAliasDoc extends Doc<TypeAliasDeclaration> {

    constructor(node: TypeAliasDeclaration) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default TypeAliasDoc;

import { TypeAliasDeclaration, TypeAliasDeclarationStructure, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_TYPE_ALIAS_DOC')
class TypeAliasDoc extends Doc<"type-alias",TypeAliasDeclaration, TypeAliasDeclarationStructure> {

    constructor(node: TypeAliasDeclaration, checker: TypeChecker) {
        super(node, "type-alias", checker);

        // console.log(this.node.getType().getConstructSignatures());
        // this.node.getType().getCallSignatures()
        // console.log(this.toJSON());
    }

    public override toString() {
        return '';
    }
}

export default TypeAliasDoc;

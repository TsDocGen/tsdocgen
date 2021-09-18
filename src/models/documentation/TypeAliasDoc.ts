import { Node, TypeAliasDeclaration } from "ts-morph";
import { PropertyDoc } from "..";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_TYPE_ALIAS_DOC')
class TypeAliasDoc extends Doc<TypeAliasDeclaration> {

    public properties: PropertyDoc[];

    constructor(node: TypeAliasDeclaration) {
        super(node);

        this.properties = this.getProperties();
    }

    public override toString = () => {
        return '';
    }

    private getProperties = () => {
        const type = this.node.getTypeNode();

        if (Node.isTypeLiteralNode(type)) {
            return type.getProperties().map((property) => {
                return new PropertyDoc(property);
            });
        }

        return []        
    }
}

export default TypeAliasDoc;

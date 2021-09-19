import { FunctionDeclaration, FunctionDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_FUNCTION_DOC')
class FunctionDoc extends Doc<FunctionDeclaration, FunctionDeclarationStructure> {

    public isAsync: boolean;
    public isGenerator: boolean;

    constructor(node: FunctionDeclaration) {
        super(node);

        this.isAsync = this.node.isAsync();
        this.isGenerator = this.node.isGenerator();
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            isAsync: this.isAsync,
            isGenerator: this.isGenerator,
            typeParameters: this.typeParameters.map((t) => t.toJSON()),
            returnType: this.getReturnType(),
        }
    }

    public override toString() {
        return '';
    }
}

export default FunctionDoc;

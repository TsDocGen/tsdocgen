import { MethodDeclaration, MethodDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_METHOD_DOC')
class MethodDoc extends Doc<MethodDeclaration, MethodDeclarationStructure> {
    public isStatic: boolean;
    public scope: string;

    constructor(node: MethodDeclaration) {
        super(node);

        this.isStatic = node.isStatic();
        this.scope = node.getScope();
    }

    public override toString() {
        return '';
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            returnType: this.getReturnType(),
            isStatic: this.isStatic,
            hasQuestionToken: this.structure?.hasQuestionToken,
            hasOverrideKeyword: this.structure?.hasOverrideKeyword,
            scope: this.scope,
        }
    }
}

export default MethodDoc;

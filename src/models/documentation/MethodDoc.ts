import { MethodDeclaration, MethodDeclarationStructure, MethodSignature, MethodSignatureStructure, Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_METHOD_DOC')
class MethodDoc extends Doc<"method", MethodDeclaration | MethodSignature, MethodDeclarationStructure | MethodSignatureStructure> {
    public isStatic: boolean;
    public scope: string;

    constructor(node: MethodDeclaration | MethodSignature) {
        super(node, "method");

        this.isStatic = Node.isMethodDeclaration(node) ? node.isStatic(): false;
        this.scope = Node.isMethodDeclaration(node) ? node.getScope() : '';
    }

    public override toString() {
        return '';
    }

    public override toJSON() {
        const base = {
            ...super.toJSON(),
            returnType: this.getReturnType(),
            isStatic: this.isStatic,
            hasQuestionToken: this.structure?.hasQuestionToken,
            scope: this.scope,
        }

        return base;
        
    }
}

export default MethodDoc;

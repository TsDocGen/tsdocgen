import { MethodDeclaration, MethodDeclarationStructure, MethodSignature, MethodSignatureStructure, Node, PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { AbstractDocJSON } from "../../types/tsdocgen";
import getParameters from "../../utils/getParameters";
import AbstractDoc from "./AbstractDoc";
import ParameterDoc from "./ParameterDoc";

export interface MethodDocJSON extends AbstractDocJSON<"method"> {
    returnType: string;
    isStatic: boolean;
    hasQuestionToken?: boolean;
    scope: string;
}

@EmitDocEvent('CREATE_METHOD_DOC')
class MethodDoc extends AbstractDoc<"method", MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature, MethodDeclarationStructure | MethodSignatureStructure | PropertyDeclarationStructure | PropertySignatureStructure> {
    public isStatic: boolean;
    public scope: string;
    public parameters: ParameterDoc[];

    constructor(node: MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature, checker: TypeChecker) {
        super(node, "method", checker);

        this.isStatic = Node.isMethodDeclaration(node) || Node.isPropertyDeclaration(node) ? node.isStatic() : false;
        this.scope = Node.isMethodDeclaration(node) || Node.isPropertyDeclaration(node) ? node.getScope() : '';
        this.parameters = getParameters(node, checker);
    }

    public override toString() {
        return '';
    }

    public override toJSON(): MethodDocJSON {
        const base = {
            ...super.toJSON(),
            returnType: this.getReturnType(),
            isStatic: this.isStatic,
            hasQuestionToken: this.structure?.hasQuestionToken,
            scope: this.scope,
            parameters: this.parameters.map((signature) => signature.toJSON()),
        }

        return base;

    }
}

export default MethodDoc;

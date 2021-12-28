import { MethodDeclaration, MethodDeclarationStructure, MethodSignature, MethodSignatureStructure, Node, PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { BaseDocJSON } from "../../types/tsdocgen";
import BaseDoc from "./BaseDoc";
import ParameterDoc, { ParameterDocJSON } from "./ParameterDoc";
import type TsDocGenContext from '../context';
import AddParameterDocs from "../../decorators/AddParameterDocs";

export interface MethodDocJSON extends BaseDocJSON<"method"> {
    returnType: string;
    hasQuestionToken?: boolean;
    scope: string;
    parameters: ParameterDocJSON[];
}

@AddParameterDocs
@EmitDocEvent('CREATE_METHOD_DOC')
class MethodDoc extends BaseDoc<"method", MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature, MethodDeclarationStructure | MethodSignatureStructure | PropertyDeclarationStructure | PropertySignatureStructure> {
    public scope: string;
    public parameters!: ParameterDoc[];

    constructor(node: MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature, context: TsDocGenContext) {
        super(node, "method", context);

        this.scope = this.getScope();
    }
    
    public getScope() {
        return Node.isMethodDeclaration(this.node) || Node.isPropertyDeclaration(this.node) ? this.node.getScope() : '';
    }

    public override toString() {
        return '';
    }

    public override toJSON(): MethodDocJSON {
        const base = {
            ...super.toJSON(),
            returnType: this.getReturnType(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            scope: this.scope,
        }

        return base as MethodDocJSON;

    }
}

export default MethodDoc;

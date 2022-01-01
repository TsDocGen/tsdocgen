import { ParameterDeclaration, ParameterDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import BaseDoc from "./BaseDoc";
import type TsDocGenContext from '../context';
import { BaseDocJSON } from "../..";
import type FunctionDoc from './FunctionDoc';
import type MethodDoc from './MethodDoc';
import type ConstructorDoc from './ConstructorDoc';

export interface ParameterDocJSON extends BaseDocJSON<"parameter"> {
    hasOverrideKeyword?: boolean;
    hasQuestionToken?: boolean;
    isReadonly?: boolean;
    scope?: string;
}

@EmitDocEvent('CREATE_PARAMETER_DOC')
class ParameterDoc extends BaseDoc<"parameter",ParameterDeclaration, ParameterDeclarationStructure, FunctionDoc | MethodDoc | ConstructorDoc> {

    constructor(node: ParameterDeclaration, context: TsDocGenContext, sourceFileRelativePath: string, parent: FunctionDoc | MethodDoc | ConstructorDoc) {
        super(node, "parameter", context, sourceFileRelativePath, parent);
    }

    public override toJSON(): ParameterDocJSON {
        const { hasOverrideKeyword, hasQuestionToken, isReadonly, scope } = this.structure || {};

        return {
            ...super.toJSON(),
            hasOverrideKeyword,
            hasQuestionToken,
            isReadonly,
            scope,
        }
    }

    public override toString() {
        return '';
    }
}

export default ParameterDoc;

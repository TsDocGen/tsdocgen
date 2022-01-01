import { TypeParameterDeclaration, TypeParameterDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import BaseDoc from "./BaseDoc";
import type TsDocGenContext from '../context';
import { BaseDocJSON } from "../..";

export interface TypeParameterDocJSON extends BaseDocJSON<"type-parameter"> {
    constraint?: string;
    default?: string;
}

@EmitDocEvent('CREATE_TYPE_PARAMETER_DOC')
class TypeParameterDoc extends BaseDoc<"type-parameter", TypeParameterDeclaration, TypeParameterDeclarationStructure> {

    constructor(node: TypeParameterDeclaration, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "type-parameter", context, sourceFileRelativePath);
    }

    public override toJSON(): TypeParameterDocJSON {
        return {
            ...super.toJSON(),
            constraint: this.getConstraint(),
            default: this.getDefault()
        }
    }

    public getConstraint() {
        if (typeof this.structure?.constraint === 'string') {
            return this.structure?.constraint;
        }
        else {
            return undefined;
        }
    }

    public getDefault() {
        if (typeof this.structure?.default === 'string') {
            return this.structure?.default;
        }
        else {
            return undefined;
        }
    }

    public override toString() {
        return '';
    }
}

export default TypeParameterDoc;

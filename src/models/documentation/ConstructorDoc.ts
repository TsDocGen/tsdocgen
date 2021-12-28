import { ConstructorDeclaration, ConstructorDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { BaseDocJSON } from "../../types/tsdocgen";
import getParameters from "../../utils/getParameters";
import type TsDocGenContext from '../context';
import BaseDoc from "./BaseDoc";
import type ClassDoc from "./ClassDoc";
import ParameterDoc from "./ParameterDoc";

export interface ConstructorDocJSON extends BaseDocJSON<"constructor"> {
    returnType: string;
    parameters: ReturnType<ParameterDoc['toJSON']>[]
}

@EmitDocEvent('CREATE_CONSTRUCTOR_DOC')
class ConstructorDoc extends BaseDoc<"constructor", ConstructorDeclaration , ConstructorDeclarationStructure, ClassDoc> {
    public parameters: ParameterDoc[] = [];

    constructor(node: ConstructorDeclaration, context: TsDocGenContext, parent: ClassDoc) {
        super(node, "constructor", context, parent);

        this.name = "constructor";
        this.parameters = getParameters(this.node, this.context, this.parent?.tags || [], this);

        // Effects
        this.setDescription(this.parent?.description || '');
    }

    public override toJSON(): ConstructorDocJSON {
        return {
            ...super.toJSON(),
            returnType: this.getReturnType(),
            parameters: this.parameters.map((parameter: ParameterDoc) => parameter.toJSON()),
        }
    }

    public override toString() {
        return '';
    }
}

export default ConstructorDoc;

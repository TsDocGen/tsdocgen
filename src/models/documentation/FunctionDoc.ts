import { FunctionDeclaration, FunctionDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";
import type TsDocGenContext from '../context';
import AddTypeParameterDocs from "../../decorators/AddTypeParameterDocs";
import TypeParameterDoc, { TypeParameterDocJSON } from "./TypeParameterDoc";
import AddParameterDocs from "../../decorators/AddParameterDocs";
import ParameterDoc, { ParameterDocJSON } from "./ParameterDoc";

export interface FunctionDocJSON extends DocJSON<"function"> {
    isAsync: boolean;
    isGenerator: boolean;
    returnType: string;
    overloads: FunctionDocJSON[];
    typeParameters: TypeParameterDocJSON[];
    parameters: ParameterDocJSON[]
}

@AddParameterDocs
@AddTypeParameterDocs
@EmitDocEvent('CREATE_FUNCTION_DOC')
class FunctionDoc extends Doc<"function", FunctionDeclaration , FunctionDeclarationStructure> {
    public isAsync: boolean;
    public isGenerator: boolean;
    public overloads: FunctionDoc[];
    public typeParameters!: TypeParameterDoc[];
    public parameters!: ParameterDoc[];

    constructor(node: FunctionDeclaration, context: TsDocGenContext) {
        super(node, "function", context);

        this.isAsync = this.node.isAsync();
        this.isGenerator = this.node.isGenerator();
        this.overloads = this.getOverloads();
    }

    public override toJSON(): FunctionDocJSON {
        return {
            ...super.toJSON(),
            isAsync: this.isAsync,
            isGenerator: this.isGenerator,
            returnType: this.getReturnType(),
            overloads: this.overloads.map((overload) => overload.toJSON()),
        } as FunctionDocJSON
    }

    public override toString() {
        return '';
    }

    private getOverloads() {
        return this.node.getOverloads().map((overload) => {
            return new FunctionDoc(overload, this.context);
        })
    }
}

export default FunctionDoc;

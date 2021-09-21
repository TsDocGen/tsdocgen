import { FunctionDeclaration, FunctionDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";

export interface FunctionDocJSON extends DocJSON<"function"> {
    isAsync: boolean;
    isGenerator: boolean;
    returnType: string;
    overloads: FunctionDocJSON[],
    isExported?: boolean;
}

@EmitDocEvent('CREATE_FUNCTION_DOC')
class FunctionDoc extends Doc<"function",FunctionDeclaration, FunctionDeclarationStructure> {

    public isAsync: boolean;
    public isGenerator: boolean;
    public overloads: FunctionDoc[];

    constructor(node: FunctionDeclaration) {
        super(node, "function");

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
            isExported: this.structure?.isExported
        }
    }

    public override toString() {
        return '';
    }

    private getOverloads() {
        return this.node.getOverloads().map((overload) => {
            return new FunctionDoc(overload);
        })
    }
}

export default FunctionDoc;

import { Node, PropertyDeclaration, PropertyDeclarationStructure, PropertySignature, PropertySignatureStructure, ts } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import BaseDoc from "./BaseDoc";
import MethodDoc from "./MethodDoc";
import type TsDocGenContext from '../context';
import { BaseDocJSON } from "../../types/tsdocgen";

export interface PropertyDocJSON extends BaseDocJSON<"property"> {
    hasQuestionToken?: boolean;
    isReadonly?: boolean;
    returnType?: string;
    scope?: string;
}

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends BaseDoc<
    "property",
    PropertyDeclaration | PropertySignature, 
    PropertyDeclarationStructure | PropertySignatureStructure
    > {
    public isArrowFunction: boolean;
    public scope: string | undefined;

    constructor(node: PropertyDeclaration | PropertySignature, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "property", context, sourceFileRelativePath);

        this.isArrowFunction = this.checkIfArrowFunction();

        if (Node.isPropertyDeclaration(node)) {
            this.scope = node.getScope()
        }
    }

    public convertToMethodDoc() {
        return new MethodDoc(this.node, this.context, this.sourceFileRelativePath)
    }

    public override toJSON(): PropertyDocJSON {
        return {
            ...super.toJSON(),
            hasQuestionToken: this.structure?.hasQuestionToken,
            isReadonly: this.structure?.isReadonly,
            returnType: this.getReturnType(),
            scope: this.scope
        }
    }

    private checkIfArrowFunction() {
        const initializer = this.node.getInitializer();

        if (initializer) {
            return ts.isArrowFunction(initializer.compilerNode);
        }

        return false;
    }
}

export default PropertyDoc;

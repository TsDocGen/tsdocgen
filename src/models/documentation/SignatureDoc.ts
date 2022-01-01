import { CallSignatureDeclaration, IndexSignatureDeclaration, ConstructSignatureDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import BaseDoc from "./BaseDoc";
import type TsDocGenContext from '../context';
import { BaseDocJSON } from "../../types/tsdocgen";

type Signature = CallSignatureDeclaration | IndexSignatureDeclaration | ConstructSignatureDeclaration;

export interface SignatureDocJSON extends BaseDocJSON<"signature"> {}

@EmitDocEvent('CREATE_SIGNATURE_DOC')
class SignatureDoc extends BaseDoc<"signature", Signature> {

    constructor(node: Signature, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "signature", context, sourceFileRelativePath);
    }

    public override toString() {
        return '';
    }

    public override toJSON(): SignatureDocJSON {
        return {
            ...super.toJSON()
        }
    }
}

export default SignatureDoc;

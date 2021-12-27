import { CallSignatureDeclaration, IndexSignatureDeclaration, ConstructSignatureDeclaration, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";

type Signature = CallSignatureDeclaration | IndexSignatureDeclaration | ConstructSignatureDeclaration;

@EmitDocEvent('CREATE_SIGNATURE_DOC')
class SignatureDoc extends AbstractDoc<"signature", Signature> {

    constructor(node: Signature, checker: TypeChecker) {
        super(node, "signature", checker);
    }

    public override toString() {
        return '';
    }
}

export default SignatureDoc;

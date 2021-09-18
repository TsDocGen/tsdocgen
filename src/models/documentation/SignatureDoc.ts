import { CallSignatureDeclaration, IndexSignatureDeclaration, ConstructSignatureDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

type Signature = CallSignatureDeclaration | IndexSignatureDeclaration | ConstructSignatureDeclaration;

@EmitDocEvent('CREATE_SIGNATURE_DOC')
class SignatureDoc extends Doc<Signature> {

    constructor(node: Signature) {
        super(node);
    }

    public override toString = () => {
        return '';
    }
}

export default SignatureDoc;

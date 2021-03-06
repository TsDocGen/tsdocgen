import { InterfaceDeclaration, InterfaceDeclarationStructure, Node } from "ts-morph";
import AddPropertiesDocs from "../../decorators/AddPropertiesDocs";
import AddTypeParameterDocs from "../../decorators/AddTypeParameterDocs";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import notEmpty from "../../utils/notEmpty";
import ClassDoc, { ClassDocJSON } from "./ClassDoc";
import Doc, { DocJSON } from "./Doc";
import MethodDoc, { MethodDocJSON } from "./MethodDoc";
import PropertyDoc, { PropertyDocJSON } from "./PropertyDoc";
import TypeAliasDoc, { TypeAliasDocJSON } from "./TypeAliasDoc";
import TypeParameterDoc, { TypeParameterDocJSON } from "./TypeParameterDoc";
import type TsDocGenContext from '../context';
import AddSignatureDocs from "../../decorators/AddSignatureDocs";
import SignatureDoc, { SignatureDocJSON } from "./SignatureDoc";

type BaseDeclarations = InterfaceDoc | TypeAliasDoc | ClassDoc;
type BaseDeclarationsJSON = InterfaceDocJSON | TypeAliasDocJSON | ClassDocJSON;

export interface InterfaceDocJSON extends DocJSON<"interface"> {
    extends: InterfaceDeclarationStructure['extends'];
    baseDeclarations: BaseDeclarationsJSON[];
    signatures: SignatureDocJSON[];
    hasDeclareKeyword?: boolean;
    methods: MethodDocJSON[];
    properties: PropertyDocJSON[];
    typeParameters: TypeParameterDocJSON[];
}

@AddPropertiesDocs
@AddTypeParameterDocs
@AddSignatureDocs
@EmitDocEvent('CREATE_INTERFACE_DOC')
class InterfaceDoc extends Doc<"interface",InterfaceDeclaration, InterfaceDeclarationStructure> {

    private baseDeclarations: BaseDeclarations[];
    public methods: MethodDoc[] = [];
    public properties!: PropertyDoc[];
    public signatures!: SignatureDoc[];
    public typeParameters!: TypeParameterDoc[];

    constructor(node: InterfaceDeclaration, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "interface", context, sourceFileRelativePath);

        this.baseDeclarations = this.getBaseDeclarations();
        this.methods = [...this.methods, ...this.getMethods()];
    }

    public override toString() {
        return '';
    }

    public override toJSON(): InterfaceDocJSON {
        return {
            ...super.toJSON(),
            extends: this.structure?.extends,
            hasDeclareKeyword: this.structure?.hasDeclareKeyword,
            baseDeclarations: this.baseDeclarations.map((baseDeclaration) => baseDeclaration.toJSON()),
            signatures: this.signatures.map((signature) => signature.toJSON()),
            methods: this.methods.map((method) => method.toJSON()),
        } as InterfaceDocJSON
    }

    private getBaseDeclarations() {
        return this.node.getBaseDeclarations().map((declaration) => {
            if (Node.isTypeAliasDeclaration(declaration)) return new TypeAliasDoc(declaration, this.context, this.sourceFileRelativePath);
            else if (Node.isClassDeclaration(declaration)) return new ClassDoc(declaration, this.context, this.sourceFileRelativePath);
            else if (Node.isInterfaceDeclaration(declaration)) return new InterfaceDoc(declaration, this.context, this. sourceFileRelativePath);
            else return null
        }).filter(notEmpty);
    }

    private getMethods() {
        return this.node.getMethods().map((method) => {
            return new MethodDoc(method, this.context, this.sourceFileRelativePath);
        });
    }
}

export default InterfaceDoc;

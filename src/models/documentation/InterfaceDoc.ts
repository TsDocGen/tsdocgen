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

type BaseDeclarations = InterfaceDoc | TypeAliasDoc | ClassDoc;
type BaseDeclarationsJSON = InterfaceDocJSON | TypeAliasDocJSON | ClassDocJSON;

export interface InterfaceDocJSON extends DocJSON<"interface"> {
    extends: InterfaceDeclarationStructure['extends'],
    baseDeclarations: BaseDeclarationsJSON[]
    hasDeclareKeyword?: boolean;
    methods: MethodDocJSON[];
    properties: PropertyDocJSON[];
    typeParameters: TypeParameterDocJSON[];
}

@AddPropertiesDocs
@AddTypeParameterDocs
@EmitDocEvent('CREATE_INTERFACE_DOC')
class InterfaceDoc extends Doc<"interface",InterfaceDeclaration, InterfaceDeclarationStructure> {

    private baseDeclarations: BaseDeclarations[];
    public methods!: MethodDoc[];
    public properties!: PropertyDoc[];
    public typeParameters!: TypeParameterDoc[];

    constructor(node: InterfaceDeclaration, context: TsDocGenContext) {
        super(node, "interface", context);

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
            methods: this.methods.map((method) => method.toJSON()),
        } as InterfaceDocJSON
    }

    private getBaseDeclarations() {
        return this.node.getBaseDeclarations().map((declaration) => {
            if (Node.isTypeAliasDeclaration(declaration)) return new TypeAliasDoc(declaration, this.context);
            else if (Node.isClassDeclaration(declaration)) return new ClassDoc(declaration, this.context);
            else if (Node.isInterfaceDeclaration(declaration)) return new InterfaceDoc(declaration, this.context);
            else return null
        }).filter(notEmpty);
    }

    private getMethods() {
        return this.node.getMethods().map((method) => {
            return new MethodDoc(method, this.context);
        });
    }
}

export default InterfaceDoc;

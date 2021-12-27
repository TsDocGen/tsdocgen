import { InterfaceDeclaration, InterfaceDeclarationStructure, Node, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import notEmpty from "../../utils/notEmpty";
import ClassDoc from "./ClassDoc";
import Doc, { DocJSON } from "./Doc";
import MethodDoc from "./MethodDoc";
import PropertyDoc from "./PropertyDoc";
import TypeAliasDoc from "./TypeAliasDoc";

type BaseDeclarationsToJSON = ReturnType<InterfaceDoc['toJSON']> | ReturnType<TypeAliasDoc['toJSON']> | ReturnType<ClassDoc['toJSON']>;

type InterfaceDocJSON = DocJSON<"interface"> & {
    extends: InterfaceDeclarationStructure['extends'],
    baseDeclarations: BaseDeclarationsToJSON[]
} & Pick<InterfaceDeclarationStructure, 'extends' | 'isDefaultExport' | 'isExported' | 'hasDeclareKeyword'>

@EmitDocEvent('CREATE_INTERFACE_DOC')
class InterfaceDoc extends Doc<"interface",InterfaceDeclaration, InterfaceDeclarationStructure> {

    private baseDeclarations: (InterfaceDoc | TypeAliasDoc | ClassDoc)[];
    public methods!: MethodDoc[];

    constructor(node: InterfaceDeclaration, checker: TypeChecker) {
        super(node, "interface", checker);

        this.baseDeclarations = this.getBaseDeclarations();
        this.properties = this.getProperties();
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
        }
    }

    private getBaseDeclarations() {
        return this.node.getBaseDeclarations().map((declaration) => {
            if (Node.isTypeAliasDeclaration(declaration)) return new TypeAliasDoc(declaration, this.checker);
            else if (Node.isClassDeclaration(declaration)) return new ClassDoc(declaration, this.checker);
            else if (Node.isInterfaceDeclaration(declaration)) return new InterfaceDoc(declaration, this.checker);
            else return null
        }).filter(notEmpty);
    }

    private getProperties() {
        return this.node.getProperties().map((property) => {
            return new PropertyDoc(property, this.checker);
        });
    }

    private getMethods() {
        return this.node.getMethods().map((method) => {
            return new MethodDoc(method, this.checker);
        });
    }
}

export default InterfaceDoc;

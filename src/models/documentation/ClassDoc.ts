import { ClassDeclaration, ClassDeclarationStructure, TypeChecker } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";
import MethodDoc from "./MethodDoc";

@EmitDocEvent('CREATE_CLASS_DOC')
class ClassDoc extends Doc<"class",ClassDeclaration, ClassDeclarationStructure> {
    public methods!: MethodDoc[];
    public isAbstract: boolean;
    public extends: string | undefined;

    constructor(node: ClassDeclaration, checker: TypeChecker) {
        super(node, "class", checker);

        // Variables
        this.isAbstract = this.node.isAbstract();
        this.methods = [...this.methods, ...this.getInstanceMethods(), ...this.getStaticMethods()];
        this.extends = this.node.getBaseClass()?.getName();
    } 

    private getStaticMethods = () => {
        return this.node.getStaticMethods().map((staticMethod) => {
            return new MethodDoc(staticMethod, this.checker);
        });
    }

    private getInstanceMethods = () => {
        return this.node.getInstanceMethods().map((instanceMethod) => {
            return new MethodDoc(instanceMethod, this.checker);
        });
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            extends: this.extends,
            isAbstract: this.isAbstract,
            methods: this.methods.map((method) => method.toJSON()),
        }
    }
}

export default ClassDoc;

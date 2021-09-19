import { ClassDeclaration, ClassDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";
import MethodDoc from "./MethodDoc";

@EmitDocEvent('CREATE_CLASS_DOC')
class ClassDoc extends Doc<ClassDeclaration, ClassDeclarationStructure> {
    public instanceMethods: MethodDoc[];
    public staticMethods: MethodDoc[];
    public isAbstract: boolean;
    public extends: string | undefined;

    constructor(node: ClassDeclaration) {
        super(node);

        // Variables
        this.isAbstract = this.node.isAbstract();
        this.instanceMethods = this.getInstanceMethods();
        this.staticMethods = this.getStaticMethods();
        this.extends = this.node.getBaseClass()?.getName();
    } 

    private getStaticMethods = () => {
        return this.node.getStaticMethods().map((instanceMethod) => {
            return new MethodDoc(instanceMethod);
        });
    }

    private getInstanceMethods = () => {
        return this.node.getInstanceMethods().map((instanceMethod) => {
            return new MethodDoc(instanceMethod);
        });
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            extends: this.extends,
            isAbstract: this.isAbstract,
            instanceMethods: this.instanceMethods.map((instanceMethod) => instanceMethod.toJSON()),
            staticMethods: this.staticMethods.map((staticMethod) => staticMethod.toJSON()),
        }
    }
}

export default ClassDoc;

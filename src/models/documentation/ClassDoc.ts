import { ClassDeclaration } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";
import MethodDoc from "./MethodDoc";
import PropertyDoc from "./PropertyDoc";

@EmitDocEvent('CREATE_CLASS_DOC')
class ClassDoc extends Doc<ClassDeclaration> {
    public properties: PropertyDoc[];
    public instanceMethods: MethodDoc[];
    public staticMethods: MethodDoc[];
    public isAbstract: boolean;

    constructor(node: ClassDeclaration) {
        super(node);

        // Variables
        this.properties = this.getProperties();
        this.isAbstract = this.node.isAbstract();
        this.instanceMethods = this.getInstanceMethods();
        this.staticMethods = this.getStaticMethods();
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

    private getProperties = () => {
        return this.node.getProperties().map((propertyDeclaration) => {
            return new PropertyDoc(propertyDeclaration);
        });
    }

    public override toJSON = () => {
        return {
            ...super.toJSON(),
            properties: this.properties.map((property) => property.toJSON()),
        }
    }
}

export default ClassDoc;

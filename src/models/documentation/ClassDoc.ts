import { ClassDeclaration, ClassDeclarationStructure } from "ts-morph";
import AddPropertiesDocs from "../../decorators/AddPropertiesDocs";
import AddTypeParameterDocs from "../../decorators/AddTypeParameterDocs";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";
import MethodDoc, { MethodDocJSON } from "./MethodDoc";
import PropertyDoc, { PropertyDocJSON } from "./PropertyDoc";
import TypeParameterDoc, { TypeParameterDocJSON } from "./TypeParameterDoc";
import type TsDocGenContext from '../context';
import AddConstructorDocs from "../../decorators/AddConstructorDocs";
import ConstructorDoc, { ConstructorDocJSON } from "./ConstructorDoc";

export interface ClassDocJSON extends DocJSON<"class"> {
    extends: string | undefined;
    isAbstract: boolean;
    methods: MethodDocJSON[];
    properties: PropertyDocJSON[];
    typeParameters: TypeParameterDocJSON[];
    constructors: ConstructorDocJSON[];
}

@AddConstructorDocs
@AddPropertiesDocs
@AddTypeParameterDocs
@EmitDocEvent('CREATE_CLASS_DOC')
class ClassDoc extends Doc<"class",ClassDeclaration, ClassDeclarationStructure> {
    public methods: MethodDoc[] = [];
    public isAbstract: boolean;
    public extends: string | undefined;
    public properties!: PropertyDoc[];
    public typeParameters!: TypeParameterDoc[];
    public constructors!: ConstructorDoc[];
    
    constructor(node: ClassDeclaration, context: TsDocGenContext) {
        super(node, "class", context);

        // Variables
        this.isAbstract = this.node.isAbstract();
        this.methods = [...this.methods, ...this.getInstanceMethods(), ...this.getStaticMethods()];
        this.extends = this.node.getBaseClass()?.getName();
    } 

    private getStaticMethods = () => {
        return this.node.getStaticMethods().map((staticMethod) => {
            return new MethodDoc(staticMethod, this.context);
        });
    }

    private getInstanceMethods = () => {
        return this.node.getInstanceMethods().map((instanceMethod) => {
            return new MethodDoc(instanceMethod, this.context);
        });
    }

    public override toJSON(): ClassDocJSON {
        return {
            ...super.toJSON(),
            extends: this.extends,
            isAbstract: this.isAbstract,
            methods: this.methods.map((method) => method.toJSON()),
        } as ClassDocJSON
    }
}

export default ClassDoc;

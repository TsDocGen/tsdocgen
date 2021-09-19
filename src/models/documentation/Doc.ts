import { Structure, Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import AbstractDoc from "./AbstractDoc";
import ParameterDoc from "./ParameterDoc";
import PropertyDoc from "./PropertyDoc";
import SignatureDoc from "./SignatureDoc";
import TypeParameterDoc from "./TypeParameterDoc";

/**
 * The base representation for all documentation nodes.
 */
@EmitDocEvent('CREATE_DOC')
class Doc<N extends Node, S extends Structure = Structure> extends AbstractDoc<N, S> {
    public signatures: SignatureDoc[];
    public typeParameters: TypeParameterDoc[];
    public parameters: ParameterDoc[];
    public properties: PropertyDoc[];

    constructor(node: N) {
        super(node);

        // Variables
        this.signatures = this.getSignatures();
        this.typeParameters = this.getTypeParameters();
        this.parameters = this.getParameters();
        this.properties = this.getProperties();
    }

    // Public Methods
    public override toJSON() {
        return {
            ...super.toJSON(),
            signatures: this.signatures.map((signature) => signature.toJSON()),
            typeParameters: this.typeParameters.map((typeParameter) => typeParameter.toJSON()),
            parameters: this.parameters.map((parameter) => parameter.toJSON()),
            properties: this.properties.map((property) => property.toJSON()),
        }
    }

    // Protected Methods

    protected getProperties() {
        if (Node.isTypedNode(this.node)) {
            const type = this.node.getTypeNode();

            if (Node.isTypeLiteralNode(type)) {
                return type.getProperties().map((property) => {
                    return new PropertyDoc(property)
                });
            }

            return [];
        }

        if (Node.isTypeElementMemberedNode(this.node)) {
            return this.node.getProperties().map((property) => {
                return new PropertyDoc(property)
            });
        }

        if (Node.isClassLikeDeclarationBase(this.node)) {
            return this.node.getProperties().map((property) => {
                return new PropertyDoc(property)
            });
        }

        return [];
    }

    // Private Methods

    private getParameters = () => {
        if (Node.isParameteredNode(this.node)) {
            return this.node.getParameters().map((parameter) => {
                return new ParameterDoc(parameter)
            });
        }
        return [];
    }

    private getTypeParameters = () => {
        if (Node.isTypeParameteredNode(this.node)) {
            return this.node.getTypeParameters().map((typeParameter) => {
                return new TypeParameterDoc(typeParameter)
            });
        }
        return [];
    }

    /**
     * Gets the call, index or construct signatures
     */
    private getSignatures = () => {
        if (Node.isTypeElementMemberedNode(this.node)) {
            const signatures = [
                ...this.node.getCallSignatures(), 
                ...this.node.getIndexSignatures(), 
                ...this.node.getConstructSignatures()
            ];
            return signatures.map((signature) => {
                return new SignatureDoc(signature);
            });
        }

        return [];
    }
}

export default Doc;

import { PropertyDeclaration, PropertySignature } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_PROPERTY_DOC')
class PropertyDoc extends Doc<PropertyDeclaration | PropertySignature> {
    constructor(node: PropertyDeclaration | PropertySignature) {
        super(node);
    }
}

export default PropertyDoc;

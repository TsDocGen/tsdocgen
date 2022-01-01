import { EnumDeclaration, EnumDeclarationStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";
import type TsDocGenContext from '../context';

export interface EnumDocJSON extends DocJSON<"enum"> {}

@EmitDocEvent('CREATE_ENUM_DOC')
class EnumDoc extends Doc<"enum",EnumDeclaration, EnumDeclarationStructure> {

    constructor(node: EnumDeclaration, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "enum", context, sourceFileRelativePath);
    }

    public override toString() {
        return '';
    }

    public override toJSON(): EnumDocJSON {
        return {
            ...super.toJSON()
        }
    }
}

export default EnumDoc;

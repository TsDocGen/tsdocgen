import { SyntaxKind, VariableDeclaration, VariableDeclarationStructure, VariableStatement, VariableStatementStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc, { DocJSON } from "./Doc";
import type TsDocGenContext from '../context';

export interface VariableDocJSON extends DocJSON<"variable"> {
    hasExclamationToken?: boolean;
    returnType?: string;
    exportKeyword?: string;
    values: VariableDocJSON[]
}

@EmitDocEvent('CREATE_VARIABLE_DOC')
class VariableDoc extends Doc<"variable", VariableDeclaration, VariableDeclarationStructure> {

    private statement: VariableStatement | undefined;
    private statementStructure: VariableStatementStructure | undefined;
    private values: VariableDoc[];

    constructor(node: VariableDeclaration, context: TsDocGenContext, sourceFileRelativePath: string) {
        super(node, "variable", context, sourceFileRelativePath);

        this.statement = this.node.getVariableStatement();
        this.statementStructure = this.statement?.getStructure();
        this.values = this.getValues();

        this.statementStructure;

    }

    public override toString() {
        return '';
    }

    public override toJSON(): VariableDocJSON {
        return {
            ...super.toJSON(),
            hasExclamationToken: this.structure?.hasExclamationToken,
            returnType: this.getReturnType(),
            isDefaultExport: this.node.isDefaultExport(),
            isExported: this.node.isExported(),
            exportKeyword: this.node.getExportKeyword()?.getText(),
            values: this.values.map((value) => value.toJSON())
        }
    }

    private getValues() {
        const list = this.node.getChildrenOfKind(SyntaxKind.VariableDeclarationList)[0];

        if (list) {
            return list.getChildrenOfKind(SyntaxKind.VariableDeclaration).map((variableDeclaration) => {
                return new VariableDoc(variableDeclaration, this.context, this.sourceFileRelativePath);
            });
        }
        
        return [];
    }
}

export default VariableDoc;

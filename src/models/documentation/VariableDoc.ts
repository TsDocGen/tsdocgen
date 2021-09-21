import { SyntaxKind, VariableDeclaration, VariableDeclarationStructure, VariableStatement, VariableStatementStructure } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import Doc from "./Doc";

@EmitDocEvent('CREATE_VARIABLE_DOC')
class VariableDoc extends Doc<"variable", VariableDeclaration, VariableDeclarationStructure> {

    private statement: VariableStatement | undefined;
    private statementStructure: VariableStatementStructure | undefined;
    private values: VariableDoc[];

    constructor(node: VariableDeclaration) {
        super(node, "variable");

        this.statement = this.node.getVariableStatement();
        this.statementStructure = this.statement?.getStructure();
        this.values = this.getValues();

        this.statementStructure;
        this.values;
    }

    public override toString() {
        return '';
    }

    public override toJSON() {
        return {
            ...super.toJSON(),
            hasExclamationToken: this.structure?.hasExclamationToken,
            returnType: this.getReturnType(),
            isDefaultExport: this.node.isDefaultExport(),
            isExported: this.node.isExported(),
            exportKeyword: this.node.getExportKeyword()?.getText(),
        }
    }

    private getValues() {
        const list = this.node.getChildrenOfKind(SyntaxKind.VariableDeclarationList)[0];

        if (list) {
            return list.getChildrenOfKind(SyntaxKind.VariableDeclaration).map((variableDeclaration) => {
                return new VariableDoc(variableDeclaration);
            });
        }
        
        return [];
    }
}

export default VariableDoc;

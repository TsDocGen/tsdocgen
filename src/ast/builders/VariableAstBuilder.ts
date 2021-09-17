import type { VariableDeclaration, VariableDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class VariableAstBuilder extends AstBuilder<'Variable', VariableDeclarationStructure> {
    constructor(node: VariableDeclaration) {
        super(node, 'Variable');
    }
}

export default VariableAstBuilder;
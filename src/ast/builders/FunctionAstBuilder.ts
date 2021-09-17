import type { FunctionDeclaration, FunctionDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class FunctionAstBuilder extends AstBuilder<'Function', FunctionDeclarationStructure> {
    constructor(node: FunctionDeclaration) {
        super(node, 'Function');
    }

    override get fallbackName() {
        return '[[UnnamedFunction]]';
    }
}

export default FunctionAstBuilder;
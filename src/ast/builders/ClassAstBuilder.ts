import type { ClassDeclaration, ClassDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class ClassAstBuilder extends AstBuilder<'Class', ClassDeclarationStructure> {
    constructor(node: ClassDeclaration) {
        super(node, 'Class');
    }

    override get fallbackName() {
        return '[[UnnamedClass]]';
    }
}

export default ClassAstBuilder;
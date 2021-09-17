import type { EnumDeclaration, EnumDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class EnumAstBuilder extends AstBuilder<'Enum', EnumDeclarationStructure> {
    constructor(node: EnumDeclaration) {
        super(node, 'Enum');
    }
}

export default EnumAstBuilder;
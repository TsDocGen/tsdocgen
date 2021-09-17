import type { InterfaceDeclaration, InterfaceDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class InterfaceAstBuilder extends AstBuilder<'Interface', InterfaceDeclarationStructure> {
    constructor(node: InterfaceDeclaration) {
        super(node, 'Interface');
    }
}

export default InterfaceAstBuilder;
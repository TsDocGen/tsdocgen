import type { Node } from 'ts-morph';
import AstBuilder from '../builder';

class UnknownAstBuilder extends AstBuilder<string> {
    constructor(node: Node) {
        super(node, 'unknown::' + node.getKindName());
    }
}

export default UnknownAstBuilder;
import { TypeAliasDeclaration, TypeAliasDeclarationStructure } from 'ts-morph';
import AstBuilder from '../builder';

class TypeAstBuilder extends AstBuilder<'Type', TypeAliasDeclarationStructure> {
    constructor(node: TypeAliasDeclaration) {
        super(node, 'Type');

        this.node.getChildren()
        // console.log(ts.jsdoc(node as any));
        
        // const sourceFile = this.node.getSourceFile();
        // const sourceFullText = sourceFile.getFullText();

        // const commentRanges = ts.getLeadingCommentRanges(
        //     sourceFullText,
        //     node.getFullStart()) ?? [];

        // console.log(this.docs);

        // console.log(sourceFullText.slice(commentRanges[0].pos, commentRanges[0].end));

        // // console.log(this.node.forEachChild((child) => {

        // //     console.log(child.getType().getText());

        // //     // if (child.getKind() === SyntaxKind.TypeLiteral) {
        // //     // }
        // //     // console.log(SyntaxKind[child.getKind()]);
        // // }));

        // this.node.getType().getProperties().forEach((property) => {
        //     const declaration = property.getValueDeclaration();
        //     const kind = declaration?.getKind();

        //     console.log(kind);

        //     // if (kind === SyntaxKind.PropertyDeclaration) {
        //     //     console.log(declaration);
        //     //     console.log((declaration as PropertyDeclaration).getJsDocs()[0]);
        //     //     console.log('\n\n\n\n\n\n');
        //     // }

        //     // if (declaration?.getKind() === SyntaxKind.MethodDeclaration) {
        //     //     console.log((declaration as MethodDeclaration).getJsDocs()[0]);
        //     //     console.log('\n\n\n\n\n\n');
        //     // }
        // });
    }
}

export default TypeAstBuilder;
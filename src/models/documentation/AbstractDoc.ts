import { parse } from "comment-parser";
import { JSDoc, Structure, Node, TypeFormatFlags, SyntaxKind } from "ts-morph";
import { AbstractDocJSON, TsDocGenDoc } from "../../types/tsdocgen";
import isNodeWithStructure from "../../utils/isNodeWithStructure";

/**
 * The base representation for all documentation nodes.
 */
class AbstractDoc<T extends string, N extends Node, S extends Structure = Structure> {
    public description!: string;
    public tags!: TsDocGenDoc['tags'];
    public node: N;
    public name: string;
    public kind: string;
    public structure: S | null;
    public type: T;
    public isDefaultExport: boolean;

    constructor(node: N, type: T) {
        // Variables
        this.node = node;
        this.name = this.getName();
        this.kind = this.node.getKindName();
        this.structure = this.getStructure();
        this.type = type;
        this.isDefaultExport = this.getIsDefaultExport();

        // Effects
        this.setDescriptionAndTags();
    }

    // ----------- Public Methods -----------

    /** Returns a JSON representation of a doc. */
    public toJSON(): AbstractDocJSON<T> & Record<string, any> {
        return {
            type: this.type,
            name: this.name,
            isDefaultExport: this.isDefaultExport,
            jsDoc: {
                description: this.description,
                tags: this.tags,
            }
        }
    }

    /** Traverses a doc and its' children */
    public traverse() {
        // should be implemented by each class as needed.
    }

    /** Gets the return type of the doc as a string. */
    public getReturnType() {
        if (Node.isReturnTypedNode(this.node)) {
            return this.node.getReturnType().getText(this.node, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope);
        }

        if (Node.isInitializerExpressionGetableNode(this.node)) {
            const arrow = this.node.getInitializerIfKind(SyntaxKind.ArrowFunction);
            return arrow?.getReturnType().getText(this.node, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope) ?? '';
        }

        return '';
    }
    
    /** Returns a string representation of a doc. */
    public toString(): string {
        return this.name;
    }

    // Protected

    protected getJSDocs = () => {
        if (Node.isJSDocableNode(this.node)) {
            return this.node.getJsDocs();
        }
        return [];
    }

    // ----------- Private Methods -----------

    private getIsDefaultExport = () => {
        if (Node.isExportableNode(this.node)) {
            return this.node.isDefaultExport();
        }
        return false;
    }

    private getStructure = () => {
        if (isNodeWithStructure<S>(this.node)) {
            return this.node.getStructure();
        }
        return null;
    }

    private getName = () => {
        if (Node.isNamedNode(this.node)) {
            return this.node.getName();
        }
        else {
            return this.node.getSymbol()?.getName() ?? "Unknown";
        }
    }

    /**
     * Parses the jsDocs description and tags. 
     * 
     * @param docs An array of JsDoc's
     * @returns An array of TsDocGenDoc's
     */
    private formatJsDocs = (
        docs: JSDoc[]
    ): TsDocGenDoc[] => {
        return docs.map((doc) => {
            const text = doc.getFullText();
            const parsedComments = parse(text);

            return {
                description: doc.getDescription(),
                tags: parsedComments[0].tags.map((tag) => {
                    return {
                        tagName: tag.name,
                        text: tag.description
                    }
                }),
            };
        });
    };

    /**
     * Extracts the description and tags from the JsDoc associated with the node.
     */
    private setDescriptionAndTags = () => {
        const doc = this.formatJsDocs(this.getJSDocs())[0];

        if (doc) {
            const { description, tags } = doc;

            this.description = description;
            this.tags = tags;
        }
        else {
            this.description = '';
            this.tags = [];
        }
    }
}

export default AbstractDoc;

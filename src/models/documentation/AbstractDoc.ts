import { parse } from "comment-parser";
import { JSDoc, Structure, Node, TypeFormatFlags } from "ts-morph";
import { TsDocGenDoc } from "../../types";
import isNodeWithStructure from "../../utils/isNodeWithStructure";

export interface DocJSON {
    name: string;
    jsDoc: {
        description: string;
        tags: TsDocGenDoc['tags'];
    }
};

/**
 * The base representation for all documentation nodes.
 */
class AbstractDoc<N extends Node, S extends Structure = Structure> {
    public description!: string;
    public tags!: TsDocGenDoc['tags'];
    public node: N;
    public name: string;
    public kind: string;
    public structure: S | null;

    constructor(node: N) {
        // Variables
        this.node = node;
        this.name = this.getName();
        this.kind = this.node.getKindName();
        this.structure = this.getStructure();

        // Effects
        this.setDescriptionAndTags();
    }

    // Public Methods

    /** Returns a JSON representation of a doc. */
    public toJSON(): DocJSON & Record<string, unknown> {
        return {
            name: this.name,
            jsDoc: {
                description: this.description,
                tags: this.tags,
            }
        }
    }

    public traverse() {
        // should be implemented by each class as needed.
    }

    public getReturnType() {
        if (Node.isReturnTypedNode(this.node)) {
            return this.node.getReturnType().getText(this.node, TypeFormatFlags.UseAliasDefinedOutsideCurrentScope)
        }
        return '';
    }
    
    /** Returns a string representation of a doc. */
    public toString(): string {
        return this.name;
    }

    // Private Methods

    private getJSDocs = () => {
        if (Node.isJSDocableNode(this.node)) {
            return this.node.getJsDocs();
        }
        return [];
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

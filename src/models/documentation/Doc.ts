import { parse } from "comment-parser";
import { JSDoc, Node } from "ts-morph";
import EmitDocEvent from "../../decorators/EmitDocEvent";
import { TsDocGenDoc } from "../../types";

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
@EmitDocEvent('CREATE_DOC')
class Doc<N extends Node> {
    public description!: string;
    public tags!: TsDocGenDoc['tags'];
    public node: N;
    public name: string;

    constructor(node: N) {
        // Variables
        this.node = node;
        this.name = this.getName();

        // Effects
        this.setDescriptionAndTags();
    }

    // Public Methods

    public getJSDocs = () => {
        if (Node.isJSDocableNode(this.node)) {
            return this.node.getJsDocs();
        }
        return [];
    }

    /** Returns a JSON representation of a doc. */
    public toJSON = (): DocJSON & Record<string, unknown> => {
        return {
            name: this.name,
            jsDoc: {
                description: this.description,
                tags: this.tags,
            }
        }
    }

    public traverse = () => {
        // should be implemented by each class as needed.
    }

    /** Returns a string representation of a doc. */
    public toString = (): string => {
        return this.name;
    }

    // Private Methods
    
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

export default Doc;

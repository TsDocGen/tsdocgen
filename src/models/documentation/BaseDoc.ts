import { parse } from "comment-parser";
import { JSDoc, Structure, Node, TypeFormatFlags, SyntaxKind, Symbol, Type } from "ts-morph";
import { BaseDocJSON, TsDocGenDoc } from "../../types/tsdocgen";
import isNodeWithStructure from "../../utils/isNodeWithStructure";
import type TsDocGenContext from '../context';

/**
 * The base representation for all documentation nodes.
 * @param {Node} node The ts-morph node
 * @param {string} type The type of node such as `method`
 * @param {TsDocGenContext} context The TsDocGenContext. 
 * @param {BaseDoc} parent The parent/owner doc.
 * @typeParam T The document type
 * @typeParam N Generic Node type from `ts-morph`
 * @typeParam S Generic Structure type from `ts-morph`
 */
class BaseDoc<T extends string, N extends Node, S extends Structure = Structure, P extends BaseDoc<string, Node, Structure, any> | undefined = undefined> {
    public id: string;
    public description!: string;
    public tags!: TsDocGenDoc['tags'];
    public node: N;
    public name: string;
    public kind: string;
    public structure: S | null;
    public type: T;
    public isDefaultExport: boolean;
    public symbol: Symbol | undefined;
    public tsType: Type | undefined;
    public context: TsDocGenContext;
    public sourceFileRelativePath: string;
    public startLineNumber: number;
    public parent?: P = undefined;

    constructor(node: N, type: T, context: TsDocGenContext, sourceFileRelativePath: string, parent?: P) {
        // Variables
        this.node = node;
        this.parent = parent;
        this.context = context;
        this.sourceFileRelativePath = sourceFileRelativePath;
        this.startLineNumber = this.node.getStartLineNumber();
        this.id = `${this.sourceFileRelativePath}:${this.startLineNumber}`
        this.type = type;
        this.symbol = node.getSymbol();
        this.name = this.getName();
        this.kind = this.node.getKindName();
        this.structure = this.getStructure();
        this.isDefaultExport = this.getIsDefaultExport();
        this.tsType = this.symbol?.getTypeAtLocation(node);

        // Effects
        this.setDescriptionAndTags();
        this.addToSymbolCache();
    }

    // ----------- Public Methods -----------

    /** Returns a JSON representation of a doc. */
    public toJSON(): BaseDocJSON<T> & Record<string, any> {
        return {
            id: this.id,
            type: this.type,
            name: this.name,
            isDefaultExport: this.isDefaultExport,
            jsDoc: {
                description: this.description,
                tags: this.tags,
            },
            isExported: Node.isExportableNode(this.node) ? this.node.isExported() : false,
            sourceFileRelativePath: this.sourceFileRelativePath,
            startLineNumber: this.startLineNumber
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

    /** Sets the description for the doc. */
    public setDescription(description: string) {
        this.description = description;
    }

    /** Sets the tags for the doc. */
    public setTags(tags: TsDocGenDoc['tags']) {
        this.tags = tags;
    }

    // ----------- Protected Methods -----------

    protected getJSDocs = () => {
        if (Node.isJSDocableNode(this.node)) {
            return this.node.getJsDocs();
        }
        return [];
    }

    // ----------- Private Methods -----------

    private addToSymbolCache = () => {
        if (this.symbol) {
            this.context.symbolCache.add(this.symbol, this);
        }
    }

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
                        tag: tag.tag,
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

export default BaseDoc;

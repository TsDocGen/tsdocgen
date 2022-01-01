import type { ExportableDoc, ExportableDocJSON, NonExportableDocType } from "../../types/docs";
import type { SourceFileDeclarations } from "../../types/tsdocgen";
import TsDocGenSourcePage, { TsDocGenSourcePageJSON } from "./SourcePage";

interface TableOfContentsItem {
    name: string;
    url: string;
}

export interface TsDocGenDocPageJSON extends TsDocGenSourcePageJSON<"DocPage"> {
    docs: ExportableDocJSON;
    tableOfContents: Record<NonExportableDocType, TableOfContentsItem[]>;
}

/**
 * Represents a typescript module as a tsdocgen doc page.
 */
class TsDocGenDocPage extends TsDocGenSourcePage<'DocPage'> {
    private doc: ExportableDoc;
    private tableOfContents: Record<NonExportableDocType, TableOfContentsItem[]> = {
        constructor: [],
        signature: [],
        property: [],
        method: []
    };

    constructor(source: SourceFileDeclarations, doc: ExportableDoc) {
        super(source, "DocPage", `${doc.type}/${doc.name}`);
        this.doc = doc;
        this.buildTableOfContents();
    }

    public override toJSON(): TsDocGenDocPageJSON {
        return {
            ...super.toJSON(),
            docs: this.doc.toJSON(),
            tableOfContents: { ...this.tableOfContents }
        }
    }

    private buildTableOfContents = () => {
        if ('properties' in this.doc) {
            this.tableOfContents['property'] = this.doc.properties.map((property) => ({ name: property.name, url: property.url }))
        }
        if ('methods' in this.doc) {
            this.tableOfContents['method'] = this.doc.methods.map((method) => ({ name: method.name, url: method.url }))
        }
        if ('constructors' in this.doc) {
            this.tableOfContents['constructor'] = this.doc.constructors.map((constructor) => ({ name: constructor.name, url: constructor.url }))
        }
        if ('signatures' in this.doc) {
            this.tableOfContents['signature'] = this.doc.signatures.map((signature) => ({ name: signature.name, url: signature.url }))
        }
    }
}

export default TsDocGenDocPage;

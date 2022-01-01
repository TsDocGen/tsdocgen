import { TypesFriendly } from "../../constants";
import type { ExportableDoc, ExportableDocJSON, ExportableDocType, NonExportableDocType } from "../../types/docs";
import type { SourceFileDeclarations } from "../../types/tsdocgen";
import TsDocGenSourcePage, { TsDocGenSourcePageJSON } from "./SourcePage";

interface TableOfContentsItem {
    name: string;
    url: string;
}

export interface TsDocGenDocPageJSON extends TsDocGenSourcePageJSON<"DocPage"> {
    doc: ExportableDocJSON;
    tableOfContents: Record<NonExportableDocType, TableOfContentsItem[]>;
}

/**
 * Represents a typescript module as a tsdocgen doc page.
 */
class TsDocGenDocPage<D extends ExportableDocType = ExportableDocType> extends TsDocGenSourcePage<'DocPage'> {
    private doc: ExportableDoc;
    private tableOfContents: Record<NonExportableDocType, TableOfContentsItem[]> = {
        constructor: [],
        signature: [],
        property: [],
        method: []
    };
    public docType: D;

    constructor(source: SourceFileDeclarations, doc: ExportableDoc, docType: D) {
        super(source, "DocPage", `/${TypesFriendly[doc.type]}/${doc.name}`);
        this.doc = doc;
        this.docType = docType;
        this.buildTableOfContents();
    }

    public override toJSON(): TsDocGenDocPageJSON {
        return {
            ...super.toJSON(),
            doc: this.doc.toJSON(),
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

import { parse } from "path";
import type { ExportableDoc, ExportableDocJSON, ExportableDocType } from "../../types/docs";
import type { SourceFileDeclarations } from "../../types/tsdocgen";
import TsDocGenSourcePage, { TsDocGenSourcePageJSON } from "./SourcePage";

interface TableOfContentsItem {
    name: string;
    url: string;
}

export interface TsDocGenModulePageJSON extends TsDocGenSourcePageJSON<"ModulePage"> {
    docs: ExportableDocJSON[];
    tableOfContents: Record<ExportableDocType, TableOfContentsItem[]>;
}

function createUrl(source: SourceFileDeclarations){
    const { dir, name } = parse(source.path);
    return `${dir}/${name}`;
}

/**
 * Represents a typescript module as a ts docgen page.
 */
class TsDocGenModulePage extends TsDocGenSourcePage<'ModulePage'> {
    private docs: ExportableDoc[];
    private tableOfContents: Record<ExportableDocType, TableOfContentsItem[]> = {
        class: [],
        enum: [],
        function: [],
        interface: [],
        "type-alias": [],
        unknown: [],
        variable: []
    };

    constructor(source: SourceFileDeclarations, docs: ExportableDoc[]) {
        super(source, "ModulePage", createUrl(source));
        this.docs = docs;
    }

    public addDoc = (doc: ExportableDoc) => {
        this.docs.push(doc);
        this.addDocToTableOfContents(doc);
    }

    public getDocs = () => {
        return [...this.docs];
    }

    public override toJSON(): TsDocGenModulePageJSON {
        return {
            ...super.toJSON(),
            docs: this.docs.map((doc) => doc.toJSON()),
            tableOfContents: { ...this.tableOfContents }
        }
    }

    private addDocToTableOfContents = (doc: ExportableDoc) => {
        this.tableOfContents = {
            ...this.tableOfContents,
            [doc.type]: [...this.tableOfContents[doc.type], { name: doc.name, url: doc.url }]
        }
    }
}

export default TsDocGenModulePage;

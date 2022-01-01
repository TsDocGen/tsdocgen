import type { SourceFile } from "ts-morph";
import type { SourceFileDeclarations } from "../../types/tsdocgen";
import Page from "./Page";

export interface TsDocGenSourcePageJSON<T extends string> {
    type: T;
    url: string;
    path: string;
    relativePath: string;
    navigation: [];
}

class TsDocGenSourcePage<T extends string>  extends Page<T> {
    public path: string;
    public relativePath: string;
    public sourceFile: SourceFile;

    constructor(source: SourceFileDeclarations, type: T, url: string) {
        super(type, url);
        this.url = url;
        this.path = source.path;
        this.relativePath = source.relativePath;
        this.navigation = [];
        this.type = type;
        this.sourceFile = source.sourceFile;
    }

    public override toJSON(): TsDocGenSourcePageJSON<T> {
        return {
            type: this.type,
            url: this.url,
            path: this.path,
            relativePath: this.relativePath,
            navigation: this.navigation
        }
    }
}

export default TsDocGenSourcePage;

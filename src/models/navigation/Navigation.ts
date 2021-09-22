/**
 * A factory function for creating urls for docs.
 * @param docName The name of the generated doc
 * @param docType The type of the generated doc such as `class` or `function`;
 * @param docPath The full path of the doc relative to the current working directory.
 */
export type UrlFactory = (projectName: string, docName: string, docType: string, docPath: string) => string;

export type DocMenuItem = {
    name: string;
    path: string;
    children: DocMenuItem[];
}

const defaultUrlFactory: UrlFactory = (projectName, docName, docType) => `/${projectName}/${docType}/${docName}.html`;

class TsDocGenNavigation {
    private urlFactory: UrlFactory;
    private projectName: string;

    constructor(projectName: string, urlFactory: UrlFactory = defaultUrlFactory) {
        this.projectName = projectName;
        this.urlFactory = urlFactory;
    }

    buildMenu = () => {

    }

    getUrlForDoc = (docName: string, docType: string, docPath: string): string => {
        return this.urlFactory(this.projectName, docName, docType, docPath);
    }
}

export default TsDocGenNavigation;

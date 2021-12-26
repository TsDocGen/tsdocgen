import { TypesFriendly } from "../../constants";
import { UrlFactory } from "../../types/tsdocgen";
import type TsDocGenProject from "../project";

export type DocMenuItem = {
    name: string;
    path: string;
    children: DocMenuItem[];
}

const defaultUrlFactory: UrlFactory = (projectName, docName, docType) => `/${projectName}/${docType}/${docName}.html`;

class TsDocGenNavigation {
    private urlFactory: UrlFactory;
    private projects: TsDocGenProject[];
    public menu: Record<string, Record<string, string>>;

    constructor(projects: TsDocGenProject[], urlFactory: UrlFactory = defaultUrlFactory) {
        this.urlFactory = urlFactory;
        this.projects = projects;
        this.menu = this.buildMenu();
    }

    // ----------- Public Methods -----------

    public getUrlForDoc = (projectName: string, docName: string, docType: string, docPath: string): string => {
        return this.urlFactory(projectName, docName, docType, docPath);
    }

    // ----------- Private Methods -----------

    private buildMenu = () => {
        const menu: Record<string, Record<string, string>> = {};

        this.projects.forEach((project) => {
            project.forEachDoc((doc) => {
                const { type, name } = doc;
    
                menu[TypesFriendly[type]] = {
                    ...menu[type],
                    [name]: `/${project.name}/${type}/${name}`
                }
            });
        });
        
        return menu;
    }
}

export default TsDocGenNavigation;

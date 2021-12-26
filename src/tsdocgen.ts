import Config from "./models/configuration";
import EmitEvent from "./decorators/EmitEvent";
import TsDocGenProject from "./models/project";
import TsDocGenNavigation from "./models/navigation";
import TsDocGenThemeFinder from "./models/themes";
import { UrlFactory } from "./types/tsdocgen";

/**
 * The TSDocGen Application. Handles traversing source files and converting them to
 * a documentation ready app.
 */
@EmitEvent('START_PROJECT')
class TSDocGen {
    /** The project config {@link Config} */
    public config: Config = new Config();

    /** An array of projects for the current app instance. */
    public projects: TsDocGenProject[];

    public navigation: TsDocGenNavigation;

    public theme_finder: TsDocGenThemeFinder;

    /**
     * @param urlFactory The function for determining the url for each doc. Defaults to `/${projectName}/${docType}/${docName}.html`
     */
    constructor(urlFactory?: UrlFactory) {
        this.projects = this.generateDocumentation();
        this.navigation = new TsDocGenNavigation(this.projects, this.config, urlFactory);
        this.theme_finder = new TsDocGenThemeFinder(this.config);
    }

    // ----------- Public Methods -----------

    /**
     * Generates the documentation using the configuration options.
     */
     public generateDocumentation = () => {
        const projects = this.config.projects;
        const result: TsDocGenProject[] = [];

        for (const projectConfig of projects) {
            const project = new TsDocGenProject(projectConfig);

            result.push(project);
        }

        return result;
    }

}

export default TSDocGen;

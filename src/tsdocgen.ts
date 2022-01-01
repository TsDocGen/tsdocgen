import Config from "./models/configuration";
import EmitEvent from "./decorators/EmitEvent";
import TsDocGenProject from "./models/project";
import TsDocGenNavigation from "./models/navigation";
import { UrlFactory } from "./types/tsdocgen";
import getThemeCache from "./theme/getThemeCache";
import { resolve } from "path";
import TsDocGenTheme from "./theme/Theme";
import { TSDOCGEN_CONFIG_NAME } from "./constants";

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

    /**
     * @param urlFactory The function for determining the url for each doc. Defaults to `/${projectName}/${docType}/${docName}.html`
     */
    constructor(urlFactory?: UrlFactory) {
        this.projects = this.generateDocumentation();
        this.navigation = new TsDocGenNavigation(this.projects, this.config, urlFactory);

        // Effects
        // this.validateTheme(this.config.tsDocGenConfig.theme);
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

    public getCurrentTheme = () => {
        return getThemeCache().getCurrentTheme();
    }

    public getCurrentThemeName = () => {
        return this.getCurrentTheme().name;
    }

    public getCurrentThemePath = () => {
        const name = this.getCurrentTheme().name;

        return resolve(process.cwd(), 'node_modules', name);
    }
    
    public getTsDocGenConfigPath = () => {
        return resolve(process.cwd(), TSDOCGEN_CONFIG_NAME);
    }

    public validateTheme(theme: TsDocGenTheme) {
        if (!(theme instanceof TsDocGenTheme)) {
            throw new Error('Not a valid theme');
        }
    }
}

export default TSDocGen;

import { ThemeRegistry } from "../../constants";
import Config from "../configuration";
import TsDocGenTheme from "./Theme";

/**
 * Responsible for finding and validating themes.
 */
class TsDocGenThemeValidator {
    private config: Config;
    private theme: TsDocGenTheme;

    constructor(config: Config) {
        this.config = config;
        this.theme = this.config.tsDocGenConfig.theme;

        this.validateTheme(this.theme);

        ThemeRegistry.set(this.theme.name, this.theme);
    }
    
    /**
     * Validates that a theme has the correct minimum components.
     */
    public validateTheme(theme: TsDocGenTheme) {
        if (!(theme instanceof TsDocGenTheme)) {
            throw new Error('Not a valid theme');
        }
    }
}

export default TsDocGenThemeValidator;
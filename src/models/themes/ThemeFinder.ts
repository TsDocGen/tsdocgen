import { normalize, resolve } from "path";
import { DefaultThemes, ThemeRegistry } from "../../constants";
import { TsDocGenTheme } from "../../types/theme";
import Config from "../configuration";

/**
 * Responsible for finding and validating themes.
 */
class TsDocGenThemeFinder {
    private config: Config;
    private theme: TsDocGenTheme;

    constructor(config: Config) {
        this.config = config;
        this.theme = this.getTheme(this.config.tsDocGenConfig.theme);

        this.validateTheme(this.theme);
    }
    
    /**
     * Resolves the path for a theme from node modules.
     * @returns The full path to the theme relative to the current working directory.
     */
    public resolveThemePath(name: string): string {
        const theme = normalize(name);

        if (DefaultThemes[theme]) {
            return resolve(process.cwd(), 'node_modules', '@tsdocgen', 'themes', theme);
        }

        return resolve(process.cwd(), 'node_modules', theme);
    }

    /**
    * Resolves the path for a theme from node modules.
    * @returns The full path to the theme relative to the current working directory.
    */
    public getTheme(name: string): TsDocGenTheme {
        if (ThemeRegistry.has(name)) {
            return ThemeRegistry.get(name) as TsDocGenTheme;
        }

        const theme_path = this.resolveThemePath(name);

        const theme = require(theme_path);

        this.validateTheme(theme);

        ThemeRegistry.set(name, theme);

        return theme;
    }

    /**
     * Validates that a theme has the correct minimum components.
     */
    public validateTheme(theme: TsDocGenTheme) {
        return theme;
    }
}

export default TsDocGenThemeFinder;
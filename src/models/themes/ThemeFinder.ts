import { normalize, resolve } from "path";
import { DefaultThemes } from "../../constants";

/**
 * Responsible for finding and validating themes.
 */
class ThemeFinder {
    /** The name of the theme */
    public name: string;

    constructor(name: string) {
        this.name = name;
    }

    /**
     * Resolves the path for a theme from node modules.
     * @returns The full path to the theme relative to the current working directory.
     */
    public resolveThemePath(): string {
        const theme = normalize(this.name);

        if (DefaultThemes[theme]) {
            return resolve(process.cwd(), 'node_modules', 'tsdocgen-themes', theme);
        }

        return resolve(process.cwd(), 'node_modules', theme);
    }

    /**
    * Resolves the path for a theme from node modules.
    * @returns The full path to the theme relative to the current working directory.
    */
    public getTheme(): string {
        const theme = this.resolveThemePath();

        this.validateTheme(theme);

        return theme;
    }

    /**
     * Validates that a theme has the correct minimum components.
     */
    public validateTheme(theme_path: string) {
        console.log(theme_path);
    }
}

export default ThemeFinder;
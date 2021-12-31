import Reporter from "../reporter";
import type TsDocGenTheme from "../theme/Theme";

class ThemeCache {
    private cache = new Map<string, TsDocGenTheme<any, any>>()
    protected currentTheme!: TsDocGenTheme;

    public getCurrentTheme() {
        return this.currentTheme;
    }

    public setCurrentTheme(name: string) {
        if (this.cache.has(name)) {
            this.currentTheme = this.cache.get(name) as TsDocGenTheme;
        }
    }

    public register = (name: string, theme: TsDocGenTheme<any, any>) => {
        this.cache.set(name, theme);
        this.setCurrentTheme(name);
        Reporter.success(`Registered theme: ${name}`);
    }
}

export default ThemeCache;

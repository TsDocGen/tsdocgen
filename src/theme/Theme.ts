import { TsDocGenThemeComponents } from "../types/theme";
import getThemeCache from "./getThemeCache";
import TsDocGenThemeRegistry from "./ThemeRegistry";

/**
 * The base class for a theme.
 */
class TsDocGenTheme<
    C extends TsDocGenThemeComponents = TsDocGenThemeComponents, 
    K extends Extract<keyof C, string> = Extract<keyof C, string>, 
    T extends TsDocGenThemeRegistry<C, K> = TsDocGenThemeRegistry<C, K>
> {
    private registry: T;
    public name: string;

    constructor(name: string, registry: T) {
        this.name = name;
        this.registry = registry;

        // Effects
        this.register();
    }

    public getName = () => {
        return this.name;
    }

    public setComponent = (name: K, component: C[K]) => {
        this.registry.set(name, component);
    }

    public getComponent<S extends K = K>(name: S): C[S] {
        if (this.registry.has(name)) {
            return this.registry.get(name) as C[S];
        }
        throw new Error(`${name} was not found on the theme: ${this.name}`)
    }

    private register = () => {
        getThemeCache().register(this.name, this);
    }
}

export default TsDocGenTheme;
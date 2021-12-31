import { TsDocGenThemeComponents } from "../types/theme";

/**
 * The component/utility registry for a theme.
 */
class TsDocGenThemeRegistry<C extends TsDocGenThemeComponents = TsDocGenThemeComponents, K extends Extract<keyof C, string> = Extract<keyof C, string>> {
    private name: string;
    private components = new Map<K, C[K]>();

    constructor(name: string) {
        this.name = name;
    }

    public has(name: K) {
        return this.components.has(name)
    }

    public set(name: K, component: C[K]) {
        this.components.set(name, component);
    }

    public get<S extends K = K>(name: S): C[S] {
        if (this.components.has(name)) {
            return this.components.get(name) as C[S];
        }
        throw new Error(`${name} was not found on the theme: ${this.name}`)
    }

    protected validate = () => {
        const component_keys = ["Layout", "Method", "Methods", "Page", "Properties", "Property"] as K[];
        
        component_keys.forEach(this.get);
        
        this.get("Utils" as K);
    }
}

export default TsDocGenThemeRegistry;
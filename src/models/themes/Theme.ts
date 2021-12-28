import { TsDocGenThemeComponents } from "../../types/theme";

/**
 * The base class for a theme.
 */
class TsDocGenTheme<C extends TsDocGenThemeComponents = TsDocGenThemeComponents, K extends keyof C = keyof C> {
    private components = new Map<K, C[K]>();
    public name: string;

    constructor(name: string, components: C) {
        this.name = name;

        // Effects
        this.addComponentsToMap(components);
    }

    public setComponent(name: K, component: C[K]) {
        this.components.set(name, component);
    }

    public getComponent(name: K): C[K] | undefined {
        if (this.components.has(name)) {
            return this.components.get(name) as C[K];
        }
        return undefined;
    }

    private addComponentsToMap = (components: C) => {
        for (const component in components) {
            if (Object.prototype.hasOwnProperty.call(components, component)) {
                const element = components[component] as any as C[K];
                const key = component as any as K;
                this.components.set(key, element)
            }
        }
    }
}

export default TsDocGenTheme;
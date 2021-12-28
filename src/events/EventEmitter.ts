type EventEmitterListeners = Record<keyof typeof Events, ((...args: any[]) => void)[]>;

/** Events specific to the stages of a `TSDocGen` project */
export const ProjectEvents = {
    START_PROJECT: "START_PROJECT",
    END_PROJECT: "END_PROJECT",
} as const;

/** Events specific to the creation of `Doc` models. */
export const DocEvents = {
    CREATE_CONSTRUCTOR_DOC: "CREATE_CONSTRUCTOR_DOC",
    CREATE_CLASS_DOC: "CREATE_CLASS_DOC",
    CREATE_DOC: "CREATE_DOC",
    CREATE_ENUM_DOC: "CREATE_ENUM_DOC",
    CREATE_FUNCTION_DOC: "CREATE_FUNCTION_DOC",
    CREATE_INTERFACE_DOC: "CREATE_INTERFACE_DOC",
    CREATE_METHOD_DOC: "CREATE_METHOD_DOC",
    CREATE_PARAMETER_DOC: "CREATE_PARAMETER_DOC",
    CREATE_PROPERTY_DOC: "CREATE_PROPERTY_DOC",
    CREATE_SIGNATURE_DOC: "CREATE_SIGNATURE_DOC",
    CREATE_TYPE_ALIAS_DOC: "CREATE_TYPE_ALIAS_DOC",
    CREATE_TYPE_PARAMETER_DOC: "CREATE_TYPE_PARAMETER_DOC",
    CREATE_UNKNOWN_DOC: "CREATE_UNKNOWN_DOC",
    CREATE_VARIABLE_DOC: "CREATE_VARIABLE_DOC",
} as const;

/** Events specific to the stages of building a theme. */
export const ThemeEvents = {
    GET_THEME: "GET_THEME",
    CREATE_THEME: "CREATE_THEME",
    EMIT_THEME: "EMIT_THEME",
} as const;

/** All events supported in `TsDocGen`. */
export const Events = {
    ...ProjectEvents,
    ...ThemeEvents,
    ...DocEvents,
} as const;

function createListeners(): EventEmitterListeners {
    const keys = Object.keys(Events) as (keyof typeof Events)[];

    return keys.reduce((map, key) => {
        return {
            ...map,
            [key]: [],
        }
    }, {} as EventEmitterListeners);
}

/**
 * The TsDocGen Event Emitter emits events for different stages of proccessing
 * when creating a project.
 */
class EventEmitter {
    private listeners: EventEmitterListeners = createListeners();

    public emit(name: keyof typeof Events, ...args: any[]) {
        this.listeners[name].forEach((listener) => {
            listener(...args);
        });
    }

    public addListener(name: keyof typeof Events, listener: (...args: any[]) => void) {
        this.listeners[name].push(listener);
    }

    public removeListener(name: keyof typeof Events, listener: (...args: any[]) => void) {
        const index = this.listeners[name].findIndex((l) => {
            return l === listener;
        });

        if (index > -1) {
            this.listeners[name].splice(1, index);
        }
    }
}

const eventEmitter = new EventEmitter();

export default eventEmitter;

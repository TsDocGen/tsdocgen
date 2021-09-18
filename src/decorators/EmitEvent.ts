import { eventEmitter, ProjectEvents, ThemeEvents } from "../events";
import { ClassType } from "../types";

/**
 * A decorator for emitting events related to the project lifecyle or theme lifecycle.
 * @param event A {@link ProjectEvents} or {@link ThemeEvents} key.
 */
function EmitEvent(event: keyof typeof ProjectEvents | keyof typeof ThemeEvents) {
    return function _EmitDocEvent<T extends ClassType>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                eventEmitter.emit(event, this);
            }
        }
    }
}

export default EmitEvent;


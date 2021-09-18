import { eventEmitter, DocEvents } from "../events";
import { ClassType } from "../types";

/**
 * A decorator for emitting events related to the creation {@link Doc}.
 * @param event A {@link DocEvents} key.
 */
function EmitDocEvent(event: keyof typeof DocEvents) {
    return function _EmitDocEvent<T extends ClassType>(constructor: T) {
        return class extends constructor {
            constructor(...args: any[]) {
                super(...args);
                eventEmitter.emit(event, this);
            }
        }
    }
}

export default EmitDocEvent;


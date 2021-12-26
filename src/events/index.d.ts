import { Events } from ".";
import { Node } from 'ts-morph';
import ClassDoc from "../models/documentation/ClassDoc";
import Doc from "../models/documentation/Doc";
import MethodDoc from "../models/documentation/MethodDoc";
import PropertyDoc from "../models/documentation/PropertyDoc";


/**
 * The TsDocGen Event Emitter emits events for different stages of proccessing
 * when creating a project.
 */
declare class EventEmitter {
    public emit(name: typeof Events.START_PROJECT): void;
    public emit(name: typeof Events.END_PROJECT): void;
    public emit(name: typeof Events.CREATE_DOC, doc: Doc<any, Node>): void;
    public emit(name: typeof Events.CREATE_CLASS_DOC, doc: ClassDoc): void;
    public emit(name: typeof Events.CREATE_METHOD_DOC, doc: MethodDoc): void;
    public emit(name: typeof Events.CREATE_PROPERTY_DOC, doc: PropertyDoc): void;
    public emit(name: typeof Events.CREATE_THEME): void;

    public listen(name: typeof Events.START_PROJECT, listener: () => void): void;
    public listen(name: typeof Events.END_PROJECT, listener: () => void): void;
    public listen(name: typeof Events.CREATE_DOC, listener: (doc: Doc<any, Node>) => void): void;
    public listen(name: typeof Events.CREATE_CLASS_DOC, listener: (doc: ClassDoc) => void): void;
    public listen(name: typeof Events.CREATE_METHOD_DOC, listener: (doc: MethodDoc) => void): void;
    public listen(name: typeof Events.CREATE_PROPERTY_DOC, listener: (doc: PropertyDoc) => void): void;
    public listen(name: typeof Events.CREATE_THEME, listener: () => void): void;
}

declare const eventEmitter: EventEmitter;

export default eventEmitter;
import { DocType } from "./types/docs";

export const TSDOCGEN_CONFIG_NAME = 'tsdocgen.config.js';

export const ErrorCodes = {};

export const DefaultThemes: Record<string, string> = {
    'ant-design': 'ant-design',
    'material-ui': 'material-ui',
}

export const TypesFriendly: Record<DocType, string> = {
    'class': 'classes',
    'enum': 'enums',
    'function': 'functions',
    'interface': 'interfaces',
    'type-alias': 'type aliases',
    'unknown': 'unknown',
    'variable': 'variables'
}
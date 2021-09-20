import "reflect-metadata";

export * from './errors';
export * from './events';
export * from './renderer';
export * from './types/tsdocgen';
export * from './types/docs';
export * from './types/theme';
export * from './models';
export { default as getPackageJson } from './utils/getPackageJson'
export { default } from './tsdocgen';

// export type { DocJSON } from './types';

// export { default as Doc } from './models/documentation/Doc';
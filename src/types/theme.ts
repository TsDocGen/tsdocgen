import type React from 'react';
import type { MethodDocJSON } from '../models/documentation/MethodDoc';
import type PropertyDoc from '../models/documentation/PropertyDoc';
import type { DocUnionJSON, ProjectDocs } from './docs';

/** Base component props for the `App` component for a theme. */
export interface AppComponentProps {
    name: string;
    docs: ProjectDocs[];
};

export interface LayoutProps {
    projectName: string;
    docs: DocUnionJSON[];
}

export interface DocProps {
    doc: DocUnionJSON;
}

export interface PageProps {
    projectName: string;
    doc: DocUnionJSON;
    menu: Record<string, Record<string, string>>;
    theme: string;
}

export interface PropertiesComponentProps {
    properties: PropertyDoc[];
}

export interface PropertyComponentProps {
    property: PropertyDoc;
}

export interface MethodsComponentProps {
    methods: MethodDocJSON[];
}

export interface MethodComponentProps {
    method: MethodDocJSON;
}

export type TsDocGenThemeComponents = {
    Layout: React.ComponentType<LayoutProps>;
    Methods: React.ComponentType<MethodsComponentProps>;
    Method: React.ComponentType<MethodComponentProps>;
    Page: React.ComponentType<PageProps>;
    Properties: React.ComponentType<PropertiesComponentProps>;
    Property: React.ComponentType<PropertyComponentProps>;
    Utils: Record<string, (...args: any[]) => any>
}

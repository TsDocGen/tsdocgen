import React from 'react';
import { DocUnionJSON, ProjectDocs } from './docs';

/** Base component props for the `App` component for a theme. */
export interface AppComponentProps {
    name: string;
    docs: ProjectDocs[];
};

export interface LayoutProps {
    docs: DocUnionJSON[]
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
    properties: DocUnionJSON['properties'];
}

export interface PropertyComponentProps {
    property: DocUnionJSON['properties'][0];
}

export interface TsDocGenTheme {
    Doc: React.ComponentType<DocProps>;
    Layout: React.ComponentType<LayoutProps>;
    Page: React.ComponentType<PageProps>;
    Properties: React.ComponentType<PropertiesComponentProps>;
    Property: React.ComponentType<PropertyComponentProps>;
}

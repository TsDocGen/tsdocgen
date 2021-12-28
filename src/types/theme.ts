import React from 'react';
import { PropertyDoc } from '..';
import { MethodDocJSON } from '../models/documentation/MethodDoc';
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

export interface TsDocGenThemeComponents extends ObjectConstructor {
    Doc: React.ComponentType<DocProps>;
    Layout: React.ComponentType<LayoutProps>;
    Methods: React.ComponentType<MethodsComponentProps>;
    Method: React.ComponentType<MethodComponentProps>;
    Page: React.ComponentType<PageProps>;
    Properties: React.ComponentType<PropertiesComponentProps>;
    Property: React.ComponentType<PropertyComponentProps>;
}

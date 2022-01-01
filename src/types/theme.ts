import type React from 'react';
import type { MethodDocJSON } from '../models/documentation/MethodDoc';
import type { PropertyDocJSON } from '../models/documentation/PropertyDoc';
import type { TsDocGenDocPageJSON } from '../models/page/DocPage';
import type { TsDocGenModulePageJSON } from '../models/page/ModulePage';
import { TsDocGenReadMePageJSON } from '../models/page/ReadMePage';
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

export interface ReadMePageComponentProps {
    page: TsDocGenReadMePageJSON;
}

export interface DocPageComponentProps {
    page: TsDocGenDocPageJSON;
}

export interface ModulePageComponentProps {
    page: TsDocGenModulePageJSON;
}

export interface PropertiesComponentProps {
    properties: PropertyDocJSON[];
}

export interface PropertyComponentProps {
    property: PropertyDocJSON;
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
    DocPage: React.ComponentType<DocPageComponentProps>;
    ReadMePage: React.ComponentType<ReadMePageComponentProps>;
    ModulePage: React.ComponentType<ModulePageComponentProps>;
    Properties: React.ComponentType<PropertiesComponentProps>;
    Property: React.ComponentType<PropertyComponentProps>;
    Utils: Record<string, (...args: any[]) => any>
}

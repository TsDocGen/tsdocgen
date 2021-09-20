import { HelmetData } from 'react-helmet';
import { DocUnion, ProjectDocs } from './docs';

export interface ThemeProps { helmet: HelmetData; projectName: string; docs: ProjectDocs[] };

/** Base component props for the `Page` component for a theme. */
export interface PageComponentProps { doc: DocUnion };

/** Base component props for the `App` component for a theme. */
export interface AppComponentProps {
    name: string;
    docs: ProjectDocs[]
};

/** Base component props for the `Root` component for a theme. */
export interface RootComponentProps extends ThemeProps { };

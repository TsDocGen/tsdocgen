import { HelmetData } from 'react-helmet';
import { DocUnion, ProjectDocs } from './docs';

export interface ThemeProps { helmet: HelmetData; projectName: string; docs: ProjectDocs[] };

export interface PageProps { doc: DocUnion };

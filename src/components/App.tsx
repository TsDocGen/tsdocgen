import React, { useMemo } from 'react';
import TsDocGenProject from '../models/project';
import TSDocGen from '../tsdocgen';
import ProjectProvider from './ProjectProvider';

interface AppProps {
    Project: React.ComponentType<{ project: TsDocGenProject }>
}

const App: React.FC<AppProps> = ({ Project = ProjectProvider }) => {
    const app = useMemo(() => new TSDocGen(), []);
    const projects = useMemo(() => app.generateDocumentation(), []);

    return (
        <>
            {projects.map((project) => <Project project={project} />)}
        </>
    );
}

export default App;

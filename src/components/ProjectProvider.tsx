import React, { createContext, useContext } from 'react';
import TsDocGenProject from '../models/project';

interface ProjectProps {
    project: TsDocGenProject
}

const ProjectContext = createContext<TsDocGenProject | undefined>(undefined);

const ProjectProvider: React.FC<ProjectProps> = ({ project, children }) => {
    return (
        <ProjectContext.Provider value={project}>
            {children}
        </ProjectContext.Provider>
    );
}

export function useProject() {
    const context = useContext(ProjectContext);

    if (!context) throw new Error('useProject should be used inside of a ProjectProvider');

    return context;

}

export default ProjectProvider;

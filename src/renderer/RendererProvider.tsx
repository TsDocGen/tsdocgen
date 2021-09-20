import React, { createContext, useContext } from 'react';
import { RendererProviderContextValue } from './Renderer.types';

const RendererProviderContext = createContext<RendererProviderContextValue | undefined>(undefined);

const RendererProvider: React.FC<RendererProviderContextValue> = ({ renderer, children }) => {
    const value = { renderer };

    return (
        <RendererProviderContext.Provider value={value}>
            {children}
        </RendererProviderContext.Provider>
    );
}


export function useRenderer() {
    const context = useContext(RendererProviderContext);

    if (!context) throw new Error('useRenderer must be used inside of a RendererProvider');

    return context;
}

export default RendererProvider;

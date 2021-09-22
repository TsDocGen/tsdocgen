import React, { createContext, useContext, useMemo } from 'react';
import TsDocGenNavigation from '../models/navigation';
import { UrlFactory } from '../models/navigation/Navigation';

interface NavigationProps {
    /** The factory function for creating urls for documents. */
    urlFactory?: UrlFactory;
    projectName: string;
}

const NavigationContext = createContext<TsDocGenNavigation | undefined>(undefined);

const NavigationProvider: React.FC<NavigationProps> = ({ urlFactory, projectName, children }) => {
    const Navigation = useMemo(() => new TsDocGenNavigation(projectName, urlFactory), []);

    return (
        <NavigationContext.Provider value={Navigation}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation() {
    const context = useContext(NavigationContext);

    if (!context) throw new Error('useNavigation should be used inside of a NavigationProvider');

    return context;

}

export default NavigationProvider;

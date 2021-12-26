import React, { createContext, useContext } from 'react';

type NavigationProps = {};

type NavigationContextValue = {};

const NavigationContext = createContext<NavigationContextValue | undefined>(undefined);

const NavigationProvider: React.FC<NavigationProps> = ({ children }) => {

    return (
        <NavigationContext.Provider value={{}}>
            {children}
        </NavigationContext.Provider>
    );
}

export function useNavigation(): NavigationContextValue {
    const context = useContext(NavigationContext);

    if (!context) throw new Error('useNavigation should be used inside of a NavigationProvider');

    return context;

}

export default NavigationProvider;

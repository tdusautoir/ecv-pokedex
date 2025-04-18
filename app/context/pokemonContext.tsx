import React, { createContext, useContext, ReactNode } from 'react';

type PokemonContextType = {
    color: string;
};

const PokemonContext = createContext<PokemonContextType | undefined>(undefined);

export const PokemonProvider = ({ children, color }: { children: ReactNode; color: string }) => {
    return (
        <PokemonContext.Provider value={{ color }}>
            {children}
        </PokemonContext.Provider>
    );
};

export const usePokemonContext = () => {
    const context = useContext(PokemonContext);
    if (context === undefined) {
        throw new Error('usePokemonContext must be used within a PokemonProvider');
    }
    return context;
};

export const usePokemonColor = () => {
    const { color } = usePokemonContext();
    return color;
};


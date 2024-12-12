import PropTypes from 'prop-types';
import React, { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [ theme, setTheme ] = useState('light');

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    const contextValue = useMemo(() => ({ theme, toggleTheme }), [ theme ]);

    return (
        <ThemeContext.Provider value={ contextValue }>
            { children }
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export const useTheme = () => useContext(ThemeContext);
import { createContext, useState, useEffect } from 'react';

// Create a context to share the theme data across components
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    // Initialize theme with light mode by default
    const [theme, setTheme] = useState('light'); 

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
    };

    // Store theme in localStorage and add/remove 'dark' class to the root element (document.documentElement)
    useEffect(() => {
        // Apply the theme class to the root element (document.documentElement)
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [theme]);

    // Retrieve theme from localStorage on initial load
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
            setTheme(storedTheme);
        }
    }, []);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

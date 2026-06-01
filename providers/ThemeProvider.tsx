import tamaguiConfig from '@/config/tamagui.config';
import { createContext, useState } from 'react';
import { TamaguiProvider } from 'tamagui';

export const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const toggleTheme = () => setTheme(prev => prev === 'light' ? 'dark' : 'light');

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <TamaguiProvider config={tamaguiConfig} defaultTheme={theme}>
                { children }
            </TamaguiProvider>
        </ThemeContext.Provider>
    );
};
import React, { createContext, useContext, useState, useMemo } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('Dark'); // 'Dark' | 'Light' | 'System'

  const autoTheme = useMemo(() => {
    const h = new Date().getHours();
    return h >= 6 && h < 18 ? 'Light' : 'Dark';
  }, []);

  const activeTheme = themeMode === 'System' ? autoTheme : themeMode;
  const isDark = activeTheme === 'Dark';

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, activeTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
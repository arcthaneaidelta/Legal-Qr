import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'wouter';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const saved = localStorage.getItem('legacyqr-theme') as 'light' | 'dark' | null;
    if (saved) {
      setThemeState(saved);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setThemeState('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('legacyqr-theme', theme);
  }, [theme]);

  const toggleTheme = () => setThemeState(t => t === 'light' ? 'dark' : 'light');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const ThemeContext = React.createContext<{ theme: 'light'|'dark', toggleTheme: () => void }>({
  theme: 'light',
  toggleTheme: () => {}
});

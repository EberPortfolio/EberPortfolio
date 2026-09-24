import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ACCENT_COLORS = [
  { id: 'monochrome', name: 'Monocromo', hex: '#18181B', bg: 'bg-zinc-900 dark:bg-white', text: 'text-zinc-900 dark:text-white', border: 'border-zinc-900 dark:border-white' },
  { id: 'emerald', name: 'Esmeralda', hex: '#10B981', bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500' },
  { id: 'electric', name: 'Azul Eléctrico', hex: '#2563EB', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
  { id: 'amber', name: 'Ámbar', hex: '#D97706', bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600' },
  { id: 'violet', name: 'Violeta', hex: '#8B5CF6', bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500' }
];

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('dark'); // 'light', 'dark', 'ink'
  const [accent, setAccent] = useState('monochrome');

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    root.classList.remove('theme-light', 'theme-dark', 'theme-ink', 'dark');
    
    if (theme === 'dark') {
      root.classList.add('dark', 'theme-dark');
      body.style.backgroundColor = '#09090B';
      body.style.color = '#F4F4F5';
    } else if (theme === 'ink') {
      root.classList.add('theme-ink');
      body.style.backgroundColor = '#F2EDE2';
      body.style.color = '#1A1816';
    } else {
      root.classList.add('theme-light');
      body.style.backgroundColor = '#FAFAFA';
      body.style.color = '#09090B';
    }
  }, [theme]);

  // Update CSS variable whenever accent changes
  useEffect(() => {
    const selected = ACCENT_COLORS.find(a => a.id === accent) || ACCENT_COLORS[0];
    document.documentElement.style.setProperty('--accent-hex', selected.hex);
  }, [accent]);

  const currentAccentObj = ACCENT_COLORS.find(a => a.id === accent) || ACCENT_COLORS[0];

  return (
    <ThemeContext.Provider value={{
      theme,
      setTheme,
      accent,
      setAccent,
      currentAccentObj,
      ACCENT_COLORS
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

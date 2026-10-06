import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const ACCENT_COLORS = [
  { id: 'monochrome', name: 'Monocromo', hex: 'currentColor', bg: 'bg-zinc-900 dark:bg-white', text: 'text-zinc-900 dark:text-white', border: 'border-zinc-900 dark:border-white' },
  { id: 'emerald', name: 'Esmeralda', hex: '#10B981', bg: 'bg-emerald-500', text: 'text-emerald-500', border: 'border-emerald-500' },
  { id: 'electric', name: 'Azul Eléctrico', hex: '#2563EB', bg: 'bg-blue-600', text: 'text-blue-600', border: 'border-blue-600' },
  { id: 'amber', name: 'Ámbar', hex: '#D97706', bg: 'bg-amber-600', text: 'text-amber-600', border: 'border-amber-600' },
  { id: 'violet', name: 'Violeta', hex: '#8B5CF6', bg: 'bg-violet-500', text: 'text-violet-500', border: 'border-violet-500' }
];

export const THEMES = ['dark', 'light', 'ink'];
const THEME_STORAGE_KEY = 'eber-theme-v2';
// Keep in sync with the inline script in index.html
const THEME_COLORS = {
  dark: ['#09090B', '#F4F4F5'],
  light: ['#FAFAFA', '#09090B'],
  ink: ['#F2EDE2', '#1A1816']
};

const readStoredTheme = () => {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    if (THEMES.includes(stored)) return stored;
  } catch {
    // Storage can be blocked (private mode); fall back to the default
  }
  return 'dark';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readStoredTheme); // 'light', 'dark', 'ink'
  const [accent, setAccent] = useState('monochrome');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark', 'theme-ink', 'dark');
    root.classList.add(...(theme === 'dark' ? ['dark', 'theme-dark'] : [`theme-${theme}`]));

    // html and body both get the colors so overscroll areas match the theme
    const [bg, fg] = THEME_COLORS[theme];
    for (const el of [root, document.body]) {
      el.style.backgroundColor = bg;
      el.style.color = fg;
    }

    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      // Ignore: the theme just won't persist
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

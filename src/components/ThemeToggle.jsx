import React from 'react';
import { useTheme, THEMES } from '../context/ThemeContext';
import { Sun, Moon, Feather } from 'lucide-react';

const THEME_LABELS = { dark: 'Oscuro', light: 'Claro', ink: 'Cremita' };

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const nextTheme = THEMES[(THEMES.indexOf(theme) + 1) % THEMES.length];
  const label = `Tema: ${THEME_LABELS[theme]}. Cambiar a ${THEME_LABELS[nextTheme]}`;

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setTheme(nextTheme)}
        className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer"
        title={label}
        aria-label={label}
      >
        {theme === 'light' && <Sun className="w-4 h-4 text-zinc-900" />}
        {theme === 'dark' && <Moon className="w-4 h-4 text-white" />}
        {theme === 'ink' && <Feather className="w-4 h-4 text-amber-900" />}
      </button>
    </div>
  );
};

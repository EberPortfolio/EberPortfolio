import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Feather } from 'lucide-react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex items-center gap-1">
      <button
        onClick={() => setTheme(theme === 'light' ? 'dark' : theme === 'dark' ? 'ink' : 'light')}
        className="p-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors"
        title={`Cambiar Tema (Actual: ${theme})`}
      >
        {theme === 'light' && <Sun className="w-4 h-4 text-zinc-900" />}
        {theme === 'dark' && <Moon className="w-4 h-4 text-white" />}
        {theme === 'ink' && <Feather className="w-4 h-4 text-amber-900" />}
      </button>
    </div>
  );
};

import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { UseThemeReturn } from '../types/movie';

interface ThemeToggleProps {
  theme: UseThemeReturn;
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, className = "" }) => {
  return (
    <button
      onClick={theme.toggleTheme}
      className={`p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 
                 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors ${className}`}
      aria-label={theme.isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme.isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </button>
  );
}; 
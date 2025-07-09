import { useState, useEffect } from 'react';
import { UseThemeReturn } from '../types/movie';

const THEME_KEY = 'movie-app-theme';

const log = (level: 'info' | 'error' | 'warn', message: string, data?: any) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [${level.toUpperCase()}] [Theme] ${message}`;
  
  switch (level) {
    case 'info':
      console.log(logMessage, data || '');
      break;
    case 'error':
      console.error(logMessage, data || '');
      break;
    case 'warn':
      console.warn(logMessage, data || '');
      break;
  }
};

export const useTheme = (): UseThemeReturn => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved !== null) {
      const isDarkMode = saved === 'dark';
      log('info', `Theme loaded from localStorage: ${isDarkMode ? 'dark' : 'light'}`);
      return isDarkMode;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    log('info', `Theme loaded from system preference: ${systemPrefersDark ? 'dark' : 'light'}`);
    return systemPrefersDark;
  });

  useEffect(() => {

    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
    log('info', `Theme saved to localStorage: ${isDark ? 'dark' : 'light'}`);
    

    if (isDark) {
      document.documentElement.classList.add('dark');
      log('info', 'Dark mode enabled');
    } else {
      document.documentElement.classList.remove('dark');
      log('info', 'Light mode enabled');
    }
  }, [isDark]);

  const toggleTheme = (): void => {
    log('info', `Toggling theme from ${isDark ? 'dark' : 'light'} to ${isDark ? 'light' : 'dark'}`);
    setIsDark(prev => !prev);
  };

  return {
    isDark,
    toggleTheme
  };
}; 
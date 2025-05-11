import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeMode } from '../utils/shared-types';

// Theme context interface
interface ThemeContextType {
  themeMode: ThemeMode;
  toggleTheme: () => void;
  isLoaded: boolean;
}

// Default context value
const defaultContext: ThemeContextType = {
  themeMode: 'light',
  toggleTheme: () => {},
  isLoaded: false
};

// Create the context
const ThemeContext = createContext<ThemeContextType>(defaultContext);

// Theme provider props
interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: ThemeMode;
}

/**
 * ThemeProvider component for managing application theme
 * 
 * Handles theme switching between light and dark modes
 * with local storage persistence and smooth transitions
 */
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  defaultTheme = 'light' 
}) => {
  // Initialize theme from local storage if available
  const [themeMode, setThemeMode] = useState<ThemeMode>(defaultTheme);
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Load theme preference from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as ThemeMode | null;
    if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
      setThemeMode(savedTheme);
    } else {
      // Check if user prefers dark mode
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setThemeMode(prefersDark ? 'dark' : 'light');
    }
    setIsLoaded(true);
  }, []);
  
  // Update document classes when theme changes
  useEffect(() => {
    if (!isLoaded) return;
    
    const root = document.documentElement;
    if (themeMode === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    
    // Save to localStorage
    localStorage.setItem('theme', themeMode);
  }, [themeMode, isLoaded]);
  
  // Toggle between light and dark modes
  const toggleTheme = () => {
    setThemeMode(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme, isLoaded }}>
      {children}
    </ThemeContext.Provider>
  );
};

/**
 * Custom hook for accessing theme context
 */
export const useTheme = () => useContext(ThemeContext);

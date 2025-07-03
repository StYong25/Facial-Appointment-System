// ThemeContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const systemTheme = useColorScheme(); // Detect system-wide theme (light/dark)
  const [theme, setTheme] = useState('light'); // Default theme

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setTheme(savedTheme); // Load saved theme from AsyncStorage
      } else {
        setTheme(systemTheme || 'light'); // Default to system theme if not found
      }
    };

    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme); // Save the selected theme
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
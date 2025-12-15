import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext(null);

const THEMES = ['focus', 'calm', 'fun', 'hc'];
const MODES = ['light', 'dark', 'system'];

const THEME_LABELS = {
  focus: 'Focus',
  calm: 'Calm',
  fun: 'Fun',
  hc: 'High Contrast',
};

const MODE_LABELS = {
  light: 'Light',
  dark: 'Dark',
  system: 'System',
};

const STORAGE_KEYS = {
  theme: 'chaoslingua-theme',
  mode: 'chaoslingua-mode',
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('focus');
  const [mode, setMode] = useState('system');
  const [isLoaded, setIsLoaded] = useState(false);

  // Load saved preferences on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem(STORAGE_KEYS.theme);
    const savedMode = localStorage.getItem(STORAGE_KEYS.mode);

    if (savedTheme && THEMES.includes(savedTheme)) {
      setTheme(savedTheme);
    }
    if (savedMode && MODES.includes(savedMode)) {
      setMode(savedMode);
    }

    setIsLoaded(true);
  }, []);

  // Apply theme to document and save to localStorage
  useEffect(() => {
    if (!isLoaded) return;

    const root = document.documentElement;

    if (mode === 'system') {
      root.setAttribute('data-theme', 'system');
      root.setAttribute('data-base-theme', theme);
    } else {
      root.setAttribute('data-theme', `${theme}-${mode}`);
      root.removeAttribute('data-base-theme');
    }

    localStorage.setItem(STORAGE_KEYS.theme, theme);
    localStorage.setItem(STORAGE_KEYS.mode, mode);
  }, [theme, mode, isLoaded]);

  // Get current effective mode (resolves 'system' to actual value)
  const getEffectiveMode = () => {
    if (mode !== 'system') return mode;

    if (typeof window !== 'undefined' && window.matchMedia) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }
    return 'light';
  };

  const value = {
    theme,
    setTheme,
    mode,
    setMode,
    effectiveMode: getEffectiveMode(),
    themes: THEMES,
    modes: MODES,
    themeLabels: THEME_LABELS,
    modeLabels: MODE_LABELS,
    isHighContrast: theme === 'hc',
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}

export default ThemeContext;

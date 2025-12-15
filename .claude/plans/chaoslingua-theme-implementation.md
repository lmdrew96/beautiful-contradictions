# ChaosLingua Theme System Implementation

## Overview

Implement a complete theme system with 4 themes (Focus, Calm, Fun, High Contrast), each with light and dark variants. Users can select a theme and mode (light/dark/system sync).

## Theme Color Definitions

Create `src/styles/themes.css` with these exact color values:

```css
/* ============================================
   CHAOSLINGUA THEME SYSTEM
   4 themes x 2 modes = 8 total variants
   ============================================ */

/* Default: Focus Light */
:root {
  --bg-primary: #FAFAFA;
  --bg-secondary: #F0F0F0;
  --bg-tertiary: #E5E5E5;
  --text-primary: #1A1A1A;
  --text-secondary: #525252;
  --text-muted: #737373;
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --success: #16A34A;
  --error: #DC2626;
  --warning: #CA8A04;
  --special: #2563EB;
  --border: #E5E5E5;
  --focus-ring: #2563EB;
}

/* ============================================
   FOCUS THEME
   Minimal, professional, code-editor feel
   ============================================ */

[data-theme="focus-light"] {
  --bg-primary: #FAFAFA;
  --bg-secondary: #F0F0F0;
  --bg-tertiary: #E5E5E5;
  --text-primary: #1A1A1A;
  --text-secondary: #525252;
  --text-muted: #737373;
  --accent: #2563EB;
  --accent-hover: #1D4ED8;
  --success: #16A34A;
  --error: #DC2626;
  --warning: #CA8A04;
  --special: #2563EB;
  --border: #E5E5E5;
  --focus-ring: #2563EB;
}

[data-theme="focus-dark"] {
  --bg-primary: #18181B;
  --bg-secondary: #27272A;
  --bg-tertiary: #3F3F46;
  --text-primary: #FAFAFA;
  --text-secondary: #A1A1AA;
  --text-muted: #71717A;
  --accent: #3B82F6;
  --accent-hover: #60A5FA;
  --success: #22C55E;
  --error: #EF4444;
  --warning: #EAB308;
  --special: #3B82F6;
  --border: #3F3F46;
  --focus-ring: #3B82F6;
}

/* ============================================
   CALM THEME
   Warm, soothing, meditation-app feel
   ============================================ */

[data-theme="calm-light"] {
  --bg-primary: #FFFBF5;
  --bg-secondary: #FEF3E2;
  --bg-tertiary: #FDE6C4;
  --text-primary: #44403C;
  --text-secondary: #78716C;
  --text-muted: #A8A29E;
  --accent: #9D7356;
  --accent-hover: #7C5A44;
  --success: #65A30D;
  --error: #C2410C;
  --warning: #B45309;
  --special: #9D7356;
  --border: #FDE6C4;
  --focus-ring: #9D7356;
}

[data-theme="calm-dark"] {
  --bg-primary: #1C1917;
  --bg-secondary: #292524;
  --bg-tertiary: #44403C;
  --text-primary: #FAFAF9;
  --text-secondary: #D6D3D1;
  --text-muted: #A8A29E;
  --accent: #D4A574;
  --accent-hover: #E4BC8E;
  --success: #84CC16;
  --error: #EA580C;
  --warning: #D97706;
  --special: #D4A574;
  --border: #44403C;
  --focus-ring: #D4A574;
}

/* ============================================
   FUN THEME
   Vibrant, playful, gamified feel
   ============================================ */

[data-theme="fun-light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #F0FDF4;
  --bg-tertiary: #DCFCE7;
  --text-primary: #14532D;
  --text-secondary: #166534;
  --text-muted: #4D7C5F;
  --accent: #8B5CF6;
  --accent-hover: #7C3AED;
  --success: #10B981;
  --error: #F43F5E;
  --warning: #F59E0B;
  --special: #EC4899;
  --border: #DCFCE7;
  --focus-ring: #8B5CF6;
}

[data-theme="fun-dark"] {
  --bg-primary: #0F172A;
  --bg-secondary: #1E293B;
  --bg-tertiary: #334155;
  --text-primary: #F8FAFC;
  --text-secondary: #CBD5E1;
  --text-muted: #94A3B8;
  --accent: #A78BFA;
  --accent-hover: #C4B5FD;
  --success: #34D399;
  --error: #FB7185;
  --warning: #FBBF24;
  --special: #F472B6;
  --border: #334155;
  --focus-ring: #A78BFA;
}

/* ============================================
   HIGH CONTRAST THEME
   WCAG AAA accessibility-first
   ============================================ */

[data-theme="hc-light"] {
  --bg-primary: #FFFFFF;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #E5E5E5;
  --text-primary: #000000;
  --text-secondary: #000000;
  --text-muted: #404040;
  --accent: #0000EE;
  --accent-hover: #0000AA;
  --success: #007700;
  --error: #CC0000;
  --warning: #886600;
  --special: #0000EE;
  --border: #000000;
  --focus-ring: #0000EE;
}

[data-theme="hc-dark"] {
  --bg-primary: #000000;
  --bg-secondary: #000000;
  --bg-tertiary: #333333;
  --text-primary: #FFFFFF;
  --text-secondary: #FFFFFF;
  --text-muted: #CCCCCC;
  --accent: #FFFF00;
  --accent-hover: #FFFF99;
  --success: #00FF00;
  --error: #FF6666;
  --warning: #FFAA00;
  --special: #FFFF00;
  --border: #FFFFFF;
  --focus-ring: #FFFF00;
}

/* ============================================
   SYSTEM PREFERENCE SUPPORT
   Auto-switch based on OS setting
   ============================================ */

@media (prefers-color-scheme: dark) {
  [data-theme="system"][data-base-theme="focus"] {
    --bg-primary: #18181B;
    --bg-secondary: #27272A;
    --bg-tertiary: #3F3F46;
    --text-primary: #FAFAFA;
    --text-secondary: #A1A1AA;
    --text-muted: #71717A;
    --accent: #3B82F6;
    --accent-hover: #60A5FA;
    --success: #22C55E;
    --error: #EF4444;
    --warning: #EAB308;
    --special: #3B82F6;
    --border: #3F3F46;
    --focus-ring: #3B82F6;
  }

  [data-theme="system"][data-base-theme="calm"] {
    --bg-primary: #1C1917;
    --bg-secondary: #292524;
    --bg-tertiary: #44403C;
    --text-primary: #FAFAF9;
    --text-secondary: #D6D3D1;
    --text-muted: #A8A29E;
    --accent: #D4A574;
    --accent-hover: #E4BC8E;
    --success: #84CC16;
    --error: #EA580C;
    --warning: #D97706;
    --special: #D4A574;
    --border: #44403C;
    --focus-ring: #D4A574;
  }

  [data-theme="system"][data-base-theme="fun"] {
    --bg-primary: #0F172A;
    --bg-secondary: #1E293B;
    --bg-tertiary: #334155;
    --text-primary: #F8FAFC;
    --text-secondary: #CBD5E1;
    --text-muted: #94A3B8;
    --accent: #A78BFA;
    --accent-hover: #C4B5FD;
    --success: #34D399;
    --error: #FB7185;
    --warning: #FBBF24;
    --special: #F472B6;
    --border: #334155;
    --focus-ring: #A78BFA;
  }

  [data-theme="system"][data-base-theme="hc"] {
    --bg-primary: #000000;
    --bg-secondary: #000000;
    --bg-tertiary: #333333;
    --text-primary: #FFFFFF;
    --text-secondary: #FFFFFF;
    --text-muted: #CCCCCC;
    --accent: #FFFF00;
    --accent-hover: #FFFF99;
    --success: #00FF00;
    --error: #FF6666;
    --warning: #FFAA00;
    --special: #FFFF00;
    --border: #FFFFFF;
    --focus-ring: #FFFF00;
  }
}

/* Light mode system preferences (explicit for completeness) */
@media (prefers-color-scheme: light) {
  [data-theme="system"][data-base-theme="focus"] {
    --bg-primary: #FAFAFA;
    --bg-secondary: #F0F0F0;
    --bg-tertiary: #E5E5E5;
    --text-primary: #1A1A1A;
    --text-secondary: #525252;
    --text-muted: #737373;
    --accent: #2563EB;
    --accent-hover: #1D4ED8;
    --success: #16A34A;
    --error: #DC2626;
    --warning: #CA8A04;
    --special: #2563EB;
    --border: #E5E5E5;
    --focus-ring: #2563EB;
  }

  [data-theme="system"][data-base-theme="calm"] {
    --bg-primary: #FFFBF5;
    --bg-secondary: #FEF3E2;
    --bg-tertiary: #FDE6C4;
    --text-primary: #44403C;
    --text-secondary: #78716C;
    --text-muted: #A8A29E;
    --accent: #9D7356;
    --accent-hover: #7C5A44;
    --success: #65A30D;
    --error: #C2410C;
    --warning: #B45309;
    --special: #9D7356;
    --border: #FDE6C4;
    --focus-ring: #9D7356;
  }

  [data-theme="system"][data-base-theme="fun"] {
    --bg-primary: #FFFFFF;
    --bg-secondary: #F0FDF4;
    --bg-tertiary: #DCFCE7;
    --text-primary: #14532D;
    --text-secondary: #166534;
    --text-muted: #4D7C5F;
    --accent: #8B5CF6;
    --accent-hover: #7C3AED;
    --success: #10B981;
    --error: #F43F5E;
    --warning: #F59E0B;
    --special: #EC4899;
    --border: #DCFCE7;
    --focus-ring: #8B5CF6;
  }

  [data-theme="system"][data-base-theme="hc"] {
    --bg-primary: #FFFFFF;
    --bg-secondary: #FFFFFF;
    --bg-tertiary: #E5E5E5;
    --text-primary: #000000;
    --text-secondary: #000000;
    --text-muted: #404040;
    --accent: #0000EE;
    --accent-hover: #0000AA;
    --success: #007700;
    --error: #CC0000;
    --warning: #886600;
    --special: #0000EE;
    --border: #000000;
    --focus-ring: #0000EE;
  }
}

/* ============================================
   HIGH CONTRAST SPECIFIC STYLES
   Additional rules for accessibility
   ============================================ */

[data-theme="hc-light"] *,
[data-theme="hc-dark"] *,
[data-theme="system"][data-base-theme="hc"] * {
  border-radius: 0 !important;
}

[data-theme="hc-light"] button,
[data-theme="hc-light"] a,
[data-theme="hc-light"] input,
[data-theme="hc-light"] select,
[data-theme="hc-dark"] button,
[data-theme="hc-dark"] a,
[data-theme="hc-dark"] input,
[data-theme="hc-dark"] select,
[data-theme="system"][data-base-theme="hc"] button,
[data-theme="system"][data-base-theme="hc"] a,
[data-theme="system"][data-base-theme="hc"] input,
[data-theme="system"][data-base-theme="hc"] select {
  border: 2px solid var(--border) !important;
}

[data-theme="hc-light"] *:focus,
[data-theme="hc-dark"] *:focus,
[data-theme="system"][data-base-theme="hc"] *:focus {
  outline: 3px solid var(--focus-ring) !important;
  outline-offset: 2px !important;
}

/* ============================================
   TRANSITIONS
   Smooth theme switching
   ============================================ */

body {
  transition: background-color 0.25s ease, color 0.25s ease;
}

/* Disable transitions for users who prefer reduced motion */
@media (prefers-reduced-motion: reduce) {
  body,
  body * {
    transition: none !important;
  }
}
```

---

## Update Tailwind Config

Update `tailwind.config.js` to use CSS variables:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic theme colors
        'bg-primary': 'var(--bg-primary)',
        'bg-secondary': 'var(--bg-secondary)',
        'bg-tertiary': 'var(--bg-tertiary)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
        'text-muted': 'var(--text-muted)',
        'accent': 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'success': 'var(--success)',
        'error': 'var(--error)',
        'warning': 'var(--warning)',
        'special': 'var(--special)',
        'border': 'var(--border)',
        'focus-ring': 'var(--focus-ring)',
      },
    },
  },
  plugins: [],
}
```

---

## Create Theme Context

Create `src/contexts/ThemeContext.jsx`:

```jsx
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
```

---

## Create Theme Selector Component

Create `src/components/ThemeSelector.jsx`:

```jsx
import { useTheme } from '../contexts/ThemeContext';

function ThemeSelector() {
  const { 
    theme, 
    setTheme, 
    mode, 
    setMode, 
    themes, 
    modes,
    themeLabels,
    modeLabels,
  } = useTheme();

  return (
    <div className="space-y-6">
      {/* Theme Selection */}
      <div>
        <label className="block text-text-secondary text-sm font-medium mb-3">
          Theme
        </label>
        <div className="flex flex-wrap gap-2">
          {themes.map((t) => (
            <button
              key={t}
              onClick={() => setTheme(t)}
              className={`
                px-4 py-2 rounded-lg border-2 transition-colors font-medium text-sm
                ${theme === t 
                  ? 'border-accent bg-accent text-white' 
                  : 'border-border bg-bg-secondary text-text-primary hover:border-accent'
                }
              `}
            >
              {themeLabels[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-text-secondary text-sm font-medium mb-3">
          Mode
        </label>
        <div className="flex gap-2">
          {modes.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`
                px-4 py-2 rounded-lg border-2 transition-colors font-medium text-sm
                ${mode === m 
                  ? 'border-accent bg-accent text-white' 
                  : 'border-border bg-bg-secondary text-text-primary hover:border-accent'
                }
              `}
            >
              {modeLabels[m]}
            </button>
          ))}
        </div>
        {mode === 'system' && (
          <p className="text-text-muted text-xs mt-2">
            Follows your device settings
          </p>
        )}
      </div>
    </div>
  );
}

export default ThemeSelector;
```

---

## Create Compact Theme Toggle

For use in the header/nav. Create `src/components/ThemeToggle.jsx`:

```jsx
import { useTheme } from '../contexts/ThemeContext';

function ThemeToggle() {
  const { theme, setTheme, mode, setMode, themes, themeLabels } = useTheme();

  const cycleTheme = () => {
    const currentIndex = themes.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themes.length;
    setTheme(themes[nextIndex]);
  };

  const cycleMode = () => {
    if (mode === 'light') setMode('dark');
    else if (mode === 'dark') setMode('system');
    else setMode('light');
  };

  const getModeIcon = () => {
    if (mode === 'light') return 'Sun';
    if (mode === 'dark') return 'Moon';
    return 'Monitor';
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={cycleTheme}
        className="px-3 py-1.5 text-xs font-medium rounded-md bg-bg-secondary border border-border text-text-secondary hover:border-accent transition-colors"
        title="Change theme"
      >
        {themeLabels[theme]}
      </button>
      <button
        onClick={cycleMode}
        className="p-1.5 rounded-md bg-bg-secondary border border-border text-text-secondary hover:border-accent transition-colors"
        title={`Mode: ${mode}`}
      >
        {/* Replace with actual icons from lucide-react */}
        <span className="text-xs">{getModeIcon()}</span>
      </button>
    </div>
  );
}

export default ThemeToggle;
```

---

## Update Main Styles

Update `src/styles/index.css` to import themes:

```css
@import './themes.css';

@tailwind base;
@tailwind components;
@tailwind utilities;

/* Base styles */
body {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid var(--focus-ring);
  outline-offset: 2px;
}

/* Scrollbar theming (optional, Webkit only) */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: var(--bg-secondary);
}

::-webkit-scrollbar-thumb {
  background: var(--bg-tertiary);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--text-muted);
}
```

---

## Update App.jsx

Wrap the app in ThemeProvider:

```jsx
import { ThemeProvider } from './contexts/ThemeContext';
// ... other imports

function App() {
  return (
    <ThemeProvider>
      {/* Rest of app */}
    </ThemeProvider>
  );
}

export default App;
```

---

## Update Existing Components

Replace all hardcoded colors with theme variables. Examples:

### Before:
```jsx
<div className="bg-slate-800 text-white">
<button className="bg-blue-500 hover:bg-blue-600">
<p className="text-gray-400">
```

### After:
```jsx
<div className="bg-bg-primary text-text-primary">
<button className="bg-accent hover:bg-accent-hover text-white">
<p className="text-text-muted">
```

### Color Mapping Guide:

| Old Color | New Variable |
|-----------|--------------|
| `bg-white`, `bg-slate-900`, `bg-zinc-900` | `bg-bg-primary` |
| `bg-gray-100`, `bg-slate-800`, `bg-zinc-800` | `bg-bg-secondary` |
| `bg-gray-200`, `bg-slate-700`, `bg-zinc-700` | `bg-bg-tertiary` |
| `text-black`, `text-white`, `text-slate-100` | `text-text-primary` |
| `text-gray-600`, `text-slate-300` | `text-text-secondary` |
| `text-gray-400`, `text-slate-500` | `text-text-muted` |
| `bg-blue-500`, `bg-blue-600` | `bg-accent` |
| `hover:bg-blue-600`, `hover:bg-blue-700` | `hover:bg-accent-hover` |
| `bg-green-500`, `text-green-500` | `bg-success`, `text-success` |
| `bg-red-500`, `text-red-500` | `bg-error`, `text-error` |
| `bg-yellow-500`, `text-yellow-500` | `bg-warning`, `text-warning` |
| `border-gray-200`, `border-slate-700` | `border-border` |

---

## Add Settings Page/Modal

Create a settings section that includes the ThemeSelector. This could be:
- A dedicated `/settings` route
- A modal triggered from the nav
- A slide-out panel

Example modal approach - create `src/components/SettingsModal.jsx`:

```jsx
import { useState } from 'react';
import ThemeSelector from './ThemeSelector';

function SettingsModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-bg-primary border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Settings</h2>
          <button 
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors"
          >
            Close
          </button>
        </div>
        
        <ThemeSelector />
      </div>
    </div>
  );
}

export default SettingsModal;
```

---

## Testing Checklist

After implementation, verify:

- [ ] All 8 theme variants display correctly
- [ ] System mode follows OS preference
- [ ] Theme persists after page refresh
- [ ] All text is readable in each theme
- [ ] High Contrast themes have visible borders on all elements
- [ ] Focus states are visible in all themes
- [ ] Transitions are smooth (no flash on load)
- [ ] No hardcoded colors remain in components
- [ ] Theme toggle in nav works correctly
- [ ] Settings modal/page displays correctly

---

## File Structure After Implementation

```
src/
├── contexts/
│   └── ThemeContext.jsx      (new)
├── components/
│   ├── ThemeSelector.jsx     (new)
│   ├── ThemeToggle.jsx       (new)
│   ├── SettingsModal.jsx     (new)
│   └── ... (existing, updated)
├── styles/
│   ├── index.css             (updated)
│   └── themes.css            (new)
├── App.jsx                   (updated)
└── ...
```

---

## Version Update

After completing the theme system, update `package.json` version to reflect this feature addition (minor version bump, e.g., 0.2.0 -> 0.3.0).

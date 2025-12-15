# ChaosLingua Improvements Implementation

## Overview

This prompt covers 5 major improvements to the ChaosLingua Romanian learning app:

1. **Fix counters/trackers** (bugs - highest priority)
2. **Fix contrast issues** (accessibility)
3. **Add imperial units** for recipes
4. **Add more audio/video content**
5. **Build "Word Forge"** - 4th learning mode

Work through these in order. Each phase builds on the previous.

---

## Phase 1: Fix Counters and Trackers

### Problem
Stats are not being tracked correctly across the app:
- FogMachine doesn't increment `totalSessions`
- ErrorGarden tracks NO stats at all
- `errorsHarvested` stat is never updated
- No time tracking for Error Garden sessions

### Step 1.1: Update INITIAL_STATS in App.jsx

```javascript
// src/App.jsx
const INITIAL_STATS = {
  chaosMinutes: 0,
  fogMinutes: 0,
  gardenMinutes: 0,        // NEW: time spent in Error Garden
  totalSessions: 0,
  wordsReviewed: 0,        // NEW: total vocabulary cards reviewed
  sentencesReviewed: 0,    // NEW: total sentences reviewed
  correctGuesses: 0,       // NEW: for accuracy tracking
  currentStreak: 0,        // NEW: current day streak
  longestStreak: 0,        // NEW: all-time best streak
  lastSessionDate: null,   // NEW: for streak calculation
};
```

### Step 1.2: Fix FogMachine.jsx

In `endSession` function, add `totalSessions` increment:

```javascript
// src/components/FogMachine.jsx
const endSession = () => {
  setIsRunning(false);
  const minutesSpent = Math.floor(timeInFog / 60);
  updateStats((prev) => ({
    ...prev,
    fogMinutes: prev.fogMinutes + minutesSpent,
    totalSessions: prev.totalSessions + 1,  // ADD THIS LINE
    lastSessionDate: new Date().toISOString().split('T')[0],
  }));
  setSessionActive(false);
  setCurrentContent(null);
  setCurrentStory(null);
  setTimeInFog(0);
};
```

### Step 1.3: Fix ErrorGarden.jsx - Add Session Timer

Add a timer to track time spent in Error Garden:

```javascript
// src/components/ErrorGarden.jsx
// Add at the top with other state:
const [sessionStartTime, setSessionStartTime] = useState(null);

// Update startSession:
const startSession = () => {
  setSessionActive(true);
  setCardsReviewed(0);
  setStreak(0);
  setSessionStartTime(Date.now());  // ADD THIS
  nextCard();
};

// Update endSession (create this function if it doesn't exist):
const endSession = () => {
  const sessionMinutes = sessionStartTime 
    ? Math.floor((Date.now() - sessionStartTime) / 60000) 
    : 0;
  
  updateStats((prev) => ({
    ...prev,
    gardenMinutes: (prev.gardenMinutes || 0) + sessionMinutes,
    totalSessions: prev.totalSessions + 1,
    wordsReviewed: (prev.wordsReviewed || 0) + (mode === 'words' ? cardsReviewed : 0),
    sentencesReviewed: (prev.sentencesReviewed || 0) + (mode === 'sentences' ? cardsReviewed : 0),
    lastSessionDate: new Date().toISOString().split('T')[0],
  }));
  
  setSessionActive(false);
  setCurrentCard(null);
  setSessionStartTime(null);
};
```

### Step 1.4: Track Correct Guesses

In ErrorGarden.jsx `checkGuess` function, update stats for correct answers:

```javascript
// Inside checkGuess(), after setting isCorrect:
if (correct) {
  setStreak((s) => s + 1);
  // ADD: Track correct guesses
  updateStats((prev) => ({
    ...prev,
    correctGuesses: (prev.correctGuesses || 0) + 1,
  }));
  // existing error removal code...
}
```

### Step 1.5: Update ProgressView.jsx to Show New Stats

```javascript
// src/components/ProgressView.jsx
// Update the stats grid to include new metrics:

<div className="grid grid-cols-2 gap-4 mb-6">
  <StatCard
    icon={Shuffle}
    value={stats.chaosMinutes}
    label="Chaos Minutes"
    gradient="from-bg-secondary to-bg-tertiary"
    borderColor="border-border"
    textColor="text-accent"
  />
  <StatCard
    icon={Flower2}
    value={errors.length}
    label="Words in Garden"
    gradient="from-bg-secondary to-bg-tertiary"
    borderColor="border-border"
    textColor="text-error"
  />
  <StatCard
    icon={CloudFog}
    value={stats.fogMinutes}
    label="Fog Minutes"
    gradient="from-bg-secondary to-bg-tertiary"
    borderColor="border-border"
    textColor="text-success"
  />
  <StatCard
    icon={BookOpen}
    value={stats.gardenMinutes || 0}
    label="Garden Minutes"
    gradient="from-bg-secondary to-bg-tertiary"
    borderColor="border-border"
    textColor="text-warning"
  />
</div>

// Add a new summary section for learning stats:
<div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
  <h3 className="text-lg font-semibold text-text-primary mb-4">Learning Stats</h3>
  <div className="grid grid-cols-2 gap-4 text-sm">
    <div>
      <p className="text-text-muted">Words Reviewed</p>
      <p className="text-2xl font-bold text-text-primary">{stats.wordsReviewed || 0}</p>
    </div>
    <div>
      <p className="text-text-muted">Sentences Reviewed</p>
      <p className="text-2xl font-bold text-text-primary">{stats.sentencesReviewed || 0}</p>
    </div>
    <div>
      <p className="text-text-muted">Accuracy</p>
      <p className="text-2xl font-bold text-success">
        {stats.wordsReviewed > 0 
          ? Math.round((stats.correctGuesses / stats.wordsReviewed) * 100) 
          : 0}%
      </p>
    </div>
    <div>
      <p className="text-text-muted">Total Sessions</p>
      <p className="text-2xl font-bold text-accent">{stats.totalSessions}</p>
    </div>
  </div>
</div>
```

### Step 1.6: Remove Hardcoded Gradients from ProgressView

Replace all hardcoded color gradients with theme-aware versions:

```javascript
// BEFORE (hardcoded):
gradient="from-purple-900/50 to-indigo-900/50"

// AFTER (theme-aware):
gradient="from-bg-secondary to-bg-tertiary"
```

Do this for ALL StatCard instances. The accent colors should come from the `textColor` prop, not the gradient.

---

## Phase 2: Fix Contrast Issues

### Step 2.1: Update themes.css - Darken Muted Colors

The `--text-muted` values are too light in several themes. Update these:

```css
/* src/styles/themes.css */

/* CALM LIGHT - darken text-muted */
[data-theme="calm-light"] {
  /* ... keep other values ... */
  --text-muted: #78716C;  /* WAS: #A8A29E - now darker for 4.5:1 contrast */
}

/* FUN LIGHT - darken text-muted */
[data-theme="fun-light"] {
  /* ... keep other values ... */
  --text-muted: #365A42;  /* WAS: #4D7C5F - now darker for 4.5:1 contrast */
}

/* FOCUS LIGHT - slightly darken */
[data-theme="focus-light"] {
  /* ... keep other values ... */
  --text-muted: #636363;  /* WAS: #737373 - slightly darker */
}
```

### Step 2.2: Add Feature Accent Variables

Add accent colors for each feature that work across all themes:

```css
/* Add to each theme block in themes.css */

/* FOCUS LIGHT */
[data-theme="focus-light"] {
  /* ... existing variables ... */
  --chaos-accent: #7C3AED;      /* purple */
  --chaos-accent-soft: #7C3AED20;
  --garden-accent: #DC2626;     /* rose/red */
  --garden-accent-soft: #DC262620;
  --fog-accent: #0D9488;        /* teal */
  --fog-accent-soft: #0D948820;
  --forge-accent: #D97706;      /* amber */
  --forge-accent-soft: #D9770620;
}

/* FOCUS DARK */
[data-theme="focus-dark"] {
  /* ... existing variables ... */
  --chaos-accent: #A78BFA;
  --chaos-accent-soft: #A78BFA20;
  --garden-accent: #FB7185;
  --garden-accent-soft: #FB718520;
  --fog-accent: #2DD4BF;
  --fog-accent-soft: #2DD4BF20;
  --forge-accent: #FBBF24;
  --forge-accent-soft: #FBBF2420;
}

/* CALM LIGHT */
[data-theme="calm-light"] {
  /* ... existing variables ... */
  --chaos-accent: #7C5A44;
  --chaos-accent-soft: #7C5A4420;
  --garden-accent: #9A3412;
  --garden-accent-soft: #9A341220;
  --fog-accent: #4D7C0F;
  --fog-accent-soft: #4D7C0F20;
  --forge-accent: #A16207;
  --forge-accent-soft: #A1620720;
}

/* CALM DARK */
[data-theme="calm-dark"] {
  /* ... existing variables ... */
  --chaos-accent: #D4A574;
  --chaos-accent-soft: #D4A57420;
  --garden-accent: #FB923C;
  --garden-accent-soft: #FB923C20;
  --fog-accent: #A3E635;
  --fog-accent-soft: #A3E63520;
  --forge-accent: #FCD34D;
  --forge-accent-soft: #FCD34D20;
}

/* FUN LIGHT */
[data-theme="fun-light"] {
  /* ... existing variables ... */
  --chaos-accent: #7C3AED;
  --chaos-accent-soft: #7C3AED20;
  --garden-accent: #E11D48;
  --garden-accent-soft: #E11D4820;
  --fog-accent: #0891B2;
  --fog-accent-soft: #0891B220;
  --forge-accent: #EA580C;
  --forge-accent-soft: #EA580C20;
}

/* FUN DARK */
[data-theme="fun-dark"] {
  /* ... existing variables ... */
  --chaos-accent: #C4B5FD;
  --chaos-accent-soft: #C4B5FD20;
  --garden-accent: #FDA4AF;
  --garden-accent-soft: #FDA4AF20;
  --fog-accent: #67E8F9;
  --fog-accent-soft: #67E8F920;
  --forge-accent: #FDBA74;
  --forge-accent-soft: #FDBA7420;
}

/* HIGH CONTRAST - use primary accent for all */
[data-theme="hc-light"] {
  /* ... existing variables ... */
  --chaos-accent: var(--accent);
  --chaos-accent-soft: #0000EE20;
  --garden-accent: #CC0000;
  --garden-accent-soft: #CC000020;
  --fog-accent: #007700;
  --fog-accent-soft: #00770020;
  --forge-accent: #886600;
  --forge-accent-soft: #88660020;
}

[data-theme="hc-dark"] {
  /* ... existing variables ... */
  --chaos-accent: var(--accent);
  --chaos-accent-soft: #FFFF0020;
  --garden-accent: #FF6666;
  --garden-accent-soft: #FF666620;
  --fog-accent: #00FF00;
  --fog-accent-soft: #00FF0020;
  --forge-accent: #FFAA00;
  --forge-accent-soft: #FFAA0020;
}
```

### Step 2.3: Update Tailwind Config

Add the new feature accent colors to tailwind.config.js:

```javascript
// tailwind.config.js
export default {
  // ...existing config...
  theme: {
    extend: {
      colors: {
        // ...existing colors...
        
        // Feature accents
        'chaos-accent': 'var(--chaos-accent)',
        'chaos-accent-soft': 'var(--chaos-accent-soft)',
        'garden-accent': 'var(--garden-accent)',
        'garden-accent-soft': 'var(--garden-accent-soft)',
        'fog-accent': 'var(--fog-accent)',
        'fog-accent-soft': 'var(--fog-accent-soft)',
        'forge-accent': 'var(--forge-accent)',
        'forge-accent-soft': 'var(--forge-accent-soft)',
      },
    },
  },
};
```

### Step 2.4: Update Components to Use Theme Colors

Replace hardcoded colors in each component. Here are the key replacements:

**ChaosEngine.jsx:**
```javascript
// BEFORE:
className="bg-purple-500/20"
className="text-purple-600 dark:text-purple-400"
className="bg-gradient-to-br from-purple-600 to-pink-600"
className="bg-purple-900/20 border-purple-800/30"
className="text-purple-600 dark:text-purple-300"

// AFTER:
className="bg-chaos-accent-soft"
className="text-chaos-accent"
className="bg-chaos-accent"  // For solid buttons, just use the accent
className="bg-chaos-accent-soft border-chaos-accent/30"
className="text-chaos-accent"
```

**FogMachine.jsx:**
```javascript
// BEFORE:
className="bg-teal-500/20"
className="text-teal-600 dark:text-teal-400"
className="from-teal-600 to-cyan-600"
className="bg-teal-900/20 border-teal-800/30"

// AFTER:
className="bg-fog-accent-soft"
className="text-fog-accent"
className="bg-fog-accent"
className="bg-fog-accent-soft border-fog-accent/30"
```

**ErrorGarden.jsx:**
```javascript
// BEFORE:
className="bg-rose-500/20"
className="text-rose-600 dark:text-rose-400"
className="from-rose-600 to-orange-600"
className="bg-rose-900/20 border-rose-800/30"

// AFTER:
className="bg-garden-accent-soft"
className="text-garden-accent"
className="bg-garden-accent"
className="bg-garden-accent-soft border-garden-accent/30"
```

### Step 2.5: Fix Warning Color Contrast

The warning color (#CA8A04) fails contrast on light backgrounds. Update:

```css
/* In themes.css, update warning colors */

[data-theme="focus-light"] {
  --warning: #A16207;  /* Darker amber, was #CA8A04 */
}

[data-theme="calm-light"] {
  --warning: #92400E;  /* Darker, was #B45309 */
}

[data-theme="fun-light"] {
  --warning: #B45309;  /* Keep as is, works on green bg */
}
```

---

## Phase 3: Imperial Units for Recipes

### Step 3.1: Create Unit Conversion Utility

Create new file `src/utils/unitConversion.js`:

```javascript
/**
 * Unit conversion utilities for recipes
 * Converts between metric and imperial measurements
 */

// Conversion factors and target units
const CONVERSIONS = {
  // Weight
  'g': { imperial: 'oz', factor: 0.035274, round: 0.25 },
  'kg': { imperial: 'lb', factor: 2.20462, round: 0.25 },
  
  // Volume
  'ml': { imperial: 'fl oz', factor: 0.033814, round: 0.5 },
  'l': { imperial: 'cups', factor: 4.22675, round: 0.25 },
  'litru': { imperial: 'cups', factor: 4.22675, round: 0.25 },
  
  // Romanian spoon measurements (keep as-is, just translate)
  'lingura': { imperial: 'tbsp', factor: 1, round: 1 },
  'linguri': { imperial: 'tbsp', factor: 1, round: 1 },
  'lingurita': { imperial: 'tsp', factor: 1, round: 1 },
  'lingurite': { imperial: 'tsp', factor: 1, round: 1 },
  
  // Count-based (no conversion needed)
  'bucata': { imperial: '', factor: 1, round: 1 },
  'bucati': { imperial: '', factor: 1, round: 1 },
  'legatura': { imperial: 'bunch', factor: 1, round: 1 },
  'legaturi': { imperial: 'bunches', factor: 1, round: 1 },
  'capatana': { imperial: 'head', factor: 1, round: 1 },
  'catei': { imperial: 'cloves', factor: 1, round: 1 },
  
  // Special
  'ore': { imperial: 'hours', factor: 1, round: 1 },
  'ora': { imperial: 'hour', factor: 1, round: 1 },
  'minute': { imperial: 'minutes', factor: 1, round: 1 },
};

/**
 * Round to nearest fraction for cooking-friendly amounts
 */
function roundToFraction(value, fraction) {
  return Math.round(value / fraction) * fraction;
}

/**
 * Format a number nicely (remove trailing zeros, use fractions where appropriate)
 */
function formatAmount(value) {
  // Common fractions for cooking
  const fractions = {
    0.25: '1/4',
    0.5: '1/2',
    0.75: '3/4',
    0.33: '1/3',
    0.67: '2/3',
  };
  
  const whole = Math.floor(value);
  const decimal = value - whole;
  
  // Check if decimal is close to a common fraction
  for (const [dec, frac] of Object.entries(fractions)) {
    if (Math.abs(decimal - parseFloat(dec)) < 0.05) {
      return whole > 0 ? `${whole} ${frac}` : frac;
    }
  }
  
  // Otherwise, just format the number
  if (decimal === 0) return whole.toString();
  return value.toFixed(1).replace(/\.0$/, '');
}

/**
 * Parse an amount string like "500 g" or "2 bucati"
 * Returns { value: number, unit: string, extra: string }
 */
function parseAmount(amountStr) {
  if (!amountStr) return { value: 0, unit: '', extra: '' };
  
  // Handle special cases like "dupa gust" (to taste)
  if (amountStr.includes('dupa gust') || amountStr.includes('optional')) {
    return { value: 0, unit: '', extra: amountStr };
  }
  
  // Match patterns like "500 g", "1/2 lingurita", "2-3 bucati"
  const match = amountStr.match(/^([\d.,\/\-]+)\s*(.+)$/);
  
  if (!match) {
    return { value: 0, unit: '', extra: amountStr };
  }
  
  let valueStr = match[1];
  const unitPart = match[2].trim();
  
  // Handle fractions like "1/2"
  if (valueStr.includes('/')) {
    const [num, denom] = valueStr.split('/').map(Number);
    valueStr = (num / denom).toString();
  }
  
  // Handle ranges like "2-3" - take the average
  if (valueStr.includes('-')) {
    const [min, max] = valueStr.split('-').map(Number);
    valueStr = ((min + max) / 2).toString();
  }
  
  return {
    value: parseFloat(valueStr.replace(',', '.')) || 0,
    unit: unitPart.split(' ')[0].toLowerCase(),
    extra: unitPart.split(' ').slice(1).join(' '),
  };
}

/**
 * Convert an amount to imperial
 * @param {string} amountStr - Original amount like "500 g"
 * @returns {string} - Converted amount like "17.5 oz"
 */
export function convertToImperial(amountStr) {
  const { value, unit, extra } = parseAmount(amountStr);
  
  if (value === 0) return amountStr; // Return as-is for special cases
  
  const conversion = CONVERSIONS[unit];
  
  if (!conversion) {
    // Unknown unit, return original
    return amountStr;
  }
  
  if (conversion.factor === 1 && conversion.imperial) {
    // Just translate the unit name
    return `${value} ${conversion.imperial}${extra ? ' ' + extra : ''}`;
  }
  
  if (conversion.factor === 1) {
    // Keep as-is (like "bucati")
    return amountStr;
  }
  
  // Convert the value
  const converted = value * conversion.factor;
  const rounded = roundToFraction(converted, conversion.round);
  const formatted = formatAmount(rounded);
  
  return `${formatted} ${conversion.imperial}${extra ? ' ' + extra : ''}`;
}

/**
 * Get the display amount based on unit preference
 */
export function getDisplayAmount(amount, useImperial = false) {
  if (!useImperial) return amount;
  return convertToImperial(amount);
}

export default { convertToImperial, getDisplayAmount };
```

### Step 3.2: Create Settings Context

Create `src/contexts/SettingsContext.jsx`:

```javascript
import { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext(null);

const STORAGE_KEY = 'chaoslingua-settings';

const DEFAULT_SETTINGS = {
  unitSystem: 'metric', // 'metric' | 'imperial'
  autoImperialWithEnglish: true, // When showing English, auto-switch to imperial
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setSettings({ ...DEFAULT_SETTINGS, ...JSON.parse(saved) });
      }
    } catch (e) {
      console.warn('Failed to load settings:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.warn('Failed to save settings:', e);
    }
  }, [settings, isLoaded]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, isLoaded }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within SettingsProvider');
  }
  return context;
}

export default SettingsContext;
```

### Step 3.3: Update App.jsx to Include SettingsProvider

```javascript
// src/App.jsx
import { SettingsProvider } from './contexts/SettingsContext';

export default function App() {
  return (
    <ThemeProvider>
      <SettingsProvider>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </SettingsProvider>
    </ThemeProvider>
  );
}
```

### Step 3.4: Update RecipeCard.jsx

```javascript
// src/components/RecipeCard.jsx
import { useSettings } from '../contexts/SettingsContext';
import { getDisplayAmount } from '../utils/unitConversion';

function RecipeCard({ recipe, compact = false }) {
  const [showEnglish, setShowEnglish] = useState(false);
  const { settings } = useSettings();
  
  // Determine if we should show imperial units
  const useImperial = settings.unitSystem === 'imperial' || 
    (settings.autoImperialWithEnglish && showEnglish);

  // ... existing code ...

  // Update the ingredients rendering:
  {expandedSections.ingredients && (
    <ul className="px-5 pb-4 space-y-2">
      {recipe.ingredients.map((ing, index) => (
        <li key={index} className="flex items-start gap-2 text-text-secondary">
          <span className="text-warning mt-1">-</span>
          <span>
            <span className="font-medium">
              {getDisplayAmount(ing.amount, useImperial)}
            </span>
            {' '}
            {showEnglish ? ing.en : ing.ro}
            {!showEnglish && ing.en && (
              <span className="text-text-muted text-sm ml-2">({ing.en})</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  )}
```

### Step 3.5: Add Unit Toggle to SettingsModal

Update `src/components/SettingsModal.jsx`:

```javascript
import { useSettings } from '../contexts/SettingsContext';
import ThemeSelector from './ThemeSelector';

function SettingsModal({ isOpen, onClose }) {
  const { settings, updateSetting } = useSettings();
  
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-bg-primary border border-border rounded-xl p-6 w-full max-w-md mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
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
        
        {/* Theme Settings */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wide">
            Appearance
          </h3>
          <ThemeSelector />
        </div>
        
        {/* Unit Settings */}
        <div className="mb-8">
          <h3 className="text-sm font-medium text-text-muted mb-4 uppercase tracking-wide">
            Measurements
          </h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-text-secondary text-sm mb-2">
                Unit System
              </label>
              <div className="flex gap-2">
                <button
                  onClick={() => updateSetting('unitSystem', 'metric')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors text-sm font-medium ${
                    settings.unitSystem === 'metric'
                      ? 'border-accent bg-accent text-white'
                      : 'border-border bg-bg-secondary text-text-primary hover:border-accent'
                  }`}
                >
                  Metric (g, ml)
                </button>
                <button
                  onClick={() => updateSetting('unitSystem', 'imperial')}
                  className={`flex-1 py-2 px-4 rounded-lg border-2 transition-colors text-sm font-medium ${
                    settings.unitSystem === 'imperial'
                      ? 'border-accent bg-accent text-white'
                      : 'border-border bg-bg-secondary text-text-primary hover:border-accent'
                  }`}
                >
                  Imperial (oz, cups)
                </button>
              </div>
            </div>
            
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.autoImperialWithEnglish}
                onChange={(e) => updateSetting('autoImperialWithEnglish', e.target.checked)}
                className="w-5 h-5 rounded border-border text-accent focus:ring-accent"
              />
              <span className="text-text-secondary text-sm">
                Auto-switch to imperial when viewing English
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SettingsModal;
```

---

## Phase 4: Add More Audio/Video Content

### Step 4.1: Add New Content to content.js

Add these items to the `CONTENT_DATABASE` array in `src/data/content.js`:

```javascript
// ============================================
// YOUTUBE - Romanian Music & Entertainment
// ============================================
{
  id: 'yt-muzica-romaneasca-hits',
  contentType: 'video',
  title: 'Top Romanian Music Hits',
  description: 'Popular Romanian pop and manele songs. Great for picking up colloquial expressions.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 6,
  topics: ['music', 'culture', 'vocabulary'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Various Artists',
},
{
  id: 'yt-selly-vlog',
  contentType: 'video',
  title: 'Selly - Romanian Vlogger',
  description: 'Most popular Romanian YouTuber. Fast-paced, colloquial Romanian with lots of slang.',
  embedUrl: 'https://www.youtube.com/embed/0E_F0bdwHQo',
  platform: 'youtube',
  type: 'video',
  difficulty: 8,
  topics: ['vlog', 'entertainment', 'slang'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Selly',
},
{
  id: 'yt-bromania-comedy',
  contentType: 'video',
  title: 'BRomania - Comedy Sketches',
  description: 'Popular Romanian comedy channel. Humor helps with cultural understanding.',
  embedUrl: 'https://www.youtube.com/embed/g0iyH9txXQc',
  platform: 'youtube',
  type: 'video',
  difficulty: 7,
  topics: ['comedy', 'entertainment', 'culture'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'BRomania',
},
{
  id: 'yt-iumor-clips',
  contentType: 'video',
  title: 'iUmor - Romanian Comedy Show',
  description: 'Clips from popular Romanian comedy talent show. Stand-up and sketches.',
  embedUrl: 'https://www.youtube.com/embed/vn1P3Z1Nqpo',
  platform: 'youtube',
  type: 'video',
  difficulty: 8,
  topics: ['comedy', 'entertainment'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'iUmor / Antena 1',
},
{
  id: 'yt-la-bloc-sitcom',
  contentType: 'video',
  title: 'La Bloc - Romanian Sitcom',
  description: 'Classic Romanian sitcom. Clear dialogue, everyday situations.',
  embedUrl: 'https://www.youtube.com/embed/XVqJGTXkavI',
  platform: 'youtube',
  type: 'video',
  difficulty: 6,
  topics: ['sitcom', 'conversation', 'culture'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'La Bloc / PRO TV',
},
{
  id: 'yt-mireasa-reality',
  contentType: 'video',
  title: 'Mireasa - Reality TV Clips',
  description: 'Romanian dating reality show. Emotional conversations, relationship vocabulary.',
  embedUrl: 'https://www.youtube.com/embed/Y8Nv_7LqY8I',
  platform: 'youtube',
  type: 'video',
  difficulty: 7,
  topics: ['reality-tv', 'conversation', 'emotions'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Mireasa / Antena 1',
},

// ============================================
// YOUTUBE - Educational & Documentary
// ============================================
{
  id: 'yt-adevar-stiinta',
  contentType: 'video',
  title: 'Adevar despre Stiinta - Science',
  description: 'Romanian science explainer videos. Clear narration, educational content.',
  embedUrl: 'https://www.youtube.com/embed/RKK7wGAYP6k',
  platform: 'youtube',
  type: 'video',
  difficulty: 6,
  topics: ['science', 'education'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Adevar despre Stiinta',
},
{
  id: 'yt-historia-documentaries',
  contentType: 'video',
  title: 'Historia - Romanian History Docs',
  description: 'Romanian history documentaries. Formal language, historical vocabulary.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLz2kU5xLgz5C_tPZx3qZfKqYvKVfVJGjR',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 7,
  topics: ['history', 'documentary', 'culture'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Historia',
},

// ============================================
// YOUTUBE - More Kids Content (Low Fog)
// ============================================
{
  id: 'yt-gasca-zurli-playlist',
  contentType: 'video',
  title: 'Gasca Zurli - Kids Show Playlist',
  description: 'Popular Romanian kids entertainment. Songs, games, simple vocabulary.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLPMa2dqKbFJT7xWPj0bgC_jLa-vpOxVxk',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 2,
  topics: ['kids', 'music', 'vocabulary'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Gasca Zurli',
},
{
  id: 'yt-poezii-copii',
  contentType: 'video',
  title: 'Poezii pentru Copii - Kids Poetry',
  description: 'Classic Romanian childrens poems recited. Great for rhythm and pronunciation.',
  embedUrl: 'https://www.youtube.com/embed/X2SbIxkVGLc',
  platform: 'youtube',
  type: 'video',
  difficulty: 3,
  topics: ['kids', 'poetry', 'pronunciation'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Poezii pentru Copii',
},

// ============================================
// SPOTIFY - More Podcasts
// ============================================
{
  id: 'sp-intre-showuri',
  contentType: 'audio',
  title: 'Intre Showuri cu Teo',
  description: 'Pop culture podcast with comedian Teo. Casual, conversational Romanian.',
  embedUrl: 'https://open.spotify.com/embed/show/6uxed3qFKDZZLGlxtqPjhF?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 7,
  topics: ['entertainment', 'culture', 'humor'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Intre Showuri',
},
{
  id: 'sp-romania-explicata',
  contentType: 'audio',
  title: 'Romania Explicata',
  description: 'Podcast explaining Romanian current events and society. Clear explanations.',
  embedUrl: 'https://open.spotify.com/embed/show/4q6n3xO6Y5DcqJN5xYQNnE?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 6,
  topics: ['current-events', 'society', 'education'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Romania Explicata',
},
{
  id: 'sp-doza-de-has',
  contentType: 'audio',
  title: 'Doza de Has - Science Podcast',
  description: 'Romanian science and psychology podcast. Thoughtful discussions.',
  embedUrl: 'https://open.spotify.com/embed/show/4bJJBpRR0RgzWhtCmVRR7s?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 7,
  topics: ['science', 'psychology', 'education'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Doza de Has',
},
{
  id: 'sp-romanianpod101',
  contentType: 'audio',
  title: 'RomanianPod101 - Lessons',
  description: 'Structured Romanian lessons. Grammar explanations with English.',
  embedUrl: 'https://open.spotify.com/embed/show/7pDkXTNP3DtX9WLdJxVPLF?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 3,
  topics: ['grammar', 'vocabulary', 'structured'],
  sessionTypes: ['chaos_window', 'grammar_spiral'],
  instructionLang: 'en',
  source: 'RomanianPod101',
},

// ============================================
// SPOTIFY - Music Playlists
// ============================================
{
  id: 'sp-top-romania',
  contentType: 'audio',
  title: 'Top 50 Romania - Current Hits',
  description: 'Current Romanian chart toppers. Mix of Romanian and international songs.',
  embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZEVXbNZbJ6TZelCq?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'playlist',
  difficulty: 5,
  topics: ['music', 'culture', 'current'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
  source: 'Spotify Romania',
},
{
  id: 'sp-romanian-folk',
  contentType: 'audio',
  title: 'Romanian Folk Music - Muzica Populara',
  description: 'Traditional Romanian folk songs. Cultural heritage, older vocabulary.',
  embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZF1DX8s6ovPPL8F2?utm_source=generator&theme=0',
  platform: 'spotify',
  type: 'playlist',
  difficulty: 6,
  topics: ['music', 'folk', 'culture', 'traditional'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
  source: 'Spotify',
},
```

### Step 4.2: Update Content Counts

The content.js file should now have approximately 45-50 items. Verify the count matches what's displayed in the UI.

---

## Phase 5: Build Word Forge (4th Learning Mode)

### Step 5.1: Create WordForge Component

Create new file `src/components/WordForge.jsx`:

```javascript
/**
 * WordForge Component
 * 
 * Active production practice for Romanian.
 * Modes:
 * - Fill-in-blank: Complete sentences with missing words
 * - Sentence Builder: Arrange word tiles into correct order
 * - Translation: English to Romanian writing practice
 */

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Hammer, ArrowRight, Check, X, Shuffle, RotateCcw, Sparkles } from 'lucide-react';
import { getRandomSentence, TATOEBA_BEGINNER, TATOEBA_INTERMEDIATE } from '../data/tatoeba';

// Use beginner and intermediate sentences for production practice
const FORGE_SENTENCES = [...TATOEBA_BEGINNER, ...TATOEBA_INTERMEDIATE];

// Shuffle array helper
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create a fill-in-blank challenge from a sentence
const createBlankChallenge = (sentence) => {
  const words = sentence.romanian.split(' ');
  if (words.length < 3) return null;
  
  // Pick a random word to blank out (not first or last)
  const blankIndex = Math.floor(Math.random() * (words.length - 2)) + 1;
  const answer = words[blankIndex];
  const display = words.map((w, i) => i === blankIndex ? '_____' : w).join(' ');
  
  return { display, answer, full: sentence.romanian, english: sentence.english };
};

// Create a sentence builder challenge
const createBuilderChallenge = (sentence) => {
  const words = sentence.romanian.split(' ');
  if (words.length < 3 || words.length > 8) return null;
  
  return {
    correct: words,
    shuffled: shuffleArray(words),
    english: sentence.english,
  };
};

const MODES = [
  { id: 'blank', label: 'Fill in Blank', icon: '___' },
  { id: 'builder', label: 'Sentence Builder', icon: '[ ]' },
  { id: 'translate', label: 'Translate', icon: 'EN→RO' },
];

export default function WordForge({ updateStats }) {
  const [sessionActive, setSessionActive] = useState(false);
  const [mode, setMode] = useState('blank');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const inputRef = useRef(null);

  const getNewChallenge = useCallback(() => {
    const sentence = getRandomSentence(FORGE_SENTENCES);
    
    if (mode === 'blank') {
      let challenge = createBlankChallenge(sentence);
      // Try a few times if the sentence is too short
      let attempts = 0;
      while (!challenge && attempts < 5) {
        challenge = createBlankChallenge(getRandomSentence(FORGE_SENTENCES));
        attempts++;
      }
      return challenge || { display: sentence.romanian, answer: '', full: sentence.romanian, english: sentence.english };
    }
    
    if (mode === 'builder') {
      let challenge = createBuilderChallenge(sentence);
      let attempts = 0;
      while (!challenge && attempts < 5) {
        challenge = createBuilderChallenge(getRandomSentence(FORGE_SENTENCES));
        attempts++;
      }
      return challenge;
    }
    
    if (mode === 'translate') {
      return {
        english: sentence.english,
        answer: sentence.romanian,
      };
    }
    
    return null;
  }, [mode]);

  const startSession = () => {
    setSessionActive(true);
    setCompleted(0);
    setStreak(0);
    setSessionStart(Date.now());
    nextChallenge();
  };

  const nextChallenge = useCallback(() => {
    setCurrentChallenge(getNewChallenge());
    setUserAnswer('');
    setSelectedTiles([]);
    setShowResult(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [getNewChallenge]);

  const checkAnswer = () => {
    if (!currentChallenge) return;
    
    let correct = false;
    
    if (mode === 'blank') {
      correct = userAnswer.toLowerCase().trim() === currentChallenge.answer.toLowerCase();
    } else if (mode === 'builder') {
      correct = selectedTiles.join(' ') === currentChallenge.correct.join(' ');
    } else if (mode === 'translate') {
      // More lenient check for translation
      const userWords = userAnswer.toLowerCase().trim().split(' ');
      const answerWords = currentChallenge.answer.toLowerCase().split(' ');
      const matchCount = userWords.filter(w => answerWords.includes(w)).length;
      correct = matchCount >= answerWords.length * 0.7; // 70% word match
    }
    
    setIsCorrect(correct);
    setShowResult(true);
    setCompleted(c => c + 1);
    
    if (correct) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleTileClick = (word, index) => {
    if (showResult) return;
    
    // Check if already selected
    const existingIndex = selectedTiles.findIndex((t, i) => 
      currentChallenge.shuffled.indexOf(word) === currentChallenge.shuffled.indexOf(selectedTiles[i]) && 
      selectedTiles.slice(0, i + 1).filter(x => x === word).length === selectedTiles.slice(0, index + 1).filter(x => x === word).length
    );
    
    if (selectedTiles.includes(word) && selectedTiles.lastIndexOf(word) === selectedTiles.length - 1) {
      // Remove if it's the last selected
      setSelectedTiles(prev => prev.slice(0, -1));
    } else {
      setSelectedTiles(prev => [...prev, word]);
    }
  };

  const endSession = () => {
    const sessionMinutes = sessionStart 
      ? Math.floor((Date.now() - sessionStart) / 60000) 
      : 0;
    
    updateStats((prev) => ({
      ...prev,
      forgeMinutes: (prev.forgeMinutes || 0) + sessionMinutes,
      totalSessions: prev.totalSessions + 1,
      sentencesReviewed: (prev.sentencesReviewed || 0) + completed,
      lastSessionDate: new Date().toISOString().split('T')[0],
    }));
    
    setSessionActive(false);
    setCurrentChallenge(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showResult) {
        nextChallenge();
      } else if (mode !== 'builder') {
        checkAnswer();
      }
    }
  };

  // ============================================
  // SETUP STATE
  // ============================================
  if (!sessionActive) {
    return (
      <div className="min-h-screen pb-24 md:pt-20 px-6">
        <div className="max-w-lg mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-forge-accent-soft rounded-2xl mb-4">
              <Hammer size={40} className="text-forge-accent" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Word Forge</h1>
            <p className="text-text-muted">Forge your skills through active production</p>
          </div>

          {/* Mode Selection */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Choose Your Forge</h3>
            <div className="space-y-3">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                    mode === m.id
                      ? 'border-forge-accent bg-forge-accent-soft'
                      : 'border-border bg-bg-tertiary hover:border-forge-accent/50'
                  }`}
                >
                  <span className={`text-lg font-mono ${mode === m.id ? 'text-forge-accent' : 'text-text-muted'}`}>
                    {m.icon}
                  </span>
                  <div>
                    <p className={`font-medium ${mode === m.id ? 'text-forge-accent' : 'text-text-primary'}`}>
                      {m.label}
                    </p>
                    <p className="text-text-muted text-sm">
                      {m.id === 'blank' && 'Complete sentences with missing words'}
                      {m.id === 'builder' && 'Arrange words into correct order'}
                      {m.id === 'translate' && 'Write Romanian from English prompts'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-forge-accent-soft rounded-2xl p-6 border border-forge-accent/30 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">The Forge Method</h3>
            <ul className="text-text-secondary space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Production strengthens memory more than recognition</span>
              </li>
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Mistakes reveal gaps - embrace them</span>
              </li>
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Speed comes with practice, start slow</span>
              </li>
            </ul>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-forge-accent rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Start Forging
            <ArrowRight size={20} />
          </button>

          <p className="text-center text-text-muted text-sm mt-4">
            {FORGE_SENTENCES.length} sentences available
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ACTIVE SESSION
  // ============================================
  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-lg mx-auto py-8">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-text-muted">Completed: </span>
              <span className="text-text-primary font-medium">{completed}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/20 rounded-full">
                <Sparkles size={14} className="text-success" />
                <span className="text-success text-sm font-medium">{streak} streak</span>
              </div>
            )}
          </div>
          <button
            onClick={endSession}
            className="text-text-muted hover:text-text-primary transition-colors text-sm"
          >
            End Session
          </button>
        </div>

        {/* Challenge Card */}
        <div
          className={`rounded-2xl p-8 mb-6 transition-all duration-300 ${
            showResult
              ? isCorrect
                ? 'bg-success/20 border-2 border-success'
                : 'bg-error/20 border-2 border-error'
              : 'bg-bg-secondary border border-border'
          }`}
        >
          {/* Mode Label */}
          <p className="text-text-muted text-sm mb-2 text-center">
            {mode === 'blank' && 'Fill in the blank:'}
            {mode === 'builder' && 'Build this sentence:'}
            {mode === 'translate' && 'Translate to Romanian:'}
          </p>

          {/* Challenge Display */}
          <div className="text-center mb-6">
            {mode === 'blank' && currentChallenge && (
              <>
                <p className="text-2xl font-bold text-text-primary mb-2">
                  {currentChallenge.display}
                </p>
                <p className="text-text-muted text-sm italic">
                  {currentChallenge.english}
                </p>
              </>
            )}
            
            {mode === 'builder' && currentChallenge && (
              <>
                <p className="text-lg text-text-secondary mb-4 italic">
                  "{currentChallenge.english}"
                </p>
                {/* Selected tiles display */}
                <div className="min-h-[60px] bg-bg-tertiary rounded-xl p-4 mb-4 flex flex-wrap gap-2 justify-center items-center">
                  {selectedTiles.length === 0 ? (
                    <span className="text-text-muted">Tap words below to build...</span>
                  ) : (
                    selectedTiles.map((word, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-forge-accent text-white rounded-lg font-medium"
                      >
                        {word}
                      </span>
                    ))
                  )}
                </div>
                {/* Word tiles */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentChallenge.shuffled.map((word, i) => {
                    const usedCount = selectedTiles.filter(t => t === word).length;
                    const availableCount = currentChallenge.shuffled.filter(t => t === word).length;
                    const isUsed = usedCount > 0 && usedCount >= currentChallenge.shuffled.slice(0, i + 1).filter(t => t === word).length;
                    
                    return (
                      <button
                        key={i}
                        onClick={() => handleTileClick(word, i)}
                        disabled={showResult}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          isUsed
                            ? 'bg-bg-tertiary text-text-muted opacity-50'
                            : 'bg-bg-tertiary text-text-primary hover:bg-forge-accent hover:text-white'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
            
            {mode === 'translate' && currentChallenge && (
              <p className="text-2xl font-bold text-text-primary">
                "{currentChallenge.english}"
              </p>
            )}
          </div>

          {/* Input (for blank and translate modes) */}
          {(mode === 'blank' || mode === 'translate') && !showResult && (
            <div>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={mode === 'blank' ? 'Type the missing word...' : 'Type your translation...'}
                className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-4 text-text-primary text-center text-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-forge-accent mb-4"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
              />
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full py-3 bg-forge-accent rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Check
              </button>
            </div>
          )}

          {/* Check button for builder mode */}
          {mode === 'builder' && !showResult && (
            <button
              onClick={checkAnswer}
              disabled={selectedTiles.length !== currentChallenge?.correct?.length}
              className="w-full py-3 bg-forge-accent rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Check Order
            </button>
          )}

          {/* Result Display */}
          {showResult && (
            <div className="text-center">
              <div className="mb-4">
                {isCorrect ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <Check size={24} className="text-white" />
                    </div>
                    <p className="text-success text-xl font-bold">Correct!</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
                        <X size={24} className="text-white" />
                      </div>
                    </div>
                    <p className="text-error text-lg mb-2">Not quite...</p>
                    <p className="text-text-primary font-bold text-xl">
                      {mode === 'blank' && currentChallenge.full}
                      {mode === 'builder' && currentChallenge.correct.join(' ')}
                      {mode === 'translate' && currentChallenge.answer}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={nextChallenge}
                className="w-full py-3 bg-bg-tertiary rounded-xl text-text-primary font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                Next Challenge
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Reset builder */}
        {mode === 'builder' && selectedTiles.length > 0 && !showResult && (
          <button
            onClick={() => setSelectedTiles([])}
            className="w-full py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw size={14} />
            Clear Selection
          </button>
        )}

        {/* Tip */}
        <div className="mt-6 p-4 bg-forge-accent-soft rounded-xl border border-forge-accent/30">
          <p className="text-forge-accent text-sm text-center italic">
            {mode === 'blank' && 'Context clues help - look at the whole sentence!'}
            {mode === 'builder' && 'Romanian word order is flexible - trust your instincts!'}
            {mode === 'translate' && "Don't aim for perfect - get the meaning across!"}
          </p>
        </div>
      </div>
    </div>
  );
}
```

### Step 5.2: Add Word Forge to App.jsx

```javascript
// src/App.jsx
import WordForge from './components/WordForge';

// Add to INITIAL_STATS:
const INITIAL_STATS = {
  chaosMinutes: 0,
  fogMinutes: 0,
  gardenMinutes: 0,
  forgeMinutes: 0,        // NEW
  totalSessions: 0,
  wordsReviewed: 0,
  sentencesReviewed: 0,
  correctGuesses: 0,
  currentStreak: 0,
  longestStreak: 0,
  lastSessionDate: null,
};

// Add to renderView switch:
case 'forge':
  return (
    <WordForge
      updateStats={setStats}
    />
  );
```

### Step 5.3: Update Navigation.jsx

Add Word Forge to the navigation:

```javascript
// src/components/Navigation.jsx
import { Home, Shuffle, Flower2, CloudFog, BarChart3, Hammer } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chaos', label: 'Chaos', icon: Shuffle },
  { id: 'garden', label: 'Garden', icon: Flower2 },
  { id: 'fog', label: 'Fog', icon: CloudFog },
  { id: 'forge', label: 'Forge', icon: Hammer },  // NEW
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];
```

### Step 5.4: Update HomeView.jsx

Add Word Forge card to home screen:

```javascript
// In the features grid, add a new card:
<button
  onClick={() => setCurrentView('forge')}
  className="bg-bg-secondary rounded-2xl p-6 border border-border hover:border-forge-accent transition-all text-left group"
>
  <div className="flex items-start justify-between mb-4">
    <div className="p-3 bg-forge-accent-soft rounded-xl group-hover:scale-110 transition-transform">
      <Hammer size={24} className="text-forge-accent" />
    </div>
  </div>
  <h3 className="text-lg font-semibold text-text-primary mb-1">Word Forge</h3>
  <p className="text-text-muted text-sm">
    Build sentences and practice production
  </p>
</button>
```

Don't forget to import Hammer from lucide-react.

### Step 5.5: Update ProgressView for Forge Stats

Add forge minutes to the stats display:

```javascript
// Add to the stats grid:
<StatCard
  icon={Hammer}
  value={stats.forgeMinutes || 0}
  label="Forge Minutes"
  gradient="from-bg-secondary to-bg-tertiary"
  borderColor="border-border"
  textColor="text-forge-accent"
/>
```

---

## Phase 6: Final Testing Checklist

### Stats/Trackers
- [ ] Start and end a Chaos Engine session - verify chaosMinutes and totalSessions increment
- [ ] Start and end a Fog Machine session - verify fogMinutes and totalSessions increment
- [ ] Start and end an Error Garden session - verify gardenMinutes, wordsReviewed, and totalSessions increment
- [ ] Get correct/incorrect answers - verify correctGuesses and error tracking
- [ ] Check ProgressView shows all new stats correctly

### Contrast/Themes
- [ ] Test all 8 themes (4 themes x light/dark)
- [ ] Verify text-muted is readable on all backgrounds
- [ ] Check feature accent colors work in each theme
- [ ] Verify no hardcoded purple/teal/rose colors remain
- [ ] Test High Contrast theme specifically for visibility

### Imperial Units
- [ ] View a recipe in English - verify amounts convert
- [ ] Check settings modal has unit toggle
- [ ] Toggle between metric/imperial manually
- [ ] Verify auto-switch with English works

### New Content
- [ ] Count total items in Chaos Window content pool (should be ~45-50)
- [ ] Shuffle through and verify new videos/podcasts load
- [ ] Check difficulty range (should have 1-10 spread)

### Word Forge
- [ ] Test Fill-in-Blank mode
- [ ] Test Sentence Builder mode
- [ ] Test Translation mode
- [ ] Verify stats are tracked (forgeMinutes, sentencesReviewed)
- [ ] Check navigation includes Forge
- [ ] Verify home screen has Forge card

---

## Version Update

After completing all phases, update `package.json`:

```json
{
  "version": "0.4.0"
}
```

Commit message: `feat: major update - stats fix, contrast improvements, imperial units, new content, Word Forge mode`

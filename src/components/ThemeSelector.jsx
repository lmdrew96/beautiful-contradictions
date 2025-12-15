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

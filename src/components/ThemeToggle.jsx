import { Sun, Moon, Monitor } from 'lucide-react';
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
    if (mode === 'light') return <Sun className="w-4 h-4" />;
    if (mode === 'dark') return <Moon className="w-4 h-4" />;
    return <Monitor className="w-4 h-4" />;
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
        {getModeIcon()}
      </button>
    </div>
  );
}

export default ThemeToggle;

import { X } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { useSettings } from '../contexts/SettingsContext';

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
            className="text-text-muted hover:text-text-primary transition-colors p-1"
          >
            <X className="w-5 h-5" />
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

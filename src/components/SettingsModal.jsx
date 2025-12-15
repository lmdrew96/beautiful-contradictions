import { X } from 'lucide-react';
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
            className="text-text-muted hover:text-text-primary transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <ThemeSelector />
      </div>
    </div>
  );
}

export default SettingsModal;

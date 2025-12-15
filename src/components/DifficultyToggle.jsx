import React from 'react';
import { useDifficulty } from '../contexts/DifficultyContext';
import { getDifficultyLabel } from '../utils/difficulty';

export default function DifficultyToggle({ mode }) {
  const { getLevel, getOverride, getEffectiveLevel, setOverride } = useDifficulty();

  const level = getLevel(mode);
  const override = getOverride(mode);
  const effectiveLevel = getEffectiveLevel(mode);

  const options = [
    { value: 'easy', label: 'Easy', offset: -2 },
    { value: 'normal', label: 'Normal', offset: 0 },
    { value: 'hard', label: 'Hard', offset: 2 },
  ];

  return (
    <div className="w-full">
      <div className="text-sm text-text-muted mb-2 text-center">
        Difficulty Mode
      </div>
      <div className="flex rounded-xl overflow-hidden border border-border">
        {options.map((opt) => {
          const isSelected = override === opt.value;
          const previewLevel = Math.max(1, Math.min(10, level + opt.offset));

          return (
            <button
              key={opt.value}
              onClick={() => setOverride(mode, opt.value)}
              className={`
                flex-1 py-2 px-3 text-center transition-colors
                ${isSelected
                  ? 'bg-accent text-white'
                  : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-secondary'
                }
              `}
            >
              <div className="text-sm font-medium">{opt.label}</div>
              <div className={`text-xs ${isSelected ? 'text-white/70' : 'text-text-muted'}`}>
                Lv {previewLevel}
              </div>
            </button>
          );
        })}
      </div>
      <div className="text-xs text-text-muted mt-2 text-center">
        Content at level {effectiveLevel} ({getDifficultyLabel(effectiveLevel)})
      </div>
    </div>
  );
}

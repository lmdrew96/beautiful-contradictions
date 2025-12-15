import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor, getDifficultyBgColor } from '../utils/difficulty';
import { useDifficulty } from '../contexts/DifficultyContext';

const MODE_NAMES = {
  chaos: 'Chaos',
  garden: 'Garden',
  fog: 'Fog',
  forge: 'Forge',
};

export default function LevelIndicator({ currentView, compact = false }) {
  const { getLevel, getOverride, getEffectiveLevel } = useDifficulty();

  // Only show for learning modes
  const isLearningMode = ['chaos', 'garden', 'fog', 'forge'].includes(currentView);

  if (!isLearningMode) {
    return null;
  }

  const level = getLevel(currentView);
  const override = getOverride(currentView);
  const effectiveLevel = getEffectiveLevel(currentView);
  const label = getDifficultyLabel(effectiveLevel);
  const colorClass = getDifficultyColor(effectiveLevel);
  const bgClass = getDifficultyBgColor(effectiveLevel);

  // Short label for compact mode
  const shortLabel = label.slice(0, 3);

  if (compact) {
    return (
      <div
        className={`
          flex items-center justify-center
          w-8 h-8 rounded-full
          ${bgClass} ${colorClass}
          font-bold text-sm
          border border-current border-opacity-30
        `}
        title={`${MODE_NAMES[currentView]}: Level ${effectiveLevel} - ${label}`}
      >
        {effectiveLevel}
        {override === 'easy' && <ChevronDown size={10} className="absolute -bottom-0.5" />}
        {override === 'hard' && <ChevronUp size={10} className="absolute -top-0.5" />}
      </div>
    );
  }

  return (
    <div
      className={`
        flex items-center gap-1.5 px-2.5 py-1
        rounded-lg ${bgClass}
        border border-current border-opacity-20
      `}
      title={`${MODE_NAMES[currentView]}: Level ${effectiveLevel} - ${label}`}
    >
      <span className={`font-bold text-sm ${colorClass}`}>
        {effectiveLevel}
      </span>
      <span className={`text-xs ${colorClass} opacity-80 hidden sm:inline`}>
        {shortLabel}
      </span>
      {override === 'easy' && (
        <ChevronDown size={14} className={`${colorClass} -ml-0.5`} />
      )}
      {override === 'hard' && (
        <ChevronUp size={14} className={`${colorClass} -ml-0.5`} />
      )}
    </div>
  );
}

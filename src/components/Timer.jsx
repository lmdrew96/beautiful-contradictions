import React from 'react';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { formatTime } from '../hooks/useStorage';

export default function Timer({
  seconds,
  totalSeconds,
  isRunning,
  onToggle,
  onReset,
  variant = 'default' // 'default' | 'compact' | 'minimal'
}) {
  const progress = totalSeconds > 0 ? ((totalSeconds - seconds) / totalSeconds) * 100 : 0;

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-3">
        <span className="text-2xl font-mono font-bold text-text-primary">
          {formatTime(seconds)}
        </span>
        <button
          onClick={onToggle}
          className={`p-2 rounded-lg transition-colors ${
            isRunning
              ? 'bg-error hover:opacity-90'
              : 'bg-success hover:opacity-90'
          } text-white`}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4">
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-3xl font-mono font-bold text-text-primary">
              {formatTime(seconds)}
            </span>
            <span className="text-sm text-text-muted">remaining</span>
          </div>
          <div className="h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-1000 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`p-3 rounded-xl transition-all ${
            isRunning
              ? 'bg-error shadow-lg'
              : 'bg-success shadow-lg'
          } text-white`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-3">
        <div>
          <span className="text-4xl font-mono font-bold text-text-primary">
            {formatTime(seconds)}
          </span>
          <span className="text-text-muted ml-2 text-sm">
            / {formatTime(totalSeconds)}
          </span>
        </div>
        <div className="flex gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="p-2 rounded-lg bg-bg-tertiary hover:bg-bg-secondary text-text-secondary transition-colors"
              title="Reset timer"
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button
            onClick={onToggle}
            className={`px-5 py-2 rounded-xl font-medium transition-all flex items-center gap-2 ${
              isRunning
                ? 'bg-error text-white shadow-lg'
                : 'bg-success text-white shadow-lg'
            }`}
          >
            {isRunning ? (
              <>
                <Pause size={18} />
                Pause
              </>
            ) : (
              <>
                <Play size={18} />
                Start
              </>
            )}
          </button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
        <div
          className="h-full bg-accent transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Progress percentage */}
      <div className="flex justify-between mt-1">
        <span className="text-xs text-text-muted">{Math.round(progress)}% complete</span>
        <span className="text-xs text-text-muted">{formatTime(totalSeconds - seconds)} elapsed</span>
      </div>
    </div>
  );
}

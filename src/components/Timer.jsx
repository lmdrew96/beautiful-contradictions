import React from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
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
  const isLowTime = seconds <= 60 && seconds > 0;
  const isVeryLowTime = seconds <= 30 && seconds > 0;

  if (variant === 'minimal') {
    return (
      <div className="flex items-center gap-3">
        <span className={`text-2xl font-mono font-bold transition-all duration-300 ${
          isVeryLowTime ? 'text-error animate-pulse' : isLowTime ? 'text-warning' : 'text-text-primary'
        }`}>
          {formatTime(seconds)}
        </span>
        <button
          onClick={onToggle}
          className={`p-2 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
            isRunning
              ? 'bg-error hover:bg-error/90 shadow-lg shadow-error/30'
              : 'bg-success hover:bg-success/90 shadow-lg shadow-success/30'
          } text-white`}
        >
          {isRunning ? <Pause size={18} /> : <Play size={18} />}
        </button>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex items-center gap-4 p-4 bg-bg-secondary/50 backdrop-blur-sm rounded-2xl border border-border">
        <Clock size={20} className="text-text-muted" />
        <div className="flex-1">
          <div className="flex items-baseline gap-2 mb-2">
            <span className={`text-3xl font-mono font-bold transition-all duration-300 ${
              isVeryLowTime ? 'text-error animate-pulse streak-fire' : isLowTime ? 'text-warning' : 'text-text-primary'
            }`}>
              {formatTime(seconds)}
            </span>
            <span className="text-sm text-text-muted">remaining</span>
          </div>
          <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-1000 ease-linear rounded-full relative ${
                isVeryLowTime ? 'bg-error' : isLowTime ? 'bg-warning' : 'bg-accent'
              }`}
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>
        <button
          onClick={onToggle}
          className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            isRunning
              ? 'bg-error shadow-lg shadow-error/30 hover:shadow-error/50'
              : 'bg-success shadow-lg shadow-success/30 hover:shadow-success/50'
          } text-white`}
        >
          {isRunning ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>
    );
  }

  // Default variant
  return (
    <div className="w-full p-6 bg-bg-secondary/50 backdrop-blur-sm rounded-2xl border border-border">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-baseline gap-3">
          <span className={`text-5xl font-mono font-bold transition-all duration-300 ${
            isVeryLowTime ? 'text-error animate-pulse streak-fire' : isLowTime ? 'text-warning' : 'text-text-primary'
          }`}>
            {formatTime(seconds)}
          </span>
          <span className="text-text-muted text-sm">
            / {formatTime(totalSeconds)}
          </span>
        </div>
        <div className="flex gap-2">
          {onReset && (
            <button
              onClick={onReset}
              className="p-3 rounded-xl bg-bg-tertiary hover:bg-bg-secondary text-text-secondary hover:text-text-primary transition-all duration-300 hover:scale-105 active:scale-95 hover:rotate-[-180deg]"
              title="Reset timer"
            >
              <RotateCcw size={18} />
            </button>
          )}
          <button
            onClick={onToggle}
            className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 transform hover:scale-105 active:scale-95 ${
              isRunning
                ? 'bg-error text-white shadow-lg shadow-error/30 hover:shadow-error/50'
                : 'bg-success text-white shadow-lg shadow-success/30 hover:shadow-success/50'
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
      <div className="h-3 bg-bg-tertiary rounded-full overflow-hidden shadow-inner">
        <div
          className={`h-full transition-all duration-1000 ease-linear rounded-full relative ${
            isVeryLowTime ? 'bg-gradient-to-r from-error to-orange-500' : 
            isLowTime ? 'bg-gradient-to-r from-warning to-orange-400' : 
            'bg-gradient-to-r from-accent to-purple-500'
          }`}
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* Progress info */}
      <div className="flex justify-between mt-2">
        <span className={`text-xs font-medium ${
          progress > 75 ? 'text-success' : progress > 50 ? 'text-accent' : 'text-text-muted'
        }`}>
          {Math.round(progress)}% complete
        </span>
        <span className="text-xs text-text-muted">{formatTime(totalSeconds - seconds)} elapsed</span>
      </div>
    </div>
  );
}

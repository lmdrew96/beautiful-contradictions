import React from 'react';
import { BarChart3, Flower2, Shuffle, CloudFog, Hammer, Trash2, Award, BookOpen, RotateCcw } from 'lucide-react';
import { useDifficulty } from '../contexts/DifficultyContext';
import { getDifficultyLabel, getDifficultyColor, getDifficultyBgColor } from '../utils/difficulty';

export default function ProgressView({ stats, errors, setErrors }) {
  const { levels, getProgress, resetLevels } = useDifficulty();
  const clearErrorGarden = () => {
    if (window.confirm('Clear all errors from your garden? This cannot be undone.')) {
      setErrors([]);
    }
  };

  const removeError = (ro) => {
    setErrors((prev) => prev.filter((e) => e.ro !== ro));
  };

  // Calculate some derived stats
  const totalMinutes = stats.chaosMinutes + stats.fogMinutes + (stats.gardenMinutes || 0) + (stats.forgeMinutes || 0);
  const avgDifficulty = errors.length > 0
    ? (errors.reduce((sum, e) => sum + (e.difficulty || 1), 0) / errors.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-lg mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-bg-tertiary rounded-2xl mb-4">
            <BarChart3 size={40} className="text-text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-text-primary mb-2">Your Journey</h1>
          <p className="text-text-muted">Progress through beautiful chaos</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={Shuffle}
            value={stats.chaosMinutes}
            label="Chaos Minutes"
            gradient="from-bg-secondary to-bg-tertiary"
            borderColor="border-border"
            textColor="text-chaos-accent"
          />
          <StatCard
            icon={Flower2}
            value={stats.gardenMinutes || 0}
            label="Garden Minutes"
            gradient="from-bg-secondary to-bg-tertiary"
            borderColor="border-border"
            textColor="text-garden-accent"
          />
          <StatCard
            icon={CloudFog}
            value={stats.fogMinutes}
            label="Fog Minutes"
            gradient="from-bg-secondary to-bg-tertiary"
            borderColor="border-border"
            textColor="text-fog-accent"
          />
          <StatCard
            icon={Hammer}
            value={stats.forgeMinutes || 0}
            label="Forge Minutes"
            gradient="from-bg-secondary to-bg-tertiary"
            borderColor="border-border"
            textColor="text-forge-accent"
          />
        </div>

        {/* Your Levels */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-text-primary">Your Levels</h3>
            <button
              onClick={() => {
                if (window.confirm('Reset all levels to starting values?')) {
                  resetLevels();
                }
              }}
              className="text-xs text-text-muted hover:text-text-primary transition-colors flex items-center gap-1"
            >
              <RotateCcw size={12} />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <LevelRow
              icon={Shuffle}
              label="Chaos"
              level={levels.chaos}
              progress={getProgress('chaos')}
              color="text-chaos-accent"
            />
            <LevelRow
              icon={Flower2}
              label="Garden"
              level={levels.garden}
              progress={getProgress('garden')}
              color="text-garden-accent"
            />
            <LevelRow
              icon={CloudFog}
              label="Fog"
              level={levels.fog}
              progress={getProgress('fog')}
              color="text-fog-accent"
            />
            <LevelRow
              icon={Hammer}
              label="Forge"
              level={levels.forge}
              progress={getProgress('forge')}
              color="text-forge-accent"
            />
          </div>
        </div>

        {/* Learning Stats */}
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
                {(stats.wordsReviewed || 0) + (stats.sentencesReviewed || 0) > 0
                  ? Math.round((stats.correctGuesses || 0) / ((stats.wordsReviewed || 0) + (stats.sentencesReviewed || 0)) * 100)
                  : 0}%
              </p>
            </div>
            <div>
              <p className="text-text-muted">Total Sessions</p>
              <p className="text-2xl font-bold text-accent">{stats.totalSessions}</p>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
          <h3 className="text-lg font-semibold text-text-primary mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-text-muted">Total Learning Time</p>
              <p className="text-2xl font-bold text-text-primary">{totalMinutes} min</p>
            </div>
            <div>
              <p className="text-text-muted">Garden Size</p>
              <p className="text-2xl font-bold text-error">{errors.length} words</p>
            </div>
            <div>
              <p className="text-text-muted">Avg. Difficulty</p>
              <p className="text-2xl font-bold text-success">{avgDifficulty}/5</p>
            </div>
            <div>
              <p className="text-text-muted">Sessions</p>
              <p className="text-2xl font-bold text-accent">{stats.totalSessions}</p>
            </div>
          </div>
        </div>

        {/* Error Garden List */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flower2 size={20} className="text-rose-400" />
              <h3 className="text-lg font-semibold text-text-primary">Error Garden</h3>
            </div>
            {errors.length > 0 && (
              <button
                onClick={clearErrorGarden}
                className="text-xs text-text-muted hover:text-error transition-colors flex items-center gap-1"
              >
                <Trash2 size={14} />
                Clear All
              </button>
            )}
          </div>

          {errors.length > 0 ? (
            <div className="space-y-2 max-h-80 overflow-y-auto">
              {errors
                .sort((a, b) => b.wrongCount - a.wrongCount)
                .map((error, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center bg-bg-tertiary rounded-lg px-4 py-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-text-primary font-medium">{error.ro}</span>
                        <span className="text-text-muted">-&gt;</span>
                        <span className="text-text-secondary truncate">{error.en}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-text-muted capitalize">
                          {error.category}
                        </span>
                        <span className="text-xs text-text-muted">-</span>
                        <span className="text-xs text-text-muted">
                          Difficulty {error.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-rose-400 font-medium">x{error.wrongCount}</span>
                      <button
                        onClick={() => removeError(error.ro)}
                        className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-error transition-all"
                        title="Remove from garden"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Flower2 size={40} className="text-text-muted mx-auto mb-3" />
              <p className="text-text-secondary">No errors yet!</p>
              <p className="text-text-muted text-sm mt-1">
                Start guessing in the Error Garden to grow your collection.
              </p>
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
          <p className="text-center text-text-secondary italic">
            "The mess is the method. Your mistakes are your map."
          </p>
          <p className="text-center text-text-muted text-sm mt-2">
            Keep embracing the chaos.
          </p>
        </div>

        {/* Reset Option */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('Reset all progress including levels? This cannot be undone.')) {
                setErrors([]);
                resetLevels();
                window.localStorage.removeItem('cl-stats');
                window.localStorage.removeItem('cl-errors');
                window.localStorage.removeItem('cl-difficulty');
                window.location.reload();
              }
            }}
            className="text-xs text-text-muted hover:text-error transition-colors"
          >
            Reset All Progress
          </button>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, value, label, gradient, borderColor, textColor }) {
  return (
    <div className={`bg-gradient-to-br ${gradient} rounded-2xl p-5 border ${borderColor}`}>
      <div className="flex items-start justify-between mb-2">
        <Icon size={20} className={textColor} />
      </div>
      <div className={`text-3xl font-bold ${textColor}`}>{value}</div>
      <div className="text-text-muted text-sm">{label}</div>
    </div>
  );
}

function LevelRow({ icon: Icon, label, level, progress, color }) {
  const levelLabel = getDifficultyLabel(level);

  return (
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-lg bg-bg-tertiary ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between mb-1">
          <span className="text-text-primary font-medium">{label}</span>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold ${color}`}>Lv {level}</span>
            <span className="text-xs text-text-muted">{levelLabel}</span>
          </div>
        </div>
        <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r from-accent to-accent/70 transition-all duration-300`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="text-xs text-text-muted mt-1">
          {progress === 100 ? 'Ready to level up!' : progress > 0 ? `${progress}% to next level` : 'Keep practicing'}
        </p>
      </div>
    </div>
  );
}

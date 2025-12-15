import React from 'react';
import { BarChart3, Flower2, Shuffle, CloudFog, Trash2, Award } from 'lucide-react';

export default function ProgressView({ stats, errors, setErrors }) {
  const clearErrorGarden = () => {
    if (window.confirm('Clear all errors from your garden? This cannot be undone.')) {
      setErrors([]);
    }
  };

  const removeError = (ro) => {
    setErrors((prev) => prev.filter((e) => e.ro !== ro));
  };

  // Calculate some derived stats
  const totalMinutes = stats.chaosMinutes + stats.fogMinutes;
  const avgErrorCount = errors.length > 0 
    ? (errors.reduce((sum, e) => sum + e.wrongCount, 0) / errors.length).toFixed(1)
    : 0;

  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-lg mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex p-4 bg-slate-700/50 rounded-2xl mb-4">
            <BarChart3 size={40} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Your Journey</h1>
          <p className="text-slate-400">Progress through beautiful chaos</p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <StatCard
            icon={Shuffle}
            value={stats.chaosMinutes}
            label="Chaos Minutes"
            gradient="from-purple-900/50 to-indigo-900/50"
            borderColor="border-purple-800/50"
            textColor="text-purple-400"
          />
          <StatCard
            icon={Flower2}
            value={errors.length}
            label="Words in Garden"
            gradient="from-rose-900/50 to-orange-900/50"
            borderColor="border-rose-800/50"
            textColor="text-rose-400"
          />
          <StatCard
            icon={CloudFog}
            value={stats.fogMinutes}
            label="Fog Minutes"
            gradient="from-teal-900/50 to-cyan-900/50"
            borderColor="border-teal-800/50"
            textColor="text-teal-400"
          />
          <StatCard
            icon={Award}
            value={stats.totalSessions}
            label="Total Sessions"
            gradient="from-slate-800/50 to-slate-700/50"
            borderColor="border-slate-700"
            textColor="text-white"
          />
        </div>

        {/* Summary Card */}
        <div className="bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-orange-900/20 rounded-2xl p-6 border border-purple-800/30 mb-6">
          <h3 className="text-lg font-semibold text-white mb-4">Summary</h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-slate-400">Total Learning Time</p>
              <p className="text-2xl font-bold text-white">{totalMinutes} min</p>
            </div>
            <div>
              <p className="text-slate-400">Garden Size</p>
              <p className="text-2xl font-bold text-rose-400">{errors.length} words</p>
            </div>
            <div>
              <p className="text-slate-400">Avg. Difficulty</p>
              <p className="text-2xl font-bold text-teal-400">×{avgErrorCount}</p>
            </div>
            <div>
              <p className="text-slate-400">Sessions</p>
              <p className="text-2xl font-bold text-purple-400">{stats.totalSessions}</p>
            </div>
          </div>
        </div>

        {/* Error Garden List */}
        <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Flower2 size={20} className="text-rose-400" />
              <h3 className="text-lg font-semibold text-white">Error Garden</h3>
            </div>
            {errors.length > 0 && (
              <button
                onClick={clearErrorGarden}
                className="text-xs text-slate-500 hover:text-rose-400 transition-colors flex items-center gap-1"
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
                    className="flex justify-between items-center bg-slate-700/30 rounded-lg px-4 py-3 group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{error.ro}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-slate-300 truncate">{error.en}</span>
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-slate-500 capitalize">
                          {error.category}
                        </span>
                        <span className="text-xs text-slate-600">•</span>
                        <span className="text-xs text-slate-500">
                          Difficulty {error.difficulty}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-rose-400 font-medium">×{error.wrongCount}</span>
                      <button
                        onClick={() => removeError(error.ro)}
                        className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-rose-400 transition-all"
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
              <Flower2 size={40} className="text-slate-600 mx-auto mb-3" />
              <p className="text-slate-400">No errors yet!</p>
              <p className="text-slate-500 text-sm mt-1">
                Start guessing in the Error Garden to grow your collection.
              </p>
            </div>
          )}
        </div>

        {/* Motivational Quote */}
        <div className="bg-slate-800/30 rounded-2xl p-6 border border-slate-700/50">
          <p className="text-center text-slate-300 italic">
            "The mess is the method. Your mistakes are your map."
          </p>
          <p className="text-center text-slate-500 text-sm mt-2">
            Keep embracing beautiful contradictions.
          </p>
        </div>

        {/* Reset Option */}
        <div className="mt-8 text-center">
          <button
            onClick={() => {
              if (window.confirm('Reset all progress? This cannot be undone.')) {
                setErrors([]);
                // Note: Would need to pass setStats to fully reset
                window.localStorage.removeItem('bc-stats');
                window.localStorage.removeItem('bc-errors');
                window.location.reload();
              }
            }}
            className="text-xs text-slate-600 hover:text-rose-400 transition-colors"
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
      <div className="text-slate-400 text-sm">{label}</div>
    </div>
  );
}

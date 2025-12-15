import React, { useState, useCallback, useMemo } from 'react';
import { Shuffle, Clock, Sparkles, ArrowRight, X, Video, ChefHat } from 'lucide-react';
import ContentEmbed from './ContentEmbed';
import RecipeCard from './RecipeCard';
import Timer from './Timer';
import { useTimer } from '../hooks/useStorage';
import { getContentBySessionType, getRandomContent, CONTENT_DATABASE } from '../data/content';
import { getRandomRecipe, ROMANIAN_RECIPES } from '../data/recipes';
import { useDifficulty } from '../contexts/DifficultyContext';
import { filterContentByLevel } from '../utils/difficulty';
import DifficultyToggle from './DifficultyToggle';

const SESSION_DURATIONS = [
  { minutes: 5, label: '5 min', description: 'Quick burst' },
  { minutes: 15, label: '15 min', description: 'Focused session' },
  { minutes: 30, label: '30 min', description: 'Deep dive' },
];

export default function ChaosEngineView({ updateStats }) {
  const [sessionDuration, setSessionDuration] = useState(15 * 60);
  const [currentContent, setCurrentContent] = useState(null);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [sessionState, setSessionState] = useState('setup'); // 'setup' | 'active' | 'reflection'
  const [reflection, setReflection] = useState('');
  const [mode, setMode] = useState('media'); // 'media' | 'recipe'

  // Difficulty context
  const { getEffectiveLevel, recordSession } = useDifficulty();
  const effectiveLevel = getEffectiveLevel('chaos');

  // Get all chaos content and filter by level
  const chaosContent = getContentBySessionType('chaos_window');
  const filteredChaosContent = useMemo(() => {
    const filtered = filterContentByLevel(chaosContent, effectiveLevel);
    return filtered.length > 0 ? filtered : chaosContent;
  }, [chaosContent, effectiveLevel]);

  // Filter recipes by level too
  const filteredRecipes = useMemo(() => {
    const filtered = filterContentByLevel(ROMANIAN_RECIPES, effectiveLevel);
    return filtered.length > 0 ? filtered : ROMANIAN_RECIPES;
  }, [effectiveLevel]);

  const handleSessionComplete = useCallback(() => {
    setSessionState('reflection');
    updateStats((prev) => ({
      ...prev,
      chaosMinutes: prev.chaosMinutes + Math.floor(sessionDuration / 60),
      totalSessions: prev.totalSessions + 1,
    }));
    // Record session for level tracking
    recordSession('chaos', effectiveLevel, Math.floor(sessionDuration / 60));
  }, [sessionDuration, updateStats, effectiveLevel, recordSession]);

  const timer = useTimer(sessionDuration, handleSessionComplete);

  const startSession = () => {
    if (mode === 'recipe') {
      const pool = filteredRecipes;
      setCurrentRecipe(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      const pool = filteredChaosContent;
      setCurrentContent(pool[Math.floor(Math.random() * pool.length)]);
    }
    setSessionState('active');
    timer.start();
  };

  const shuffleContent = () => {
    if (mode === 'recipe') {
      const pool = filteredRecipes;
      setCurrentRecipe(pool[Math.floor(Math.random() * pool.length)]);
    } else {
      const pool = filteredChaosContent;
      setCurrentContent(pool[Math.floor(Math.random() * pool.length)]);
    }
  };

  const endEarly = () => {
    timer.pause();
    handleSessionComplete();
  };

  const saveReflection = () => {
    // In production, save to database
    console.log('Reflection saved:', {
      reflection,
      content: currentContent?.title,
      duration: sessionDuration - timer.seconds,
      timestamp: new Date().toISOString(),
    });
    resetSession();
  };

  const resetSession = () => {
    setReflection('');
    setSessionState('setup');
    setCurrentContent(null);
    setCurrentRecipe(null);
    timer.reset();
  };

  // ============================================
  // SETUP STATE
  // ============================================
  if (sessionState === 'setup') {
    return (
      <div className="min-h-screen pb-24 md:pt-20 px-6">
        <div className="max-w-lg mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-purple-500/20 rounded-2xl mb-4">
              <Shuffle size={40} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Chaos Window</h1>
            <p className="text-text-muted">Random content, structured time</p>
          </div>

          {/* Duration Selector */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={18} className="text-text-muted" />
              <h3 className="text-lg font-semibold text-text-primary">Session Length</h3>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {SESSION_DURATIONS.map((option) => (
                <button
                  key={option.minutes}
                  onClick={() => setSessionDuration(option.minutes * 60)}
                  className={`py-4 rounded-xl font-medium transition-all ${
                    sessionDuration === option.minutes * 60
                      ? 'bg-purple-600 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80'
                  }`}
                >
                  <div className="text-lg">{option.label}</div>
                  <div className={`text-xs ${sessionDuration === option.minutes * 60 ? 'text-white/70' : 'text-text-muted'}`}>{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border mb-4">
            <p className="text-sm text-text-muted mb-3 text-center">Content Type</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('media')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'media'
                    ? 'bg-purple-600 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80'
                }`}
              >
                <Video size={18} />
                Video/Audio
              </button>
              <button
                onClick={() => setMode('recipe')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'recipe'
                    ? 'bg-purple-600 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80'
                }`}
              >
                <ChefHat size={18} />
                Recipes
              </button>
            </div>
            <p className="text-center text-text-muted text-xs mt-3">
              {mode === 'media'
                ? `${filteredChaosContent.length} at your level (${chaosContent.length} total)`
                : `${filteredRecipes.length} at your level (${ROMANIAN_RECIPES.length} total)`
              }
            </p>
          </div>

          {/* Difficulty Toggle */}
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border mb-6">
            <DifficultyToggle mode="chaos" />
          </div>

          {/* Instructions */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">How It Works</h3>
            <ol className="text-text-secondary space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                <span>Timer starts, random content appears</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                <span>Follow your curiosity - no agenda, no pressure</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                <span>Hit "Shuffle" anytime for new content</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
                <span>When timer ends, capture one thing you noticed</span>
              </li>
            </ol>
          </div>


          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Begin Chaos Window
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // REFLECTION STATE
  // ============================================
  if (sessionState === 'reflection') {
    return (
      <div className="min-h-screen pb-24 md:pt-20 px-6">
        <div className="max-w-lg mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl mb-4">
              <Sparkles size={40} className="text-purple-600 dark:text-purple-400" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Session Complete!</h1>
            <p className="text-text-muted">Time for a micro-reflection</p>
          </div>

          {/* Reflection Input */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">
              One thing I noticed...
            </h3>
            <textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="A word that stuck with me, a pattern I saw, something I want to explore more..."
              className="w-full h-32 bg-bg-tertiary border border-border rounded-xl p-4 text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              autoFocus
            />
          </div>

          {/* Session Summary */}
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-text-muted">Content {mode === 'recipe' ? 'explored' : 'watched'}:</span>
              <span className="text-text-primary truncate ml-4">
                {mode === 'recipe'
                  ? currentRecipe?.title?.en || currentRecipe?.title?.ro || 'Various'
                  : currentContent?.title || 'Various'
                }
              </span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-text-muted">Time spent:</span>
              <span className="text-accent font-medium">
                {Math.floor(sessionDuration / 60)} minutes
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={resetSession}
              className="flex-1 py-3 bg-bg-tertiary rounded-xl text-text-secondary font-medium hover:bg-bg-secondary transition-colors"
            >
              Skip
            </button>
            <button
              onClick={saveReflection}
              className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity"
            >
              Save & Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ============================================
  // ACTIVE STATE
  // ============================================
  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-2xl mx-auto py-6">
        {/* Timer Card */}
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
          <Timer
            seconds={timer.seconds}
            totalSeconds={sessionDuration}
            isRunning={timer.isRunning}
            onToggle={timer.toggle}
            onReset={() => {
              timer.reset();
              timer.start();
            }}
          />
        </div>

        {/* Content */}
        {mode === 'recipe' && currentRecipe ? (
          <RecipeCard recipe={currentRecipe} />
        ) : (
          <ContentEmbed content={currentContent} />
        )}

        {/* Controls */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={shuffleContent}
            className="flex-1 py-3 bg-bg-tertiary rounded-xl text-text-primary font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            <Shuffle size={18} />
            {mode === 'recipe' ? 'New Recipe' : 'Shuffle'}
          </button>
          <button
            onClick={endEarly}
            className="flex-1 py-3 bg-bg-tertiary rounded-xl text-text-primary font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
          >
            <X size={18} />
            End Session
          </button>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-purple-900/20 rounded-xl border border-purple-800/30">
          <p className="text-purple-600 dark:text-purple-300 text-sm text-center italic">
            No need to understand everything. Just let the language wash over you.
          </p>
        </div>
      </div>
    </div>
  );
}

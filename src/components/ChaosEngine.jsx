import React, { useState, useCallback } from 'react';
import { Shuffle, Clock, Sparkles, ArrowRight, X, Video, ChefHat } from 'lucide-react';
import ContentEmbed from './ContentEmbed';
import RecipeCard from './RecipeCard';
import Timer from './Timer';
import { useTimer } from '../hooks/useStorage';
import { getContentBySessionType, getRandomContent } from '../data/content';
import { getRandomRecipe, ROMANIAN_RECIPES } from '../data/recipes';

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

  const chaosContent = getContentBySessionType('chaos_window');

  const handleSessionComplete = useCallback(() => {
    setSessionState('reflection');
    updateStats((prev) => ({
      ...prev,
      chaosMinutes: prev.chaosMinutes + Math.floor(sessionDuration / 60),
      totalSessions: prev.totalSessions + 1,
    }));
  }, [sessionDuration, updateStats]);

  const timer = useTimer(sessionDuration, handleSessionComplete);

  const startSession = () => {
    if (mode === 'recipe') {
      setCurrentRecipe(getRandomRecipe());
    } else {
      const randomContent = getRandomContent((c) => c.sessionTypes.includes('chaos_window'));
      setCurrentContent(randomContent);
    }
    setSessionState('active');
    timer.start();
  };

  const shuffleContent = () => {
    if (mode === 'recipe') {
      setCurrentRecipe(getRandomRecipe());
    } else {
      const randomContent = getRandomContent((c) => c.sessionTypes.includes('chaos_window'));
      setCurrentContent(randomContent);
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
              <Shuffle size={40} className="text-purple-400" />
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
                      ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
                  }`}
                >
                  <div className="text-lg">{option.label}</div>
                  <div className="text-xs opacity-70">{option.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Mode Toggle */}
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border mb-6">
            <p className="text-sm text-text-muted mb-3 text-center">Content Type</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('media')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'media'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
                }`}
              >
                <Video size={18} />
                Video/Audio
              </button>
              <button
                onClick={() => setMode('recipe')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'recipe'
                    ? 'bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-secondary hover:bg-bg-tertiary/80'
                }`}
              >
                <ChefHat size={18} />
                Recipes
              </button>
            </div>
            <p className="text-center text-text-muted text-xs mt-3">
              {mode === 'media'
                ? `${chaosContent.length} videos and audio`
                : `${ROMANIAN_RECIPES.length} traditional recipes`
              }
            </p>
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

          {/* Content Preview */}
          <div className="bg-bg-tertiary rounded-xl p-4 border border-border mb-6">
            <p className="text-sm text-text-muted text-center">
              {chaosContent.length} items in the chaos pool
            </p>
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
              <Sparkles size={40} className="text-purple-400" />
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
          <p className="text-purple-300 text-sm text-center italic">
            No need to understand everything. Just let the language wash over you.
          </p>
        </div>
      </div>
    </div>
  );
}

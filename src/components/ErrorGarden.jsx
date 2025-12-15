import React, { useState, useRef, useCallback } from 'react';
import { Flower2, Check, X, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { getWeightedRandomVocab, VOCABULARY_DATABASE } from '../data/vocabulary';

export default function ErrorGardenView({ updateStats, errors, setErrors }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [guess, setGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [streak, setStreak] = useState(0);
  const inputRef = useRef(null);

  const startSession = () => {
    setSessionActive(true);
    setCardsReviewed(0);
    setStreak(0);
    nextCard();
  };

  const nextCard = useCallback(() => {
    const nextWord = getWeightedRandomVocab(errors);
    setCurrentCard(nextWord);
    setGuess('');
    setShowResult(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [errors]);

  const checkGuess = () => {
    if (!guess.trim() || !currentCard) return;

    // Check for correct answer (case-insensitive, trimmed)
    const userGuess = guess.toLowerCase().trim();
    const correctAnswer = currentCard.en.toLowerCase().trim();
    
    // Also check for alternate answers separated by /
    const alternateAnswers = correctAnswer.split('/').map(a => a.trim());
    const correct = alternateAnswers.some(answer => userGuess === answer);

    setIsCorrect(correct);
    setShowResult(true);
    setCardsReviewed((c) => c + 1);

    if (correct) {
      setStreak((s) => s + 1);
      // Remove from errors if it exists there
      setErrors((prev) => prev.filter((e) => e.ro !== currentCard.ro));
    } else {
      setStreak(0);
      // Add to error garden or increment count
      const existingError = errors.find((e) => e.ro === currentCard.ro);
      if (existingError) {
        setErrors((prev) =>
          prev.map((e) =>
            e.ro === currentCard.ro ? { ...e, wrongCount: e.wrongCount + 1 } : e
          )
        );
      } else {
        setErrors((prev) => [
          ...prev,
          { ...currentCard, wrongCount: 1, addedAt: Date.now() },
        ]);
      }
      updateStats((prev) => ({
        ...prev,
        errorsHarvested: prev.errorsHarvested + 1,
      }));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showResult) {
        nextCard();
      } else {
        checkGuess();
      }
    }
  };

  const endSession = () => {
    setSessionActive(false);
    setCurrentCard(null);
  };

  // ============================================
  // SETUP STATE
  // ============================================
  if (!sessionActive) {
    return (
      <div className="min-h-screen pb-24 md:pt-20 px-6">
        <div className="max-w-lg mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-rose-500/20 rounded-2xl mb-4">
              <Flower2 size={40} className="text-rose-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Error Garden</h1>
            <p className="text-slate-400">Your mistakes become your curriculum</p>
          </div>

          {/* Error Garden Preview */}
          <div className="bg-gradient-to-br from-rose-900/30 to-orange-900/30 rounded-2xl p-6 border border-rose-800/50 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Your Garden</h3>
              <span className="text-3xl font-bold text-rose-400">{errors.length}</span>
            </div>
            
            {errors.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {errors
                  .sort((a, b) => b.wrongCount - a.wrongCount)
                  .slice(0, 5)
                  .map((error, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center bg-slate-800/50 rounded-lg px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">{error.ro}</span>
                        <span className="text-slate-500">→</span>
                        <span className="text-slate-400">{error.en}</span>
                      </div>
                      <span className="text-rose-400 text-sm font-medium">×{error.wrongCount}</span>
                    </div>
                  ))}
                {errors.length > 5 && (
                  <p className="text-slate-500 text-sm text-center pt-2">
                    +{errors.length - 5} more in your garden
                  </p>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-slate-400 text-sm">
                  No errors yet! Make some guesses to grow your garden.
                </p>
                <p className="text-slate-500 text-xs mt-2">
                  🌱 Wrong guesses become seeds for learning
                </p>
              </div>
            )}
          </div>

          {/* How It Works */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">The Method</h3>
            <ol className="text-slate-300 space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                <span>See a Romanian word</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                <span><strong className="text-rose-400">GUESS first</strong> — don't look it up!</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                <span>Check your answer</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                <span>Wrong guesses go to your garden 🌱</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                <span>Garden words appear more often</span>
              </li>
            </ol>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-rose-500/25 flex items-center justify-center gap-2"
          >
            Start Guessing
            <ArrowRight size={20} />
          </button>

          {/* Word count */}
          <p className="text-center text-slate-500 text-sm mt-4">
            {VOCABULARY_DATABASE.length} words in the database
          </p>
        </div>
      </div>
    );
  }

  // ============================================
  // ACTIVE SESSION
  // ============================================
  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-lg mx-auto py-8">
        {/* Header Stats */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-slate-400">Reviewed: </span>
              <span className="text-white font-medium">{cardsReviewed}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-900/50 rounded-full">
                <Sparkles size={14} className="text-green-400" />
                <span className="text-green-400 text-sm font-medium">{streak} streak</span>
              </div>
            )}
          </div>
          <button
            onClick={endSession}
            className="text-slate-400 hover:text-white transition-colors text-sm"
          >
            End Session
          </button>
        </div>

        {/* Card */}
        <div
          className={`rounded-2xl p-8 mb-6 transition-all duration-300 ${
            showResult
              ? isCorrect
                ? 'bg-gradient-to-br from-green-900/50 to-emerald-900/50 border-2 border-green-600'
                : 'bg-gradient-to-br from-rose-900/50 to-orange-900/50 border-2 border-rose-600'
              : 'bg-slate-800/50 border border-slate-700'
          }`}
        >
          <div className="text-center">
            {/* Difficulty indicator */}
            <div className="flex justify-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < (currentCard?.difficulty || 1)
                      ? 'bg-rose-500'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <p className="text-slate-400 text-sm mb-2">What does this mean?</p>
            <p className="text-5xl font-bold text-white mb-6 font-display">
              {currentCard?.ro}
            </p>

            {!showResult ? (
              <div>
                <input
                  ref={inputRef}
                  type="text"
                  value={guess}
                  onChange={(e) => setGuess(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your guess..."
                  className="w-full bg-slate-700/50 border border-slate-600 rounded-xl px-4 py-4 text-white text-center text-lg placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-rose-500 mb-4"
                  autoFocus
                  autoComplete="off"
                  autoCapitalize="off"
                />
                <button
                  onClick={checkGuess}
                  disabled={!guess.trim()}
                  className="w-full py-3 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Check
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  {isCorrect ? (
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                        <Check size={24} className="text-white" />
                      </div>
                      <p className="text-green-400 text-xl font-bold">Correct!</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
                          <X size={24} className="text-white" />
                        </div>
                      </div>
                      <p className="text-rose-400 text-lg mb-2">
                        Your guess:{' '}
                        <span className="line-through opacity-70">{guess}</span>
                      </p>
                      <p className="text-white text-2xl font-bold">
                        {currentCard?.en}
                      </p>
                      <div className="flex items-center justify-center gap-2 mt-3 text-rose-300">
                        <Flower2 size={16} />
                        <span className="text-sm">Added to your garden</span>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={nextCard}
                  className="w-full py-3 bg-slate-700 rounded-xl text-white font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
                >
                  Next Word
                  <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Category hint */}
        <div className="text-center">
          <span className="text-xs text-slate-500 capitalize">
            Category: {currentCard?.category || 'general'}
          </span>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-rose-900/20 rounded-xl border border-rose-800/30">
          <p className="text-rose-300 text-sm text-center italic">
            💡 Wrong guesses stick better than passive reading. Embrace the mistakes!
          </p>
        </div>
      </div>
    </div>
  );
}

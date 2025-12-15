import React, { useState, useRef, useCallback } from 'react';
import { Flower2, Check, X, ArrowRight, RotateCcw, Sparkles, BookOpen, MessageSquare, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { getWeightedRandomVocab, VOCABULARY_DATABASE } from '../data/vocabulary';
import { getRandomSentence, TATOEBA_BEGINNER, TATOEBA_INTERMEDIATE, TATOEBA_ADVANCED } from '../data/tatoeba';

const ALL_SENTENCES = [...TATOEBA_BEGINNER, ...TATOEBA_INTERMEDIATE, ...TATOEBA_ADVANCED];

// Normalize text for comparison - handles contractions and punctuation
const normalizeAnswer = (text) => {
  return text
    .toLowerCase()
    .trim()
    // Normalize contractions (both directions for flexibility)
    .replace(/i'm/g, 'i am')
    .replace(/don't/g, 'do not')
    .replace(/doesn't/g, 'does not')
    .replace(/didn't/g, 'did not')
    .replace(/won't/g, 'will not')
    .replace(/can't/g, 'cannot')
    .replace(/couldn't/g, 'could not')
    .replace(/wouldn't/g, 'would not')
    .replace(/shouldn't/g, 'should not')
    .replace(/isn't/g, 'is not')
    .replace(/aren't/g, 'are not')
    .replace(/wasn't/g, 'was not')
    .replace(/weren't/g, 'were not')
    .replace(/haven't/g, 'have not')
    .replace(/hasn't/g, 'has not')
    .replace(/hadn't/g, 'had not')
    .replace(/it's/g, 'it is')
    .replace(/that's/g, 'that is')
    .replace(/there's/g, 'there is')
    .replace(/what's/g, 'what is')
    .replace(/let's/g, 'let us')
    .replace(/they're/g, 'they are')
    .replace(/we're/g, 'we are')
    .replace(/you're/g, 'you are')
    .replace(/he's/g, 'he is')
    .replace(/she's/g, 'she is')
    .replace(/i've/g, 'i have')
    .replace(/you've/g, 'you have')
    .replace(/we've/g, 'we have')
    .replace(/they've/g, 'they have')
    .replace(/i'll/g, 'i will')
    .replace(/you'll/g, 'you will')
    .replace(/he'll/g, 'he will')
    .replace(/she'll/g, 'she will')
    .replace(/we'll/g, 'we will')
    .replace(/they'll/g, 'they will')
    .replace(/i'd/g, 'i would')
    .replace(/you'd/g, 'you would')
    .replace(/he'd/g, 'he would')
    .replace(/she'd/g, 'she would')
    .replace(/we'd/g, 'we would')
    .replace(/they'd/g, 'they would')
    // Remove punctuation
    .replace(/[.,!?;:'"()]/g, '')
    // Normalize whitespace
    .replace(/\s+/g, ' ');
};

// Check if two strings are close enough (allows 1-2 character differences)
const isCloseEnough = (guess, answer) => {
  if (guess === answer) return true;
  if (Math.abs(guess.length - answer.length) > 2) return false;

  // Simple edit distance check for small differences
  let differences = 0;
  const longer = guess.length >= answer.length ? guess : answer;
  const shorter = guess.length < answer.length ? guess : answer;

  let j = 0;
  for (let i = 0; i < longer.length && differences <= 2; i++) {
    if (shorter[j] !== longer[i]) {
      differences++;
      if (shorter.length < longer.length) continue;
    }
    j++;
  }
  return differences <= 2;
};

export default function ErrorGardenView({ updateStats, errors, setErrors }) {
  const [currentCard, setCurrentCard] = useState(null);
  const [guess, setGuess] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [streak, setStreak] = useState(0);
  const [mode, setMode] = useState('words'); // 'words' | 'sentences'
  const [sessionStartTime, setSessionStartTime] = useState(null);
  const [showAllWords, setShowAllWords] = useState(false);
  const inputRef = useRef(null);

  const removeError = (ro) => {
    setErrors((prev) => prev.filter((e) => e.ro !== ro));
  };

  const startSession = () => {
    setSessionActive(true);
    setCardsReviewed(0);
    setStreak(0);
    setSessionStartTime(Date.now());
    nextCard();
  };

  const nextCard = useCallback(() => {
    let nextItem;
    if (mode === 'sentences') {
      nextItem = getRandomSentence(ALL_SENTENCES);
    } else {
      nextItem = getWeightedRandomVocab(errors);
    }
    setCurrentCard(nextItem);
    setGuess('');
    setShowResult(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [errors, mode]);

  const checkGuess = () => {
    if (!guess.trim() || !currentCard) return;

    // Check for correct answer (case-insensitive, trimmed)
    const userGuess = guess.toLowerCase().trim();
    // Sentences use 'english', vocab uses 'en'
    const correctAnswer = (currentCard.english || currentCard.en).toLowerCase().trim();

    // Also check for alternate answers separated by /
    const alternateAnswers = correctAnswer.split('/').map(a => a.trim());
    // For sentences, check if user's translation captures the essence (more lenient)
    // For words, use normalization and typo tolerance
    const correct = mode === 'sentences'
      ? userGuess.length > 5 && (
          alternateAnswers.some(answer => userGuess.includes(answer.slice(0, 10))) ||
          alternateAnswers.some(answer => answer.includes(userGuess.slice(0, 10)))
        )
      : alternateAnswers.some(answer => {
          const normalizedGuess = normalizeAnswer(userGuess);
          const normalizedAnswer = normalizeAnswer(answer);
          return isCloseEnough(normalizedGuess, normalizedAnswer);
        });

    setIsCorrect(correct);
    setShowResult(true);
    setCardsReviewed((c) => c + 1);

    if (correct) {
      setStreak((s) => s + 1);
      // Track correct guesses for accuracy stats
      updateStats((prev) => ({
        ...prev,
        correctGuesses: (prev.correctGuesses || 0) + 1,
      }));
      // Remove from errors if it exists there (only for words mode)
      if (mode === 'words') {
        setErrors((prev) => prev.filter((e) => e.ro !== currentCard.ro));
      }
    } else {
      setStreak(0);
      // Add to error garden or increment count (only for words mode)
      if (mode === 'words') {
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
      }
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
    const sessionMinutes = sessionStartTime
      ? Math.floor((Date.now() - sessionStartTime) / 60000)
      : 0;

    updateStats((prev) => ({
      ...prev,
      gardenMinutes: (prev.gardenMinutes || 0) + sessionMinutes,
      totalSessions: prev.totalSessions + 1,
      wordsReviewed: (prev.wordsReviewed || 0) + (mode === 'words' ? cardsReviewed : 0),
      sentencesReviewed: (prev.sentencesReviewed || 0) + (mode === 'sentences' ? cardsReviewed : 0),
      lastSessionDate: new Date().toISOString().split('T')[0],
    }));

    setSessionActive(false);
    setCurrentCard(null);
    setSessionStartTime(null);
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
              <Flower2 size={40} className="text-rose-600 dark:text-rose-400" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Error Garden</h1>
            <p className="text-text-muted">Your mistakes become your curriculum</p>
          </div>

          {/* Error Garden Preview */}
          <div className="bg-gradient-to-br from-rose-900/30 to-orange-900/30 rounded-2xl p-6 border border-rose-800/50 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-text-primary">Your Garden</h3>
              <span className="text-3xl font-bold text-rose-600 dark:text-rose-400">{errors.length}</span>
            </div>

            {errors.length > 0 ? (
              <div className="space-y-2">
                <div className={`space-y-2 overflow-y-auto ${showAllWords ? 'max-h-80' : 'max-h-48'}`}>
                  {errors
                    .sort((a, b) => b.wrongCount - a.wrongCount)
                    .slice(0, showAllWords ? errors.length : 5)
                    .map((error, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center bg-bg-secondary rounded-lg px-3 py-2 group"
                      >
                        <div className="flex items-center gap-2 min-w-0 flex-1">
                          <span className="text-text-primary font-medium">{error.ro}</span>
                          <span className="text-text-muted">-&gt;</span>
                          <span className="text-text-secondary truncate">{error.en}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className="text-rose-600 dark:text-rose-400 text-sm font-medium">x{error.wrongCount}</span>
                          <button
                            onClick={() => removeError(error.ro)}
                            className="opacity-0 group-hover:opacity-100 text-text-muted hover:text-error transition-all p-1"
                            title="Remove from garden"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
                {errors.length > 5 && (
                  <button
                    onClick={() => setShowAllWords(!showAllWords)}
                    className="w-full flex items-center justify-center gap-1 text-text-muted hover:text-text-primary text-sm pt-2 transition-colors"
                  >
                    {showAllWords ? (
                      <>
                        <ChevronUp size={16} />
                        Show less
                      </>
                    ) : (
                      <>
                        <ChevronDown size={16} />
                        View all {errors.length} words
                      </>
                    )}
                  </button>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                <p className="text-text-secondary text-sm">
                  No errors yet! Make some guesses to grow your garden.
                </p>
                <p className="text-text-muted text-xs mt-2">
                  Wrong guesses become seeds for learning
                </p>
              </div>
            )}
          </div>

          {/* Mode Toggle */}
          <div className="bg-bg-secondary rounded-2xl p-4 border border-border mb-6">
            <p className="text-sm text-text-muted mb-3 text-center">Practice Mode</p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setMode('words')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'words'
                    ? 'bg-rose-600 bg-gradient-to-br from-rose-600 to-orange-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80'
                }`}
              >
                <BookOpen size={18} />
                Words
              </button>
              <button
                onClick={() => setMode('sentences')}
                className={`py-3 px-4 rounded-xl font-medium transition-all flex items-center justify-center gap-2 ${
                  mode === 'sentences'
                    ? 'bg-rose-600 bg-gradient-to-br from-rose-600 to-orange-600 text-white shadow-lg'
                    : 'bg-bg-tertiary text-text-primary hover:bg-bg-tertiary/80'
                }`}
              >
                <MessageSquare size={18} />
                Sentences
              </button>
            </div>
          </div>

          {/* How It Works */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">The Method</h3>
            <ol className="text-text-secondary space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold text-white">1</span>
                <span>See a Romanian {mode === 'words' ? 'word' : 'sentence'}</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold text-white">2</span>
                <span><strong className="text-rose-600 dark:text-rose-400">GUESS first</strong> - do not look it up!</span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold text-white">3</span>
                <span>Check your answer</span>
              </li>
              {mode === 'words' && (
                <>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold text-white">4</span>
                    <span>Wrong guesses go to your garden</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-rose-600 rounded-full flex items-center justify-center text-xs font-bold text-white">5</span>
                    <span>Garden words appear more often</span>
                  </li>
                </>
              )}
            </ol>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-rose-600 to-orange-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Start Guessing
            <ArrowRight size={20} />
          </button>

          {/* Item count */}
          <p className="text-center text-text-muted text-sm mt-4">
            {mode === 'words'
              ? `${VOCABULARY_DATABASE.length} words in the database`
              : `${ALL_SENTENCES.length} sentences from Tatoeba`
            }
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
              <span className="text-text-muted">Reviewed: </span>
              <span className="text-text-primary font-medium">{cardsReviewed}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-900/50 rounded-full">
                <Sparkles size={14} className="text-green-600 dark:text-green-400" />
                <span className="text-green-600 dark:text-green-400 text-sm font-medium">{streak} streak</span>
              </div>
            )}
          </div>
          <button
            onClick={endSession}
            className="text-text-muted hover:text-text-primary transition-colors text-sm"
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
              : 'bg-bg-secondary border border-border'
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
                      : 'bg-bg-tertiary'
                  }`}
                />
              ))}
            </div>

            <p className="text-text-muted text-sm mb-2">
              {mode === 'sentences' ? 'Translate this sentence:' : 'What does this mean?'}
            </p>
            <p className={`font-bold text-text-primary mb-6 ${mode === 'sentences' ? 'text-2xl leading-relaxed' : 'text-5xl font-display'}`}>
              {currentCard?.romanian || currentCard?.ro}
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
                  className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-4 text-text-primary text-center text-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-accent mb-4"
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
                      <p className="text-green-600 dark:text-green-400 text-xl font-bold">Correct!</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex justify-center mb-3">
                        <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center">
                          <X size={24} className="text-white" />
                        </div>
                      </div>
                      <p className="text-rose-600 dark:text-rose-400 text-lg mb-2">
                        Your guess:{' '}
                        <span className="line-through opacity-70">{guess}</span>
                      </p>
                      <p className={`text-text-primary font-bold ${mode === 'sentences' ? 'text-lg' : 'text-2xl'}`}>
                        {currentCard?.english || currentCard?.en}
                      </p>
                      {mode === 'words' && (
                        <div className="flex items-center justify-center gap-2 mt-3 text-rose-600 dark:text-rose-300">
                          <Flower2 size={16} />
                          <span className="text-sm">Added to your garden</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <button
                  onClick={nextCard}
                  className="w-full py-3 bg-bg-tertiary rounded-xl text-text-primary font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
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
          <span className="text-xs text-text-muted capitalize">
            Category: {currentCard?.category || 'general'}
          </span>
        </div>

        {/* Tip */}
        <div className="mt-6 p-4 bg-rose-900/20 rounded-xl border border-rose-800/30">
          <p className="text-rose-600 dark:text-rose-300 text-sm text-center italic">
            Wrong guesses stick better than passive reading. Embrace the mistakes!
          </p>
        </div>
      </div>
    </div>
  );
}

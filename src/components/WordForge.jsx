/**
 * WordForge Component
 *
 * Active production practice for Romanian.
 * Modes:
 * - Fill-in-blank: Complete sentences with missing words
 * - Sentence Builder: Arrange word tiles into correct order
 * - Translation: English to Romanian writing practice
 */

import React, { useState, useCallback, useRef } from 'react';
import { Hammer, ArrowRight, Check, X, RotateCcw, Sparkles } from 'lucide-react';
import { TATOEBA_BEGINNER, TATOEBA_INTERMEDIATE, getRandomSentence } from '../data/tatoeba';

// Use beginner and intermediate sentences for production practice
const FORGE_SENTENCES = [...TATOEBA_BEGINNER, ...TATOEBA_INTERMEDIATE];

// Shuffle array helper
const shuffleArray = (arr) => {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Create a fill-in-blank challenge from a sentence
const createBlankChallenge = (sentence) => {
  const words = sentence.romanian.split(' ');
  if (words.length < 3) return null;

  // Pick a random word to blank out (not first or last)
  const blankIndex = Math.floor(Math.random() * (words.length - 2)) + 1;
  const answer = words[blankIndex];
  const display = words.map((w, i) => i === blankIndex ? '_____' : w).join(' ');

  return { display, answer, full: sentence.romanian, english: sentence.english };
};

// Create a sentence builder challenge
const createBuilderChallenge = (sentence) => {
  const words = sentence.romanian.split(' ');
  if (words.length < 3 || words.length > 8) return null;

  return {
    correct: words,
    shuffled: shuffleArray(words),
    english: sentence.english,
  };
};

const MODES = [
  { id: 'blank', label: 'Fill in Blank', icon: '___' },
  { id: 'builder', label: 'Sentence Builder', icon: '[ ]' },
  { id: 'translate', label: 'Translate', icon: 'EN->RO' },
];

export default function WordForge({ updateStats }) {
  const [sessionActive, setSessionActive] = useState(false);
  const [mode, setMode] = useState('blank');
  const [currentChallenge, setCurrentChallenge] = useState(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedTiles, setSelectedTiles] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(0);
  const [streak, setStreak] = useState(0);
  const [sessionStart, setSessionStart] = useState(null);
  const inputRef = useRef(null);

  const getNewChallenge = useCallback(() => {
    const sentence = getRandomSentence(FORGE_SENTENCES);

    if (mode === 'blank') {
      let challenge = createBlankChallenge(sentence);
      // Try a few times if the sentence is too short
      let attempts = 0;
      while (!challenge && attempts < 5) {
        challenge = createBlankChallenge(getRandomSentence(FORGE_SENTENCES));
        attempts++;
      }
      return challenge || { display: sentence.romanian, answer: '', full: sentence.romanian, english: sentence.english };
    }

    if (mode === 'builder') {
      let challenge = createBuilderChallenge(sentence);
      let attempts = 0;
      while (!challenge && attempts < 5) {
        challenge = createBuilderChallenge(getRandomSentence(FORGE_SENTENCES));
        attempts++;
      }
      return challenge;
    }

    if (mode === 'translate') {
      return {
        english: sentence.english,
        answer: sentence.romanian,
      };
    }

    return null;
  }, [mode]);

  const startSession = () => {
    setSessionActive(true);
    setCompleted(0);
    setStreak(0);
    setSessionStart(Date.now());
    nextChallenge();
  };

  const nextChallenge = useCallback(() => {
    setCurrentChallenge(getNewChallenge());
    setUserAnswer('');
    setSelectedTiles([]);
    setShowResult(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  }, [getNewChallenge]);

  const checkAnswer = () => {
    if (!currentChallenge) return;

    let correct = false;

    if (mode === 'blank') {
      correct = userAnswer.toLowerCase().trim() === currentChallenge.answer.toLowerCase();
    } else if (mode === 'builder') {
      correct = selectedTiles.join(' ') === currentChallenge.correct.join(' ');
    } else if (mode === 'translate') {
      // More lenient check for translation
      const userWords = userAnswer.toLowerCase().trim().split(' ');
      const answerWords = currentChallenge.answer.toLowerCase().split(' ');
      const matchCount = userWords.filter(w => answerWords.includes(w)).length;
      correct = matchCount >= answerWords.length * 0.7; // 70% word match
    }

    setIsCorrect(correct);
    setShowResult(true);
    setCompleted(c => c + 1);

    if (correct) {
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
  };

  const handleTileClick = (word, index) => {
    if (showResult) return;

    // Check if this specific tile instance is already used
    const usedIndices = [];
    selectedTiles.forEach((tile, i) => {
      const tileIndex = currentChallenge.shuffled.findIndex((w, idx) =>
        w === tile && !usedIndices.includes(idx)
      );
      if (tileIndex !== -1) usedIndices.push(tileIndex);
    });

    if (usedIndices.includes(index)) {
      // Remove this tile if it's the last one
      if (selectedTiles[selectedTiles.length - 1] === word) {
        setSelectedTiles(prev => prev.slice(0, -1));
      }
    } else {
      setSelectedTiles(prev => [...prev, word]);
    }
  };

  const endSession = () => {
    const sessionMinutes = sessionStart
      ? Math.floor((Date.now() - sessionStart) / 60000)
      : 0;

    updateStats((prev) => ({
      ...prev,
      forgeMinutes: (prev.forgeMinutes || 0) + sessionMinutes,
      totalSessions: prev.totalSessions + 1,
      sentencesReviewed: (prev.sentencesReviewed || 0) + completed,
      lastSessionDate: new Date().toISOString().split('T')[0],
    }));

    setSessionActive(false);
    setCurrentChallenge(null);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      if (showResult) {
        nextChallenge();
      } else if (mode !== 'builder') {
        checkAnswer();
      }
    }
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
            <div className="inline-flex p-4 bg-forge-accent-soft rounded-2xl mb-4">
              <Hammer size={40} className="text-forge-accent" />
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">Word Forge</h1>
            <p className="text-text-muted">Forge your skills through active production</p>
          </div>

          {/* Mode Selection */}
          <div className="bg-bg-secondary rounded-2xl p-6 border border-border mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-4">Choose Your Forge</h3>
            <div className="space-y-3">
              {MODES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                    mode === m.id
                      ? 'border-forge-accent bg-forge-accent-soft'
                      : 'border-border bg-bg-tertiary hover:border-forge-accent/50'
                  }`}
                >
                  <span className={`text-lg font-mono ${mode === m.id ? 'text-forge-accent' : 'text-text-muted'}`}>
                    {m.icon}
                  </span>
                  <div>
                    <p className={`font-medium ${mode === m.id ? 'text-forge-accent' : 'text-text-primary'}`}>
                      {m.label}
                    </p>
                    <p className="text-text-muted text-sm">
                      {m.id === 'blank' && 'Complete sentences with missing words'}
                      {m.id === 'builder' && 'Arrange words into correct order'}
                      {m.id === 'translate' && 'Write Romanian from English prompts'}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Philosophy */}
          <div className="bg-forge-accent-soft rounded-2xl p-6 border border-forge-accent/30 mb-6">
            <h3 className="text-lg font-semibold text-text-primary mb-3">The Forge Method</h3>
            <ul className="text-text-secondary space-y-2 text-sm">
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Production strengthens memory more than recognition</span>
              </li>
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Mistakes reveal gaps - embrace them</span>
              </li>
              <li className="flex gap-2">
                <span className="text-forge-accent">-&gt;</span>
                <span>Speed comes with practice, start slow</span>
              </li>
            </ul>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-forge-accent rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg flex items-center justify-center gap-2"
          >
            Start Forging
            <ArrowRight size={20} />
          </button>

          <p className="text-center text-text-muted text-sm mt-4">
            {FORGE_SENTENCES.length} sentences available
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
              <span className="text-text-muted">Completed: </span>
              <span className="text-text-primary font-medium">{completed}</span>
            </div>
            {streak > 0 && (
              <div className="flex items-center gap-1 px-2 py-1 bg-success/20 rounded-full">
                <Sparkles size={14} className="text-success" />
                <span className="text-success text-sm font-medium">{streak} streak</span>
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

        {/* Challenge Card */}
        <div
          className={`rounded-2xl p-8 mb-6 transition-all duration-300 ${
            showResult
              ? isCorrect
                ? 'bg-success/20 border-2 border-success'
                : 'bg-error/20 border-2 border-error'
              : 'bg-bg-secondary border border-border'
          }`}
        >
          {/* Mode Label */}
          <p className="text-text-muted text-sm mb-2 text-center">
            {mode === 'blank' && 'Fill in the blank:'}
            {mode === 'builder' && 'Build this sentence:'}
            {mode === 'translate' && 'Translate to Romanian:'}
          </p>

          {/* Challenge Display */}
          <div className="text-center mb-6">
            {mode === 'blank' && currentChallenge && (
              <>
                <p className="text-2xl font-bold text-text-primary mb-2">
                  {currentChallenge.display}
                </p>
                <p className="text-text-muted text-sm italic">
                  {currentChallenge.english}
                </p>
              </>
            )}

            {mode === 'builder' && currentChallenge && (
              <>
                <p className="text-lg text-text-secondary mb-4 italic">
                  "{currentChallenge.english}"
                </p>
                {/* Selected tiles display */}
                <div className="min-h-[60px] bg-bg-tertiary rounded-xl p-4 mb-4 flex flex-wrap gap-2 justify-center items-center">
                  {selectedTiles.length === 0 ? (
                    <span className="text-text-muted">Tap words below to build...</span>
                  ) : (
                    selectedTiles.map((word, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-forge-accent text-white rounded-lg font-medium"
                      >
                        {word}
                      </span>
                    ))
                  )}
                </div>
                {/* Word tiles */}
                <div className="flex flex-wrap gap-2 justify-center">
                  {currentChallenge.shuffled.map((word, i) => {
                    // Count how many of this word are used
                    const usedCount = selectedTiles.filter(t => t === word).length;
                    const totalCount = currentChallenge.shuffled.slice(0, i + 1).filter(t => t === word).length;
                    const isUsed = usedCount >= totalCount;

                    return (
                      <button
                        key={i}
                        onClick={() => handleTileClick(word, i)}
                        disabled={showResult}
                        className={`px-4 py-2 rounded-lg font-medium transition-all ${
                          isUsed
                            ? 'bg-bg-tertiary text-text-muted opacity-50'
                            : 'bg-bg-tertiary text-text-primary hover:bg-forge-accent hover:text-white'
                        }`}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </>
            )}

            {mode === 'translate' && currentChallenge && (
              <p className="text-2xl font-bold text-text-primary">
                "{currentChallenge.english}"
              </p>
            )}
          </div>

          {/* Input (for blank and translate modes) */}
          {(mode === 'blank' || mode === 'translate') && !showResult && (
            <div>
              <input
                ref={inputRef}
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={mode === 'blank' ? 'Type the missing word...' : 'Type your translation...'}
                className="w-full bg-bg-tertiary border border-border rounded-xl px-4 py-4 text-text-primary text-center text-lg placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-forge-accent mb-4"
                autoFocus
                autoComplete="off"
                autoCapitalize="off"
              />
              <button
                onClick={checkAnswer}
                disabled={!userAnswer.trim()}
                className="w-full py-3 bg-forge-accent rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                Check
              </button>
            </div>
          )}

          {/* Check button for builder mode */}
          {mode === 'builder' && !showResult && (
            <button
              onClick={checkAnswer}
              disabled={selectedTiles.length !== currentChallenge?.correct?.length}
              className="w-full py-3 bg-forge-accent rounded-xl text-white font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              Check Order
            </button>
          )}

          {/* Result Display */}
          {showResult && (
            <div className="text-center">
              <div className="mb-4">
                {isCorrect ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 bg-success rounded-full flex items-center justify-center">
                      <Check size={24} className="text-white" />
                    </div>
                    <p className="text-success text-xl font-bold">Correct!</p>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-center mb-3">
                      <div className="w-12 h-12 bg-error rounded-full flex items-center justify-center">
                        <X size={24} className="text-white" />
                      </div>
                    </div>
                    <p className="text-error text-lg mb-2">Not quite...</p>
                    <p className="text-text-primary font-bold text-xl">
                      {mode === 'blank' && currentChallenge.full}
                      {mode === 'builder' && currentChallenge.correct.join(' ')}
                      {mode === 'translate' && currentChallenge.answer}
                    </p>
                  </div>
                )}
              </div>
              <button
                onClick={nextChallenge}
                className="w-full py-3 bg-bg-tertiary rounded-xl text-text-primary font-medium hover:bg-bg-secondary transition-colors flex items-center justify-center gap-2"
              >
                Next Challenge
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        {/* Reset builder */}
        {mode === 'builder' && selectedTiles.length > 0 && !showResult && (
          <button
            onClick={() => setSelectedTiles([])}
            className="w-full py-2 text-text-muted hover:text-text-primary transition-colors flex items-center justify-center gap-2 text-sm"
          >
            <RotateCcw size={14} />
            Clear Selection
          </button>
        )}

        {/* Tip */}
        <div className="mt-6 p-4 bg-forge-accent-soft rounded-xl border border-forge-accent/30">
          <p className="text-forge-accent text-sm text-center italic">
            {mode === 'blank' && 'Context clues help - look at the whole sentence!'}
            {mode === 'builder' && 'Romanian word order is flexible - trust your instincts!'}
            {mode === 'translate' && "Don't aim for perfect - get the meaning across!"}
          </p>
        </div>
      </div>
    </div>
  );
}

import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import { BookOpen, ArrowRight, Check, X, SkipForward, Volume2, Keyboard, Eye } from 'lucide-react';
import { useDifficulty } from '../contexts/DifficultyContext';

// Adaptive assessment questions organized by difficulty
// Mix of recognition and production questions
const QUESTION_BANK = {
  // Level 1-2: Basic greetings and common words
  1: [
    { type: 'produce', prompt: 'Type "yes" in Romanian:', answer: 'da' },
    { type: 'produce', prompt: 'Type "no" in Romanian:', answer: 'nu' },
    { type: 'produce', prompt: 'Type "thank you" in Romanian:', answer: 'multumesc', alternatives: ['mulțumesc'] },
  ],
  2: [
    { type: 'produce', prompt: 'Type "hello" in Romanian:', answer: 'buna', alternatives: ['bună', 'salut'] },
    { type: 'produce', prompt: 'Type "good" in Romanian:', answer: 'bun', alternatives: ['bună', 'bine'] },
    { type: 'translate', romanian: 'Buna ziua!', answer: 'good day', alternatives: ['good afternoon', 'hello'] },
  ],
  // Level 3-4: Basic sentences and common verbs
  3: [
    { type: 'produce', prompt: 'Type "I am" in Romanian:', answer: 'eu sunt', alternatives: ['sunt'] },
    { type: 'translate', romanian: 'Cum te cheama?', answer: 'what is your name', alternatives: ["what's your name", 'what are you called'] },
    { type: 'produce', prompt: 'Type "please" in Romanian:', answer: 'te rog', alternatives: ['va rog'] },
  ],
  4: [
    { type: 'translate', romanian: 'Unde este gara?', answer: 'where is the train station', alternatives: ['where is the station'] },
    { type: 'produce', prompt: 'Type "I want" in Romanian:', answer: 'vreau', alternatives: ['eu vreau'] },
    { type: 'translate', romanian: 'Cat costa?', answer: 'how much does it cost', alternatives: ['how much is it', 'how much'] },
  ],
  // Level 5-6: Intermediate - verb conjugations and more complex structures
  5: [
    { type: 'produce', prompt: 'Type "I understand" in Romanian:', answer: 'inteleg', alternatives: ['înțeleg', 'eu inteleg'] },
    { type: 'translate', romanian: 'Trebuie sa plec acum', answer: 'i have to leave now', alternatives: ['i must leave now', 'i need to leave now'] },
    { type: 'produce', prompt: 'Type "I speak Romanian" in Romanian:', answer: 'vorbesc romana', alternatives: ['eu vorbesc romana', 'vorbesc românește'] },
  ],
  6: [
    { type: 'translate', romanian: 'Mi-e foame', answer: "i'm hungry", alternatives: ['i am hungry', 'im hungry'] },
    { type: 'produce', prompt: 'Type "I would like" in Romanian:', answer: 'as vrea', alternatives: ['aș vrea', 'mi-ar placea'] },
    { type: 'translate', romanian: 'Nu stiu ce sa fac', answer: "i don't know what to do", alternatives: ['i do not know what to do'] },
  ],
  // Level 7-8: Upper intermediate - subjunctive, conditionals
  7: [
    { type: 'translate', romanian: 'Daca ai timp, vino la mine', answer: 'if you have time come to me', alternatives: ['if you have time come to my place', 'if you have time come over'] },
    { type: 'produce', prompt: 'Type "I would have gone" in Romanian:', answer: 'as fi mers', alternatives: ['aș fi mers'] },
    { type: 'translate', romanian: 'Sper sa reusesti', answer: 'i hope you succeed', alternatives: ['i hope you will succeed', 'i hope that you succeed'] },
  ],
  8: [
    { type: 'translate', romanian: 'Ar fi trebuit sa-mi spui mai devreme', answer: 'you should have told me earlier', alternatives: ['you should have told me sooner'] },
    { type: 'produce', prompt: 'Type "it seems that" in Romanian:', answer: 'se pare ca', alternatives: ['pare că', 'se pare că'] },
    { type: 'translate', romanian: 'Orice ar fi, nu renunta', answer: 'whatever happens do not give up', alternatives: ["whatever it is don't give up", 'no matter what do not give up'] },
  ],
  // Level 9-10: Advanced - complex grammar, idiomatic expressions
  9: [
    { type: 'translate', romanian: 'Desi era obosit, a continuat sa lucreze', answer: 'although he was tired he continued to work', alternatives: ['even though he was tired he continued working', 'despite being tired he continued to work'] },
    { type: 'produce', prompt: 'Type "as if" in Romanian:', answer: 'de parca', alternatives: ['de parcă', 'ca si cum', 'ca și cum'] },
    { type: 'translate', romanian: 'Cu cat inveti mai mult, cu atat intelegi mai bine', answer: 'the more you learn the better you understand', alternatives: ['the more you study the better you understand'] },
  ],
  10: [
    { type: 'translate', romanian: 'Fie ce-o fi, ma descurc eu cumva', answer: 'whatever will be i will manage somehow', alternatives: ['come what may i will manage somehow', "whatever happens i'll figure it out"] },
    { type: 'produce', prompt: 'Type "nevertheless" or "however" in Romanian:', answer: 'totusi', alternatives: ['totuși', 'cu toate acestea', 'insa', 'însă'] },
    { type: 'translate', romanian: 'N-as fi crezut niciodata ca o sa ajung aici', answer: 'i never would have believed i would get here', alternatives: ['i would never have believed that i would arrive here', "i wouldn't have believed i'd get here"] },
  ],
};

// Listening questions (use TTS)
const LISTENING_QUESTIONS = {
  3: { text: 'Ma numesc Ion', answer: 'my name is ion', alternatives: ["i'm called ion", 'i am called ion'] },
  5: { text: 'Vorbesc putin romana', answer: 'i speak a little romanian', alternatives: ['i speak some romanian', 'i speak romanian a little'] },
  7: { text: 'As vrea sa cumpar ceva de mancare', answer: 'i would like to buy something to eat', alternatives: ['i want to buy some food', 'i would like to buy some food'] },
  9: { text: 'Daca as fi avut mai mult timp, as fi invatat mai bine', answer: 'if i had had more time i would have learned better', alternatives: ['if i had more time i would have studied better'] },
};

// Normalize text for comparison
const normalizeText = (text) => {
  return text
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
    .replace(/[.,!?;:'"()-]/g, '') // Remove punctuation
    .replace(/\s+/g, ' '); // Normalize whitespace
};

// Check if answer is close enough (handles typos)
const isCloseEnough = (guess, answer) => {
  const g = normalizeText(guess);
  const a = normalizeText(answer);

  if (g === a) return true;

  // Allow 1-2 character differences for longer answers
  if (a.length > 5) {
    let diff = 0;
    const longer = g.length > a.length ? g : a;
    const shorter = g.length > a.length ? a : g;

    for (let i = 0; i < longer.length; i++) {
      if (shorter[i] !== longer[i]) diff++;
    }
    diff += Math.abs(g.length - a.length);

    return diff <= Math.min(2, Math.floor(a.length / 4));
  }

  return false;
};

// Check answer against main answer and alternatives
const checkAnswer = (guess, question) => {
  const normalizedGuess = normalizeText(guess);
  const answers = [question.answer, ...(question.alternatives || [])];

  return answers.some(answer => isCloseEnough(normalizedGuess, answer));
};

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export default function PlacementAssessment() {
  const { completeAssessment, skipAssessment } = useDifficulty();
  const [currentLevel, setCurrentLevel] = useState(5); // Start at middle
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questionsAsked, setQuestionsAsked] = useState(0);
  const [correctAtLevel, setCorrectAtLevel] = useState({});
  const [userInput, setUserInput] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [hasPlayedAudio, setHasPlayedAudio] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [levelHistory, setLevelHistory] = useState([5]);
  const inputRef = useRef(null);

  // Get current question
  const currentQuestion = useMemo(() => {
    // Every 4th question at certain levels, do a listening question
    const isListeningQ = questionsAsked > 0 && questionsAsked % 4 === 0 && LISTENING_QUESTIONS[currentLevel];

    if (isListeningQ) {
      return { ...LISTENING_QUESTIONS[currentLevel], type: 'listen', level: currentLevel };
    }

    const levelQuestions = QUESTION_BANK[currentLevel] || QUESTION_BANK[5];
    const idx = questionIndex % levelQuestions.length;
    return { ...levelQuestions[idx], level: currentLevel };
  }, [currentLevel, questionIndex, questionsAsked]);

  // Focus input after showing new question
  useEffect(() => {
    if (!showResult && !isListening) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [showResult, currentQuestion, isListening]);

  const playAudio = useCallback(() => {
    if (currentQuestion.type !== 'listen' || !currentQuestion.text) return;

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(currentQuestion.text);
    utterance.lang = 'ro-RO';
    utterance.rate = 0.85;
    utterance.onend = () => setHasPlayedAudio(true);
    window.speechSynthesis.speak(utterance);
  }, [currentQuestion]);

  const handleSubmit = useCallback(() => {
    if (!userInput.trim()) return;
    if (currentQuestion.type === 'listen' && !hasPlayedAudio) return;

    const correct = checkAnswer(userInput, currentQuestion);
    setIsCorrect(correct);
    setShowResult(true);

    // Track correctness at this level
    setCorrectAtLevel(prev => ({
      ...prev,
      [currentLevel]: {
        correct: (prev[currentLevel]?.correct || 0) + (correct ? 1 : 0),
        total: (prev[currentLevel]?.total || 0) + 1,
      }
    }));

    // Decide next level based on result
    setTimeout(() => {
      const newQuestionsAsked = questionsAsked + 1;
      setQuestionsAsked(newQuestionsAsked);

      // After 8+ questions and we've found a stable level, complete
      if (newQuestionsAsked >= 8) {
        // Check if we've been at the same level for 2+ questions
        const recentLevels = [...levelHistory, currentLevel].slice(-3);
        const isStable = recentLevels.length >= 3 &&
          recentLevels.every(l => Math.abs(l - currentLevel) <= 1);

        if (isStable || newQuestionsAsked >= 12) {
          setIsComplete(true);
          return;
        }
      }

      // Adaptive level adjustment
      let nextLevel = currentLevel;
      if (correct) {
        // Got it right - try harder (but not too fast)
        if (currentLevel < 10) {
          nextLevel = Math.min(10, currentLevel + 1);
        }
      } else {
        // Got it wrong - try easier
        if (currentLevel > 1) {
          nextLevel = Math.max(1, currentLevel - 1);
        }
      }

      setLevelHistory(prev => [...prev, nextLevel]);
      setCurrentLevel(nextLevel);
      setQuestionIndex(prev => prev + 1);
      setUserInput('');
      setShowResult(false);
      setIsListening(false);
      setHasPlayedAudio(false);
    }, 1500);
  }, [userInput, currentQuestion, currentLevel, questionsAsked, levelHistory, hasPlayedAudio]);

  const calculateFinalLevel = useCallback(() => {
    // Find the highest level where user got at least 1 correct
    let highestWithCorrect = 1;
    let weightedSum = 0;
    let totalWeight = 0;

    Object.entries(correctAtLevel).forEach(([level, data]) => {
      const lvl = parseInt(level);
      const accuracy = data.correct / data.total;

      // Weight by number of questions and accuracy
      weightedSum += lvl * accuracy * data.total;
      totalWeight += data.total;

      if (data.correct > 0 && lvl > highestWithCorrect) {
        highestWithCorrect = lvl;
      }
    });

    // Use weighted average, but cap at highest level with a correct answer
    const weightedAvg = totalWeight > 0 ? weightedSum / totalWeight : 5;
    const finalLevel = Math.min(highestWithCorrect, Math.round(weightedAvg));

    return Math.max(1, Math.min(10, finalLevel));
  }, [correctAtLevel]);

  const handleComplete = useCallback(() => {
    const level = calculateFinalLevel();
    completeAssessment(level);
  }, [calculateFinalLevel, completeAssessment]);

  // Handle Enter key
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !showResult) {
      handleSubmit();
    }
  };

  // Results screen
  if (isComplete) {
    const level = calculateFinalLevel();
    const totalCorrect = Object.values(correctAtLevel).reduce((sum, d) => sum + d.correct, 0);
    const totalQuestions = Object.values(correctAtLevel).reduce((sum, d) => sum + d.total, 0);

    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
        <div className="w-full max-w-md bg-bg-secondary rounded-2xl p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-accent" />
          </div>

          <h2 className="text-2xl font-bold text-text-primary mb-2">
            Assessment Complete
          </h2>

          <p className="text-text-secondary mb-6">
            {totalCorrect} of {totalQuestions} correct
          </p>

          <div className="bg-bg-tertiary rounded-xl p-6 mb-6">
            <p className="text-sm text-text-muted mb-2">Your starting level</p>
            <p className="text-4xl font-bold text-accent">{level}</p>
            <p className="text-text-secondary mt-1">
              {level <= 2 && 'Beginner'}
              {level > 2 && level <= 4 && 'Elementary'}
              {level > 4 && level <= 6 && 'Intermediate'}
              {level > 6 && level <= 8 && 'Upper Intermediate'}
              {level > 8 && 'Advanced'}
            </p>
          </div>

          <p className="text-sm text-text-muted mb-6">
            This adjusts automatically as you practice
          </p>

          <button
            onClick={handleComplete}
            className="w-full py-3 px-6 bg-accent hover:bg-accent/90 text-white font-medium rounded-xl transition-colors flex items-center justify-center gap-2"
          >
            Start Learning
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  const progress = Math.min(100, (questionsAsked / 10) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-2">
            Level Assessment
          </h1>
          <p className="text-text-secondary text-sm">
            Type your answers - no multiple choice
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>Testing level {currentLevel}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-bg-tertiary rounded-full overflow-hidden">
            <div
              className="h-full bg-accent transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question card */}
        <div className="bg-bg-secondary rounded-2xl p-6 mb-4">
          {/* Question type indicator */}
          <div className="flex items-center gap-2 mb-4">
            {currentQuestion.type === 'listen' && (
              <span className="flex items-center gap-1 text-xs text-accent bg-accent/10 px-2 py-1 rounded-lg">
                <Volume2 size={14} /> Listening
              </span>
            )}
            {currentQuestion.type === 'produce' && (
              <span className="flex items-center gap-1 text-xs text-purple-400 bg-purple-400/10 px-2 py-1 rounded-lg">
                <Keyboard size={14} /> Production
              </span>
            )}
            {currentQuestion.type === 'translate' && (
              <span className="flex items-center gap-1 text-xs text-teal-400 bg-teal-400/10 px-2 py-1 rounded-lg">
                <Eye size={14} /> Translation
              </span>
            )}
          </div>

          {/* Question content */}
          {currentQuestion.type === 'listen' ? (
            <div className="mb-6">
              <p className="text-text-secondary mb-4">Listen and type what you hear in English:</p>
              <button
                onClick={playAudio}
                className="w-full py-4 bg-bg-tertiary hover:bg-accent/20 rounded-xl transition-colors flex items-center justify-center gap-3"
              >
                <Volume2 size={24} className="text-accent" />
                <span className="text-text-primary font-medium">
                  {hasPlayedAudio ? 'Play Again' : 'Play Audio'}
                </span>
              </button>
              {!hasPlayedAudio && (
                <p className="text-text-muted text-xs text-center mt-2">
                  Listen at least once before answering
                </p>
              )}
            </div>
          ) : currentQuestion.type === 'produce' ? (
            <p className="text-lg text-text-primary mb-6">
              {currentQuestion.prompt}
            </p>
          ) : (
            <div className="mb-6">
              <p className="text-text-secondary text-sm mb-2">Translate to English:</p>
              <p className="text-xl text-text-primary font-medium">
                {currentQuestion.romanian}
              </p>
            </div>
          )}

          {/* Answer input */}
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={showResult}
              placeholder={currentQuestion.type === 'produce' ? 'Type in Romanian...' : 'Type in English...'}
              className={`
                w-full p-4 rounded-xl border-2 bg-bg-tertiary text-text-primary
                placeholder-text-muted focus:outline-none transition-all
                ${showResult && isCorrect ? 'border-green-500 bg-green-500/10' : ''}
                ${showResult && !isCorrect ? 'border-red-500 bg-red-500/10' : ''}
                ${!showResult ? 'border-border focus:border-accent' : ''}
              `}
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
            {showResult && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                {isCorrect ? (
                  <Check size={24} className="text-green-400" />
                ) : (
                  <X size={24} className="text-red-400" />
                )}
              </div>
            )}
          </div>

          {/* Show correct answer if wrong */}
          {showResult && !isCorrect && (
            <div className="mt-3 p-3 bg-bg-tertiary rounded-lg">
              <p className="text-text-muted text-sm">Correct answer:</p>
              <p className="text-text-primary">{currentQuestion.answer}</p>
            </div>
          )}
        </div>

        {/* Submit button */}
        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim() || (currentQuestion.type === 'listen' && !hasPlayedAudio)}
            className={`
              w-full py-3 px-6 font-medium rounded-xl transition-colors
              flex items-center justify-center gap-2
              ${userInput.trim() && (currentQuestion.type !== 'listen' || hasPlayedAudio)
                ? 'bg-accent hover:bg-accent/90 text-white'
                : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
              }
            `}
          >
            Check Answer
            <ArrowRight size={18} />
          </button>
        )}

        {/* Skip option */}
        <button
          onClick={skipAssessment}
          className="w-full mt-4 py-2 text-text-muted hover:text-text-secondary transition-colors text-sm flex items-center justify-center gap-2"
        >
          <SkipForward size={16} />
          Skip - Start at Level 3
        </button>
      </div>
    </div>
  );
}

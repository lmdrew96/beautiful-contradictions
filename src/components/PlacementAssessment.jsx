import React, { useState, useCallback, useMemo } from 'react';
import { BookOpen, ArrowRight, Check, X, SkipForward } from 'lucide-react';
import { useDifficulty } from '../contexts/DifficultyContext';

// Assessment questions spanning difficulty levels
// Each question has distractors at similar difficulty
const ASSESSMENT_QUESTIONS = [
  // Difficulty 1-2: Basic vocabulary
  {
    type: 'vocab',
    difficulty: 1,
    question: 'What does "da" mean?',
    answer: 'yes',
    options: ['yes', 'no', 'hello', 'thank you'],
  },
  {
    type: 'vocab',
    difficulty: 2,
    question: 'What does "carte" mean?',
    answer: 'book',
    options: ['book', 'house', 'water', 'friend'],
  },
  // Difficulty 3-4: Common words and phrases
  {
    type: 'vocab',
    difficulty: 3,
    question: 'What does "frumos" mean?',
    answer: 'beautiful',
    options: ['beautiful', 'ugly', 'small', 'fast'],
  },
  {
    type: 'sentence',
    difficulty: 3,
    question: 'What does "Buna dimineata!" mean?',
    answer: 'Good morning!',
    options: ['Good morning!', 'Good night!', 'Goodbye!', 'Thank you!'],
  },
  // Difficulty 5-6: Intermediate
  {
    type: 'vocab',
    difficulty: 5,
    question: 'What does "a intelege" mean?',
    answer: 'to understand',
    options: ['to understand', 'to forget', 'to remember', 'to speak'],
  },
  {
    type: 'sentence',
    difficulty: 5,
    question: 'What does "Unde locuiesti?" mean?',
    answer: 'Where do you live?',
    options: ['Where do you live?', 'What is your name?', 'How old are you?', 'What do you do?'],
  },
  // Difficulty 7-8: Upper intermediate
  {
    type: 'vocab',
    difficulty: 7,
    question: 'What does "a reusi" mean?',
    answer: 'to succeed',
    options: ['to succeed', 'to fail', 'to try', 'to begin'],
  },
  {
    type: 'sentence',
    difficulty: 7,
    question: 'What does "Mi-ar placea sa calatoresc" mean?',
    answer: 'I would like to travel',
    options: ['I would like to travel', 'I want to eat', 'I need to sleep', 'I have to work'],
  },
  // Difficulty 9-10: Advanced
  {
    type: 'vocab',
    difficulty: 9,
    question: 'What does "neintelegere" mean?',
    answer: 'misunderstanding',
    options: ['misunderstanding', 'agreement', 'knowledge', 'wisdom'],
  },
  {
    type: 'sentence',
    difficulty: 9,
    question: 'What does "Daca as fi stiut, nu as fi venit" mean?',
    answer: 'If I had known, I would not have come',
    options: [
      'If I had known, I would not have come',
      'When I know, I will come',
      'Because I knew, I came',
      'I did not know that I came',
    ],
  },
];

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
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  // Shuffle options for each question
  const questions = useMemo(() => {
    return ASSESSMENT_QUESTIONS.map(q => ({
      ...q,
      shuffledOptions: shuffleArray(q.options),
    }));
  }, []);

  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / questions.length) * 100;

  const handleSelect = useCallback((option) => {
    if (showResult) return;
    setSelectedOption(option);
  }, [showResult]);

  const handleSubmit = useCallback(() => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.answer;
    setShowResult(true);

    // Record answer
    setAnswers(prev => [...prev, {
      difficulty: currentQuestion.difficulty,
      correct: isCorrect,
    }]);

    // Auto-advance after delay
    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex(prev => prev + 1);
        setSelectedOption(null);
        setShowResult(false);
      } else {
        setIsComplete(true);
      }
    }, 1000);
  }, [selectedOption, currentQuestion, currentIndex, questions.length]);

  const calculateLevel = useCallback(() => {
    // Find highest difficulty where user got it right
    let highestCorrect = 0;
    let totalCorrect = 0;

    answers.forEach(answer => {
      if (answer.correct) {
        totalCorrect++;
        if (answer.difficulty > highestCorrect) {
          highestCorrect = answer.difficulty;
        }
      }
    });

    // If they got less than 30% right, start at level 1
    const accuracy = totalCorrect / answers.length;
    if (accuracy < 0.3) return 1;

    // If they got everything right, use the highest difficulty
    if (accuracy >= 0.9) return Math.min(10, highestCorrect + 1);

    // Otherwise, use highest correct level, capped by accuracy
    return Math.max(1, Math.min(10, Math.floor(highestCorrect * accuracy) + 1));
  }, [answers]);

  const handleComplete = useCallback(() => {
    const level = calculateLevel();
    completeAssessment(level);
  }, [calculateLevel, completeAssessment]);

  // Results screen
  if (isComplete) {
    const level = calculateLevel();
    const correctCount = answers.filter(a => a.correct).length;

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
            You got {correctCount} out of {answers.length} correct
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
            Your level will adjust automatically as you practice
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

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-bg-primary">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-6 h-6 text-accent" />
          </div>
          <h1 className="text-xl font-bold text-text-primary mb-2">
            Quick Level Check
          </h1>
          <p className="text-text-secondary text-sm">
            {questions.length} quick questions to find your level
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-text-muted mb-2">
            <span>Question {currentIndex + 1} of {questions.length}</span>
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
          <p className="text-lg font-medium text-text-primary mb-6">
            {currentQuestion.question}
          </p>

          <div className="space-y-3">
            {currentQuestion.shuffledOptions.map((option, index) => {
              const isSelected = selectedOption === option;
              const isCorrect = option === currentQuestion.answer;
              const showCorrect = showResult && isCorrect;
              const showWrong = showResult && isSelected && !isCorrect;

              return (
                <button
                  key={index}
                  onClick={() => handleSelect(option)}
                  disabled={showResult}
                  className={`
                    w-full text-left p-4 rounded-xl border-2 transition-all
                    ${!showResult && isSelected
                      ? 'border-accent bg-accent/10'
                      : !showResult
                        ? 'border-border hover:border-accent/50 bg-bg-tertiary'
                        : ''
                    }
                    ${showCorrect ? 'border-green-500 bg-green-500/10' : ''}
                    ${showWrong ? 'border-red-500 bg-red-500/10' : ''}
                    ${showResult && !showCorrect && !showWrong ? 'opacity-50' : ''}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className={`
                      ${showCorrect ? 'text-green-400' : ''}
                      ${showWrong ? 'text-red-400' : ''}
                      ${!showResult ? 'text-text-primary' : ''}
                    `}>
                      {option}
                    </span>
                    {showCorrect && <Check size={20} className="text-green-400" />}
                    {showWrong && <X size={20} className="text-red-400" />}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit button */}
        {!showResult && (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`
              w-full py-3 px-6 font-medium rounded-xl transition-colors
              flex items-center justify-center gap-2
              ${selectedOption
                ? 'bg-accent hover:bg-accent/90 text-white'
                : 'bg-bg-tertiary text-text-muted cursor-not-allowed'
              }
            `}
          >
            Continue
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

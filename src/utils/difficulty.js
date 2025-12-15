/**
 * Difficulty Utilities
 *
 * Centralizes difficulty calculations across different content types.
 *
 * Difficulty scales:
 * - Content (YouTube, Spotify, etc.): 1-10
 * - Vocabulary: 1-5
 * - Sentences (Tatoeba): 1-10 (based on length, vocabulary, grammar)
 * - Stories: 1-10
 * - Recipes: 1-10 (language difficulty, not cooking difficulty)
 */

/**
 * Normalize any difficulty to 1-10 scale
 * @param {number} value - Original difficulty value
 * @param {number} sourceScale - Max value of source scale (default 10)
 * @returns {number} Normalized 1-10 value
 */
export const normalizeDifficulty = (value, sourceScale = 10) => {
  if (sourceScale === 5) {
    // Vocabulary uses 1-5 scale, double it
    return Math.min(10, value * 2);
  }
  return Math.min(10, Math.max(1, value));
};

/**
 * Calculate sentence difficulty based on characteristics
 * Used for Tatoeba sentences
 * @param {string} sentence - Romanian sentence text
 * @returns {number} Difficulty 1-10
 */
export const calculateSentenceDifficulty = (sentence) => {
  if (!sentence || typeof sentence !== 'string') {
    return 5; // Default to medium
  }

  const words = sentence.trim().split(/\s+/);
  const wordCount = words.length;
  const avgWordLength = sentence.length / wordCount;

  // Check for Romanian diacritics (indicates authentic Romanian)
  const hasDiacritics = /[ăâîșțĂÂÎȘȚ]/.test(sentence);

  // Check for complex punctuation (commas, semicolons = complex structure)
  const hasComplexPunctuation = /[,;:]/.test(sentence);

  // Base difficulty on word count
  let difficulty;
  if (wordCount <= 3) {
    difficulty = 1;
  } else if (wordCount <= 5) {
    difficulty = 2;
  } else if (wordCount <= 8) {
    difficulty = 3;
  } else if (wordCount <= 12) {
    difficulty = 5;
  } else if (wordCount <= 18) {
    difficulty = 7;
  } else {
    difficulty = 8;
  }

  // Adjust for complexity indicators
  if (avgWordLength > 7) {
    difficulty += 1;
  }
  if (hasComplexPunctuation) {
    difficulty += 1;
  }

  return Math.min(10, Math.max(1, difficulty));
};

/**
 * Get difficulty label for display
 * @param {number} value - Difficulty 1-10
 * @returns {string} Human-readable label
 */
export const getDifficultyLabel = (value) => {
  if (value <= 2) return 'Beginner';
  if (value <= 4) return 'Elementary';
  if (value <= 6) return 'Intermediate';
  if (value <= 8) return 'Upper Intermediate';
  return 'Advanced';
};

/**
 * Get difficulty color for UI
 * @param {number} value - Difficulty 1-10
 * @returns {string} Tailwind color class
 */
export const getDifficultyColor = (value) => {
  if (value <= 2) return 'text-green-400';
  if (value <= 4) return 'text-emerald-400';
  if (value <= 6) return 'text-yellow-400';
  if (value <= 8) return 'text-orange-400';
  return 'text-red-400';
};

/**
 * Get difficulty background color for UI
 * @param {number} value - Difficulty 1-10
 * @returns {string} Tailwind background class
 */
export const getDifficultyBgColor = (value) => {
  if (value <= 2) return 'bg-green-500/20';
  if (value <= 4) return 'bg-emerald-500/20';
  if (value <= 6) return 'bg-yellow-500/20';
  if (value <= 8) return 'bg-orange-500/20';
  return 'bg-red-500/20';
};

/**
 * Calculate user difficulty level based on error history
 * Used for adaptive difficulty suggestions
 * @param {Array} errorHistory - Array of error objects with wrongCount
 * @returns {number} Recommended difficulty 1-10
 */
export const getUserDifficultyLevel = (errorHistory = []) => {
  if (!errorHistory || errorHistory.length === 0) {
    return 3; // Default to elementary for new users
  }

  // Calculate average difficulty of errors
  const avgErrorDifficulty = errorHistory.reduce((sum, e) => {
    // Normalize vocabulary difficulty (1-5) to 1-10
    const normalized = e.difficulty <= 5 ? e.difficulty * 2 : e.difficulty;
    return sum + normalized;
  }, 0) / errorHistory.length;

  // If user makes many errors at low difficulty, stay low
  // If user makes few errors at high difficulty, suggest higher
  const errorRate = errorHistory.reduce((sum, e) => sum + (e.wrongCount || 1), 0) / errorHistory.length;

  if (errorRate > 2) {
    // Struggling - suggest lower difficulty
    return Math.max(1, Math.floor(avgErrorDifficulty - 1));
  } else if (errorRate < 1.2) {
    // Doing well - suggest higher difficulty
    return Math.min(10, Math.ceil(avgErrorDifficulty + 1));
  }

  return Math.round(avgErrorDifficulty);
};

/**
 * Check if content difficulty is appropriate for user
 * @param {number} contentDifficulty - Content difficulty 1-10
 * @param {number} userLevel - User's current level 1-10
 * @param {string} mode - 'challenge' (fog) or 'comfort' (chaos)
 * @returns {boolean} Whether content is appropriate
 */
export const isDifficultyAppropriate = (contentDifficulty, userLevel, mode = 'comfort') => {
  if (mode === 'challenge') {
    // Fog Machine: content should be at or above user level
    return contentDifficulty >= userLevel;
  }

  // Chaos Engine: content within +/- 2 of user level
  return Math.abs(contentDifficulty - userLevel) <= 2;
};

// Configuration constants for level calculation
export const DIFFICULTY_CONFIG = {
  INCREASE_THRESHOLD: 0.80,  // 80% accuracy triggers level increase
  DECREASE_THRESHOLD: 0.50,  // 50% accuracy triggers level decrease
  MIN_ATTEMPTS_FOR_ADJUSTMENT: 10,
  MAX_LEVEL_CHANGE: 1,
  EASY_OFFSET: -2,
  HARD_OFFSET: 2,
  CONTENT_RANGE: 2,  // Show content within +/- 2 of effective level
  WINDOW_SIZE: 50,   // Rolling window for performance tracking
};

/**
 * Calculate user level based on recent performance
 * Uses weighted accuracy with recency bias
 * @param {Array} attempts - Array of { difficulty, correct, timestamp }
 * @param {number} currentLevel - Current level 1-10
 * @returns {number} New level 1-10
 */
export const calculateLevelFromPerformance = (attempts = [], currentLevel = 3) => {
  if (!attempts || attempts.length < DIFFICULTY_CONFIG.MIN_ATTEMPTS_FOR_ADJUSTMENT) {
    return currentLevel;
  }

  // Get recent attempts (last WINDOW_SIZE)
  const recentAttempts = attempts.slice(-DIFFICULTY_CONFIG.WINDOW_SIZE);

  // Calculate weighted accuracy (recent attempts and higher difficulty weighted more)
  let weightedCorrect = 0;
  let totalWeight = 0;

  recentAttempts.forEach((attempt, index) => {
    const recencyWeight = (index + 1) / recentAttempts.length;
    const difficultyWeight = attempt.difficulty / 10;
    const weight = recencyWeight * (0.5 + difficultyWeight * 0.5);

    totalWeight += weight;
    if (attempt.correct) {
      weightedCorrect += weight;
    }
  });

  const weightedAccuracy = totalWeight > 0 ? weightedCorrect / totalWeight : 0.5;

  // Determine level adjustment
  if (weightedAccuracy >= DIFFICULTY_CONFIG.INCREASE_THRESHOLD) {
    return Math.min(10, currentLevel + DIFFICULTY_CONFIG.MAX_LEVEL_CHANGE);
  } else if (weightedAccuracy <= DIFFICULTY_CONFIG.DECREASE_THRESHOLD) {
    return Math.max(1, currentLevel - DIFFICULTY_CONFIG.MAX_LEVEL_CHANGE);
  }

  return currentLevel;
};

/**
 * Get effective level considering override (easy/normal/hard)
 * @param {number} calculatedLevel - Base level 1-10
 * @param {string} override - 'easy' | 'normal' | 'hard'
 * @returns {number} Adjusted level 1-10
 */
export const getEffectiveLevel = (calculatedLevel, override = 'normal') => {
  switch (override) {
    case 'easy':
      return Math.max(1, calculatedLevel + DIFFICULTY_CONFIG.EASY_OFFSET);
    case 'hard':
      return Math.min(10, calculatedLevel + DIFFICULTY_CONFIG.HARD_OFFSET);
    default:
      return calculatedLevel;
  }
};

/**
 * Filter content array by effective level with range
 * @param {Array} content - Array of items with difficulty property
 * @param {number} effectiveLevel - Target level 1-10
 * @param {number} range - Range above/below to include (default 2)
 * @returns {Array} Filtered content
 */
export const filterContentByLevel = (content, effectiveLevel, range = DIFFICULTY_CONFIG.CONTENT_RANGE) => {
  if (!content || !Array.isArray(content)) return [];

  const min = Math.max(1, effectiveLevel - range);
  const max = Math.min(10, effectiveLevel + range);

  return content.filter(item => {
    const diff = item.difficulty || 5;
    return diff >= min && diff <= max;
  });
};

/**
 * Calculate progress toward next level (0-100%)
 * @param {Array} attempts - Recent attempts
 * @param {number} currentLevel - Current level
 * @returns {number} Progress percentage 0-100
 */
export const getLevelProgress = (attempts = [], currentLevel = 3) => {
  if (!attempts || attempts.length < 5) return 0;

  const recentAttempts = attempts.slice(-DIFFICULTY_CONFIG.WINDOW_SIZE);
  const correctCount = recentAttempts.filter(a => a.correct).length;
  const accuracy = correctCount / recentAttempts.length;

  // Map accuracy to progress
  // Below 50% = 0%, 50-80% = 0-100%, above 80% = 100%
  if (accuracy <= DIFFICULTY_CONFIG.DECREASE_THRESHOLD) return 0;
  if (accuracy >= DIFFICULTY_CONFIG.INCREASE_THRESHOLD) return 100;

  const range = DIFFICULTY_CONFIG.INCREASE_THRESHOLD - DIFFICULTY_CONFIG.DECREASE_THRESHOLD;
  const progress = (accuracy - DIFFICULTY_CONFIG.DECREASE_THRESHOLD) / range;
  return Math.round(progress * 100);
};

export default {
  normalizeDifficulty,
  calculateSentenceDifficulty,
  getDifficultyLabel,
  getDifficultyColor,
  getDifficultyBgColor,
  getUserDifficultyLevel,
  isDifficultyAppropriate,
  calculateLevelFromPerformance,
  getEffectiveLevel,
  filterContentByLevel,
  getLevelProgress,
  DIFFICULTY_CONFIG,
};

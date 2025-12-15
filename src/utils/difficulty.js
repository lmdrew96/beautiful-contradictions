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

export default {
  normalizeDifficulty,
  calculateSentenceDifficulty,
  getDifficultyLabel,
  getDifficultyColor,
  getDifficultyBgColor,
  getUserDifficultyLevel,
  isDifficultyAppropriate,
};

/**
 * Unified Content Index
 *
 * All content access goes through this module.
 * This allows for:
 * - Content filtering by multiple criteria
 * - Lazy loading of large datasets
 * - Content statistics
 * - Future expansion (Tatoeba, stories, recipes)
 */

// Content database exports
export {
  CONTENT_DATABASE,
  getContentBySessionType,
  getContentByDifficulty,
  getContentByType,
  getRandomContent,
} from './content';

// Vocabulary database exports
export {
  VOCABULARY_DATABASE,
  getVocabByDifficulty,
  getVocabByCategory,
  getRandomVocab,
  getWeightedRandomVocab,
} from './vocabulary';

// Tatoeba sentences exports
export {
  TATOEBA_BEGINNER,
  loadIntermediate,
  loadAdvanced,
  getAllSentences,
  getSentencesByDifficulty,
  getRandomSentence,
  getSentencesWithAudio,
} from './tatoeba';

// Romanian stories exports
export {
  ROMANIAN_STORIES,
  getStoriesByDifficulty,
  getStoriesByGenre,
  getRandomStory,
} from './stories';

// Romanian recipes exports
export {
  ROMANIAN_RECIPES,
  getRecipesByDifficulty,
  getRecipesByCategory,
  getRandomRecipe,
} from './recipes';

/**
 * Get content statistics
 */
export const getContentStats = () => {
  const { CONTENT_DATABASE } = require('./content');
  const { VOCABULARY_DATABASE } = require('./vocabulary');

  return {
    totalContent: CONTENT_DATABASE.length,
    totalVocabulary: VOCABULARY_DATABASE.length,
    contentByPlatform: CONTENT_DATABASE.reduce((acc, item) => {
      acc[item.platform] = (acc[item.platform] || 0) + 1;
      return acc;
    }, {}),
    vocabByDifficulty: VOCABULARY_DATABASE.reduce((acc, item) => {
      acc[item.difficulty] = (acc[item.difficulty] || 0) + 1;
      return acc;
    }, {}),
  };
};

/**
 * Search across all content types
 * Returns items matching the query in title, description, or category
 */
export const searchAllContent = (query, options = {}) => {
  const { CONTENT_DATABASE } = require('./content');
  const { VOCABULARY_DATABASE } = require('./vocabulary');

  const lowerQuery = query.toLowerCase();
  const results = {
    content: [],
    vocabulary: [],
  };

  // Search content
  if (!options.type || options.type === 'content') {
    results.content = CONTENT_DATABASE.filter(item =>
      item.title.toLowerCase().includes(lowerQuery) ||
      item.description.toLowerCase().includes(lowerQuery) ||
      item.topics.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }

  // Search vocabulary
  if (!options.type || options.type === 'vocabulary') {
    results.vocabulary = VOCABULARY_DATABASE.filter(item =>
      item.ro.toLowerCase().includes(lowerQuery) ||
      item.en.toLowerCase().includes(lowerQuery) ||
      item.category.toLowerCase().includes(lowerQuery)
    );
  }

  return results;
};

/**
 * Get session content based on session type and difficulty
 * Used by Chaos Engine, Fog Machine, etc.
 */
export const getSessionContent = (sessionType, difficulty = null, count = 10) => {
  const { CONTENT_DATABASE } = require('./content');

  let filtered = CONTENT_DATABASE.filter(c => c.sessionTypes.includes(sessionType));

  if (difficulty !== null) {
    // Allow +/- 2 difficulty levels for variety
    const minDiff = Math.max(1, difficulty - 2);
    const maxDiff = Math.min(10, difficulty + 2);
    filtered = filtered.filter(c => c.difficulty >= minDiff && c.difficulty <= maxDiff);
  }

  // Shuffle and return requested count
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

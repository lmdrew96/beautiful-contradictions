/**
 * Tatoeba Sentences Database
 *
 * Provides Romanian sentences with English translations from Tatoeba.org
 * Organized by difficulty level with lazy loading support.
 *
 * Structure:
 * {
 *   id: string,           // tat-XXXXX
 *   romanian: string,     // Romanian sentence
 *   english: string,      // English translation
 *   difficulty: number,   // 1-10
 *   wordCount: number,    // Word count
 *   hasAudio: boolean,    // Has native audio
 *   audioUrl: string,     // Audio URL (if available)
 * }
 *
 * Attribution: Sentences from Tatoeba.org, CC-BY 2.0 FR
 */

// All sentence levels exported directly for immediate use
// Consolidated: beginner/intermediate are audio-only, advanced includes all
export { TATOEBA_BEGINNER } from './beginner';
export { TATOEBA_INTERMEDIATE } from './intermediate';
export { TATOEBA_ADVANCED } from './advanced';

// Lazy-loaded chunks for performance optimization (if needed)
export const loadIntermediate = () => import('./intermediate');
export const loadAdvanced = () => import('./advanced');

// Combined getter for all loaded sentences
export const getAllSentences = async () => {
  const { TATOEBA_BEGINNER } = await import('./beginner');
  const { TATOEBA_INTERMEDIATE } = await import('./intermediate');
  const { TATOEBA_ADVANCED } = await import('./advanced');
  return [
    ...TATOEBA_BEGINNER,
    ...TATOEBA_INTERMEDIATE,
    ...TATOEBA_ADVANCED,
  ];
};

// Filter by difficulty
export const getSentencesByDifficulty = (sentences, min, max) => {
  return sentences.filter(s => s.difficulty >= min && s.difficulty <= max);
};

// Get random sentence
export const getRandomSentence = (sentences) => {
  return sentences[Math.floor(Math.random() * sentences.length)];
};

// Get sentences with audio only
export const getSentencesWithAudio = (sentences) => {
  return sentences.filter(s => s.hasAudio);
};

/**
 * Normalize Romanian text for search (remove diacritics, lowercase)
 */
const normalizeForSearch = (text) => {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ș/gi, 's')
    .replace(/ț/gi, 't');
};

/**
 * Search sentences containing a specific Romanian word
 * @param {string} word - The Romanian word to search for
 * @param {number} limit - Maximum results to return (default 5)
 * @returns {Promise<Array>} - Array of matching sentences with word positions
 */
export const searchSentencesByWord = async (word, limit = 5) => {
  if (!word || word.trim().length === 0) return [];

  const normalizedWord = normalizeForSearch(word.trim());
  const allSentences = await getAllSentences();

  // Create regex to match whole word (with word boundaries)
  // Handle common Romanian word endings for better matching
  const wordPattern = new RegExp(
    `\\b${normalizedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[aăeiouyîâ]?\\b`,
    'i'
  );

  const matches = [];

  for (const sentence of allSentences) {
    if (matches.length >= limit) break;

    const normalizedSentence = normalizeForSearch(sentence.romanian);

    if (wordPattern.test(normalizedSentence)) {
      // Find the actual word position in the original sentence
      // for potential highlighting
      const words = sentence.romanian.split(/\s+/);
      const matchIndex = words.findIndex(w =>
        wordPattern.test(normalizeForSearch(w))
      );

      matches.push({
        ...sentence,
        matchedWord: matchIndex >= 0 ? words[matchIndex] : word,
        matchIndex,
      });
    }
  }

  // Sort by difficulty (easier first) then by sentence length (shorter first)
  return matches.sort((a, b) => {
    if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
    return a.romanian.length - b.romanian.length;
  });
};

/**
 * Synchronous version for pre-loaded sentences
 */
export const searchSentencesByWordSync = (sentences, word, limit = 5) => {
  if (!word || word.trim().length === 0) return [];

  const normalizedWord = normalizeForSearch(word.trim());

  const wordPattern = new RegExp(
    `\\b${normalizedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[aăeiouyîâ]?\\b`,
    'i'
  );

  const matches = [];

  for (const sentence of sentences) {
    if (matches.length >= limit) break;

    const normalizedSentence = normalizeForSearch(sentence.romanian);

    if (wordPattern.test(normalizedSentence)) {
      const words = sentence.romanian.split(/\s+/);
      const matchIndex = words.findIndex(w =>
        wordPattern.test(normalizeForSearch(w))
      );

      matches.push({
        ...sentence,
        matchedWord: matchIndex >= 0 ? words[matchIndex] : word,
        matchIndex,
      });
    }
  }

  return matches.sort((a, b) => {
    if (a.difficulty !== b.difficulty) return a.difficulty - b.difficulty;
    return a.romanian.length - b.romanian.length;
  });
};

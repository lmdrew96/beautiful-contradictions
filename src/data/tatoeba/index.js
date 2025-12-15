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
export { TATOEBA_BEGINNER } from './beginner';
export { TATOEBA_INTERMEDIATE } from './intermediate';
export { TATOEBA_ADVANCED } from './advanced';

// Extended sentence sets (from Tatoeba bulk download)
export { TATOEBA_BEGINNER_EXTENDED } from './beginner_extended';
export { TATOEBA_INTERMEDIATE_EXTENDED } from './intermediate_extended';
export { TATOEBA_ADVANCED_EXTENDED } from './advanced_extended';

// Lazy-loaded chunks for performance optimization (if needed)
export const loadIntermediate = () => import('./intermediate');
export const loadAdvanced = () => import('./advanced');

// Combined getter for all loaded sentences (original + extended)
export const getAllSentences = async () => {
  const { TATOEBA_BEGINNER } = await import('./beginner');
  const { TATOEBA_INTERMEDIATE } = await import('./intermediate');
  const { TATOEBA_ADVANCED } = await import('./advanced');
  const { TATOEBA_BEGINNER_EXTENDED } = await import('./beginner_extended');
  const { TATOEBA_INTERMEDIATE_EXTENDED } = await import('./intermediate_extended');
  const { TATOEBA_ADVANCED_EXTENDED } = await import('./advanced_extended');
  return [
    ...TATOEBA_BEGINNER,
    ...TATOEBA_INTERMEDIATE,
    ...TATOEBA_ADVANCED,
    ...TATOEBA_BEGINNER_EXTENDED,
    ...TATOEBA_INTERMEDIATE_EXTENDED,
    ...TATOEBA_ADVANCED_EXTENDED,
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

/**
 * Romanian Dictionary Utility
 *
 * Provides word lookup and search functionality using the Kaikki.org/Wiktionary data.
 * Dictionary files are loaded on-demand by first letter for optimal performance.
 */

import { lookupWord as baseLookup, searchWords as baseSearch, getStats } from '../data/dictionary/index.js';

/**
 * Normalize a Romanian word for lookup
 * Handles diacritics and case
 */
export function normalizeWord(word) {
  if (!word) return '';
  return word.toLowerCase().trim();
}

/**
 * Normalize diacritics for search (ă→a, â→a, î→i, ș→s, ț→t)
 */
export function removeDiacritics(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/ș/gi, 's')
    .replace(/ț/gi, 't');
}

/**
 * Look up a word in the dictionary
 * @param {string} word - The Romanian word to look up
 * @returns {Promise<Object|null>} - The dictionary entry or null
 */
export async function lookupWord(word) {
  if (!word || word.trim().length === 0) return null;

  const normalized = normalizeWord(word);

  // Try exact match first
  let result = await baseLookup(normalized);

  // If not found, try without diacritics
  if (!result) {
    const withoutDiacritics = removeDiacritics(normalized);
    if (withoutDiacritics !== normalized) {
      result = await baseLookup(withoutDiacritics);
    }
  }

  return result;
}

/**
 * Search for words starting with a prefix
 * @param {string} prefix - The search prefix
 * @param {number} limit - Maximum results to return
 * @returns {Promise<Array>} - Array of matching dictionary entries
 */
export async function searchWords(prefix, limit = 10) {
  if (!prefix || prefix.trim().length === 0) return [];

  const normalized = normalizeWord(prefix);
  return baseSearch(normalized, limit);
}

/**
 * Format part of speech for display
 */
export function formatPartOfSpeech(pos) {
  const labels = {
    noun: 'noun',
    verb: 'verb',
    adj: 'adjective',
    adv: 'adverb',
    pron: 'pronoun',
    prep: 'preposition',
    conj: 'conjunction',
    intj: 'interjection',
    det: 'determiner',
    num: 'numeral',
    particle: 'particle',
    article: 'article',
    name: 'proper noun',
    phrase: 'phrase',
    proverb: 'proverb',
    suffix: 'suffix',
    prefix: 'prefix',
    contraction: 'contraction',
    character: 'letter',
  };
  return labels[pos] || pos;
}

/**
 * Format gender for display
 */
export function formatGender(gender) {
  const labels = {
    m: 'masculine',
    f: 'feminine',
    n: 'neuter',
    mf: 'masc./fem.',
  };
  return labels[gender] || gender;
}

/**
 * Get a human-readable summary of a word entry
 */
export function getWordSummary(entry) {
  if (!entry) return null;

  const parts = [formatPartOfSpeech(entry.pos)];

  if (entry.gender) {
    parts.push(formatGender(entry.gender));
  }

  return parts.join(', ');
}

/**
 * Get the primary definition of a word
 */
export function getPrimaryDefinition(entry) {
  if (!entry || !entry.definitions || entry.definitions.length === 0) {
    return null;
  }
  return entry.definitions[0];
}

/**
 * Check if a word exists in the dictionary
 */
export async function wordExists(word) {
  const result = await lookupWord(word);
  return result !== null;
}

/**
 * Get dictionary statistics
 */
export function getDictionaryStats() {
  return getStats();
}

export default {
  lookupWord,
  searchWords,
  normalizeWord,
  removeDiacritics,
  formatPartOfSpeech,
  formatGender,
  getWordSummary,
  getPrimaryDefinition,
  wordExists,
  getDictionaryStats,
};

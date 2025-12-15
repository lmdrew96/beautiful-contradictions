/**
 * Vocabulary Database
 * Core vocabulary for the Error Garden feature
 * 
 * Difficulty scale:
 * 1 - Basic words (first 100 most common)
 * 2 - Common words (top 500)
 * 3 - Intermediate (top 1000)
 * 4 - Upper intermediate
 * 5 - Advanced
 */

export const VOCABULARY_DATABASE = [
  // ============================================
  // DIFFICULTY 1 - Essential Basics
  // ============================================
  { ro: 'da', en: 'yes', difficulty: 1, category: 'basics' },
  { ro: 'nu', en: 'no', difficulty: 1, category: 'basics' },
  { ro: 'bună', en: 'hello/good', difficulty: 1, category: 'greetings' },
  { ro: 'salut', en: 'hi', difficulty: 1, category: 'greetings' },
  { ro: 'mulțumesc', en: 'thank you', difficulty: 1, category: 'greetings' },
  { ro: 'te rog', en: 'please', difficulty: 1, category: 'greetings' },
  { ro: 'scuze', en: 'sorry/excuse me', difficulty: 1, category: 'greetings' },
  { ro: 'eu', en: 'I', difficulty: 1, category: 'pronouns' },
  { ro: 'tu', en: 'you', difficulty: 1, category: 'pronouns' },
  { ro: 'el', en: 'he', difficulty: 1, category: 'pronouns' },
  { ro: 'ea', en: 'she', difficulty: 1, category: 'pronouns' },
  { ro: 'noi', en: 'we', difficulty: 1, category: 'pronouns' },
  { ro: 'și', en: 'and', difficulty: 1, category: 'connectors' },
  { ro: 'sau', en: 'or', difficulty: 1, category: 'connectors' },
  { ro: 'dar', en: 'but', difficulty: 1, category: 'connectors' },
  { ro: 'apă', en: 'water', difficulty: 1, category: 'nouns' },
  { ro: 'casă', en: 'house', difficulty: 1, category: 'nouns' },
  { ro: 'carte', en: 'book', difficulty: 1, category: 'nouns' },
  { ro: 'om', en: 'man/person', difficulty: 1, category: 'nouns' },
  { ro: 'femeie', en: 'woman', difficulty: 1, category: 'nouns' },

  // ============================================
  // DIFFICULTY 2 - Common Words
  // ============================================
  { ro: 'prieten', en: 'friend', difficulty: 2, category: 'nouns' },
  { ro: 'prieteni', en: 'friends', difficulty: 2, category: 'nouns' },
  { ro: 'familie', en: 'family', difficulty: 2, category: 'nouns' },
  { ro: 'drum', en: 'road', difficulty: 2, category: 'nouns' },
  { ro: 'mâncare', en: 'food', difficulty: 2, category: 'nouns' },
  { ro: 'timp', en: 'time', difficulty: 2, category: 'nouns' },
  { ro: 'zi', en: 'day', difficulty: 2, category: 'nouns' },
  { ro: 'noapte', en: 'night', difficulty: 2, category: 'nouns' },
  { ro: 'frumos', en: 'beautiful', difficulty: 2, category: 'adjectives' },
  { ro: 'bun', en: 'good', difficulty: 2, category: 'adjectives' },
  { ro: 'rău', en: 'bad', difficulty: 2, category: 'adjectives' },
  { ro: 'mare', en: 'big/sea', difficulty: 2, category: 'adjectives' },
  { ro: 'mic', en: 'small', difficulty: 2, category: 'adjectives' },
  { ro: 'nou', en: 'new', difficulty: 2, category: 'adjectives' },
  { ro: 'vechi', en: 'old', difficulty: 2, category: 'adjectives' },
  { ro: 'a fi', en: 'to be', difficulty: 2, category: 'verbs' },
  { ro: 'a avea', en: 'to have', difficulty: 2, category: 'verbs' },
  { ro: 'a merge', en: 'to go', difficulty: 2, category: 'verbs' },
  { ro: 'a veni', en: 'to come', difficulty: 2, category: 'verbs' },
  { ro: 'a face', en: 'to do/make', difficulty: 2, category: 'verbs' },
  { ro: 'poate', en: 'maybe', difficulty: 2, category: 'adverbs' },
  { ro: 'acum', en: 'now', difficulty: 2, category: 'adverbs' },
  { ro: 'aici', en: 'here', difficulty: 2, category: 'adverbs' },
  { ro: 'acolo', en: 'there', difficulty: 2, category: 'adverbs' },

  // ============================================
  // DIFFICULTY 3 - Intermediate
  // ============================================
  { ro: 'înțeleg', en: 'I understand', difficulty: 3, category: 'verbs' },
  { ro: 'întrebare', en: 'question', difficulty: 3, category: 'nouns' },
  { ro: 'răspuns', en: 'answer', difficulty: 3, category: 'nouns' },
  { ro: 'dragoste', en: 'love', difficulty: 3, category: 'nouns' },
  { ro: 'viață', en: 'life', difficulty: 3, category: 'nouns' },
  { ro: 'lucru', en: 'thing/work', difficulty: 3, category: 'nouns' },
  { ro: 'trebuie', en: 'must/need', difficulty: 3, category: 'verbs' },
  { ro: 'a ști', en: 'to know', difficulty: 3, category: 'verbs' },
  { ro: 'a crede', en: 'to believe', difficulty: 3, category: 'verbs' },
  { ro: 'a vedea', en: 'to see', difficulty: 3, category: 'verbs' },
  { ro: 'a auzi', en: 'to hear', difficulty: 3, category: 'verbs' },
  { ro: 'a vorbi', en: 'to speak', difficulty: 3, category: 'verbs' },
  { ro: 'a citi', en: 'to read', difficulty: 3, category: 'verbs' },
  { ro: 'a scrie', en: 'to write', difficulty: 3, category: 'verbs' },
  { ro: 'a învăța', en: 'to learn', difficulty: 3, category: 'verbs' },
  { ro: 'sigur', en: 'sure/safe', difficulty: 3, category: 'adjectives' },
  { ro: 'destul', en: 'enough', difficulty: 3, category: 'adjectives' },
  { ro: 'deja', en: 'already', difficulty: 3, category: 'adverbs' },
  { ro: 'încă', en: 'still/yet', difficulty: 3, category: 'adverbs' },
  { ro: 'mereu', en: 'always', difficulty: 3, category: 'adverbs' },
  { ro: 'niciodată', en: 'never', difficulty: 3, category: 'adverbs' },
  { ro: 'uneori', en: 'sometimes', difficulty: 3, category: 'adverbs' },
  { ro: 'pentru că', en: 'because', difficulty: 3, category: 'connectors' },
  { ro: 'dacă', en: 'if', difficulty: 3, category: 'connectors' },
  { ro: 'când', en: 'when', difficulty: 3, category: 'connectors' },

  // ============================================
  // DIFFICULTY 4 - Upper Intermediate
  // ============================================
  { ro: 'suflet', en: 'soul', difficulty: 4, category: 'nouns' },
  { ro: 'gând', en: 'thought', difficulty: 4, category: 'nouns' },
  { ro: 'simțire', en: 'feeling', difficulty: 4, category: 'nouns' },
  { ro: 'amintire', en: 'memory', difficulty: 4, category: 'nouns' },
  { ro: 'speranță', en: 'hope', difficulty: 4, category: 'nouns' },
  { ro: 'putere', en: 'power/strength', difficulty: 4, category: 'nouns' },
  { ro: 'întotdeauna', en: 'always', difficulty: 4, category: 'adverbs' },
  { ro: 'aproape', en: 'almost/near', difficulty: 4, category: 'adverbs' },
  { ro: 'departe', en: 'far', difficulty: 4, category: 'adverbs' },
  { ro: 'a simți', en: 'to feel', difficulty: 4, category: 'verbs' },
  { ro: 'a încerca', en: 'to try', difficulty: 4, category: 'verbs' },
  { ro: 'a găsi', en: 'to find', difficulty: 4, category: 'verbs' },
  { ro: 'a părea', en: 'to seem', difficulty: 4, category: 'verbs' },
  { ro: 'a rămâne', en: 'to stay/remain', difficulty: 4, category: 'verbs' },
  { ro: 'a ajunge', en: 'to arrive/reach', difficulty: 4, category: 'verbs' },
  { ro: 'fericit', en: 'happy', difficulty: 4, category: 'adjectives' },
  { ro: 'trist', en: 'sad', difficulty: 4, category: 'adjectives' },
  { ro: 'obosit', en: 'tired', difficulty: 4, category: 'adjectives' },
  { ro: 'îndrăgostit', en: 'in love', difficulty: 4, category: 'adjectives' },
  { ro: 'ciudat', en: 'strange', difficulty: 4, category: 'adjectives' },

  // ============================================
  // DIFFICULTY 5 - Advanced
  // ============================================
  { ro: 'răbdare', en: 'patience', difficulty: 5, category: 'nouns' },
  { ro: 'curaj', en: 'courage', difficulty: 5, category: 'nouns' },
  { ro: 'înțelepciune', en: 'wisdom', difficulty: 5, category: 'nouns' },
  { ro: 'îndoială', en: 'doubt', difficulty: 5, category: 'nouns' },
  { ro: 'provocare', en: 'challenge', difficulty: 5, category: 'nouns' },
  { ro: 'a reuși', en: 'to succeed', difficulty: 5, category: 'verbs' },
  { ro: 'a eșua', en: 'to fail', difficulty: 5, category: 'verbs' },
  { ro: 'a susține', en: 'to support/claim', difficulty: 5, category: 'verbs' },
  { ro: 'a dezvolta', en: 'to develop', difficulty: 5, category: 'verbs' },
  { ro: 'a îndrăzni', en: 'to dare', difficulty: 5, category: 'verbs' },
  { ro: 'minunat', en: 'wonderful', difficulty: 5, category: 'adjectives' },
  { ro: 'copleșitor', en: 'overwhelming', difficulty: 5, category: 'adjectives' },
  { ro: 'neobișnuit', en: 'unusual', difficulty: 5, category: 'adjectives' },
  { ro: 'de nădejde', en: 'reliable', difficulty: 5, category: 'adjectives' },
  { ro: 'totuși', en: 'however/yet', difficulty: 5, category: 'connectors' },
  { ro: 'prin urmare', en: 'therefore', difficulty: 5, category: 'connectors' },
  { ro: 'deși', en: 'although', difficulty: 5, category: 'connectors' },
  { ro: 'în schimb', en: 'instead', difficulty: 5, category: 'connectors' },
];

/**
 * Get vocabulary filtered by difficulty
 */
export const getVocabByDifficulty = (minDiff, maxDiff = minDiff) => {
  return VOCABULARY_DATABASE.filter(v => v.difficulty >= minDiff && v.difficulty <= maxDiff);
};

/**
 * Get vocabulary by category
 */
export const getVocabByCategory = (category) => {
  return VOCABULARY_DATABASE.filter(v => v.category === category);
};

/**
 * Get random vocabulary item
 */
export const getRandomVocab = (filter = null) => {
  const items = filter ? VOCABULARY_DATABASE.filter(filter) : VOCABULARY_DATABASE;
  return items[Math.floor(Math.random() * items.length)];
};

/**
 * Get weighted random vocab (prioritizes error words)
 */
export const getWeightedRandomVocab = (errorWords = []) => {
  // 50% chance to get an error word if available
  if (errorWords.length > 0 && Math.random() > 0.5) {
    return errorWords[Math.floor(Math.random() * errorWords.length)];
  }
  return getRandomVocab();
};

export default VOCABULARY_DATABASE;

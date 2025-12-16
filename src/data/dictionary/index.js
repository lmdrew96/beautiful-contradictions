/**
 * Romanian Dictionary Index
 * Generated from Kaikki.org (Wiktionary) data
 * Total words: 129330
 */

const INDEX = {
  "c": {
    "file": "c.json",
    "count": 15101,
    "size": 7918361
  },
  "g": {
    "file": "g.json",
    "count": 4384,
    "size": 2045743
  },
  "p": {
    "file": "p.json",
    "count": 12982,
    "size": 7465921
  },
  "a": {
    "file": "a.json",
    "count": 9984,
    "size": 5294340
  },
  "j": {
    "file": "j.json",
    "count": 925,
    "size": 480777
  },
  "m": {
    "file": "m.json",
    "count": 8266,
    "size": 4303017
  },
  "d": {
    "file": "d.json",
    "count": 7680,
    "size": 5064422
  },
  "v": {
    "file": "v.json",
    "count": 4391,
    "size": 1876580
  },
  "s": {
    "file": "s.json",
    "count": 12944,
    "size": 7090348
  },
  "f": {
    "file": "f.json",
    "count": 4847,
    "size": 2568762
  },
  "n": {
    "file": "n.json",
    "count": 3890,
    "size": 2168258
  },
  "r": {
    "file": "r.json",
    "count": 5610,
    "size": 3771299
  },
  "y": {
    "file": "y.json",
    "count": 32,
    "size": 12549
  },
  "t": {
    "file": "t.json",
    "count": 6375,
    "size": 3438856
  },
  "i": {
    "file": "i.json",
    "count": 7360,
    "size": 5103465
  },
  "o": {
    "file": "o.json",
    "count": 3233,
    "size": 1786340
  },
  "z": {
    "file": "z.json",
    "count": 1509,
    "size": 875756
  },
  "b": {
    "file": "b.json",
    "count": 6912,
    "size": 3152046
  },
  "e": {
    "file": "e.json",
    "count": 3751,
    "size": 2460343
  },
  "l": {
    "file": "l.json",
    "count": 3997,
    "size": 2001047
  },
  "u": {
    "file": "u.json",
    "count": 1563,
    "size": 810397
  },
  "q": {
    "file": "q.json",
    "count": 22,
    "size": 10935
  },
  "k": {
    "file": "k.json",
    "count": 158,
    "size": 80170
  },
  "w": {
    "file": "w.json",
    "count": 47,
    "size": 20665
  },
  "x": {
    "file": "x.json",
    "count": 137,
    "size": 83255
  },
  "h": {
    "file": "h.json",
    "count": 2862,
    "size": 1551566
  },
  "#": {
    "file": "#.json",
    "count": 368,
    "size": 147547
  }
};

const loadedLetters = {};

/**
 * Load dictionary data for a specific letter on demand
 */
export async function loadLetter(letter) {
  const key = letter.toLowerCase();
  if (loadedLetters[key]) {
    return loadedLetters[key];
  }

  const info = INDEX[key];
  if (!info) {
    return [];
  }

  try {
    // Dynamic import with static extension for Vite bundling
    const module = await import(/* @vite-ignore */ `./${key}.js`);
    loadedLetters[key] = module.default;
    return loadedLetters[key];
  } catch (err) {
    console.error(`Failed to load dictionary for letter "${letter}"`, err);
    return [];
  }
}

/**
 * Look up a word in the dictionary
 */
export async function lookupWord(word) {
  if (!word || word.length === 0) return null;

  const letter = word.charAt(0).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = await loadLetter(letter);

  const normalizedWord = word.toLowerCase();
  return words.find(w => w.word.toLowerCase() === normalizedWord) || null;
}

/**
 * Search for words starting with a prefix
 */
export async function searchWords(prefix, limit = 10) {
  if (!prefix || prefix.length === 0) return [];

  const letter = prefix.charAt(0).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const words = await loadLetter(letter);

  const normalizedPrefix = prefix.toLowerCase();
  return words
    .filter(w => w.word.toLowerCase().startsWith(normalizedPrefix))
    .slice(0, limit);
}

/**
 * Get dictionary statistics
 */
export function getStats() {
  return {
    totalWords: 129330,
    letters: Object.keys(INDEX).length,
    index: INDEX,
  };
}

export default {
  lookupWord,
  searchWords,
  loadLetter,
  getStats,
};

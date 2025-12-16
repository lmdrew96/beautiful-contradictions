/**
 * Kaikki.org Romanian Dictionary Import Script
 *
 * Downloads and processes Romanian dictionary data from Kaikki.org (Wiktionary extract)
 * Outputs split JSON files by first letter for on-demand loading.
 *
 * Usage:
 *   node scripts/import-kaikki-dictionary.js
 *
 * Output: src/data/dictionary/*.json (one file per letter)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';
import readline from 'readline';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const CONFIG = {
  sourceUrl: 'https://kaikki.org/dictionary/Romanian/kaikki.org-dictionary-Romanian.jsonl',
  outputDir: path.join(__dirname, '../src/data/dictionary'),
  cacheFile: path.join(__dirname, '../.cache/kaikki-romanian.jsonl'),
};

// Ensure directories exist
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Download file with progress
function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading from ${url}...`);
    ensureDir(path.dirname(dest));

    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode === 302 || response.statusCode === 301) {
        // Follow redirect
        file.close();
        fs.unlinkSync(dest);
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }

      const totalSize = parseInt(response.headers['content-length'], 10);
      let downloadedSize = 0;

      response.on('data', (chunk) => {
        downloadedSize += chunk.length;
        const percent = ((downloadedSize / totalSize) * 100).toFixed(1);
        process.stdout.write(`\rDownloading: ${percent}% (${(downloadedSize / 1024 / 1024).toFixed(1)}MB)`);
      });

      response.pipe(file);

      file.on('finish', () => {
        file.close();
        console.log('\nDownload complete!');
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

// Process a single Kaikki.org entry into our simplified format
function processEntry(entry) {
  // Skip entries without essential data
  if (!entry.word || !entry.senses || entry.senses.length === 0) {
    return null;
  }

  // Extract definitions from senses
  const definitions = [];
  const examples = [];

  for (const sense of entry.senses) {
    // Get glosses (definitions)
    if (sense.glosses) {
      for (const gloss of sense.glosses) {
        if (gloss && !definitions.includes(gloss)) {
          definitions.push(gloss);
        }
      }
    }

    // Get example sentences
    if (sense.examples) {
      for (const ex of sense.examples) {
        if (ex.text && examples.length < 3) {
          examples.push({
            ro: ex.text,
            en: ex.english || ex.translation || null,
          });
        }
      }
    }
  }

  // Skip if no definitions found
  if (definitions.length === 0) {
    return null;
  }

  // Build simplified entry
  const result = {
    word: entry.word,
    pos: entry.pos || 'unknown',
    definitions: definitions.slice(0, 5), // Limit to 5 definitions
  };

  // Add optional fields if present
  if (entry.sounds && entry.sounds.length > 0) {
    const ipa = entry.sounds.find(s => s.ipa);
    if (ipa) {
      result.pronunciation = ipa.ipa;
    }
  }

  if (entry.head_templates && entry.head_templates.length > 0) {
    const head = entry.head_templates[0];
    // Extract gender for nouns
    if (head.args && head.args.g) {
      result.gender = head.args.g;
    }
  }

  if (examples.length > 0) {
    result.examples = examples;
  }

  // Extract forms if available
  if (entry.forms && entry.forms.length > 0) {
    const forms = {};
    for (const form of entry.forms) {
      if (form.form && form.tags && form.tags.length > 0) {
        const tag = form.tags.join('-');
        if (!forms[tag]) {
          forms[tag] = form.form;
        }
      }
    }
    if (Object.keys(forms).length > 0) {
      result.forms = forms;
    }
  }

  return result;
}

// Get the first letter for grouping (handle diacritics)
function getFirstLetter(word) {
  const normalized = word.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const first = normalized.charAt(0);
  // Group non-letters under '#'
  if (!/[a-z]/.test(first)) {
    return '#';
  }
  return first;
}

// Process the JSONL file
async function processJsonl(inputPath) {
  console.log(`\nProcessing ${inputPath}...`);

  const dictionary = {};
  const stats = {
    total: 0,
    processed: 0,
    skipped: 0,
    byPos: {},
    byLetter: {},
  };

  const fileStream = fs.createReadStream(inputPath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  for await (const line of rl) {
    stats.total++;

    if (stats.total % 10000 === 0) {
      process.stdout.write(`\rProcessed ${stats.total} entries...`);
    }

    try {
      const entry = JSON.parse(line);
      const processed = processEntry(entry);

      if (processed) {
        const letter = getFirstLetter(processed.word);

        if (!dictionary[letter]) {
          dictionary[letter] = [];
        }
        dictionary[letter].push(processed);

        stats.processed++;
        stats.byPos[processed.pos] = (stats.byPos[processed.pos] || 0) + 1;
        stats.byLetter[letter] = (stats.byLetter[letter] || 0) + 1;
      } else {
        stats.skipped++;
      }
    } catch (err) {
      stats.skipped++;
    }
  }

  console.log(`\n\nProcessing complete!`);
  console.log(`Total entries: ${stats.total}`);
  console.log(`Processed: ${stats.processed}`);
  console.log(`Skipped: ${stats.skipped}`);
  console.log(`\nBy part of speech:`);
  for (const [pos, count] of Object.entries(stats.byPos).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${pos}: ${count}`);
  }

  return dictionary;
}

// Write dictionary files
function writeDictionaryFiles(dictionary) {
  ensureDir(CONFIG.outputDir);

  console.log(`\nWriting dictionary files to ${CONFIG.outputDir}...`);

  const index = {};
  let totalSize = 0;

  for (const [letter, words] of Object.entries(dictionary)) {
    // Sort words alphabetically
    words.sort((a, b) => a.word.localeCompare(b.word, 'ro'));

    const filename = `${letter}.json`;
    const filepath = path.join(CONFIG.outputDir, filename);
    const content = JSON.stringify(words);

    fs.writeFileSync(filepath, content);
    const size = content.length;
    totalSize += size;

    index[letter] = {
      file: filename,
      count: words.length,
      size: size,
    };

    console.log(`  ${filename}: ${words.length} words (${(size / 1024).toFixed(1)}KB)`);
  }

  // Write index file
  const indexContent = `/**
 * Romanian Dictionary Index
 * Generated from Kaikki.org (Wiktionary) data
 * Total words: ${Object.values(index).reduce((sum, i) => sum + i.count, 0)}
 */

const INDEX = ${JSON.stringify(index, null, 2)};

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
    const module = await import(\`./$\{info.file\}\`);
    loadedLetters[key] = module.default;
    return loadedLetters[key];
  } catch (err) {
    console.error(\`Failed to load dictionary for letter "$\{letter\}"\`, err);
    return [];
  }
}

/**
 * Look up a word in the dictionary
 */
export async function lookupWord(word) {
  if (!word || word.length === 0) return null;

  const letter = word.charAt(0).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
  const words = await loadLetter(letter);

  const normalizedWord = word.toLowerCase();
  return words.find(w => w.word.toLowerCase() === normalizedWord) || null;
}

/**
 * Search for words starting with a prefix
 */
export async function searchWords(prefix, limit = 10) {
  if (!prefix || prefix.length === 0) return [];

  const letter = prefix.charAt(0).toLowerCase().normalize('NFD').replace(/[\\u0300-\\u036f]/g, '');
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
    totalWords: ${Object.values(index).reduce((sum, i) => sum + i.count, 0)},
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
`;

  fs.writeFileSync(path.join(CONFIG.outputDir, 'index.js'), indexContent);

  console.log(`\nTotal size: ${(totalSize / 1024 / 1024).toFixed(2)}MB`);
  console.log(`Index written to ${path.join(CONFIG.outputDir, 'index.js')}`);
}

// Convert JSON files to ES modules for dynamic import
function convertToModules() {
  const files = fs.readdirSync(CONFIG.outputDir).filter(f => f.endsWith('.json'));

  for (const file of files) {
    const jsonPath = path.join(CONFIG.outputDir, file);
    const jsPath = jsonPath.replace('.json', '.js');

    const data = fs.readFileSync(jsonPath, 'utf8');
    const moduleContent = `export default ${data};\n`;

    fs.writeFileSync(jsPath, moduleContent);
    fs.unlinkSync(jsonPath); // Remove JSON file
  }

  console.log(`\nConverted ${files.length} JSON files to ES modules`);
}

// Main function
async function main() {
  console.log('Kaikki.org Romanian Dictionary Import');
  console.log('=====================================\n');

  // Check for cached file
  if (!fs.existsSync(CONFIG.cacheFile)) {
    await downloadFile(CONFIG.sourceUrl, CONFIG.cacheFile);
  } else {
    console.log(`Using cached file: ${CONFIG.cacheFile}`);
  }

  // Process the JSONL
  const dictionary = await processJsonl(CONFIG.cacheFile);

  // Write output files
  writeDictionaryFiles(dictionary);

  // Convert to ES modules for dynamic import
  convertToModules();

  console.log('\nDone! Dictionary is ready to use.');
}

main().catch(console.error);

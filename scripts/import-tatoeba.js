/**
 * Tatoeba Import Script
 *
 * Downloads and processes Tatoeba data into app-ready format.
 * Filters for Romanian (ron) sentences with English (eng) translations.
 *
 * Prerequisites:
 * 1. Download from https://tatoeba.org/en/downloads
 * 2. Need: sentences.csv (or sentences_detailed.csv), links.csv
 * 3. Optional: sentences_with_audio.csv for audio URLs
 *
 * Usage:
 *   node scripts/import-tatoeba.js [path-to-tatoeba-folder]
 *
 * Output: src/data/tatoeba/beginner.js, intermediate.js, advanced.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const CONFIG = {
  targetCount: 5000,
  chunkSize: 1000,
  outputDir: path.join(__dirname, '../src/data/tatoeba'),
  romanianCode: 'ron',
  englishCode: 'eng',
};

// Difficulty calculation based on sentence characteristics
function calculateDifficulty(sentence) {
  if (!sentence || typeof sentence !== 'string') {
    return 5;
  }

  const words = sentence.trim().split(/\s+/);
  const wordCount = words.length;
  const avgWordLength = sentence.length / wordCount;
  const hasComplexPunctuation = /[,;:]/.test(sentence);

  let difficulty;
  if (wordCount <= 3) difficulty = 1;
  else if (wordCount <= 5) difficulty = 2;
  else if (wordCount <= 8) difficulty = 3;
  else if (wordCount <= 12) difficulty = 5;
  else if (wordCount <= 18) difficulty = 7;
  else difficulty = 8;

  if (avgWordLength > 7) difficulty += 1;
  if (hasComplexPunctuation) difficulty += 1;

  return Math.min(10, Math.max(1, difficulty));
}

// Parse CSV line (handles quoted fields)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === '\t' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  return result;
}

// Read and parse sentences file
function readSentences(filePath) {
  console.log(`Reading sentences from ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const sentences = new Map();

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = parseCSVLine(line);
    if (parts.length >= 3) {
      const [id, lang, text] = parts;
      if (lang === CONFIG.romanianCode || lang === CONFIG.englishCode) {
        sentences.set(id, { id, lang, text });
      }
    }
  }

  console.log(`Found ${sentences.size} Romanian/English sentences`);
  return sentences;
}

// Read and parse links file
function readLinks(filePath) {
  console.log(`Reading links from ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const links = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    if (parts.length >= 2) {
      links.push({ from: parts[0], to: parts[1] });
    }
  }

  console.log(`Found ${links.length} translation links`);
  return links;
}

// Read audio info
function readAudioInfo(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log('No audio file found, skipping audio info');
    return new Set();
  }

  console.log(`Reading audio info from ${filePath}...`);
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const audioIds = new Set();

  for (const line of lines) {
    if (!line.trim()) continue;
    const parts = line.split('\t');
    if (parts.length >= 1) {
      audioIds.add(parts[0]);
    }
  }

  console.log(`Found ${audioIds.size} sentences with audio`);
  return audioIds;
}

// Build Romanian-English pairs
function buildPairs(sentences, links, audioIds) {
  console.log('Building Romanian-English pairs...');
  const pairs = [];

  for (const link of links) {
    const from = sentences.get(link.from);
    const to = sentences.get(link.to);

    if (!from || !to) continue;

    let romanian, english;
    if (from.lang === CONFIG.romanianCode && to.lang === CONFIG.englishCode) {
      romanian = from;
      english = to;
    } else if (from.lang === CONFIG.englishCode && to.lang === CONFIG.romanianCode) {
      romanian = to;
      english = from;
    } else {
      continue;
    }

    const difficulty = calculateDifficulty(romanian.text);
    const hasAudio = audioIds.has(romanian.id);

    pairs.push({
      id: `tat-${romanian.id}`,
      romanian: romanian.text,
      english: english.text,
      difficulty,
      wordCount: romanian.text.split(/\s+/).length,
      hasAudio,
      audioUrl: hasAudio
        ? `https://audio.tatoeba.org/sentences/ron/${romanian.id}.mp3`
        : null,
    });
  }

  console.log(`Built ${pairs.length} Romanian-English pairs`);
  return pairs;
}

// Sort and chunk by difficulty
function chunkByDifficulty(pairs) {
  // Prioritize sentences with audio
  const withAudio = pairs.filter(p => p.hasAudio);
  const withoutAudio = pairs.filter(p => !p.hasAudio);

  // Sort by difficulty
  withAudio.sort((a, b) => a.difficulty - b.difficulty);
  withoutAudio.sort((a, b) => a.difficulty - b.difficulty);

  // Combine, preferring audio sentences
  const sorted = [...withAudio, ...withoutAudio].slice(0, CONFIG.targetCount);

  // Split into difficulty tiers
  const beginner = sorted.filter(s => s.difficulty <= 3).slice(0, CONFIG.chunkSize);
  const intermediate = sorted.filter(s => s.difficulty >= 4 && s.difficulty <= 6).slice(0, CONFIG.chunkSize);
  const advanced = sorted.filter(s => s.difficulty >= 7).slice(0, CONFIG.chunkSize);

  // Fill remaining slots if needed
  const remaining = sorted.filter(s =>
    !beginner.includes(s) && !intermediate.includes(s) && !advanced.includes(s)
  );

  while (beginner.length < CONFIG.chunkSize && remaining.length > 0) {
    beginner.push(remaining.shift());
  }
  while (intermediate.length < CONFIG.chunkSize && remaining.length > 0) {
    intermediate.push(remaining.shift());
  }
  while (advanced.length < CONFIG.chunkSize && remaining.length > 0) {
    advanced.push(remaining.shift());
  }

  return { beginner, intermediate, advanced };
}

// Write output files
function writeOutputFiles(chunks) {
  console.log('Writing output files...');

  // Ensure output directory exists
  if (!fs.existsSync(CONFIG.outputDir)) {
    fs.mkdirSync(CONFIG.outputDir, { recursive: true });
  }

  const writeChunk = (name, data) => {
    const filePath = path.join(CONFIG.outputDir, `${name}.js`);
    const content = `/**
 * Tatoeba ${name.charAt(0).toUpperCase() + name.slice(1)} Sentences
 * Auto-generated by import-tatoeba.js
 * Source: tatoeba.org (CC-BY 2.0 FR)
 *
 * ${data.length} sentences, difficulty ${name === 'beginner' ? '1-3' : name === 'intermediate' ? '4-6' : '7-10'}
 */

export const TATOEBA_${name.toUpperCase()} = ${JSON.stringify(data, null, 2)};

export default TATOEBA_${name.toUpperCase()};
`;
    fs.writeFileSync(filePath, content);
    console.log(`Wrote ${data.length} sentences to ${filePath}`);
  };

  writeChunk('beginner', chunks.beginner);
  writeChunk('intermediate', chunks.intermediate);
  writeChunk('advanced', chunks.advanced);

  // Write index file
  const indexContent = `/**
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

// Beginner sentences loaded immediately
export { TATOEBA_BEGINNER } from './beginner';

// Lazy-loaded chunks for intermediate and advanced
export const loadIntermediate = () => import('./intermediate');
export const loadAdvanced = () => import('./advanced');

// Combined getter for all loaded sentences
export const getAllSentences = async () => {
  const { TATOEBA_BEGINNER } = await import('./beginner');
  const { TATOEBA_INTERMEDIATE } = await import('./intermediate');
  const { TATOEBA_ADVANCED } = await import('./advanced');
  return [...TATOEBA_BEGINNER, ...TATOEBA_INTERMEDIATE, ...TATOEBA_ADVANCED];
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
`;

  fs.writeFileSync(path.join(CONFIG.outputDir, 'index.js'), indexContent);
  console.log('Wrote index.js');
}

// Main import function
async function importTatoeba(inputPath) {
  if (!inputPath) {
    console.log('Usage: node scripts/import-tatoeba.js [path-to-tatoeba-folder]');
    console.log('');
    console.log('Download required files from https://tatoeba.org/en/downloads:');
    console.log('  - sentences.csv (or sentences_detailed.csv)');
    console.log('  - links.csv');
    console.log('  - sentences_with_audio.csv (optional)');
    console.log('');
    console.log('Creating sample data instead...');
    createSampleData();
    return;
  }

  const sentencesPath = path.join(inputPath, 'sentences.csv');
  const linksPath = path.join(inputPath, 'links.csv');
  const audioPath = path.join(inputPath, 'sentences_with_audio.csv');

  if (!fs.existsSync(sentencesPath)) {
    console.error(`Error: sentences.csv not found at ${sentencesPath}`);
    process.exit(1);
  }

  if (!fs.existsSync(linksPath)) {
    console.error(`Error: links.csv not found at ${linksPath}`);
    process.exit(1);
  }

  const sentences = readSentences(sentencesPath);
  const links = readLinks(linksPath);
  const audioIds = readAudioInfo(audioPath);
  const pairs = buildPairs(sentences, links, audioIds);
  const chunks = chunkByDifficulty(pairs);
  writeOutputFiles(chunks);

  console.log('');
  console.log('Import complete!');
  console.log(`Beginner: ${chunks.beginner.length} sentences`);
  console.log(`Intermediate: ${chunks.intermediate.length} sentences`);
  console.log(`Advanced: ${chunks.advanced.length} sentences`);
}

// Create sample data when no input provided
function createSampleData() {
  const sampleSentences = {
    beginner: [
      { id: 'tat-1', romanian: 'Buna ziua!', english: 'Good day!', difficulty: 1, wordCount: 2, hasAudio: true, audioUrl: null },
      { id: 'tat-2', romanian: 'Multumesc.', english: 'Thank you.', difficulty: 1, wordCount: 1, hasAudio: true, audioUrl: null },
      { id: 'tat-3', romanian: 'Da.', english: 'Yes.', difficulty: 1, wordCount: 1, hasAudio: true, audioUrl: null },
      { id: 'tat-4', romanian: 'Nu.', english: 'No.', difficulty: 1, wordCount: 1, hasAudio: true, audioUrl: null },
      { id: 'tat-5', romanian: 'Te rog.', english: 'Please.', difficulty: 1, wordCount: 2, hasAudio: true, audioUrl: null },
      { id: 'tat-6', romanian: 'Cum te cheama?', english: 'What is your name?', difficulty: 2, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-7', romanian: 'Ma numesc Ana.', english: 'My name is Ana.', difficulty: 2, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-8', romanian: 'Unde este toaleta?', english: 'Where is the bathroom?', difficulty: 2, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-9', romanian: 'Cat costa?', english: 'How much does it cost?', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
      { id: 'tat-10', romanian: 'Vorbesti engleza?', english: 'Do you speak English?', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
      { id: 'tat-11', romanian: 'Nu inteleg.', english: 'I do not understand.', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
      { id: 'tat-12', romanian: 'Eu sunt din America.', english: 'I am from America.', difficulty: 2, wordCount: 4, hasAudio: false, audioUrl: null },
      { id: 'tat-13', romanian: 'Vreau sa mananc.', english: 'I want to eat.', difficulty: 3, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-14', romanian: 'Unde pot gasi un hotel?', english: 'Where can I find a hotel?', difficulty: 3, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-15', romanian: 'Pot sa platesc cu cardul?', english: 'Can I pay by card?', difficulty: 3, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-16', romanian: 'Imi place Romania.', english: 'I like Romania.', difficulty: 2, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-17', romanian: 'Ce ora este?', english: 'What time is it?', difficulty: 2, wordCount: 3, hasAudio: false, audioUrl: null },
      { id: 'tat-18', romanian: 'Sunt obosit.', english: 'I am tired.', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
      { id: 'tat-19', romanian: 'Am foame.', english: 'I am hungry.', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
      { id: 'tat-20', romanian: 'Am sete.', english: 'I am thirsty.', difficulty: 2, wordCount: 2, hasAudio: false, audioUrl: null },
    ],
    intermediate: [
      { id: 'tat-101', romanian: 'Vremea este frumoasa astazi.', english: 'The weather is beautiful today.', difficulty: 4, wordCount: 4, hasAudio: false, audioUrl: null },
      { id: 'tat-102', romanian: 'Pot sa va ajut cu ceva?', english: 'Can I help you with something?', difficulty: 4, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-103', romanian: 'Astept aici de o ora.', english: 'I have been waiting here for an hour.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-104', romanian: 'Trebuie sa plec maine dimineata.', english: 'I have to leave tomorrow morning.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-105', romanian: 'Mi-ar placea sa vizitez Bucurestiul.', english: 'I would like to visit Bucharest.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-106', romanian: 'Romania are multe locuri frumoase.', english: 'Romania has many beautiful places.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-107', romanian: 'Invat limba romana de sase luni.', english: 'I have been learning Romanian for six months.', difficulty: 5, wordCount: 6, hasAudio: false, audioUrl: null },
      { id: 'tat-108', romanian: 'Cartea aceasta este foarte interesanta.', english: 'This book is very interesting.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-109', romanian: 'Am vorbit cu el ieri seara.', english: 'I spoke with him last night.', difficulty: 5, wordCount: 6, hasAudio: false, audioUrl: null },
      { id: 'tat-110', romanian: 'Vreau sa cumpar niste suveniruri.', english: 'I want to buy some souvenirs.', difficulty: 5, wordCount: 5, hasAudio: false, audioUrl: null },
      { id: 'tat-111', romanian: 'Mancarea romaneasca este delicioasa.', english: 'Romanian food is delicious.', difficulty: 4, wordCount: 4, hasAudio: false, audioUrl: null },
      { id: 'tat-112', romanian: 'Imi place sa calatoresc cu trenul.', english: 'I like to travel by train.', difficulty: 5, wordCount: 6, hasAudio: false, audioUrl: null },
      { id: 'tat-113', romanian: 'Casa aceasta a fost construita acum o suta de ani.', english: 'This house was built a hundred years ago.', difficulty: 6, wordCount: 10, hasAudio: false, audioUrl: null },
      { id: 'tat-114', romanian: 'Nu stiu daca o sa pot veni.', english: 'I do not know if I will be able to come.', difficulty: 6, wordCount: 8, hasAudio: false, audioUrl: null },
      { id: 'tat-115', romanian: 'Daca ai nevoie de ajutor, spune-mi.', english: 'If you need help, tell me.', difficulty: 6, wordCount: 6, hasAudio: false, audioUrl: null },
    ],
    advanced: [
      { id: 'tat-201', romanian: 'Desi era obosit, a continuat sa lucreze pana tarziu in noapte.', english: 'Although he was tired, he continued to work late into the night.', difficulty: 7, wordCount: 11, hasAudio: false, audioUrl: null },
      { id: 'tat-202', romanian: 'Situatia economica actuala ne obliga sa facem schimbari importante.', english: 'The current economic situation forces us to make important changes.', difficulty: 8, wordCount: 9, hasAudio: false, audioUrl: null },
      { id: 'tat-203', romanian: 'Rezultatele cercetarii au demonstrat ca teoria initiala era corecta.', english: 'The research results demonstrated that the initial theory was correct.', difficulty: 8, wordCount: 9, hasAudio: false, audioUrl: null },
      { id: 'tat-204', romanian: 'In ciuda dificultatilor, echipa a reusit sa termine proiectul la timp.', english: 'Despite the difficulties, the team managed to finish the project on time.', difficulty: 8, wordCount: 11, hasAudio: false, audioUrl: null },
      { id: 'tat-205', romanian: 'Cultura romaneasca are radacini adanci in traditiile populare.', english: 'Romanian culture has deep roots in folk traditions.', difficulty: 7, wordCount: 8, hasAudio: false, audioUrl: null },
      { id: 'tat-206', romanian: 'Aceasta decizie va avea consecinte semnificative pentru viitorul companiei.', english: 'This decision will have significant consequences for the company\'s future.', difficulty: 8, wordCount: 9, hasAudio: false, audioUrl: null },
      { id: 'tat-207', romanian: 'Prin urmare, trebuie sa luam masuri imediate pentru a rezolva problema.', english: 'Therefore, we must take immediate measures to solve the problem.', difficulty: 8, wordCount: 11, hasAudio: false, audioUrl: null },
      { id: 'tat-208', romanian: 'Literatura romana clasica reflecta lupta pentru identitate nationala.', english: 'Classic Romanian literature reflects the struggle for national identity.', difficulty: 8, wordCount: 8, hasAudio: false, audioUrl: null },
      { id: 'tat-209', romanian: 'Experienta ne-a invatat ca rabdarea este cea mai importanta virtute.', english: 'Experience has taught us that patience is the most important virtue.', difficulty: 8, wordCount: 10, hasAudio: false, audioUrl: null },
      { id: 'tat-210', romanian: 'Indiferent de circumstante, trebuie sa ne pastram calmul si sa gandim clar.', english: 'Regardless of circumstances, we must stay calm and think clearly.', difficulty: 9, wordCount: 12, hasAudio: false, audioUrl: null },
    ],
  };

  writeOutputFiles(sampleSentences);
  console.log('');
  console.log('Sample data created!');
  console.log('To import real Tatoeba data, download CSV files from tatoeba.org and run:');
  console.log('  node scripts/import-tatoeba.js /path/to/tatoeba/folder');
}

// Run import
const args = process.argv.slice(2);
importTatoeba(args[0]);

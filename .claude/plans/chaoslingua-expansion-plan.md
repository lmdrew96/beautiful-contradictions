# ChaosLingua Content Expansion - Claude Code Implementation Prompt

## Project Overview

**Repository:** `lmdrew96/beautiful-contradictions`  
**New Name:** ChaosLingua  
**Purpose:** ADHD-friendly Romanian language learning app built on the philosophy of "structured chaos, mastery through mistakes, and knowing through not-knowing"

## Current State

The app has three main features:
- **Chaos Engine** - Randomized content sessions (YouTube/Spotify embeds)
- **Error Garden** - Guess-first vocabulary practice with spaced repetition
- **Fog Machine** - Romanian-only immersion mode with adjustable difficulty

Current content is minimal (~17 items in `src/data/content.js` and basic vocab in `src/data/vocabulary.js`).

---

## PHASE 1: Rebrand to ChaosLingua

### Tasks

1. **Update all references** from "Beautiful Contradictions" to "ChaosLingua":
   - `README.md` - title, description, all mentions
   - `package.json` - name field
   - `index.html` - title tag
   - Any component files that reference the app name
   - Favicon/logo references if applicable

2. **Update the tagline** to: "Structured chaos for language learning. Your mistakes are your map."

3. **Update repository description** on GitHub (note: this is manual, just remind user)

---

## PHASE 2: Tatoeba Sentence Integration (Priority)

### Overview
Tatoeba has 30,000+ Romanian sentences with English translations and native audio. This is the biggest content win.

### Data Source
- Tatoeba exports: https://tatoeba.org/en/downloads
- Needed files:
  - `sentences.csv` - all sentences
  - `links.csv` - translation links
  - `sentences_with_audio.csv` - sentences that have audio
  - `sentences_detailed.csv` - includes username/date info

### Implementation

1. **Create a data processing script** at `scripts/import-tatoeba.js`:

```javascript
/**
 * Tatoeba Import Script
 * 
 * Downloads and processes Tatoeba data into app-ready format.
 * Filters for Romanian (ron) sentences with English (eng) translations.
 * 
 * Output: src/data/tatoeba-sentences.js
 */
```

The script should:
- Download the CSV files from Tatoeba (or read from local if already downloaded)
- Filter for Romanian sentences (language code: `ron`)
- Find English translations via `links.csv`
- Mark which sentences have native audio
- Calculate a difficulty score based on:
  - Sentence length (shorter = easier)
  - Word frequency (using a Romanian frequency list if available)
- Output as a JS module with this structure:

```javascript
export const TATOEBA_SENTENCES = [
  {
    id: 'tat-123456',
    romanian: 'Bună ziua!',
    english: 'Good day!',
    hasAudio: true,
    audioUrl: 'https://audio.tatoeba.org/sentences/ron/123456.mp3',
    difficulty: 1, // 1-10 scale
    wordCount: 2,
    source: 'tatoeba',
    license: 'CC-BY 2.0 FR',
    attribution: 'tatoeba.org #123456'
  },
  // ... more sentences
];
```

2. **Create difficulty tiers**:
   - Difficulty 1-3: Short sentences (1-5 words), common vocabulary
   - Difficulty 4-6: Medium sentences (6-12 words), mixed vocabulary  
   - Difficulty 7-10: Long/complex sentences (13+ words), advanced vocabulary

3. **Limit initial import to ~5,000 sentences** across difficulty levels to keep bundle size reasonable. Prioritize sentences WITH audio.

4. **Update `src/data/vocabulary.js`** to pull from Tatoeba sentences:
   - Extract individual words from sentences
   - Create word entries with example sentences
   - Structure:

```javascript
export const VOCABULARY = [
  {
    id: 'word-buna',
    romanian: 'bună',
    english: 'good/hello',
    partOfSpeech: 'adjective/interjection',
    difficulty: 1,
    exampleSentences: ['tat-123456', 'tat-789012'], // references to TATOEBA_SENTENCES
    source: 'tatoeba'
  },
];
```

5. **Update Error Garden component** to use new vocabulary structure and show example sentences on reveal.

---

## PHASE 3: Expand YouTube/Spotify Content

### New YouTube Channels to Add

Add these to `src/data/content.js`:

```javascript
// BEGINNER FRIENDLY
{
  id: 'yt-romanian-with-gia',
  title: 'Romanian With Gia',
  description: 'Structured lessons for beginners with clear explanations.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLfKvL-VUSKAnM9MWJT9F1z1QZTdb73i7r',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 2,
  topics: ['grammar', 'basics', 'vocabulary'],
  sessionTypes: ['chaos_window', 'grammar_spiral'],
  instructionLang: 'en',
},

// MORE EASY ROMANIAN (they have multiple playlists)
{
  id: 'yt-easy-romanian-super-easy',
  title: 'Easy Romanian - Super Easy',
  description: 'Slower, clearer street interviews for beginners.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLA5UIoabheFMo7gVAVLdQ7VKggNNBc_1U',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 3,
  topics: ['conversation', 'basics'],
  sessionTypes: ['chaos_window', 'fog_session'],
  instructionLang: 'ro',
},

// KIDS CONTENT (great for fog)
{
  id: 'yt-cantece-copii',
  title: 'Cântece pentru copii - Kids Songs',
  description: 'Romanian children\'s songs compilation. Simple vocab, repetitive, great for beginners.',
  embedUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual
  platform: 'youtube',
  type: 'video',
  difficulty: 1,
  topics: ['music', 'kids', 'vocabulary'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
},

// NATIVE CONTENT - COOKING
{
  id: 'yt-jamila-cuisine',
  title: 'Jamila Cuisine - Romanian Cooking',
  description: 'Popular Romanian cooking channel. Learn food vocabulary through recipes.',
  embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLDmT5a4c9j_0IbS-3qHE7GcWi7bYx9vFe',
  platform: 'youtube',
  type: 'playlist',
  difficulty: 6,
  topics: ['food', 'culture', 'vocabulary'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
},

// NATIVE CONTENT - VLOGS
{
  id: 'yt-selly',
  title: 'Selly - Romanian Vlogger',
  description: 'Popular Romanian YouTuber. Fast natural speech, youth slang.',
  embedUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  platform: 'youtube',
  type: 'channel',
  difficulty: 8,
  topics: ['culture', 'slang', 'conversation'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
},

// EDUCATIONAL - HISTORY
{
  id: 'yt-historia',
  title: 'Historia - Romanian History',
  description: 'Romanian history documentaries. Advanced vocabulary, formal speech.',
  embedUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  platform: 'youtube',
  type: 'channel',
  difficulty: 7,
  topics: ['history', 'culture'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
},
```

### New Spotify Podcasts to Add

```javascript
// LEARNER FOCUSED
{
  id: 'sp-romanian-pod-101',
  title: 'RomanianPod101',
  description: 'Structured podcast lessons from beginner to advanced.',
  embedUrl: 'https://open.spotify.com/embed/show/SHOW_ID',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 3,
  topics: ['structured', 'grammar', 'vocabulary'],
  sessionTypes: ['chaos_window'],
  instructionLang: 'en',
},

// NATIVE - NEWS
{
  id: 'sp-digi24',
  title: 'Digi24 Podcast',
  description: 'Romanian news podcast. Current events, formal language.',
  embedUrl: 'https://open.spotify.com/embed/show/SHOW_ID',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 7,
  topics: ['news', 'current-events'],
  sessionTypes: ['fog_session'],
  instructionLang: 'ro',
},

// NATIVE - STORYTELLING
{
  id: 'sp-povesti-nemuritoare',
  title: 'Povești Nemuritoare',
  description: 'Romanian fairy tales and stories read aloud. Great for immersion.',
  embedUrl: 'https://open.spotify.com/embed/show/SHOW_ID',
  platform: 'spotify',
  type: 'podcast',
  difficulty: 4,
  topics: ['stories', 'literature', 'culture'],
  sessionTypes: ['fog_session', 'chaos_window'],
  instructionLang: 'ro',
},
```

**Note:** You'll need to find actual Spotify show IDs for these. Search Spotify and grab IDs from URLs.

---

## PHASE 4: Literary Content Integration

### RO-Stories Dataset

Source: https://huggingface.co/datasets/readerbench/ro-stories

1. **Create `scripts/import-ro-stories.js`** to:
   - Download the dataset from HuggingFace
   - Extract story excerpts (aim for 200-500 word passages)
   - Tag by author and difficulty
   - Output to `src/data/stories.js`

2. **Story data structure:**

```javascript
export const ROMANIAN_STORIES = [
  {
    id: 'story-creanga-capra',
    title: 'Capra cu trei iezi',
    author: 'Ion Creangă',
    excerpt: 'Era odată o capră care avea trei iezi...',
    fullText: '...', // Optional, for expanded view
    wordCount: 342,
    difficulty: 3,
    topics: ['fairy-tale', 'classic', 'children'],
    sessionTypes: ['fog_session', 'reading'],
    era: '19th-century',
  },
];
```

3. **Prioritize these authors** (most accessible for learners):
   - Ion Creangă (fairy tales, simple language)
   - Petre Ispirescu (fairy tales)
   - Mihai Eminescu (poetry - shorter pieces)
   - Barbu Delavrancea (short stories)

### Project Gutenberg Romanian

Source: https://www.gutenberg.org/browse/languages/ro

1. **Create `scripts/import-gutenberg.js`** to:
   - Fetch available Romanian texts
   - Extract readable excerpts
   - Add difficulty ratings

2. **Key texts to include:**
   - "Amintiri din copilărie" (Ion Creangă) - Childhood Memories
   - Romanian folk tales collections
   - Eminescu poetry

---

## PHASE 5: Recipe Content (Fun Module)

Source: https://huggingface.co/datasets/BlackKakapo/recipes-ro

1. **Create `src/data/recipes.js`:**

```javascript
export const ROMANIAN_RECIPES = [
  {
    id: 'recipe-sarmale',
    title: 'Sarmale',
    englishTitle: 'Stuffed Cabbage Rolls',
    description: 'Traditional Romanian stuffed cabbage rolls...',
    ingredients: [
      { romanian: 'varză murată', english: 'sauerkraut/pickled cabbage' },
      { romanian: 'carne tocată', english: 'ground meat' },
      // ...
    ],
    steps: [
      { romanian: 'Se spală varza...', english: 'Wash the cabbage...' },
      // ...
    ],
    difficulty: 4,
    cookingVocab: ['a fierbe', 'a prăji', 'a tăia', 'a amesteca'],
    culturalNote: 'Sarmale are traditionally served at Christmas and weddings.',
  },
];
```

2. **Create a new component** `src/components/RecipeExplorer.jsx`:
   - Display recipe with Romanian/English toggle
   - Highlight cooking vocabulary
   - Link vocab words to Error Garden for practice

---

## PHASE 6: Content Management Improvements

### 1. Unified Content Index

Create `src/data/index.js` that exports everything:

```javascript
export { CONTENT_DATABASE, getContentBySessionType, getRandomContent } from './content';
export { TATOEBA_SENTENCES, getSentencesByDifficulty } from './tatoeba-sentences';
export { VOCABULARY, getVocabByDifficulty } from './vocabulary';
export { ROMANIAN_STORIES } from './stories';
export { ROMANIAN_RECIPES } from './recipes';

// Unified search across all content
export const searchAllContent = (query, filters = {}) => {
  // Implementation
};

// Get content appropriate for session type and difficulty
export const getSessionContent = (sessionType, difficulty, count = 10) => {
  // Implementation
};
```

### 2. Difficulty Calibration System

Create `src/utils/difficulty.js`:

```javascript
/**
 * Calculate difficulty score for any text content
 * Based on: word frequency, sentence length, vocabulary complexity
 */
export const calculateDifficulty = (text, options = {}) => {
  // Use a Romanian word frequency list
  // Return 1-10 score
};

/**
 * Adaptive difficulty based on user performance
 * Tracks errors in Error Garden to adjust recommendations
 */
export const getUserDifficultyLevel = (errorHistory) => {
  // Calculate based on recent error rate
};
```

### 3. Content Tagging System

Ensure all content uses consistent tags:

```javascript
export const CONTENT_TAGS = {
  // Topics
  topics: [
    'grammar', 'vocabulary', 'conversation', 'culture', 'history',
    'music', 'kids', 'food', 'travel', 'news', 'literature',
    'fairy-tale', 'poetry', 'slang', 'formal'
  ],
  
  // Session types
  sessionTypes: [
    'chaos_window',    // Chaos Engine
    'fog_session',     // Fog Machine
    'grammar_spiral',  // Focused grammar
    'reading',         // Text-based
    'listening',       // Audio-focused
  ],
  
  // Instruction language
  instructionLang: ['en', 'ro', 'mixed'],
  
  // Content type
  contentType: ['video', 'audio', 'text', 'interactive'],
};
```

---

## PHASE 7: Update README and Documentation

1. **Update README.md** with:
   - New name and branding
   - Expanded content sources with attribution
   - Updated feature list
   - Content contribution guide

2. **Add CONTENT_SOURCES.md** documenting:
   - All data sources used
   - Licenses and attribution requirements
   - How to add new content

3. **Add CONTRIBUTING.md** for community content submissions

---

## Implementation Order

**Week 1: Foundation**
- [ ] Rebrand to ChaosLingua (Phase 1)
- [ ] Set up Tatoeba import script (Phase 2 start)

**Week 2: Core Content**
- [ ] Complete Tatoeba integration (Phase 2)
- [ ] Add new YouTube/Spotify content (Phase 3)

**Week 3: Literary Content**
- [ ] RO-Stories integration (Phase 4)
- [ ] Gutenberg excerpts (Phase 4)

**Week 4: Polish**
- [ ] Recipe module (Phase 5)
- [ ] Content management improvements (Phase 6)
- [ ] Documentation updates (Phase 7)

---

## Technical Notes

### Bundle Size Considerations
- Tatoeba sentences could be large. Consider:
  - Lazy loading by difficulty tier
  - Separate chunks for different content types
  - Storing in IndexedDB for offline access

### API Considerations
- Tatoeba has a REST API if you want live data instead of static import
- Consider caching strategies for embedded content

### Testing
- Add tests for difficulty calculation
- Test content filtering functions
- Verify all embed URLs work

---

## File Structure After Implementation

```
chaoslingua/
├── scripts/
│   ├── import-tatoeba.js
│   ├── import-ro-stories.js
│   └── import-gutenberg.js
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── ContentEmbed.jsx
│   │   ├── Timer.jsx
│   │   ├── HomeView.jsx
│   │   ├── ChaosEngine.jsx
│   │   ├── ErrorGarden.jsx
│   │   ├── FogMachine.jsx
│   │   ├── ProgressView.jsx
│   │   └── RecipeExplorer.jsx (new)
│   ├── data/
│   │   ├── index.js (new - unified exports)
│   │   ├── content.js (updated)
│   │   ├── vocabulary.js (updated)
│   │   ├── tatoeba-sentences.js (new)
│   │   ├── stories.js (new)
│   │   └── recipes.js (new)
│   ├── utils/
│   │   └── difficulty.js (new)
│   ├── hooks/
│   │   └── useStorage.js
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── docs/
│   ├── CONTENT_SOURCES.md (new)
│   └── CONTRIBUTING.md (new)
├── index.html
├── package.json
├── README.md (updated)
└── ...
```

---

## Attribution Requirements

All content MUST include proper attribution:

- **Tatoeba:** "Sentences from Tatoeba.org, CC-BY 2.0 FR"
- **Project Gutenberg:** "Text from Project Gutenberg, Public Domain"
- **RO-Stories:** Link to original dataset
- **YouTube/Spotify:** Platform handles attribution via embed

Add a credits/attribution page to the app.

# Claude Code Task: Expand ChaosLingua Content

## Overview
Add bulk content to the ChaosLingua Romanian learning app from two sources:
1. **Tatoeba** - Romanian↔English sentence pairs with audio
2. **RO-stories** - Romanian literature paragraphs from HuggingFace

Repository: `lmdrew96/beautiful-contradictions`

---

## 1. Data Sources

### Tatoeba Sentences
- **Download URL**: `https://downloads.tatoeba.org/exports/per_language/ron/ron-eng.tsv`
- **Audio mapping**: `https://downloads.tatoeba.org/exports/sentences_with_audio.csv`
- **Audio URL pattern**: `https://audio.tatoeba.org/sentences/ron/{sentence_id}.mp3`
- **License**: CC-BY 2.0 FR (attribution required)
- **Expected**: ~38,000 Romanian-English sentence pairs

### RO-stories Dataset
- **Source**: `https://huggingface.co/datasets/readerbench/ro-stories`
- **Load method**: Use HuggingFace `datasets` library or download CSV directly
- **License**: Apache 2.0
- **Expected**: ~12,500 paragraphs from Romanian literature

---

## 2. Existing Data Structure (MUST MATCH)

### Tatoeba Sentence Format (`src/data/tatoeba/*.js`)
```javascript
{
  id: 'tat-{number}',           // Unique ID
  romanian: 'Bună ziua!',       // Romanian text
  english: 'Good day!',         // English translation
  difficulty: 1,                // 1-10 scale
  wordCount: 2,                 // Word count of Romanian text
  hasAudio: true,               // Boolean
  audioUrl: 'https://...' | null  // Full URL or null
}
```

### Story Format (`src/data/stories.js`)
```javascript
{
  id: 'story-{slug}',           // Unique ID
  title: 'Capra cu trei iezi',  // Romanian title
  titleEn: 'The Goat with Three Kids',  // English title
  author: 'Ion Creangă',        // Author name
  excerpt: '...',               // Full paragraph text
  difficulty: 3,                // 1-10 scale
  genre: 'folktale',            // folktale, fiction, poetry, memoir
  era: 'traditional',           // traditional, 19th-century, 20th-century, modern
  wordCount: 200,               // Approximate word count
  source: 'Ion Creangă - Povești',  // Attribution
  license: 'Public Domain'      // License type
}
```

---

## 3. Processing Instructions

### Step 1: Set Up Environment
```bash
cd /path/to/beautiful-contradictions
pip install datasets pandas requests
```

### Step 2: Download and Process Tatoeba

1. Download the Romanian-English TSV file
2. Download the sentences_with_audio.csv to identify which sentences have audio
3. Filter for sentences that have English translations
4. Check which have audio available

**Difficulty Assignment Algorithm** (based on word count and complexity):
| Word Count | Base Difficulty |
|------------|-----------------|
| 1-2 words  | 1 |
| 3-4 words  | 2 |
| 5-6 words  | 3 |
| 7-9 words  | 4 |
| 10-12 words | 5 |
| 13-15 words | 6 |
| 16-20 words | 7 |
| 21-25 words | 8 |
| 26-35 words | 9 |
| 36+ words  | 10 |

**Additional difficulty modifiers** (+1 each if present):
- Contains subjunctive (să + verb)
- Contains conditional (ar, aș, ai, am, ați)
- Contains reflexive verbs (se, mă, te, ne, vă)
- Sentence length > 80 characters

### Step 3: Download and Process RO-stories

1. Load the dataset from HuggingFace
2. Group paragraphs by story title
3. Assign difficulty based on:
   - Word count (longer = harder)
   - Author (Eminescu poetry = harder than Creangă folktales)
   
**Author difficulty baseline**:
| Author | Base Difficulty | Default Genre | Default Era |
|--------|-----------------|---------------|-------------|
| Ion Creangă | 3 | folktale | traditional |
| Mihai Eminescu | 6 | poetry | 19th-century |
| Petre Ispirescu | 4 | folktale | 19th-century |
| Others | 5 | fiction | modern |

### Step 4: Generate Output Files

**For Tatoeba**, create these files in `src/data/tatoeba/`:
- `beginner_extended.js` - difficulty 1-3 (aim for 500+ sentences)
- `intermediate_extended.js` - difficulty 4-6 (aim for 500+ sentences)
- `advanced_extended.js` - difficulty 7-10 (aim for 500+ sentences)

**For Stories**, update `src/data/stories.js`:
- Add new stories to the existing `ROMANIAN_STORIES` array
- Deduplicate by title (don't add stories that already exist)
- Aim for 50-100 new story excerpts

### Step 5: Update Index Files

Update `src/data/tatoeba/index.js` to export the new files:
```javascript
export { TATOEBA_BEGINNER_EXTENDED } from './beginner_extended';
export { TATOEBA_INTERMEDIATE_EXTENDED } from './intermediate_extended';
export { TATOEBA_ADVANCED_EXTENDED } from './advanced_extended';
```

Update `src/data/index.js` if needed to include new exports.

---

## 4. Quality Criteria

### Must Have:
- [ ] All IDs are unique (no duplicates across files)
- [ ] All Romanian text is properly escaped (quotes, special chars)
- [ ] Word counts are accurate
- [ ] Difficulty ratings are assigned (not null/undefined)
- [ ] Files are valid JavaScript (no syntax errors)
- [ ] License attribution preserved in file headers

### Should Have:
- [ ] Prioritize sentences WITH audio (hasAudio: true)
- [ ] Balance of difficulty levels in output
- [ ] No duplicate sentences (check by Romanian text)
- [ ] Stories grouped logically by author/era

### Nice to Have:
- [ ] Audio URLs verified (spot-check a sample)
- [ ] Sentences sorted by difficulty within each file
- [ ] Progress logging during processing

---

## 5. File Headers (Required)

### Tatoeba Files
```javascript
/**
 * Tatoeba Extended Sentences - [Level]
 * Source: tatoeba.org
 * License: CC-BY 2.0 FR
 * Attribution: https://tatoeba.org
 * 
 * Generated: [DATE]
 * Sentence count: [COUNT]
 */
```

### Stories Addition
```javascript
// Add this comment before new stories in the array:
// ============================================
// RO-STORIES DATASET - Added [DATE]
// Source: huggingface.co/datasets/readerbench/ro-stories
// License: Apache 2.0
// ============================================
```

---

## 6. Verification Commands

After generating files, run:
```bash
# Check for JavaScript syntax errors
node --check src/data/tatoeba/beginner_extended.js
node --check src/data/tatoeba/intermediate_extended.js
node --check src/data/tatoeba/advanced_extended.js
node --check src/data/stories.js

# Verify the app still builds
npm run build
```

---

## 7. Commit Message
```
feat(content): add extended Tatoeba sentences and RO-stories content

- Add ~1500 new Tatoeba sentences with audio support
- Add ~50-100 new Romanian literature excerpts from RO-stories dataset
- Auto-assigned difficulty levels based on complexity
- Proper license attribution included

Sources:
- tatoeba.org (CC-BY 2.0 FR)
- huggingface.co/datasets/readerbench/ro-stories (Apache 2.0)
```

---

## Notes for Claude Code

- If HuggingFace rate limits, use their datasets library instead of direct download
- If audio URLs are slow to verify, skip verification and mark hasAudio based on the audio mapping file
- Keep existing content intact - only ADD new content
- If a sentence is too long (>500 chars), skip it
- Escape all special characters in strings properly (especially quotes and backslashes)

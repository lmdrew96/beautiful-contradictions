# Contributing to ChaosLingua

Thank you for your interest in contributing to ChaosLingua! This guide will help you add new content or improve existing features.

## Types of Contributions

### 1. Content Contributions

The easiest way to contribute is by adding new content:

- **Vocabulary words** - New Romanian words with translations
- **YouTube/Spotify content** - Language learning resources
- **Sentences** - Romanian-English sentence pairs
- **Stories** - Short literary excerpts for reading practice
- **Recipes** - Traditional Romanian recipes in bilingual format

### 2. Code Contributions

- Bug fixes
- New components
- Performance improvements
- Accessibility enhancements

### 3. Documentation

- Improving guides
- Translating documentation
- Adding examples

## Getting Started

1. Fork the repository
2. Clone your fork locally
3. Install dependencies: `npm install`
4. Start the dev server: `npm run dev`
5. Make your changes
6. Test your changes
7. Submit a pull request

## Adding Content

### Adding Vocabulary

Edit `src/data/vocabulary.js`:

```javascript
{
  id: 'vocab-xxx',        // Unique ID with 'vocab-' prefix
  ro: 'cuvant',           // Romanian word
  en: 'word',             // English translation
  category: 'noun',       // Part of speech or category
  difficulty: 3,          // 1-5 scale
  gender: 'm',            // 'm', 'f', or 'n' for nouns (optional)
  plural: 'cuvinte',      // Plural form (optional)
  example: {              // Example sentence (optional)
    ro: 'Acesta este un cuvant.',
    en: 'This is a word.'
  }
}
```

### Adding YouTube Content

Edit `src/data/content.js`:

```javascript
{
  id: 'yt-channel-title',  // Unique ID with 'yt-' prefix
  contentType: 'video',
  platform: 'youtube',
  title: 'Video Title',
  embedId: 'VIDEO_ID',     // From youtube.com/watch?v=VIDEO_ID
  description: 'Brief description of the content.',
  difficulty: 4,           // 1-10 scale
  topics: ['topic1', 'topic2'],
  sessionTypes: ['chaos_session', 'fog_session'],
  instructionLang: 'en',   // 'en', 'ro', or 'mixed'
  nativeSpeaker: true,     // Is the speaker a native Romanian?
}
```

### Adding Tatoeba Sentences

Sentences are imported using the script in `scripts/import-tatoeba.js`. To add sentences manually, edit the appropriate file in `src/data/tatoeba/`:

```javascript
{
  id: 'tat-xxx',
  romanian: 'Propozitie in romana.',
  english: 'Sentence in English.',
  difficulty: 3,
  wordCount: 4,
  hasAudio: false,
  audioUrl: null
}
```

### Adding Stories

Edit `src/data/stories.js`:

```javascript
{
  id: 'story-title-slug',
  title: 'Titlu in Romana',
  titleEn: 'Title in English',
  author: 'Author Name',
  excerpt: `Story excerpt here...`,
  difficulty: 4,           // 1-10 scale
  genre: 'folktale',       // 'folktale', 'fiction', 'poetry', 'memoir'
  era: 'traditional',      // '19th-century', 'modern', 'traditional'
  wordCount: 200,
  source: 'Source attribution',
  license: 'Public Domain' // or 'CC-BY 4.0', etc.
}
```

### Adding Recipes

Edit `src/data/recipes.js`:

```javascript
{
  id: 'recipe-name-slug',
  title: {
    ro: 'Nume Reteta',
    en: 'Recipe Name',
  },
  description: {
    ro: 'Descriere scurta.',
    en: 'Short description.',
  },
  difficulty: 4,
  prepTime: '30 minute',
  cookTime: '1 ora',
  servings: 4,
  ingredients: [
    { ro: 'ingredient', en: 'ingredient', amount: 'cantitate' },
  ],
  steps: [
    { ro: 'Pas in romana.', en: 'Step in English.' },
  ],
  category: 'main',        // 'main', 'soup', 'dessert', 'appetizer', 'side'
  region: 'National',      // Region of origin
  source: 'Traditional Romanian cuisine',
  license: 'Public Domain'
}
```

## Content Guidelines

### Difficulty Scale

| Level | Description | Example |
|-------|-------------|---------|
| 1-2 | Complete beginner | Single words, basic phrases |
| 3-4 | Elementary | Simple sentences, common vocabulary |
| 5-6 | Intermediate | Complex sentences, idiomatic expressions |
| 7-8 | Upper intermediate | Native content with clear speech |
| 9-10 | Advanced | Native content, regional dialects, literature |

### Quality Standards

1. **Accuracy** - Ensure translations are correct
2. **Completeness** - Fill in all required fields
3. **Consistency** - Follow existing patterns and formats
4. **Attribution** - Credit all sources properly

### Licensing Requirements

- Only add content that is:
  - Public domain
  - Creative Commons licensed (CC-BY, CC-BY-SA)
  - Your own original work
  - Platform content via official embeds (YouTube, Spotify)

- Update `docs/CONTENT_SOURCES.md` with attribution for new sources

## Code Standards

### Before Committing

1. Run `npm run lint` and fix any errors
2. Run `npm run build` to ensure it compiles
3. Test your changes in the browser

### Commit Messages

Use the format: `type: brief description`

- `feat:` New feature
- `fix:` Bug fix
- `content:` Adding/updating content data
- `docs:` Documentation changes
- `refactor:` Code refactoring

Examples:
```
content: add 50 new intermediate vocabulary words
feat: add audio playback to SentenceCard
fix: resolve difficulty filtering in ErrorGarden
```

### Code Style

- Use meaningful variable names
- Add comments for complex logic
- Follow existing patterns in the codebase
- Keep functions small and focused

## Pull Request Process

1. Create a branch for your changes
2. Make your changes with clear commits
3. Update documentation if needed
4. Submit a pull request with:
   - Clear description of changes
   - Any related issues
   - Screenshots for UI changes

## Questions?

Open an issue on GitHub if you have questions about contributing.

Thank you for helping make ChaosLingua better!

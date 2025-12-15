# CLAUDE.md - ChaosLingua Development Instructions

## Project Overview

**Name:** ChaosLingua  
**Purpose:** ADHD-friendly Romanian language learning app  
**Stack:** React 18 + Vite + Tailwind CSS  
**Philosophy:** Structured chaos, mastery through mistakes, knowing through not-knowing

This is a personal project for a developer who is new to coding and uses agentic development. Prioritize clean, readable, maintainable code over clever solutions.

---

## Critical Rules

### No Bandaid Fixes

- NEVER apply quick patches that mask underlying issues
- If something is broken, find and fix the root cause
- If a fix requires significant refactoring, explain what needs to change and why before proceeding
- Do not add workarounds with TODO comments - fix it properly or flag it for discussion

### No Emojis

- Do not use emojis anywhere in the codebase
- This includes: comments, console logs, UI text, commit messages, documentation
- Exception: README badges are acceptable

### Clean Before Building

Before every build or compile:

```bash
# Always run in this order
rm -rf node_modules/.vite
rm -rf dist
npm run lint --fix  # Fix auto-fixable issues
npm run build
```

If there are linting errors that cannot be auto-fixed, resolve them before proceeding with the build. Do not build with warnings unless explicitly approved.

### Version Management

**Location:** `package.json` version field

**Format:** Semantic versioning (MAJOR.MINOR.PATCH)
- MAJOR: Breaking changes or major feature overhauls
- MINOR: New features, new content sources, new components
- PATCH: Bug fixes, content additions, small improvements

**Before every commit:**
1. Determine the appropriate version bump
2. Update the version in `package.json`
3. If significant changes, update CHANGELOG.md (create if it doesn't exist)

**Current version scheme:**
- 0.x.x = Pre-release/MVP phase
- 1.0.0 = First stable release with core features complete

---

## Code Standards

### General Principles

1. **Readability over cleverness** - Write code that is easy to understand
2. **Explicit over implicit** - Name things clearly, avoid magic numbers
3. **Small functions** - Each function should do one thing
4. **Consistent patterns** - Follow existing patterns in the codebase

### JavaScript/React

```javascript
// Use descriptive variable names
const userDifficultyLevel = calculateDifficulty(errorHistory);  // Good
const udl = calcDiff(eh);  // Bad

// Use const by default, let only when reassignment is needed
const items = [];
items.push(newItem);  // This is fine, we're not reassigning

// Destructure props in components
function ContentCard({ title, description, difficulty }) {  // Good
function ContentCard(props) {  // Avoid

// Use early returns to reduce nesting
function processContent(content) {
  if (!content) return null;
  if (!content.isValid) return null;
  
  // Main logic here
}

// Comment the WHY, not the WHAT
// Bad: Increment counter by 1
// Good: Track consecutive errors to trigger difficulty adjustment
```

### Component Structure

```jsx
// Order within a component file:
// 1. Imports (external, then internal, then styles)
// 2. Constants
// 3. Helper functions (if small and component-specific)
// 4. Component definition
// 5. PropTypes or TypeScript types (if used)
// 6. Export

import React, { useState, useEffect } from 'react';
import { Timer } from 'lucide-react';

import { getRandomContent } from '../data';
import { useStorage } from '../hooks/useStorage';

const DEFAULT_SESSION_LENGTH = 15;

function ChaosEngine() {
  // Hooks first
  const [content, setContent] = useState(null);
  const { saveProgress } = useStorage();
  
  // Effects
  useEffect(() => {
    // ...
  }, []);
  
  // Event handlers
  const handleShuffle = () => {
    // ...
  };
  
  // Render helpers (if needed)
  const renderContent = () => {
    // ...
  };
  
  // Main render
  return (
    // ...
  );
}

export default ChaosEngine;
```

### File Naming

- Components: PascalCase (`ErrorGarden.jsx`)
- Utilities/hooks: camelCase (`useStorage.js`, `difficulty.js`)
- Data files: kebab-case (`tatoeba-sentences.js`)
- Scripts: kebab-case (`import-tatoeba.js`)

### CSS/Tailwind

- Prefer Tailwind utility classes over custom CSS
- If custom CSS is needed, add it to `src/styles/index.css` with clear comments
- Group Tailwind classes logically: layout, spacing, typography, colors, effects

```jsx
// Group classes logically
<div className="
  flex flex-col items-center gap-4
  p-6 mx-auto max-w-2xl
  text-lg font-medium
  bg-slate-800 text-white
  rounded-lg shadow-lg
">
```

---

## Project Structure

```
chaoslingua/
├── scripts/           # Build and data import scripts
├── src/
│   ├── components/    # React components
│   ├── data/          # Static data (content, vocabulary, etc.)
│   ├── hooks/         # Custom React hooks
│   ├── utils/         # Utility functions
│   └── styles/        # CSS files
├── public/            # Static assets
├── docs/              # Documentation
└── tests/             # Test files (when added)
```

### Data Files

All data files in `src/data/` should:
- Export named constants in SCREAMING_SNAKE_CASE
- Include helper functions for filtering/querying
- Have a consistent object structure documented at the top of the file

```javascript
/**
 * Tatoeba Sentences Database
 * 
 * Structure:
 * {
 *   id: string,           // Unique identifier (tat-XXXXX)
 *   romanian: string,     // Romanian text
 *   english: string,      // English translation
 *   hasAudio: boolean,    // Whether native audio exists
 *   audioUrl: string,     // URL to audio file (if hasAudio)
 *   difficulty: number,   // 1-10 scale
 *   source: string,       // Always 'tatoeba'
 * }
 */

export const TATOEBA_SENTENCES = [
  // ...
];

export const getSentencesByDifficulty = (min, max) => {
  return TATOEBA_SENTENCES.filter(s => s.difficulty >= min && s.difficulty <= max);
};
```

---

## Git Practices

### Commit Messages

Format: `type: brief description`

Types:
- `feat:` New feature
- `fix:` Bug fix
- `refactor:` Code change that neither fixes a bug nor adds a feature
- `content:` Adding or updating content data
- `docs:` Documentation changes
- `style:` Formatting, missing semicolons, etc. (not CSS changes)
- `chore:` Build process, dependencies, tooling

Examples:
```
feat: add Tatoeba sentence import script
fix: resolve difficulty calculation for short sentences
content: add 500 new beginner sentences from Tatoeba
refactor: extract content filtering into separate utility
docs: update README with new content sources
chore: bump version to 0.3.0
```

### Before Committing

1. Run `npm run lint` - fix all errors
2. Run `npm run build` - ensure it compiles
3. Test the feature/fix manually
4. Update version in `package.json`
5. Write a clear commit message

### Branch Strategy (Optional)

For larger features:
```bash
git checkout -b feat/tatoeba-integration
# Work on feature
git checkout main
git merge feat/tatoeba-integration
```

---

## Common Tasks

### Adding New Content to content.js

1. Follow the existing object structure exactly
2. Generate a unique ID with prefix (`yt-`, `sp-`, `story-`, etc.)
3. Assign appropriate difficulty (1-10)
4. Include all required fields
5. Test that the embed URL works

### Adding New Vocabulary

1. Include Romanian word, English translation, part of speech
2. Link to example sentences if available
3. Assign difficulty based on word frequency
4. Group by topic if applicable

### Creating a New Component

1. Create file in `src/components/` with PascalCase name
2. Follow the component structure template above
3. Import and use in parent component or App.jsx
4. Add any new routes if needed

### Running Data Import Scripts

```bash
# From project root
node scripts/import-tatoeba.js
node scripts/import-ro-stories.js
```

Scripts should:
- Log progress to console
- Handle errors gracefully
- Output to `src/data/` directory
- Not require manual intervention

---

## Testing Expectations

Currently no formal test suite. When testing:

1. **Manual testing required** for all UI changes
2. **Console should be clean** - no errors or warnings
3. **Test in multiple browsers** if making CSS changes
4. **Test mobile responsiveness** for layout changes

Future: Add Vitest for unit tests on utility functions.

---

## Performance Considerations

### Bundle Size

- Data files can get large. Monitor bundle size with `npm run build`
- Consider lazy loading for large data sets
- Keep images optimized and in `public/` folder

### Runtime Performance

- Avoid unnecessary re-renders (use React.memo, useCallback, useMemo appropriately)
- Don't filter large arrays on every render - memoize results
- Use pagination or virtualization for long lists

---

## Troubleshooting

### Build Fails

1. Delete `node_modules` and `package-lock.json`
2. Run `npm install`
3. Run `npm run build`

### Vite Dev Server Issues

1. Clear Vite cache: `rm -rf node_modules/.vite`
2. Restart dev server

### Embed Not Loading

1. Check URL format matches platform requirements
2. Verify the content is still available
3. Check browser console for CORS or security errors

---

## Contact and Context

**Developer:** Learning to code, uses agentic development  
**Learning style:** ADHD - needs clear structure, concrete examples, step-by-step guidance  
**Communication preference:** Direct recommendations over lists of options

When explaining changes or asking questions:
- Be specific and actionable
- Explain the "why" briefly
- Offer a recommended approach rather than multiple options

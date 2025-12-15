# ChaosLingua

**Structured chaos for language learning. Your mistakes are your map.**

![ChaosLingua](https://img.shields.io/badge/status-prototype-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/react-18-61dafb)
![Version](https://img.shields.io/badge/version-0.5.0-green)

## Philosophy

Traditional learning says: *be consistent, avoid mistakes, understand fully before moving on.*

ChaosLingua says: **create containers for chaos, mine your errors for gold, and let understanding emerge from sustained confusion.**

### The Three Pillars

| Pillar | Paradox | Practice |
|--------|---------|----------|
| **Structured Chaos** | Plan the container, not the contents | Timed sessions with random content |
| **Mastery Through Mistakes** | Errors are the curriculum | Guess-first learning, error tracking |
| **Knowing Through Not-Knowing** | Confusion is understanding in progress | Above-level immersion |

## Content Library

| Content Type | Count | Description |
|--------------|-------|-------------|
| Video/Audio Content | 35+ | YouTube lessons, podcasts, native media |
| Vocabulary Words | 650+ | 15 categories: basics, nouns, verbs, numbers, food, animals, nature, clothing, professions, travel, sports, emotions, expressions, prepositions |
| Sentence Pairs | 150 | Tatoeba Romanian-English pairs (difficulty 1-10) |
| Literary Excerpts | 18 | Folktales, classics, poetry, modern stories |
| Traditional Recipes | 22 | Regional dishes, soups, desserts, specialties |

## Features

### Chaos Engine
- Randomized content from curated Romanian learning sources
- Configurable session lengths (5, 15, 30 minutes)
- Shuffle button for instant variety
- Micro-reflection capture at session end

### Error Garden
- Guess-first vocabulary practice
- Wrong answers become review items
- Spaced repetition weighted toward mistakes
- Progress tracking and streak counter

### Fog Machine
- Adjustable difficulty (fog density)
- Romanian-only content for immersion
- Time-in-fog tracking
- Philosophy reminders during session

### Progress Dashboard
- Minutes spent in each mode
- Errors harvested count
- Error garden review and management
- Session history

### New Components

#### SentenceCard
- Display Romanian-English sentence pairs
- Toggle translation visibility
- Audio playback support (where available)
- Difficulty indicators

#### StoryReader
- Romanian literary excerpts with clickable words
- Paragraph-by-paragraph display
- Translation hints
- Genre and difficulty filtering

#### RecipeCard
- Bilingual recipe display
- Toggle between Romanian and English
- Expandable ingredients and steps
- Cooking time and serving info

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/lmdrew96/chaoslingua.git
cd chaoslingua

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

```bash
npm run build
npm run preview  # Preview the build locally
```

## Project Structure

```
chaoslingua/
├── docs/
│   ├── CONTENT_SOURCES.md    # Content attribution
│   └── CONTRIBUTING.md       # Contribution guide
├── scripts/
│   └── import-tatoeba.js     # Sentence import utility
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
│   │   ├── SentenceCard.jsx     # Tatoeba sentences
│   │   ├── StoryReader.jsx      # Literary content
│   │   └── RecipeCard.jsx       # Romanian recipes
│   ├── data/
│   │   ├── index.js             # Unified exports
│   │   ├── content.js           # Video/audio database
│   │   ├── vocabulary.js        # Word database
│   │   ├── stories.js           # Literary excerpts
│   │   ├── recipes.js           # Romanian recipes
│   │   └── tatoeba/
│   │       ├── index.js         # Lazy loading entry
│   │       ├── beginner.js      # Difficulty 1-3
│   │       ├── intermediate.js  # Difficulty 4-6
│   │       └── advanced.js      # Difficulty 7-10
│   ├── hooks/
│   │   └── useStorage.js
│   ├── utils/
│   │   └── difficulty.js        # Difficulty utilities
│   ├── styles/
│   │   └── index.css
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Content Sources

See [docs/CONTENT_SOURCES.md](docs/CONTENT_SOURCES.md) for complete attribution and licensing information.

### Video Content
- **Learning Channels**: Easy Romanian, Romanian With Gia, Romanian with Andreea
- **Kids Content**: TraLaLa, Zurli, Povesti pentru Copii
- **Native Media**: Jamila Cuisine, Digi24, ProTV, Recorder

### Audio Content
- **Podcasts**: RomanianPod101, Povesti Nemuritoare, Starea Natiei

### Text Content
- **Sentences**: Tatoeba.org (CC-BY 2.0 FR)
- **Literature**: Ion Creanga, Mihai Eminescu, George Calinescu (Public Domain)
- **Recipes**: Traditional Romanian cuisine

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Supabase** - Authentication and cloud sync (optional)
- **localStorage** - Local persistence

## Roadmap

### v0.5.0 (Current)
- [x] Rebrand to ChaosLingua
- [x] Content management infrastructure
- [x] Expanded YouTube/Spotify content (35+ items)
- [x] Vocabulary expansion (650+ words across 15 categories)
- [x] Tatoeba sentence integration (150 sentences, difficulty 1-10)
- [x] Literary content (18 Romanian stories and poems)
- [x] Recipe module (22 traditional dishes)

### v0.6.0
- [ ] Integration of new components into main views
- [ ] Audio playback for Tatoeba sentences
- [ ] Story progress tracking
- [ ] Recipe favorites

### v1.0.0
- [ ] Multiple language support
- [ ] Native mobile apps
- [ ] Community features
- [ ] Full Tatoeba integration (5000+ sentences)

## Contributing

See [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md) for detailed contribution guidelines.

Quick start:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Follow the code standards in CLAUDE.md
4. Commit your changes (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sentence pairs from [Tatoeba](https://tatoeba.org) (CC-BY 2.0 FR)
- Inspired by comprehensible input theory and ADHD-friendly learning approaches
- Built with love for the Romanian language

---

*"The mess is the method. Your mistakes are your map."*

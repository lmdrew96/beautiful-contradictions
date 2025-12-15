# 🌀 Beautiful Contradictions

A language learning app built on paradox: **structured chaos, mastery through mistakes, and knowing through not-knowing.**

![Beautiful Contradictions](https://img.shields.io/badge/status-prototype-purple)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/react-18-61dafb)

## Philosophy

Traditional learning says: *be consistent, avoid mistakes, understand fully before moving on.*

Beautiful Contradictions says: **create containers for chaos, mine your errors for gold, and let understanding emerge from sustained confusion.**

### The Three Pillars

| Pillar | Paradox | Practice |
|--------|---------|----------|
| 🌀 **Structured Chaos** | Plan the container, not the contents | Timed sessions with random content |
| 💎 **Mastery Through Mistakes** | Errors are the curriculum | Guess-first learning, error tracking |
| 🔮 **Knowing Through Not-Knowing** | Confusion is understanding in progress | Above-level immersion |

## Features

### Chaos Engine 🌀
- Randomized content from curated Romanian learning sources
- Configurable session lengths (5, 15, 30 minutes)
- Shuffle button for instant variety
- Micro-reflection capture at session end

### Error Garden 💎
- Guess-first vocabulary practice
- Wrong answers become review items
- Spaced repetition weighted toward mistakes
- Progress tracking and streak counter

### Fog Machine 🔮
- Adjustable difficulty (fog density)
- Romanian-only content for immersion
- Time-in-fog tracking
- Philosophy reminders during session

### Progress Dashboard 📊
- Minutes spent in each mode
- Errors harvested count
- Error garden review and management
- Session history

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/beautiful-contradictions.git
cd beautiful-contradictions

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
beautiful-contradictions/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── ContentEmbed.jsx
│   │   ├── Timer.jsx
│   │   ├── HomeView.jsx
│   │   ├── ChaosEngine.jsx
│   │   ├── ErrorGarden.jsx
│   │   ├── FogMachine.jsx
│   │   └── ProgressView.jsx
│   ├── data/
│   │   ├── content.js      # Embedded content database
│   │   └── vocabulary.js   # Vocabulary for Error Garden
│   ├── hooks/
│   │   └── useStorage.js   # Custom hooks (localStorage, timer)
│   ├── styles/
│   │   └── index.css       # Tailwind + custom styles
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md
```

## Content Sources

Content is seeded from the [LearnRomanian/romanian](https://github.com/LearnRomanian/romanian) GitHub repository, which provides a curated collection of Romanian learning resources.

### Currently Included

- **YouTube**: Learn Romanian With Nico, Romanian Hub, Easy Romanian, TraLaLa (kids), travel vlogs
- **Spotify**: Learn Romanian Podcast (400+ episodes), Mind Architect, Fain și Simplu, and more

### Adding Content

Edit `src/data/content.js` to add new content items:

```javascript
{
  id: 'unique-id',
  title: 'Content Title',
  description: 'Description of the content',
  embedUrl: 'https://www.youtube.com/embed/VIDEO_ID',
  platform: 'youtube', // or 'spotify'
  type: 'video',
  difficulty: 5, // 1-10
  topics: ['grammar', 'conversation'],
  sessionTypes: ['chaos_window', 'fog_session'],
  instructionLang: 'en', // or 'ro'
}
```

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **localStorage** - Persistence (MVP)

## Roadmap

### v0.2 (Next)
- [ ] Mystery Shelf feature
- [ ] Smarter spaced repetition
- [ ] Content difficulty calibration

### v0.3
- [ ] User accounts & cloud sync
- [ ] YouTube API integration for more videos
- [ ] Community content submissions

### v1.0
- [ ] Multiple language support
- [ ] Native mobile apps
- [ ] Social/community features

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Content sourced from [LearnRomanian/romanian](https://github.com/LearnRomanian/romanian) (GPL-3.0)
- Inspired by comprehensible input theory and ADHD-friendly learning approaches
- Built with love for the Romanian language 🇷🇴

---

*"The mess is the method. Your mistakes are your map."*

/**
 * Content Database
 * Seeded from LearnRomanian/romanian GitHub repo
 * 
 * To add more content:
 * 1. Run the import script against the LearnRomanian repo
 * 2. Use YouTube API to fetch videos from channels
 * 3. Add community-submitted content through the admin interface
 */

export const CONTENT_DATABASE = [
  // ============================================
  // YOUTUBE - Language Learning Channels
  // ============================================
  {
    id: 'yt-easy-romanian-playlist',
    title: 'Easy Romanian - Street Interviews',
    description: 'Native speakers on the street with Romanian and English subtitles. Perfect for hearing real conversational Romanian.',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLSGlhFQUEl3jtvuXulhZRYDiYefnBYzGh',
    platform: 'youtube',
    type: 'playlist',
    difficulty: 5,
    topics: ['conversation', 'culture', 'vocabulary'],
    sessionTypes: ['chaos_window', 'fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'yt-nico-alphabet',
    title: 'Romanian Alphabet & Pronunciation',
    description: 'Learn the Romanian alphabet with Nico - clear explanations for English speakers.',
    embedUrl: 'https://www.youtube.com/embed/ygB0WfpKDIg',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['pronunciation', 'basics', 'alphabet'],
    sessionTypes: ['chaos_window', 'grammar_spiral'],
    instructionLang: 'en',
    source: 'Learn Romanian With Nico',
  },
  {
    id: 'yt-nico-greetings',
    title: 'Romanian Greetings & Basic Phrases',
    description: 'Essential greetings and phrases for beginners.',
    embedUrl: 'https://www.youtube.com/embed/DqFf3XyxTME',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['conversation', 'basics', 'vocabulary'],
    sessionTypes: ['chaos_window'],
    instructionLang: 'en',
    source: 'Learn Romanian With Nico',
  },
  {
    id: 'yt-romanianhub-verbs',
    title: 'Romanian Verb Conjugation Basics',
    description: 'Understanding how Romanian verbs work - present tense fundamentals.',
    embedUrl: 'https://www.youtube.com/embed/8PL-5BdAZyE',
    platform: 'youtube',
    type: 'video',
    difficulty: 3,
    topics: ['grammar', 'verbs'],
    sessionTypes: ['grammar_spiral', 'chaos_window'],
    instructionLang: 'en',
    source: 'Romanian Hub',
  },

  // ============================================
  // YOUTUBE - Kids Content (Great for Fog)
  // ============================================
  {
    id: 'yt-tralala-mix',
    title: 'TraLaLa - Romanian Kids Songs Mix',
    description: 'Popular Romanian children\'s songs. Simple vocabulary, catchy tunes, great for immersion.',
    embedUrl: 'https://www.youtube.com/embed/5nrLEFGgmqM',
    platform: 'youtube',
    type: 'video',
    difficulty: 2,
    topics: ['music', 'kids', 'vocabulary'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'TraLaLa',
  },
  {
    id: 'yt-zurli-colors',
    title: 'Zurli - Learning Colors in Romanian',
    description: 'Fun, energetic kids show teaching colors. Great low-pressure listening.',
    embedUrl: 'https://www.youtube.com/embed/2cVh4PCgLJw',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['kids', 'vocabulary', 'colors'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Zurli',
  },

  // ============================================
  // YOUTUBE - Native Content (High Fog)
  // ============================================
  {
    id: 'yt-haihui-travel',
    title: 'HaiHui în Doi - Romanian Travel Vlog',
    description: 'Romanian couple traveling through Romania. Natural speech, beautiful scenery.',
    embedUrl: 'https://www.youtube.com/embed/0jRmQHhSLvI',
    platform: 'youtube',
    type: 'video',
    difficulty: 7,
    topics: ['travel', 'culture', 'conversation'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'HaiHui în Doi',
  },
  {
    id: 'yt-tiago-aici',
    title: 'Tiago Aici - Brazilian Learning Romanian',
    description: 'A Brazilian expat sharing his Romanian learning journey. Relatable learner perspective.',
    embedUrl: 'https://www.youtube.com/embed/y8c6IKGfBJc',
    platform: 'youtube',
    type: 'video',
    difficulty: 5,
    topics: ['culture', 'learning', 'expat'],
    sessionTypes: ['chaos_window', 'fog_session'],
    instructionLang: 'ro',
    source: 'Tiago Aici',
  },

  // ============================================
  // SPOTIFY - Podcasts
  // ============================================
  {
    id: 'sp-learn-romanian-podcast',
    title: 'Learn Romanian Podcast',
    description: '400+ episodes to improve your Romanian skills. Structured lessons with Camelia.',
    embedUrl: 'https://open.spotify.com/embed/show/5conUoh2sxAQjKqURIii2a?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 3,
    topics: ['grammar', 'vocabulary', 'structured'],
    sessionTypes: ['chaos_window', 'grammar_spiral'],
    instructionLang: 'en',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-mind-architect',
    title: 'Mind Architect',
    description: 'Romanian psychology and neuroscience podcast. Advanced listening, thoughtful discussions.',
    embedUrl: 'https://open.spotify.com/embed/show/2i93Ub9rGWTNVyEg0rsxPb?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 8,
    topics: ['psychology', 'culture', 'conversation'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-fain-simplu',
    title: 'Fain și Simplu cu Mihai Morar',
    description: 'Celebrity interviews with Romanian and Moldovan public figures. Natural conversational Romanian.',
    embedUrl: 'https://open.spotify.com/embed/show/059sh395dgSCd18NBafuEw?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 7,
    topics: ['culture', 'interviews', 'conversation'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-cronicari-digitali',
    title: 'Cronicari Digitali',
    description: 'Culture, technology, education and gastronomy. Varied topics, engaging discussions.',
    embedUrl: 'https://open.spotify.com/embed/show/3Lw8ovNWJctunHxJU1ACim?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 7,
    topics: ['culture', 'technology', 'food'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-podcastul-istorie',
    title: 'Podcastul de Istorie',
    description: 'Romanian and world history. Learn about the past while practicing your Romanian.',
    embedUrl: 'https://open.spotify.com/embed/show/6pMyYscyTgFpflhMbqYge1?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 6,
    topics: ['history', 'culture'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-pe-bune',
    title: 'Pe Bune',
    description: 'Life stories of creative people in Romania. Inspiring conversations.',
    embedUrl: 'https://open.spotify.com/embed/show/5lOFFsKQXZ119wxntH13fe?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 7,
    topics: ['culture', 'creativity', 'interviews'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
  {
    id: 'sp-obiceiul-pamantului',
    title: 'Obiceiul Pământului',
    description: 'Real-life stories about Roma history, enslavement and discrimination in Romania.',
    embedUrl: 'https://open.spotify.com/embed/show/1vWuQoa7tnyxo3PR0W7r0l?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 7,
    topics: ['history', 'culture', 'social'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'LearnRomanian/romanian',
  },
];

/**
 * Get content filtered by session type
 */
export const getContentBySessionType = (sessionType) => {
  return CONTENT_DATABASE.filter(c => c.sessionTypes.includes(sessionType));
};

/**
 * Get content filtered by difficulty range
 */
export const getContentByDifficulty = (minDiff, maxDiff) => {
  return CONTENT_DATABASE.filter(c => c.difficulty >= minDiff && c.difficulty <= maxDiff);
};

/**
 * Get random content item
 */
export const getRandomContent = (filter = null) => {
  const items = filter ? CONTENT_DATABASE.filter(filter) : CONTENT_DATABASE;
  return items[Math.floor(Math.random() * items.length)];
};

export default CONTENT_DATABASE;

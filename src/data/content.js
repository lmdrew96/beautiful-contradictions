/**
 * Content Database
 * Seeded from LearnRomanian/romanian GitHub repo
 *
 * Structure:
 * {
 *   id: string,             // Unique ID with prefix (yt-, sp-)
 *   contentType: string,    // 'video' | 'audio' | 'text' | 'recipe' | 'sentence'
 *   title: string,          // Display title
 *   description: string,    // Detailed description
 *   embedUrl: string,       // Platform-specific embed URL
 *   platform: string,       // 'youtube' | 'spotify'
 *   type: string,           // 'video' | 'playlist' | 'podcast'
 *   difficulty: number,     // 1-10 scale
 *   topics: string[],       // Array of topic tags
 *   sessionTypes: string[], // ['chaos_window', 'fog_session', 'grammar_spiral']
 *   instructionLang: string,// 'ro' or 'en'
 *   source: string,         // Attribution/source
 * }
 */

export const CONTENT_DATABASE = [
  // ============================================
  // YOUTUBE - Language Learning Channels
  // ============================================
  {
    id: 'yt-easy-romanian-playlist',
    contentType: 'video',
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
    id: 'yt-gia-basics',
    contentType: 'video',
    title: 'Romanian With Gia - Basics Playlist',
    description: 'Structured lessons for beginners with clear explanations and practice exercises.',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLfKvL-VUSKAnM9MWJT9F1z1QZTdb73i7r',
    platform: 'youtube',
    type: 'playlist',
    difficulty: 2,
    topics: ['grammar', 'basics', 'vocabulary'],
    sessionTypes: ['chaos_window', 'grammar_spiral'],
    instructionLang: 'en',
    source: 'Romanian With Gia',
  },

  // ============================================
  // YOUTUBE - Romanian Music & Entertainment
  // ============================================
  {
    id: 'yt-muzica-romaneasca-hits',
    contentType: 'video',
    title: 'Top Romanian Music Hits',
    description: 'Popular Romanian pop and manele songs. Great for picking up colloquial expressions.',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLw-VjHDlEOgvtnnnqWlTqByAtC7tXBg6D',
    platform: 'youtube',
    type: 'playlist',
    difficulty: 6,
    topics: ['music', 'culture', 'vocabulary'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Various Artists',
  },

  // ============================================
  // YOUTUBE - Educational & Documentary
  // ============================================
  {
    id: 'yt-adevar-stiinta',
    contentType: 'video',
    title: 'Adevar despre Stiinta - Science',
    description: 'Romanian science explainer videos. Clear narration, educational content.',
    embedUrl: 'https://www.youtube.com/embed/RKK7wGAYP6k',
    platform: 'youtube',
    type: 'video',
    difficulty: 6,
    topics: ['science', 'education'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Adevar despre Stiinta',
  },

  // ============================================
  // SPOTIFY - Podcasts
  // ============================================
  {
    id: 'sp-learn-romanian-podcast',
    contentType: 'audio',
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
    contentType: 'audio',
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
    contentType: 'audio',
    title: 'Fain si Simplu cu Mihai Morar',
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
    contentType: 'audio',
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
    contentType: 'audio',
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
    contentType: 'audio',
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
    contentType: 'audio',
    title: 'Obiceiul Pamantului',
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
  // ============================================
  // SPOTIFY - Music Playlists
  // ============================================
  {
    id: 'sp-top-romania',
    contentType: 'audio',
    title: 'Top 50 Romania - Current Hits',
    description: 'Current Romanian chart toppers. Mix of Romanian and international songs.',
    embedUrl: 'https://open.spotify.com/embed/playlist/37i9dQZEVXbNZbJ6TZelCq?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'playlist',
    difficulty: 5,
    topics: ['music', 'culture', 'current'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Spotify Romania',
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
 * Get content filtered by content type
 */
export const getContentByType = (contentType) => {
  return CONTENT_DATABASE.filter(c => c.contentType === contentType);
};

/**
 * Get random content item
 */
export const getRandomContent = (filter = null) => {
  const items = filter ? CONTENT_DATABASE.filter(filter) : CONTENT_DATABASE;
  return items[Math.floor(Math.random() * items.length)];
};

export default CONTENT_DATABASE;

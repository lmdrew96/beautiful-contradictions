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
    id: 'yt-nico-alphabet',
    contentType: 'video',
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
    contentType: 'video',
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
    contentType: 'video',
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
  // YOUTUBE - More Learning Channels
  // ============================================
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
  {
    id: 'yt-gia-pronunciation',
    contentType: 'video',
    title: 'Romanian With Gia - Pronunciation Guide',
    description: 'Learn how to pronounce Romanian sounds correctly. Great for beginners.',
    embedUrl: 'https://www.youtube.com/embed/Cr5LzGvG9_c',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['pronunciation', 'basics'],
    sessionTypes: ['chaos_window', 'grammar_spiral'],
    instructionLang: 'en',
    source: 'Romanian With Gia',
  },
  {
    id: 'yt-easy-romanian-super-easy',
    contentType: 'video',
    title: 'Easy Romanian - Super Easy Playlist',
    description: 'Slower, clearer street interviews designed for beginners. Romanian with subtitles.',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLA5UIoabheFMo7gVAVLdQ7VKggNNBc_1U',
    platform: 'youtube',
    type: 'playlist',
    difficulty: 3,
    topics: ['conversation', 'basics', 'culture'],
    sessionTypes: ['chaos_window', 'fog_session'],
    instructionLang: 'ro',
    source: 'Easy Romanian',
  },
  {
    id: 'yt-romanian-with-andreea',
    contentType: 'video',
    title: 'Romanian with Andreea - Grammar Lessons',
    description: 'Clear explanations of Romanian grammar topics with examples.',
    embedUrl: 'https://www.youtube.com/embed/0MQK2vxAb5U',
    platform: 'youtube',
    type: 'video',
    difficulty: 3,
    topics: ['grammar', 'vocabulary'],
    sessionTypes: ['grammar_spiral', 'chaos_window'],
    instructionLang: 'en',
    source: 'Romanian with Andreea',
  },

  // ============================================
  // YOUTUBE - Kids Content (Great for Fog)
  // ============================================
  {
    id: 'yt-tralala-mix',
    contentType: 'video',
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
    contentType: 'video',
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
  {
    id: 'yt-tralala-animals',
    contentType: 'video',
    title: 'TraLaLa - Animals Songs for Kids',
    description: 'Learn animal names in Romanian through catchy songs. Perfect for beginners.',
    embedUrl: 'https://www.youtube.com/embed/F9JCkK3U2gs',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['kids', 'vocabulary', 'animals'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'TraLaLa',
  },
  {
    id: 'yt-cantece-copii-numbers',
    contentType: 'video',
    title: 'Cantece pentru Copii - Numbers Song',
    description: 'Learn to count in Romanian with this fun kids song. Numbers 1-10.',
    embedUrl: 'https://www.youtube.com/embed/9B_5KJvfKDs',
    platform: 'youtube',
    type: 'video',
    difficulty: 1,
    topics: ['kids', 'numbers', 'vocabulary'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Cantece pentru Copii',
  },
  {
    id: 'yt-povesti-pentru-copii',
    contentType: 'video',
    title: 'Povesti pentru Copii - Romanian Stories',
    description: 'Romanian fairy tales and stories for children. Clear narration, engaging visuals.',
    embedUrl: 'https://www.youtube.com/embed/n_1P6hRMLKE',
    platform: 'youtube',
    type: 'video',
    difficulty: 3,
    topics: ['kids', 'stories', 'culture'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Povesti pentru Copii',
  },

  // ============================================
  // YOUTUBE - Native Content (High Fog)
  // ============================================
  {
    id: 'yt-haihui-travel',
    contentType: 'video',
    title: 'HaiHui in Doi - Romanian Travel Vlog',
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
    contentType: 'video',
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
  {
    id: 'yt-jamila-cuisine',
    contentType: 'video',
    title: 'Jamila Cuisine - Romanian Cooking',
    description: 'Popular Romanian cooking channel. Learn food vocabulary through traditional recipes.',
    embedUrl: 'https://www.youtube.com/embed/videoseries?list=PLDmT5a4c9j_0IbS-3qHE7GcWi7bYx9vFe',
    platform: 'youtube',
    type: 'playlist',
    difficulty: 6,
    topics: ['food', 'culture', 'vocabulary'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Jamila Cuisine',
  },
  {
    id: 'yt-retete-traditionale',
    contentType: 'video',
    title: 'Retete Traditionale - Traditional Recipes',
    description: 'Step-by-step Romanian cooking with clear instructions. Great for food vocabulary.',
    embedUrl: 'https://www.youtube.com/embed/JV1zBvHNqCM',
    platform: 'youtube',
    type: 'video',
    difficulty: 5,
    topics: ['food', 'vocabulary', 'culture'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Retete Traditionale',
  },
  {
    id: 'yt-digi24-news',
    contentType: 'video',
    title: 'Digi24 - Romanian News',
    description: 'Romanian news broadcasts. Formal language, current events, challenging listening.',
    embedUrl: 'https://www.youtube.com/embed/0Qp5hF5nYUM',
    platform: 'youtube',
    type: 'video',
    difficulty: 8,
    topics: ['news', 'current-events', 'formal'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Digi24',
  },
  {
    id: 'yt-protv-news',
    contentType: 'video',
    title: 'ProTV Stirile - Evening News',
    description: 'Romanian evening news program. Natural formal speech, varied topics.',
    embedUrl: 'https://www.youtube.com/embed/VbL_9FDAXDM',
    platform: 'youtube',
    type: 'video',
    difficulty: 8,
    topics: ['news', 'current-events', 'formal'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'ProTV',
  },
  {
    id: 'yt-recorder-documentaries',
    contentType: 'video',
    title: 'Recorder - Romanian Documentaries',
    description: 'High-quality Romanian documentaries on social issues. Advanced vocabulary.',
    embedUrl: 'https://www.youtube.com/embed/5K3sXLBX74Y',
    platform: 'youtube',
    type: 'video',
    difficulty: 8,
    topics: ['documentary', 'social', 'culture'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Recorder',
  },
  {
    id: 'yt-buhnici-tech',
    contentType: 'video',
    title: 'George Buhnici - Tech Reviews',
    description: 'Romanian tech reviewer. Learn tech vocabulary in context.',
    embedUrl: 'https://www.youtube.com/embed/NMqnx-hqvIY',
    platform: 'youtube',
    type: 'video',
    difficulty: 7,
    topics: ['technology', 'reviews'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'George Buhnici',
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
  {
    id: 'sp-povesti-nemuritoare',
    contentType: 'audio',
    title: 'Povesti Nemuritoare - Romanian Stories',
    description: 'Romanian fairy tales and stories read aloud. Great for immersion listening.',
    embedUrl: 'https://open.spotify.com/embed/show/4rOoJ6Egrf8K2IrywzwOMk?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 4,
    topics: ['stories', 'literature', 'culture'],
    sessionTypes: ['fog_session', 'chaos_window'],
    instructionLang: 'ro',
    source: 'Povesti Nemuritoare',
  },
  {
    id: 'sp-starea-natiei',
    contentType: 'audio',
    title: 'Starea Natiei - Romanian Satire',
    description: 'Romanian satirical podcast. Humor, current events, natural conversational speech.',
    embedUrl: 'https://open.spotify.com/embed/show/0nSc1UJT7JhvNOIb1CnLnp?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 8,
    topics: ['humor', 'culture', 'current-events'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Starea Natiei',
  },
  {
    id: 'sp-catena-science',
    contentType: 'audio',
    title: 'Catena - Science Podcast',
    description: 'Romanian science and health podcast. Clear explanations of complex topics.',
    embedUrl: 'https://open.spotify.com/embed/show/1kpJpPJ1yxYe5eqaZZGrYf?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 7,
    topics: ['science', 'health', 'education'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: 'Catena',
  },
  {
    id: 'sp-2-ceai-3-zahar',
    contentType: 'audio',
    title: '2 Ceai 3 Zahar - Comedy Podcast',
    description: 'Popular Romanian comedy podcast. Natural, fast-paced conversational Romanian.',
    embedUrl: 'https://open.spotify.com/embed/show/5sPCRLLxywNlPQR0Xy8LSB?utm_source=generator&theme=0',
    platform: 'spotify',
    type: 'podcast',
    difficulty: 8,
    topics: ['humor', 'conversation', 'entertainment'],
    sessionTypes: ['fog_session'],
    instructionLang: 'ro',
    source: '2 Ceai 3 Zahar',
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

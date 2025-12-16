/**
 * YouTube Data API v3 Utility
 *
 * Provides video search functionality with Romanian language filtering.
 * Requires VITE_YOUTUBE_API_KEY environment variable.
 */

const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = 'https://www.googleapis.com/youtube/v3';

/**
 * Check if YouTube API is configured
 */
export function isYouTubeConfigured() {
  return Boolean(API_KEY);
}

/**
 * Search for Romanian videos on YouTube
 * @param {string} query - Search query
 * @param {Object} options - Search options
 * @param {number} options.maxResults - Max results (default 10, max 50)
 * @param {string} options.pageToken - Pagination token
 * @param {string} options.videoDuration - 'short' (<4min), 'medium' (4-20min), 'long' (>20min)
 * @returns {Promise<Object>} - Search results with video details
 */
export async function searchRomanianVideos(query, options = {}) {
  if (!API_KEY) {
    throw new Error('YouTube API key not configured. Set VITE_YOUTUBE_API_KEY in .env');
  }

  const {
    maxResults = 10,
    pageToken = null,
    videoDuration = null,
    appendRomanian = true, // Add Romanian keywords to query for better results
  } = options;

  // Enhance query with Romanian language markers for better results
  // Only append if query doesn't already contain Romanian indicators
  const romanianIndicators = ['română', 'romanian', 'ro', 'limba', 'în română', 'romaneste'];
  const hasRomanianIndicator = romanianIndicators.some(ind =>
    query.toLowerCase().includes(ind)
  );

  const enhancedQuery = (appendRomanian && !hasRomanianIndicator)
    ? `${query} în limba română`
    : query;

  // Build search URL
  const searchParams = new URLSearchParams({
    key: API_KEY,
    part: 'snippet',
    type: 'video',
    q: enhancedQuery,
    maxResults: Math.min(maxResults, 50),
    relevanceLanguage: 'ro',
    regionCode: 'RO', // Prioritize videos popular in Romania
    videoCaption: 'closedCaption', // Only videos with captions
    safeSearch: 'moderate',
  });

  if (pageToken) {
    searchParams.set('pageToken', pageToken);
  }

  if (videoDuration) {
    searchParams.set('videoDuration', videoDuration);
  }

  try {
    // Step 1: Search for videos
    const searchResponse = await fetch(`${BASE_URL}/search?${searchParams}`);

    if (!searchResponse.ok) {
      const error = await searchResponse.json();
      throw new Error(error.error?.message || 'YouTube search failed');
    }

    const searchData = await searchResponse.json();

    if (!searchData.items || searchData.items.length === 0) {
      return {
        videos: [],
        nextPageToken: null,
        totalResults: 0,
      };
    }

    // Get video IDs for detailed info
    const videoIds = searchData.items.map(item => item.id.videoId).join(',');

    // Step 2: Get video details (duration, view count, etc.)
    const detailsParams = new URLSearchParams({
      key: API_KEY,
      part: 'contentDetails,statistics',
      id: videoIds,
    });

    const detailsResponse = await fetch(`${BASE_URL}/videos?${detailsParams}`);

    if (!detailsResponse.ok) {
      // If details fail, return search results without extra info
      return {
        videos: searchData.items.map(formatSearchResult),
        nextPageToken: searchData.nextPageToken || null,
        totalResults: searchData.pageInfo?.totalResults || 0,
      };
    }

    const detailsData = await detailsResponse.json();
    const detailsMap = new Map(
      detailsData.items?.map(item => [item.id, item]) || []
    );

    // Combine search results with details
    const videos = searchData.items.map(item => {
      const details = detailsMap.get(item.id.videoId);
      return formatSearchResult(item, details);
    });

    return {
      videos,
      nextPageToken: searchData.nextPageToken || null,
      totalResults: searchData.pageInfo?.totalResults || 0,
    };

  } catch (err) {
    console.error('YouTube API error:', err);
    throw err;
  }
}

/**
 * Format a search result into our standard video format
 */
function formatSearchResult(searchItem, details = null) {
  const snippet = searchItem.snippet;
  const videoId = searchItem.id.videoId;

  const video = {
    id: `yt-${videoId}`,
    videoId: videoId,
    title: snippet.title,
    description: snippet.description,
    channelTitle: snippet.channelTitle,
    channelId: snippet.channelId,
    publishedAt: snippet.publishedAt,
    thumbnails: {
      default: snippet.thumbnails.default?.url,
      medium: snippet.thumbnails.medium?.url,
      high: snippet.thumbnails.high?.url,
    },
    embedUrl: `https://www.youtube.com/embed/${videoId}`,
    watchUrl: `https://www.youtube.com/watch?v=${videoId}`,
  };

  if (details) {
    video.duration = parseDuration(details.contentDetails?.duration);
    video.durationRaw = details.contentDetails?.duration;
    video.viewCount = parseInt(details.statistics?.viewCount || '0', 10);
    video.likeCount = parseInt(details.statistics?.likeCount || '0', 10);
  }

  return video;
}

/**
 * Parse ISO 8601 duration to human-readable format
 * @param {string} duration - ISO 8601 duration (e.g., "PT4M13S")
 * @returns {string} - Human readable duration (e.g., "4:13")
 */
function parseDuration(duration) {
  if (!duration) return null;

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return null;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }
  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Parse duration to total seconds
 */
export function durationToSeconds(duration) {
  if (!duration) return 0;

  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Estimate difficulty based on video metadata
 * @param {Object} video - Video object
 * @returns {number} - Difficulty 1-10
 */
export function estimateDifficulty(video) {
  // Base difficulty starts at 5
  let difficulty = 5;

  // Shorter videos tend to be easier
  const seconds = durationToSeconds(video.durationRaw);
  if (seconds < 180) difficulty -= 1; // Under 3 min
  if (seconds > 600) difficulty += 1; // Over 10 min
  if (seconds > 1200) difficulty += 1; // Over 20 min

  // Check for learning-related keywords in title/description
  const text = `${video.title} ${video.description}`.toLowerCase();
  const beginnerWords = ['beginner', 'basic', 'incepator', 'learn', 'easy', 'simple', 'lesson'];
  const advancedWords = ['advanced', 'avansat', 'native', 'fluent', 'news', 'documentary'];

  if (beginnerWords.some(w => text.includes(w))) difficulty -= 2;
  if (advancedWords.some(w => text.includes(w))) difficulty += 2;

  // Clamp to 1-10
  return Math.max(1, Math.min(10, difficulty));
}

/**
 * Get suggested search queries for Romanian learning
 */
export function getSuggestedQueries() {
  return [
    { query: 'învață română pentru începători', label: 'Beginner Lessons' },
    { query: 'conversație în română', label: 'Conversation' },
    { query: 'gramatică română explicată', label: 'Grammar' },
    { query: 'pronunție română', label: 'Pronunciation' },
    { query: 'povești în limba română', label: 'Stories' },
    { query: 'muzică românească versuri', label: 'Music' },
    { query: 'știri românia azi', label: 'News' },
    { query: 'rețete românești tradiționale', label: 'Cooking' },
    { query: 'desene animate în română', label: 'Kids Content' },
    { query: 'podcast românesc', label: 'Podcasts' },
  ];
}

/**
 * Format view count for display
 */
export function formatViewCount(count) {
  if (!count) return null;
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M views`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K views`;
  }
  return `${count} views`;
}

export default {
  isYouTubeConfigured,
  searchRomanianVideos,
  estimateDifficulty,
  getSuggestedQueries,
  formatViewCount,
  durationToSeconds,
};

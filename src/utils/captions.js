/**
 * Captions Utility
 *
 * Handles parsing and manipulation of video caption/subtitle data.
 * Supports SRT and VTT formats, plus manual caption objects.
 */

/**
 * Caption entry structure
 * @typedef {Object} CaptionEntry
 * @property {number} start - Start time in seconds
 * @property {number} end - End time in seconds
 * @property {string} text - Caption text (Romanian)
 * @property {string} [translation] - Optional English translation
 */

/**
 * Parse timestamp string to seconds
 * Supports formats: "00:00:00,000" (SRT) or "00:00:00.000" (VTT)
 */
export function parseTimestamp(timestamp) {
  if (!timestamp) return 0;

  // Handle both comma (SRT) and period (VTT) decimal separators
  const normalized = timestamp.replace(',', '.');
  const parts = normalized.split(':');

  if (parts.length === 3) {
    // HH:MM:SS.mmm
    const hours = parseFloat(parts[0]) || 0;
    const minutes = parseFloat(parts[1]) || 0;
    const seconds = parseFloat(parts[2]) || 0;
    return hours * 3600 + minutes * 60 + seconds;
  } else if (parts.length === 2) {
    // MM:SS.mmm
    const minutes = parseFloat(parts[0]) || 0;
    const seconds = parseFloat(parts[1]) || 0;
    return minutes * 60 + seconds;
  }

  return parseFloat(timestamp) || 0;
}

/**
 * Format seconds to display timestamp (MM:SS)
 */
export function formatTimestamp(seconds) {
  if (!seconds || seconds < 0) return '0:00';

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Parse SRT format captions
 * @param {string} srtContent - Raw SRT file content
 * @returns {CaptionEntry[]}
 */
export function parseSRT(srtContent) {
  if (!srtContent || typeof srtContent !== 'string') return [];

  const entries = [];
  // Split by double newline (caption blocks)
  const blocks = srtContent.trim().split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split('\n');

    // Need at least 3 lines: index, timestamp, text
    if (lines.length < 3) continue;

    // Skip index line (line 0)
    // Parse timestamp line (line 1)
    const timestampLine = lines[1];
    const timestampMatch = timestampLine.match(
      /(\d{2}:\d{2}:\d{2}[,\.]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[,\.]\d{3})/
    );

    if (!timestampMatch) continue;

    const start = parseTimestamp(timestampMatch[1]);
    const end = parseTimestamp(timestampMatch[2]);

    // Join remaining lines as text
    const text = lines.slice(2).join(' ').trim();

    if (text) {
      entries.push({ start, end, text });
    }
  }

  return entries;
}

/**
 * Parse VTT format captions
 * @param {string} vttContent - Raw VTT file content
 * @returns {CaptionEntry[]}
 */
export function parseVTT(vttContent) {
  if (!vttContent || typeof vttContent !== 'string') return [];

  const entries = [];

  // Remove WEBVTT header and metadata
  const content = vttContent.replace(/^WEBVTT[^\n]*\n/i, '').trim();

  // Split by double newline
  const blocks = content.split(/\n\s*\n/);

  for (const block of blocks) {
    const lines = block.trim().split('\n');

    // Find timestamp line
    let timestampLineIndex = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('-->')) {
        timestampLineIndex = i;
        break;
      }
    }

    const timestampLine = lines[timestampLineIndex];
    if (!timestampLine) continue;

    const timestampMatch = timestampLine.match(
      /(\d{2}:\d{2}[:\.]?\d{0,2}[,\.]?\d{0,3})\s*-->\s*(\d{2}:\d{2}[:\.]?\d{0,2}[,\.]?\d{0,3})/
    );

    if (!timestampMatch) continue;

    const start = parseTimestamp(timestampMatch[1]);
    const end = parseTimestamp(timestampMatch[2]);

    // Join lines after timestamp as text
    const text = lines
      .slice(timestampLineIndex + 1)
      .join(' ')
      .replace(/<[^>]+>/g, '') // Remove HTML tags
      .trim();

    if (text) {
      entries.push({ start, end, text });
    }
  }

  return entries;
}

/**
 * Auto-detect format and parse captions
 * @param {string} content - Raw caption file content
 * @returns {CaptionEntry[]}
 */
export function parseCaptions(content) {
  if (!content) return [];

  // Detect format
  if (content.trim().startsWith('WEBVTT')) {
    return parseVTT(content);
  }

  // Default to SRT
  return parseSRT(content);
}

/**
 * Find the caption entry active at a given time
 * @param {CaptionEntry[]} captions
 * @param {number} currentTime - Time in seconds
 * @returns {CaptionEntry|null}
 */
export function findCaptionAtTime(captions, currentTime) {
  if (!captions || !captions.length) return null;

  return captions.find(
    caption => currentTime >= caption.start && currentTime <= caption.end
  ) || null;
}

/**
 * Find the index of caption at given time
 * @param {CaptionEntry[]} captions
 * @param {number} currentTime
 * @returns {number} Index or -1 if not found
 */
export function findCaptionIndexAtTime(captions, currentTime) {
  if (!captions || !captions.length) return -1;

  return captions.findIndex(
    caption => currentTime >= caption.start && currentTime <= caption.end
  );
}

/**
 * Create captions from Tatoeba sentences (for practice mode)
 * Each sentence becomes a caption with 5-second duration
 * @param {Array} sentences - Array of Tatoeba sentence objects
 * @param {number} duration - Duration per sentence in seconds
 * @returns {CaptionEntry[]}
 */
export function createCaptionsFromSentences(sentences, duration = 5) {
  if (!sentences || !sentences.length) return [];

  return sentences.map((sentence, index) => ({
    start: index * duration,
    end: (index + 1) * duration,
    text: sentence.romanian,
    translation: sentence.english,
    sentenceId: sentence.id,
    hasAudio: sentence.hasAudio,
  }));
}

/**
 * Split caption text into clickable words
 * Returns array of word objects with positions
 * @param {string} text
 * @returns {Array<{word: string, isWord: boolean}>}
 */
export function splitIntoWords(text) {
  if (!text) return [];

  // Split while preserving whitespace and punctuation
  const parts = text.split(/(\s+|[.,!?;:'"()-])/);

  return parts.map(part => ({
    text: part,
    isWord: /\w/.test(part) && !/^\s+$/.test(part),
  }));
}

/**
 * Fetch YouTube auto-generated captions (if available)
 * Note: This requires the video to have captions enabled
 * and may not work for all videos due to YouTube restrictions
 * @param {string} videoId - YouTube video ID
 * @returns {Promise<CaptionEntry[]|null>}
 */
export async function fetchYouTubeCaptions(videoId) {
  // YouTube captions require OAuth or scraping which isn't reliable
  // For now, return null - captions must be provided manually
  console.log('YouTube caption fetching not implemented - provide captions manually');
  return null;
}

/**
 * Load captions from a URL
 * @param {string} url - URL to SRT or VTT file
 * @returns {Promise<CaptionEntry[]>}
 */
export async function loadCaptionsFromUrl(url) {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch captions: ${response.status}`);
    }
    const content = await response.text();
    return parseCaptions(content);
  } catch (err) {
    console.error('Error loading captions:', err);
    return [];
  }
}

export default {
  parseTimestamp,
  formatTimestamp,
  parseSRT,
  parseVTT,
  parseCaptions,
  findCaptionAtTime,
  findCaptionIndexAtTime,
  createCaptionsFromSentences,
  splitIntoWords,
  fetchYouTubeCaptions,
  loadCaptionsFromUrl,
};

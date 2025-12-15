/**
 * Content URL Verification Script
 *
 * Checks all YouTube and Spotify URLs in content.js for availability.
 * Uses oEmbed APIs to verify without requiring API keys.
 *
 * Usage:
 *   node scripts/verify-content-urls.js
 *
 * Output: Console report of broken/working URLs
 */

import { CONTENT_DATABASE } from '../src/data/content.js';

const YOUTUBE_OEMBED = 'https://www.youtube.com/oembed';
const SPOTIFY_OEMBED = 'https://open.spotify.com/oembed';

// Extract video/playlist ID from YouTube embed URL
function extractYouTubeId(embedUrl) {
  // Playlist: https://www.youtube.com/embed/videoseries?list=PLAYLIST_ID
  const playlistMatch = embedUrl.match(/[?&]list=([^&]+)/);
  if (playlistMatch) {
    return { type: 'playlist', id: playlistMatch[1] };
  }

  // Video: https://www.youtube.com/embed/VIDEO_ID
  const videoMatch = embedUrl.match(/\/embed\/([^?&]+)/);
  if (videoMatch && videoMatch[1] !== 'videoseries') {
    return { type: 'video', id: videoMatch[1] };
  }

  return null;
}

// Extract show/playlist ID from Spotify embed URL
function extractSpotifyId(embedUrl) {
  // Show: https://open.spotify.com/embed/show/SHOW_ID
  // Playlist: https://open.spotify.com/embed/playlist/PLAYLIST_ID
  const match = embedUrl.match(/\/embed\/(show|playlist)\/([^?]+)/);
  if (match) {
    return { type: match[1], id: match[2] };
  }
  return null;
}

// Check YouTube URL availability
async function checkYouTube(item) {
  const extracted = extractYouTubeId(item.embedUrl);
  if (!extracted) {
    return { available: false, error: 'Could not parse URL' };
  }

  const watchUrl = extracted.type === 'playlist'
    ? `https://www.youtube.com/playlist?list=${extracted.id}`
    : `https://www.youtube.com/watch?v=${extracted.id}`;

  const oembedUrl = `${YOUTUBE_OEMBED}?url=${encodeURIComponent(watchUrl)}&format=json`;

  try {
    const response = await fetch(oembedUrl);
    if (response.ok) {
      const data = await response.json();
      return { available: true, title: data.title, author: data.author_name };
    } else if (response.status === 404 || response.status === 401) {
      return { available: false, error: `HTTP ${response.status} - Content unavailable` };
    } else {
      return { available: false, error: `HTTP ${response.status}` };
    }
  } catch (err) {
    return { available: false, error: err.message };
  }
}

// Check Spotify URL availability
async function checkSpotify(item) {
  const extracted = extractSpotifyId(item.embedUrl);
  if (!extracted) {
    return { available: false, error: 'Could not parse URL' };
  }

  const contentUrl = `https://open.spotify.com/${extracted.type}/${extracted.id}`;
  const oembedUrl = `${SPOTIFY_OEMBED}?url=${encodeURIComponent(contentUrl)}`;

  try {
    const response = await fetch(oembedUrl);
    if (response.ok) {
      const data = await response.json();
      return { available: true, title: data.title };
    } else if (response.status === 404 || response.status === 400) {
      return { available: false, error: `HTTP ${response.status} - Content unavailable` };
    } else {
      return { available: false, error: `HTTP ${response.status}` };
    }
  } catch (err) {
    return { available: false, error: err.message };
  }
}

// Main verification function
async function verifyAllContent() {
  console.log('Content URL Verification');
  console.log('========================\n');

  const results = {
    youtube: { working: [], broken: [] },
    spotify: { working: [], broken: [] },
  };

  const youtubeItems = CONTENT_DATABASE.filter(c => c.platform === 'youtube');
  const spotifyItems = CONTENT_DATABASE.filter(c => c.platform === 'spotify');

  console.log(`Checking ${youtubeItems.length} YouTube items...`);

  for (const item of youtubeItems) {
    const result = await checkYouTube(item);
    const entry = {
      id: item.id,
      title: item.title,
      embedUrl: item.embedUrl,
      ...result,
    };

    if (result.available) {
      results.youtube.working.push(entry);
      process.stdout.write('.');
    } else {
      results.youtube.broken.push(entry);
      process.stdout.write('X');
    }

    // Rate limiting - be nice to YouTube
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n');
  console.log(`Checking ${spotifyItems.length} Spotify items...`);

  for (const item of spotifyItems) {
    const result = await checkSpotify(item);
    const entry = {
      id: item.id,
      title: item.title,
      embedUrl: item.embedUrl,
      ...result,
    };

    if (result.available) {
      results.spotify.working.push(entry);
      process.stdout.write('.');
    } else {
      results.spotify.broken.push(entry);
      process.stdout.write('X');
    }

    // Rate limiting
    await new Promise(r => setTimeout(r, 200));
  }

  console.log('\n');

  // Print report
  console.log('=== VERIFICATION REPORT ===\n');

  console.log('YOUTUBE');
  console.log(`  Working: ${results.youtube.working.length}`);
  console.log(`  Broken:  ${results.youtube.broken.length}`);

  if (results.youtube.broken.length > 0) {
    console.log('\n  Broken YouTube items:');
    for (const item of results.youtube.broken) {
      console.log(`    - ${item.id}: ${item.title}`);
      console.log(`      URL: ${item.embedUrl}`);
      console.log(`      Error: ${item.error}`);
    }
  }

  console.log('\nSPOTIFY');
  console.log(`  Working: ${results.spotify.working.length}`);
  console.log(`  Broken:  ${results.spotify.broken.length}`);

  if (results.spotify.broken.length > 0) {
    console.log('\n  Broken Spotify items:');
    for (const item of results.spotify.broken) {
      console.log(`    - ${item.id}: ${item.title}`);
      console.log(`      URL: ${item.embedUrl}`);
      console.log(`      Error: ${item.error}`);
    }
  }

  console.log('\n=== SUMMARY ===');
  const totalBroken = results.youtube.broken.length + results.spotify.broken.length;
  const totalWorking = results.youtube.working.length + results.spotify.working.length;
  console.log(`Total: ${totalWorking} working, ${totalBroken} broken`);

  if (totalBroken > 0) {
    console.log('\nIDs to remove from content.js:');
    const brokenIds = [
      ...results.youtube.broken.map(i => i.id),
      ...results.spotify.broken.map(i => i.id),
    ];
    console.log(brokenIds.map(id => `  '${id}'`).join(',\n'));
  }

  return results;
}

// Run
verifyAllContent().catch(console.error);

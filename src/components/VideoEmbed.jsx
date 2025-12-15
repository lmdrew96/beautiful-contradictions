import React, { useState, useEffect } from 'react';
import { ExternalLink, AlertCircle, Loader2 } from 'lucide-react';

/**
 * VideoEmbed - Wrapper for iframe embeds with loading state and error fallback
 *
 * Since iframes don't fire onError for cross-origin content failures,
 * we use a timeout-based approach to show a fallback option.
 */
export default function VideoEmbed({
  embedUrl,
  title,
  platform = 'youtube',
  className = ''
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [showFallback, setShowFallback] = useState(false);

  // Convert embed URL to watchable URL for fallback
  const getWatchUrl = (url) => {
    if (!url) return null;

    // YouTube embed -> watch URL
    if (url.includes('youtube.com/embed/')) {
      const videoId = url.split('youtube.com/embed/')[1]?.split('?')[0];
      if (videoId === 'videoseries') {
        // Playlist URL
        const listId = url.split('list=')[1]?.split('&')[0];
        return listId ? `https://www.youtube.com/playlist?list=${listId}` : url;
      }
      return videoId ? `https://www.youtube.com/watch?v=${videoId}` : url;
    }

    // Spotify embed -> open URL
    if (url.includes('open.spotify.com/embed/')) {
      return url.replace('/embed/', '/');
    }

    return url;
  };

  const watchUrl = getWatchUrl(embedUrl);

  useEffect(() => {
    setIsLoading(true);
    setShowFallback(false);

    // Show fallback option after 5 seconds and dismiss loading overlay
    const fallbackTimer = setTimeout(() => {
      setShowFallback(true);
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [embedUrl]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const isYouTube = platform === 'youtube';
  const isSpotify = platform === 'spotify';

  return (
    <div className={`relative ${className}`}>
      {/* Loading overlay */}
      {isLoading && (
        <div className="absolute inset-0 bg-bg-primary flex items-center justify-center z-10">
          <div className="text-center">
            <Loader2 size={32} className="text-text-muted animate-spin mx-auto mb-2" />
            <p className="text-text-muted text-sm">Loading...</p>
          </div>
        </div>
      )}

      {/* Iframe */}
      {isYouTube ? (
        <div className="aspect-video">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            title={title}
            loading="lazy"
            onLoad={handleLoad}
          />
        </div>
      ) : isSpotify ? (
        <div className="h-[352px]">
          <iframe
            src={embedUrl}
            className="w-full h-full"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            allowFullScreen
            title={title}
            loading="lazy"
            onLoad={handleLoad}
          />
        </div>
      ) : (
        <div className="aspect-video flex items-center justify-center bg-bg-secondary">
          <a
            href={embedUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-bg-tertiary rounded-lg text-text-primary hover:bg-bg-secondary transition-colors"
          >
            <ExternalLink size={18} />
            Open in new tab
          </a>
        </div>
      )}

      {/* Fallback message - shows after timeout */}
      {showFallback && watchUrl && (
        <div className="absolute bottom-0 left-0 right-0 bg-bg-primary/95 p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-text-muted text-sm">
              <AlertCircle size={16} />
              <span>Having trouble?</span>
            </div>
            <a
              href={watchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary hover:bg-bg-secondary rounded-lg text-text-primary text-sm transition-colors"
            >
              <ExternalLink size={14} />
              Open externally
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

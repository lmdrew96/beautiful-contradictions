import { useState, useCallback } from 'react';
import { Search, Clock, Eye, Plus, Check, ExternalLink, Loader2, AlertCircle, X, Sparkles } from 'lucide-react';
import {
  isYouTubeConfigured,
  searchRomanianVideos,
  estimateDifficulty,
  getSuggestedQueries,
  formatViewCount,
} from '../utils/youtube';

function VideoSearch({ onAddVideo, addedVideoIds = new Set() }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [durationFilter, setDurationFilter] = useState(null);

  const isConfigured = isYouTubeConfigured();

  const handleSearch = useCallback(async (searchQuery, pageToken = null) => {
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const response = await searchRomanianVideos(searchQuery, {
        maxResults: 12,
        pageToken,
        videoDuration: durationFilter,
      });

      if (pageToken) {
        // Append to existing results
        setResults(prev => ({
          ...response,
          videos: [...(prev?.videos || []), ...response.videos],
        }));
      } else {
        setResults(response);
      }
      setNextPageToken(response.nextPageToken);
    } catch (err) {
      setError(err.message || 'Search failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [durationFilter]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestedQuery) => {
    setQuery(suggestedQuery);
    handleSearch(suggestedQuery);
  };

  const handleLoadMore = () => {
    if (nextPageToken && query) {
      handleSearch(query, nextPageToken);
    }
  };

  const handleAddVideo = (video) => {
    const contentItem = {
      id: video.id,
      contentType: 'video',
      title: video.title,
      description: video.description,
      embedUrl: video.embedUrl,
      platform: 'youtube',
      type: 'video',
      difficulty: estimateDifficulty(video),
      topics: ['user-added'],
      sessionTypes: ['fog_session', 'chaos_window'],
      instructionLang: 'ro',
      source: video.channelTitle,
      thumbnailUrl: video.thumbnails.medium || video.thumbnails.default,
      duration: video.duration,
      addedAt: new Date().toISOString(),
    };
    onAddVideo(contentItem);
  };

  // Not configured - show setup instructions
  if (!isConfigured) {
    return (
      <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-amber-500/20 rounded-xl">
            <AlertCircle className="w-6 h-6 text-amber-500" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">
              YouTube Search Not Configured
            </h3>
            <p className="text-text-secondary text-sm mb-4">
              To enable video search, add your YouTube API key to the environment:
            </p>
            <ol className="text-sm text-text-muted space-y-2 list-decimal list-inside">
              <li>Go to Google Cloud Console</li>
              <li>Enable YouTube Data API v3</li>
              <li>Create an API key</li>
              <li>Add VITE_YOUTUBE_API_KEY to .env.local</li>
              <li>Restart the development server</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search Form */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for Romanian videos..."
            className="w-full pl-10 pr-4 py-3 bg-bg-tertiary border border-border rounded-xl text-text-primary placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-fog-accent"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !query.trim()}
          className="px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Search'}
        </button>
      </form>

      {/* Duration Filter */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-sm text-text-muted">Duration:</span>
        {[
          { value: null, label: 'Any' },
          { value: 'short', label: 'Under 4 min' },
          { value: 'medium', label: '4-20 min' },
          { value: 'long', label: 'Over 20 min' },
        ].map(({ value, label }) => (
          <button
            key={label}
            onClick={() => setDurationFilter(value)}
            className={`px-3 py-1 rounded-lg text-sm transition-colors ${
              durationFilter === value
                ? 'bg-fog-accent text-white'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Suggested Searches */}
      {!results && !loading && (
        <div className="bg-bg-secondary rounded-2xl p-4 border border-border">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-fog-accent" />
            <span className="text-sm font-medium text-text-primary">Suggested Searches</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {getSuggestedQueries().map(({ query: q, label }) => (
              <button
                key={q}
                onClick={() => handleSuggestionClick(q)}
                className="px-3 py-1.5 bg-bg-tertiary hover:bg-fog-accent/20 text-text-secondary hover:text-fog-accent rounded-lg text-sm transition-colors"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="bg-red-900/20 border border-red-800/50 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
          <p className="text-red-300 text-sm">{error}</p>
          <button
            onClick={() => setError(null)}
            className="ml-auto text-red-400 hover:text-red-300"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Results Grid */}
      {results && results.videos.length > 0 && (
        <div className="space-y-4">
          <p className="text-sm text-text-muted">
            Found {results.totalResults.toLocaleString()} results
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.videos.map((video) => (
              <VideoCard
                key={video.id}
                video={video}
                isAdded={addedVideoIds.has(video.id)}
                onAdd={() => handleAddVideo(video)}
              />
            ))}
          </div>

          {/* Load More */}
          {nextPageToken && (
            <div className="text-center">
              <button
                onClick={handleLoadMore}
                disabled={loading}
                className="px-6 py-2 bg-bg-secondary hover:bg-bg-tertiary border border-border rounded-xl text-text-primary transition-colors disabled:opacity-50"
              >
                {loading ? 'Loading...' : 'Load More'}
              </button>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {results && results.videos.length === 0 && (
        <div className="text-center py-8">
          <p className="text-text-muted">No videos found for "{query}"</p>
          <p className="text-text-muted text-sm mt-1">Try a different search term</p>
        </div>
      )}
    </div>
  );
}

function VideoCard({ video, isAdded, onAdd }) {
  const difficulty = estimateDifficulty(video);

  return (
    <div className="bg-bg-secondary rounded-xl border border-border overflow-hidden hover:border-fog-accent/50 transition-colors">
      {/* Thumbnail */}
      <div className="relative aspect-video bg-bg-tertiary">
        {video.thumbnails.medium ? (
          <img
            src={video.thumbnails.medium}
            alt={video.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-text-muted">No thumbnail</span>
          </div>
        )}

        {/* Duration Badge */}
        {video.duration && (
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 rounded text-xs text-white font-medium">
            {video.duration}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 space-y-2">
        {/* Title */}
        <h4 className="font-medium text-text-primary text-sm line-clamp-2" title={video.title}>
          {video.title}
        </h4>

        {/* Channel */}
        <p className="text-xs text-text-muted truncate">{video.channelTitle}</p>

        {/* Stats Row */}
        <div className="flex items-center gap-3 text-xs text-text-muted">
          {video.viewCount !== undefined && (
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViewCount(video.viewCount)}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {video.duration || 'N/A'}
          </span>
        </div>

        {/* Difficulty */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-muted">Difficulty:</span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.ceil(difficulty / 2)
                    ? 'bg-fog-accent'
                    : 'bg-bg-tertiary'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          {isAdded ? (
            <button
              disabled
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-green-900/30 text-green-400 rounded-lg text-sm cursor-default"
            >
              <Check className="w-4 h-4" />
              Added
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-fog-accent/20 hover:bg-fog-accent/30 text-fog-accent rounded-lg text-sm transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add to Library
            </button>
          )}

          <a
            href={video.watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 bg-bg-tertiary hover:bg-bg-secondary rounded-lg text-text-muted hover:text-text-primary transition-colors"
            title="Open on YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default VideoSearch;

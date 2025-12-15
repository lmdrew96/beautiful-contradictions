import React from 'react';
import { ExternalLink, Music, Video, Radio } from 'lucide-react';
import VideoEmbed from './VideoEmbed';

const platformIcons = {
  youtube: Video,
  spotify: Music,
  soundcloud: Radio,
};

const platformColors = {
  youtube: 'from-red-600 to-red-700',
  spotify: 'from-green-600 to-green-700',
  soundcloud: 'from-orange-500 to-orange-600',
};

export default function ContentEmbed({ content, compact = false }) {
  if (!content) {
    return (
      <div className="w-full rounded-xl bg-bg-secondary border border-border p-8 text-center">
        <p className="text-text-muted">No content loaded</p>
      </div>
    );
  }

  const Icon = platformIcons[content.platform] || Video;
  const gradientColor = platformColors[content.platform] || 'from-gray-600 to-gray-700';

  return (
    <div className="w-full rounded-xl overflow-hidden bg-bg-secondary border border-border shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-text-primary text-lg leading-tight truncate">
              {content.title}
            </h3>
            {!compact && (
              <p className="text-sm text-text-muted mt-1 line-clamp-2">
                {content.description}
              </p>
            )}
          </div>
          <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${gradientColor}`}>
            <Icon size={18} className="text-white" />
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          <span className="text-xs px-2 py-1 bg-bg-tertiary rounded-full text-text-secondary">
            Difficulty: {content.difficulty}/10
          </span>
          <span className="text-xs px-2 py-1 bg-bg-tertiary rounded-full text-text-secondary capitalize">
            {content.platform}
          </span>
          {content.instructionLang === 'ro' && (
            <span className="text-xs px-2 py-1 bg-accent/20 rounded-full text-accent">
              Romanian
            </span>
          )}
          {content.topics?.slice(0, 2).map((topic) => (
            <span
              key={topic}
              className="text-xs px-2 py-1 bg-bg-tertiary rounded-full text-text-muted capitalize"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Embed */}
      <div className="relative bg-black">
        <VideoEmbed
          embedUrl={content.embedUrl}
          title={content.title}
          platform={content.platform}
        />
      </div>

      {/* Source attribution */}
      {content.source && (
        <div className="px-4 py-2 bg-bg-tertiary border-t border-border">
          <p className="text-xs text-text-muted">
            Source: {content.source}
          </p>
        </div>
      )}
    </div>
  );
}

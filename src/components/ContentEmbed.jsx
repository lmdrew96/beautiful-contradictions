import React from 'react';
import { ExternalLink, Music, Video, Radio } from 'lucide-react';

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
      <div className="w-full rounded-xl bg-slate-800/50 border border-slate-700 p-8 text-center">
        <p className="text-slate-400">No content loaded</p>
      </div>
    );
  }

  const Icon = platformIcons[content.platform] || Video;
  const gradientColor = platformColors[content.platform] || 'from-slate-600 to-slate-700';

  return (
    <div className="w-full rounded-xl overflow-hidden bg-slate-800 border border-slate-700 shadow-xl">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-white text-lg leading-tight truncate">
              {content.title}
            </h3>
            {!compact && (
              <p className="text-sm text-slate-400 mt-1 line-clamp-2">
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
          <span className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300">
            Difficulty: {content.difficulty}/10
          </span>
          <span className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-300 capitalize">
            {content.platform}
          </span>
          {content.instructionLang === 'ro' && (
            <span className="text-xs px-2 py-1 bg-purple-900/50 rounded-full text-purple-300">
              🇷🇴 Romanian
            </span>
          )}
          {content.topics?.slice(0, 2).map((topic) => (
            <span 
              key={topic}
              className="text-xs px-2 py-1 bg-slate-700/50 rounded-full text-slate-400 capitalize"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Embed */}
      <div className="relative bg-black">
        {content.platform === 'youtube' ? (
          <div className="aspect-video">
            <iframe
              src={content.embedUrl}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              title={content.title}
              loading="lazy"
            />
          </div>
        ) : content.platform === 'spotify' ? (
          <div className="h-[352px]">
            <iframe
              src={content.embedUrl}
              className="w-full h-full"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
              title={content.title}
              loading="lazy"
            />
          </div>
        ) : (
          <div className="aspect-video flex items-center justify-center bg-slate-800">
            <a
              href={content.embedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-slate-700 rounded-lg text-white hover:bg-slate-600 transition-colors"
            >
              <ExternalLink size={18} />
              Open in new tab
            </a>
          </div>
        )}
      </div>

      {/* Source attribution */}
      {content.source && (
        <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700/50">
          <p className="text-xs text-slate-500">
            Source: {content.source}
          </p>
        </div>
      )}
    </div>
  );
}

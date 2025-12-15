/**
 * StoryReader Component
 *
 * Displays Romanian literary content with reading aids.
 * Features:
 * - Paragraph-by-paragraph display
 * - Word selection for lookup
 * - Difficulty indicator
 * - Genre and author info
 */

import React, { useState, useCallback } from 'react';
import { Book, User, Tag, ChevronLeft, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { getDifficultyLabel, getDifficultyColor } from '../utils/difficulty';

function StoryReader({
  story,
  onWordSelect,
  onNext,
  onPrevious,
  hasNext = false,
  hasPrevious = false,
}) {
  const [showTranslation, setShowTranslation] = useState(false);
  const [selectedWord, setSelectedWord] = useState(null);

  // Split excerpt into paragraphs
  const paragraphs = story.excerpt.split('\n\n').filter(p => p.trim());

  // Handle word click for vocabulary lookup
  const handleWordClick = useCallback((word, event) => {
    event.stopPropagation();
    // Clean the word (remove punctuation)
    const cleanWord = word.replace(/[.,!?;:"""''()]/g, '').toLowerCase();
    setSelectedWord(cleanWord);
    if (onWordSelect) {
      onWordSelect(cleanWord);
    }
  }, [onWordSelect]);

  // Render text with clickable words
  const renderClickableText = (text) => {
    const words = text.split(/(\s+)/);
    return words.map((word, index) => {
      // Skip whitespace
      if (/^\s+$/.test(word)) {
        return <span key={index}>{word}</span>;
      }

      const cleanWord = word.replace(/[.,!?;:"""''()]/g, '').toLowerCase();
      const isSelected = selectedWord === cleanWord;

      return (
        <span
          key={index}
          onClick={(e) => handleWordClick(word, e)}
          className={`
            cursor-pointer transition-colors duration-150
            hover:bg-warning/30 hover:text-warning
            ${isSelected ? 'bg-warning/40 text-warning rounded px-0.5' : ''}
          `}
        >
          {word}
        </span>
      );
    });
  };

  const difficultyColor = getDifficultyColor(story.difficulty);
  const difficultyLabel = getDifficultyLabel(story.difficulty);

  return (
    <div className="bg-bg-secondary rounded-xl p-6 max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div>
            <h2 className="text-2xl font-bold text-text-primary mb-1">
              {story.title}
            </h2>
            {story.titleEn && (
              <p className="text-text-muted text-sm italic">
                {story.titleEn}
              </p>
            )}
          </div>

          {/* Difficulty badge */}
          <span
            className="px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap"
            style={{ backgroundColor: `${difficultyColor}20`, color: difficultyColor }}
          >
            {difficultyLabel}
          </span>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-4 text-sm text-text-muted">
          {story.author && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4" />
              {story.author}
            </span>
          )}
          {story.genre && (
            <span className="flex items-center gap-1.5">
              <Tag className="w-4 h-4" />
              {story.genre}
            </span>
          )}
          {story.wordCount && (
            <span className="flex items-center gap-1.5">
              <Book className="w-4 h-4" />
              {story.wordCount} words
            </span>
          )}
        </div>
      </div>

      {/* Reading area */}
      <div className="bg-bg-tertiary rounded-lg p-5 mb-4">
        <div className="prose prose-invert prose-lg max-w-none">
          {paragraphs.map((paragraph, index) => (
            <p key={index} className="text-text-secondary leading-relaxed mb-4 last:mb-0">
              {renderClickableText(paragraph)}
            </p>
          ))}
        </div>
      </div>

      {/* Selected word display */}
      {selectedWord && (
        <div className="bg-warning/10 border border-warning/30 rounded-lg px-4 py-2 mb-4">
          <span className="text-warning text-sm">
            Selected: <strong>{selectedWord}</strong>
            <span className="text-text-muted ml-2">(tap to look up in vocabulary)</span>
          </span>
        </div>
      )}

      {/* Translation toggle */}
      <button
        onClick={() => setShowTranslation(!showTranslation)}
        className="flex items-center gap-2 text-text-muted hover:text-text-primary transition-colors mb-4"
      >
        {showTranslation ? (
          <>
            <EyeOff className="w-4 h-4" />
            Hide translation hint
          </>
        ) : (
          <>
            <Eye className="w-4 h-4" />
            Show translation hint
          </>
        )}
      </button>

      {showTranslation && story.titleEn && (
        <div className="bg-bg-tertiary rounded-lg p-4 mb-4 text-text-secondary text-sm italic">
          This is an excerpt from "{story.titleEn}" by {story.author}.
          {story.era && ` (${story.era})`}
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between items-center pt-4 border-t border-border">
        <button
          onClick={onPrevious}
          disabled={!hasPrevious}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${hasPrevious
              ? 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              : 'text-text-muted cursor-not-allowed'
            }
          `}
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>

        {/* Source attribution */}
        <span className="text-xs text-text-muted">
          {story.source} ({story.license})
        </span>

        <button
          onClick={onNext}
          disabled={!hasNext}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
            ${hasNext
              ? 'text-text-secondary hover:text-text-primary hover:bg-bg-tertiary'
              : 'text-text-muted cursor-not-allowed'
            }
          `}
        >
          Next
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

export default StoryReader;

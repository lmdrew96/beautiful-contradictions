import { useState } from 'react';
import { Volume2, Eye, EyeOff, RefreshCw } from 'lucide-react';

/**
 * SentenceCard - Displays a Tatoeba sentence with translation toggle
 *
 * Features:
 * - Romanian text prominently displayed
 * - English translation revealed on click/toggle
 * - Audio play button if available
 * - Difficulty indicator
 */
function SentenceCard({
  sentence,
  showTranslation: initialShowTranslation = false,
  onNext,
  compact = false,
}) {
  const [showTranslation, setShowTranslation] = useState(initialShowTranslation);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!sentence) {
    return (
      <div className="bg-bg-secondary rounded-xl p-6 text-center text-text-muted">
        No sentence available
      </div>
    );
  }

  const { romanian, english, difficulty, wordCount, hasAudio, audioUrl } = sentence;

  const playAudio = async () => {
    if (!hasAudio || !audioUrl || isPlaying) return;

    try {
      setIsPlaying(true);
      const audio = new Audio(audioUrl);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => setIsPlaying(false);
      await audio.play();
    } catch (error) {
      console.warn('Audio playback failed:', error);
      setIsPlaying(false);
    }
  };

  const getDifficultyColor = (diff) => {
    if (diff <= 3) return 'bg-success/20 text-success';
    if (diff <= 6) return 'bg-warning/20 text-warning';
    return 'bg-error/20 text-error';
  };

  const getDifficultyLabel = (diff) => {
    if (diff <= 3) return 'Beginner';
    if (diff <= 6) return 'Intermediate';
    return 'Advanced';
  };

  if (compact) {
    return (
      <div className="bg-bg-secondary rounded-lg p-4">
        <p className="text-lg text-text-primary mb-2">{romanian}</p>
        {showTranslation && (
          <p className="text-text-muted text-sm">{english}</p>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-accent text-sm mt-2 hover:opacity-80"
        >
          {showTranslation ? 'Hide' : 'Show'} translation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-bg-secondary rounded-xl p-6 space-y-4">
      {/* Header with difficulty and word count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {getDifficultyLabel(difficulty)}
          </span>
          <span className="text-text-muted text-xs">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>

        {/* Audio button */}
        {hasAudio && (
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`p-2 rounded-lg transition-colors ${
              isPlaying
                ? 'bg-accent/30 text-accent cursor-not-allowed'
                : 'bg-bg-tertiary text-text-secondary hover:bg-bg-secondary hover:text-text-primary'
            }`}
            title="Play audio"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        )}
      </div>

      {/* Romanian sentence */}
      <div className="py-4">
        <p className="text-2xl text-text-primary font-medium leading-relaxed">
          {romanian}
        </p>
      </div>

      {/* Translation section */}
      <div className="border-t border-border pt-4">
        {showTranslation ? (
          <div className="space-y-3">
            <p className="text-lg text-text-secondary">{english}</p>
            <button
              onClick={() => setShowTranslation(false)}
              className="flex items-center gap-2 text-text-muted hover:text-text-secondary text-sm"
            >
              <EyeOff className="w-4 h-4" />
              Hide translation
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowTranslation(true)}
            className="flex items-center gap-2 text-accent hover:opacity-80"
          >
            <Eye className="w-4 h-4" />
            Show translation
          </button>
        )}
      </div>

      {/* Next button */}
      {onNext && (
        <div className="pt-2">
          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 w-full py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-500 hover:to-pink-500 transition-all"
          >
            <RefreshCw className="w-4 h-4" />
            Next Sentence
          </button>
        </div>
      )}

      {/* Attribution */}
      <p className="text-xs text-text-muted text-center pt-2">
        Source: Tatoeba.org (CC-BY 2.0)
      </p>
    </div>
  );
}

export default SentenceCard;

import { useState } from 'react';
import { Volume2, Eye, EyeOff, RefreshCw, Sparkles } from 'lucide-react';

/**
 * SentenceCard - Displays a Tatoeba sentence with translation toggle
 *
 * Features:
 * - Romanian text prominently displayed
 * - English translation revealed on click/toggle
 * - Audio play button if available
 * - Difficulty indicator
 * - ADHD-friendly animations and visual feedback
 */
function SentenceCard({
  sentence,
  showTranslation: initialShowTranslation = false,
  onNext,
  compact = false,
}) {
  const [showTranslation, setShowTranslation] = useState(initialShowTranslation);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  if (!sentence) {
    return (
      <div className="bg-bg-secondary rounded-xl p-6 text-center text-text-muted animate-pulse">
        Loading sentence...
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
    if (diff <= 3) return 'bg-success/20 text-success border-success/30';
    if (diff <= 6) return 'bg-warning/20 text-warning border-warning/30';
    return 'bg-error/20 text-error border-error/30';
  };

  const getDifficultyLabel = (diff) => {
    if (diff <= 3) return 'Beginner';
    if (diff <= 6) return 'Intermediate';
    return 'Advanced';
  };

  if (compact) {
    return (
      <div className="bg-bg-secondary rounded-xl p-4 hover:bg-bg-tertiary transition-colors duration-300">
        <p className="text-lg text-text-primary mb-2">{romanian}</p>
        <div 
          className={`overflow-hidden transition-all duration-300 ${showTranslation ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-text-muted text-sm">{english}</p>
        </div>
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-accent text-sm mt-2 hover:opacity-80 flex items-center gap-1 transition-all hover:gap-2"
        >
          {showTranslation ? <EyeOff size={14} /> : <Eye size={14} />}
          {showTranslation ? 'Hide' : 'Show'} translation
        </button>
      </div>
    );
  }

  return (
    <div 
      className={`bg-bg-secondary rounded-2xl p-6 space-y-4 border border-border transition-all duration-300 ${
        isHovered ? 'shadow-lg border-accent/30 scale-[1.01]' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Header with difficulty and word count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-300 hover:scale-105 ${getDifficultyColor(difficulty)}`}>
            {getDifficultyLabel(difficulty)}
          </span>
          <span className="text-text-muted text-xs bg-bg-tertiary px-2 py-1 rounded-full">
            {wordCount} {wordCount === 1 ? 'word' : 'words'}
          </span>
        </div>

        {/* Audio button */}
        {hasAudio && (
          <button
            onClick={playAudio}
            disabled={isPlaying}
            className={`p-2.5 rounded-xl transition-all duration-300 transform hover:scale-110 active:scale-95 ${
              isPlaying
                ? 'bg-accent/30 text-accent cursor-not-allowed shadow-lg shadow-accent/20'
                : 'bg-bg-tertiary text-text-secondary hover:bg-accent hover:text-white hover:shadow-lg hover:shadow-accent/30'
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
        <div 
          className={`overflow-hidden transition-all duration-500 ${showTranslation ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-lg text-text-secondary mb-3 animate-bounce-in">{english}</p>
        </div>
        
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
            showTranslation 
              ? 'text-text-muted bg-bg-tertiary hover:bg-bg-secondary' 
              : 'text-accent bg-accent/10 hover:bg-accent/20'
          }`}
        >
          {showTranslation ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          {showTranslation ? 'Hide translation' : 'Show translation'}
        </button>
      </div>

      {/* Next button */}
      {onNext && (
        <div className="pt-2">
          <button
            onClick={onNext}
            className="flex items-center justify-center gap-2 w-full py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold 
              transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-0.5 active:scale-[0.98]
              hover:shadow-lg hover:shadow-purple-500/30 group"
          >
            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            Next Sentence
            <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
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

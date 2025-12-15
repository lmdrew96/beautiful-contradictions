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
      <div className="bg-slate-800/50 rounded-xl p-6 text-center text-slate-400">
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
    if (diff <= 3) return 'bg-green-500/20 text-green-400';
    if (diff <= 6) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-red-500/20 text-red-400';
  };

  const getDifficultyLabel = (diff) => {
    if (diff <= 3) return 'Beginner';
    if (diff <= 6) return 'Intermediate';
    return 'Advanced';
  };

  if (compact) {
    return (
      <div className="bg-slate-800/50 rounded-lg p-4">
        <p className="text-lg text-white mb-2">{romanian}</p>
        {showTranslation && (
          <p className="text-slate-400 text-sm">{english}</p>
        )}
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className="text-purple-400 text-sm mt-2 hover:text-purple-300"
        >
          {showTranslation ? 'Hide' : 'Show'} translation
        </button>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 rounded-xl p-6 space-y-4">
      {/* Header with difficulty and word count */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 rounded text-xs font-medium ${getDifficultyColor(difficulty)}`}>
            {getDifficultyLabel(difficulty)}
          </span>
          <span className="text-slate-500 text-xs">
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
                ? 'bg-purple-500/30 text-purple-300 cursor-not-allowed'
                : 'bg-slate-700 text-slate-300 hover:bg-slate-600 hover:text-white'
            }`}
            title="Play audio"
          >
            <Volume2 className={`w-5 h-5 ${isPlaying ? 'animate-pulse' : ''}`} />
          </button>
        )}
      </div>

      {/* Romanian sentence */}
      <div className="py-4">
        <p className="text-2xl text-white font-medium leading-relaxed">
          {romanian}
        </p>
      </div>

      {/* Translation section */}
      <div className="border-t border-slate-700 pt-4">
        {showTranslation ? (
          <div className="space-y-3">
            <p className="text-lg text-slate-300">{english}</p>
            <button
              onClick={() => setShowTranslation(false)}
              className="flex items-center gap-2 text-slate-400 hover:text-slate-300 text-sm"
            >
              <EyeOff className="w-4 h-4" />
              Hide translation
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowTranslation(true)}
            className="flex items-center gap-2 text-purple-400 hover:text-purple-300"
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
      <p className="text-xs text-slate-500 text-center pt-2">
        Source: Tatoeba.org (CC-BY 2.0)
      </p>
    </div>
  );
}

export default SentenceCard;

import { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, FileText, Loader2 } from 'lucide-react';
import { formatTimestamp, findCaptionIndexAtTime, splitIntoWords } from '../utils/captions';
import WordDefinition from './WordDefinition';

// Check if Web Speech API is available
const speechSynthesisAvailable = typeof window !== 'undefined' && 'speechSynthesis' in window;

/**
 * TranscriptPlayer - Interactive video player with synced transcript
 *
 * Features:
 * - YouTube video playback via iframe API
 * - Synchronized transcript highlighting
 * - Click any word for dictionary lookup
 * - Click any caption line to seek to that time
 */
function TranscriptPlayer({
  videoId,
  captions = [],
  title = '',
  onClose,
}) {
  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentCaptionIndex, setCurrentCaptionIndex] = useState(-1);
  const [selectedWord, setSelectedWord] = useState(null);
  const [showDefinition, setShowDefinition] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const playerContainerRef = useRef(null);
  const transcriptRef = useRef(null);
  const timeUpdateRef = useRef(null);

  // For video-less mode, mark as ready immediately
  const isVideoMode = Boolean(videoId);
  const effectiveReady = isVideoMode ? isReady : true;

  // Load YouTube IFrame API
  useEffect(() => {
    if (!videoId) return;

    // Check if API is already loaded
    if (window.YT && window.YT.Player) {
      initPlayer();
      return;
    }

    // Load the API
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // Set up callback
    window.onYouTubeIframeAPIReady = initPlayer;

    return () => {
      window.onYouTubeIframeAPIReady = null;
    };
  }, [videoId]);

  // Initialize player
  const initPlayer = useCallback(() => {
    if (!playerContainerRef.current || !videoId) return;

    const newPlayer = new window.YT.Player(playerContainerRef.current, {
      videoId: videoId,
      playerVars: {
        autoplay: 0,
        controls: 1,
        modestbranding: 1,
        rel: 0,
        cc_load_policy: 1, // Show captions by default
        hl: 'ro', // Romanian interface
      },
      events: {
        onReady: (event) => {
          setIsReady(true);
          setDuration(event.target.getDuration());
          setPlayer(event.target);
        },
        onStateChange: (event) => {
          setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
        },
      },
    });
  }, [videoId]);

  // Time update loop
  useEffect(() => {
    if (!player || !isReady) return;

    const updateTime = () => {
      if (player && player.getCurrentTime) {
        const time = player.getCurrentTime();
        setCurrentTime(time);

        // Update current caption
        const index = findCaptionIndexAtTime(captions, time);
        if (index !== currentCaptionIndex) {
          setCurrentCaptionIndex(index);
        }
      }
    };

    // Update every 100ms when playing
    if (isPlaying) {
      timeUpdateRef.current = setInterval(updateTime, 100);
    }

    return () => {
      if (timeUpdateRef.current) {
        clearInterval(timeUpdateRef.current);
      }
    };
  }, [player, isReady, isPlaying, captions, currentCaptionIndex]);

  // Auto-scroll transcript to current caption
  useEffect(() => {
    if (currentCaptionIndex >= 0 && transcriptRef.current) {
      const activeElement = transcriptRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentCaptionIndex]);

  // Player controls
  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const seekTo = (time) => {
    if (!player) return;
    player.seekTo(time, true);
  };

  const seekRelative = (seconds) => {
    if (!player) return;
    const newTime = Math.max(0, Math.min(duration, currentTime + seconds));
    player.seekTo(newTime, true);
  };

  // Text-to-speech for video-less mode
  const speakText = useCallback((text) => {
    if (!speechSynthesisAvailable || !text) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ro-RO';
    utterance.rate = 0.9;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeaking = useCallback(() => {
    if (speechSynthesisAvailable) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);

  // Navigate captions in video-less mode
  const navigateCaption = useCallback((direction) => {
    const newIndex = currentCaptionIndex + direction;
    if (newIndex >= 0 && newIndex < captions.length) {
      setCurrentCaptionIndex(newIndex);
      // Auto-speak the new caption
      if (speechSynthesisAvailable) {
        speakText(captions[newIndex].text);
      }
    }
  }, [currentCaptionIndex, captions, speakText]);

  // Handle caption click - seek to that time (video) or select caption (video-less)
  const handleCaptionClick = (caption, index) => {
    if (isVideoMode) {
      seekTo(caption.start);
    } else {
      setCurrentCaptionIndex(index);
      speakText(caption.text);
    }
  };

  // Handle word click - show dictionary
  const handleWordClick = (word) => {
    const cleanWord = word.replace(/^[.,!?;:'"()-]+|[.,!?;:'"()-]+$/g, '');
    if (cleanWord.length > 0) {
      setSelectedWord(cleanWord);
      setShowDefinition(true);
    }
  };

  // Render a caption line with clickable words
  const renderCaptionText = (text) => {
    const parts = splitIntoWords(text);

    return parts.map((part, i) => {
      if (part.isWord) {
        return (
          <span
            key={i}
            onClick={(e) => {
              e.stopPropagation();
              handleWordClick(part.text);
            }}
            className="cursor-pointer hover:text-fog-accent hover:underline decoration-fog-accent/50 underline-offset-2 transition-colors"
          >
            {part.text}
          </span>
        );
      }
      return <span key={i}>{part.text}</span>;
    });
  };

  return (
    <div className="flex flex-col h-full bg-bg-primary">
      {/* Video Player - only show if we have a videoId */}
      {isVideoMode ? (
        <div className="relative aspect-video bg-black rounded-t-xl overflow-hidden">
          {!isReady && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-fog-accent" />
            </div>
          )}
          <div ref={playerContainerRef} className="w-full h-full" />
        </div>
      ) : (
        /* Current sentence display for video-less mode */
        <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-t-xl p-6">
          {currentCaptionIndex >= 0 && captions[currentCaptionIndex] ? (
            <div className="text-center">
              <p className="text-2xl font-medium text-text-primary mb-3 leading-relaxed">
                {captions[currentCaptionIndex].text}
              </p>
              {captions[currentCaptionIndex].translation && (
                <p className="text-text-muted italic">
                  {captions[currentCaptionIndex].translation}
                </p>
              )}
            </div>
          ) : (
            <div className="text-center">
              <p className="text-text-muted">
                Click a sentence below or use the controls to start
              </p>
            </div>
          )}
        </div>
      )}

      {/* Controls */}
      <div className="bg-bg-secondary border-t border-border px-4 py-3">
        <div className="flex items-center gap-4">
          {isVideoMode ? (
            /* Video controls */
            <>
              <button
                onClick={togglePlay}
                disabled={!isReady}
                className="p-2 rounded-lg bg-fog-accent text-white hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              </button>
              <button
                onClick={() => seekRelative(-10)}
                disabled={!isReady}
                className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:bg-bg-secondary transition-colors disabled:opacity-50"
                title="Back 10s"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => seekRelative(10)}
                disabled={!isReady}
                className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:bg-bg-secondary transition-colors disabled:opacity-50"
                title="Forward 10s"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center">
                <span className="font-mono text-text-primary">
                  {formatTimestamp(currentTime)}
                </span>
                <span className="text-text-muted mx-2">/</span>
                <span className="font-mono text-text-muted">
                  {formatTimestamp(duration)}
                </span>
              </div>
            </>
          ) : (
            /* Sentence navigation controls */
            <>
              <button
                onClick={() => isSpeaking ? stopSpeaking() : currentCaptionIndex >= 0 && speakText(captions[currentCaptionIndex]?.text)}
                disabled={currentCaptionIndex < 0}
                className="p-2 rounded-lg bg-fog-accent text-white hover:opacity-90 transition-opacity disabled:opacity-50"
                title={isSpeaking ? "Stop" : "Listen"}
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
              </button>
              <button
                onClick={() => navigateCaption(-1)}
                disabled={currentCaptionIndex <= 0}
                className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:bg-bg-secondary transition-colors disabled:opacity-50"
                title="Previous sentence"
              >
                <SkipBack className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigateCaption(1)}
                disabled={currentCaptionIndex >= captions.length - 1}
                className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:bg-bg-secondary transition-colors disabled:opacity-50"
                title="Next sentence"
              >
                <SkipForward className="w-4 h-4" />
              </button>
              <div className="flex-1 text-center">
                <span className="font-mono text-text-primary">
                  {currentCaptionIndex >= 0 ? currentCaptionIndex + 1 : 0}
                </span>
                <span className="text-text-muted mx-2">/</span>
                <span className="font-mono text-text-muted">
                  {captions.length}
                </span>
              </div>
            </>
          )}

          {/* Caption indicator */}
          <div className="flex items-center gap-2 text-text-muted text-sm">
            <FileText className="w-4 h-4" />
            <span>{captions.length} sentences</span>
          </div>
        </div>

        {/* Progress bar */}
        {isVideoMode ? (
          <div className="mt-3">
            <div
              className="h-1.5 bg-bg-tertiary rounded-full cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                seekTo(percent * duration);
              }}
            >
              <div
                className="h-full bg-fog-accent rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="mt-3">
            <div className="h-1.5 bg-bg-tertiary rounded-full">
              <div
                className="h-full bg-fog-accent rounded-full transition-all"
                style={{ width: `${captions.length > 0 ? ((currentCaptionIndex + 1) / captions.length) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Transcript */}
      <div
        ref={transcriptRef}
        className="flex-1 overflow-y-auto p-4 space-y-2"
      >
        {captions.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-8 h-8 mx-auto text-text-muted mb-2" />
            <p className="text-text-muted">No transcript available</p>
            <p className="text-text-muted text-sm mt-1">
              Captions can be added manually via SRT/VTT files
            </p>
          </div>
        ) : (
          captions.map((caption, index) => {
            const isActive = index === currentCaptionIndex;
            return (
              <div
                key={index}
                data-active={isActive}
                onClick={() => handleCaptionClick(caption, index)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  isActive
                    ? 'bg-fog-accent/20 border border-fog-accent/50'
                    : 'bg-bg-secondary hover:bg-bg-tertiary border border-transparent'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Timestamp or sentence number */}
                  <span className={`text-xs font-mono flex-shrink-0 mt-1 min-w-[2.5rem] ${
                    isActive ? 'text-fog-accent' : 'text-text-muted'
                  }`}>
                    {isVideoMode ? formatTimestamp(caption.start) : `#${index + 1}`}
                  </span>

                  {/* Text */}
                  <div className="flex-1">
                    <p className={`leading-relaxed ${
                      isActive ? 'text-text-primary font-medium' : 'text-text-secondary'
                    }`}>
                      {renderCaptionText(caption.text)}
                    </p>

                    {/* Translation (if available) */}
                    {caption.translation && (
                      <p className="text-text-muted text-sm mt-1 italic">
                        {caption.translation}
                      </p>
                    )}
                  </div>

                  {/* Audio indicator */}
                  {caption.hasAudio && (
                    <Volume2 className="w-4 h-4 text-fog-accent flex-shrink-0" />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Dictionary Modal */}
      <WordDefinition
        word={selectedWord}
        isOpen={showDefinition}
        onClose={() => {
          setShowDefinition(false);
          setSelectedWord(null);
        }}
      />
    </div>
  );
}

export default TranscriptPlayer;

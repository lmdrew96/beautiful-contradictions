import { useState, useEffect } from 'react';
import { X, Volume2, BookOpen, Loader2, MessageSquare } from 'lucide-react';
import { lookupWord, formatPartOfSpeech, formatGender } from '../utils/dictionary';
import { searchSentencesByWord } from '../data/tatoeba';

function WordDefinition({ word, isOpen, onClose }) {
  const [entry, setEntry] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sentences, setSentences] = useState([]);
  const [loadingSentences, setLoadingSentences] = useState(false);

  useEffect(() => {
    if (!isOpen || !word) {
      setEntry(null);
      setError(null);
      setSentences([]);
      return;
    }

    async function loadDefinition() {
      setLoading(true);
      setError(null);

      try {
        const result = await lookupWord(word);
        if (result) {
          setEntry(result);
        } else {
          setError(`No definition found for "${word}"`);
        }
      } catch (err) {
        setError('Failed to load definition');
        console.error('Dictionary lookup error:', err);
      } finally {
        setLoading(false);
      }
    }

    async function loadSentences() {
      setLoadingSentences(true);
      try {
        const results = await searchSentencesByWord(word, 5);
        setSentences(results);
      } catch (err) {
        console.error('Sentence search error:', err);
        setSentences([]);
      } finally {
        setLoadingSentences(false);
      }
    }

    loadDefinition();
    loadSentences();
  }, [word, isOpen]);

  // Speak the word using Web Speech API
  const speakWord = (text) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ro-RO';
      utterance.rate = 0.9;
      window.speechSynthesis.speak(utterance);
    }
  };

  // Highlight the matched word in a sentence
  const highlightWord = (sentence, matchedWord) => {
    if (!matchedWord) return sentence;

    // Create a regex to find the word (case-insensitive)
    const escapedWord = matchedWord.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp(`(${escapedWord})`, 'gi');

    const parts = sentence.split(regex);

    return parts.map((part, i) => {
      if (regex.test(part)) {
        return (
          <span key={i} className="text-fog-accent font-semibold">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-bg-primary border border-border rounded-xl p-6 w-full max-w-lg mx-4 shadow-xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-3">
            <BookOpen className="w-5 h-5 text-garden-accent" />
            <h2 className="text-xl font-semibold text-text-primary">Dictionary</h2>
          </div>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-garden-accent" />
            <span className="ml-2 text-text-muted">Loading...</span>
          </div>
        )}

        {error && !loading && (
          <div className="py-8 text-center">
            <p className="text-text-muted">{error}</p>
          </div>
        )}

        {entry && !loading && (
          <div className="space-y-4">
            {/* Word and pronunciation */}
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-bold text-text-primary">{entry.word}</h3>
              <button
                onClick={() => speakWord(entry.word)}
                className="p-2 rounded-lg bg-bg-secondary hover:bg-garden-accent/20 text-garden-accent transition-colors"
                title="Listen"
              >
                <Volume2 className="w-5 h-5" />
              </button>
            </div>

            {/* Part of speech and pronunciation */}
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="px-2 py-1 rounded bg-garden-accent/20 text-garden-accent font-medium">
                {formatPartOfSpeech(entry.pos)}
              </span>
              {entry.gender && (
                <span className="px-2 py-1 rounded bg-bg-secondary text-text-muted">
                  {formatGender(entry.gender)}
                </span>
              )}
              {entry.pronunciation && (
                <span className="text-text-muted italic">
                  {entry.pronunciation}
                </span>
              )}
            </div>

            {/* Definitions */}
            <div className="mt-4">
              <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-2">
                Definitions
              </h4>
              <ol className="list-decimal list-inside space-y-2">
                {entry.definitions.map((def, i) => (
                  <li key={i} className="text-text-primary">
                    {def}
                  </li>
                ))}
              </ol>
            </div>

            {/* Examples */}
            {entry.examples && entry.examples.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-2">
                  Examples
                </h4>
                <div className="space-y-3">
                  {entry.examples.map((ex, i) => (
                    <div key={i} className="bg-bg-secondary rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => speakWord(ex.ro)}
                          className="p-1 rounded hover:bg-garden-accent/20 text-garden-accent transition-colors flex-shrink-0 mt-0.5"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div>
                          <p className="text-text-primary font-medium">{ex.ro}</p>
                          {ex.en && (
                            <p className="text-text-muted text-sm mt-1">{ex.en}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Word forms */}
            {entry.forms && Object.keys(entry.forms).length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide mb-2">
                  Forms
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(entry.forms)
                    .filter(([key]) => !key.includes('table') && !key.includes('template'))
                    .slice(0, 8)
                    .map(([key, value]) => (
                      <span
                        key={key}
                        className="px-2 py-1 rounded bg-bg-secondary text-text-secondary text-sm"
                        title={key.replace(/-/g, ' ')}
                      >
                        {value}
                      </span>
                    ))}
                </div>
              </div>
            )}

            {/* Tatoeba Sentences */}
            {loadingSentences && (
              <div className="mt-4 flex items-center gap-2 text-text-muted text-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Finding example sentences...</span>
              </div>
            )}

            {!loadingSentences && sentences.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-3">
                  <MessageSquare className="w-4 h-4 text-fog-accent" />
                  <h4 className="text-sm font-medium text-text-muted uppercase tracking-wide">
                    Sentences with this word
                  </h4>
                </div>
                <div className="space-y-3">
                  {sentences.map((sentence, i) => (
                    <div key={sentence.id || i} className="bg-bg-secondary rounded-lg p-3">
                      <div className="flex items-start gap-2">
                        <button
                          onClick={() => speakWord(sentence.romanian)}
                          className="p-1 rounded hover:bg-fog-accent/20 text-fog-accent transition-colors flex-shrink-0 mt-0.5"
                          title="Listen"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                        <div>
                          <p className="text-text-primary">
                            {highlightWord(sentence.romanian, sentence.matchedWord)}
                          </p>
                          <p className="text-text-muted text-sm mt-1">{sentence.english}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-text-muted">
                              Difficulty: {sentence.difficulty}/10
                            </span>
                            {sentence.hasAudio && (
                              <span className="text-xs text-fog-accent">has audio</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-text-muted mt-2 text-center">
                  Sentences from Tatoeba.org (CC-BY 2.0 FR)
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default WordDefinition;

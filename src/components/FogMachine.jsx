import React, { useState, useEffect, useCallback } from 'react';
import { CloudFog, ArrowRight, LogOut, Shuffle } from 'lucide-react';
import ContentEmbed from './ContentEmbed';
import { formatTime } from '../hooks/useStorage';
import { getRandomContent, getContentByDifficulty } from '../data/content';

export default function FogMachineView({ updateStats }) {
  const [sessionActive, setSessionActive] = useState(false);
  const [fogLevel, setFogLevel] = useState(6);
  const [currentContent, setCurrentContent] = useState(null);
  const [timeInFog, setTimeInFog] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  // Timer effect
  useEffect(() => {
    if (!isRunning) return;
    const interval = setInterval(() => {
      setTimeInFog((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isRunning]);

  const getFogContent = useCallback(() => {
    return getRandomContent((c) => 
      c.sessionTypes.includes('fog_session') && 
      c.difficulty >= fogLevel - 1 &&
      c.instructionLang === 'ro' // Prefer Romanian-only content for fog
    ) || getRandomContent((c) => c.sessionTypes.includes('fog_session'));
  }, [fogLevel]);

  const startSession = () => {
    const content = getFogContent();
    setCurrentContent(content);
    setSessionActive(true);
    setIsRunning(true);
    setTimeInFog(0);
  };

  const shuffleContent = () => {
    setCurrentContent(getFogContent());
  };

  const endSession = () => {
    setIsRunning(false);
    updateStats((prev) => ({
      ...prev,
      fogMinutes: prev.fogMinutes + Math.floor(timeInFog / 60),
    }));
    setSessionActive(false);
    setCurrentContent(null);
    setTimeInFog(0);
  };

  const fogLevelDescriptions = {
    4: { label: 'Light Mist', desc: 'Mostly understandable, some new words' },
    5: { label: 'Thin Fog', desc: 'Catch the gist, miss some details' },
    6: { label: 'Moderate Fog', desc: 'Understand 50-60%, perfect for growth' },
    7: { label: 'Dense Fog', desc: 'Catch fragments, lots of unknowns' },
    8: { label: 'Heavy Fog', desc: 'Glimpses of meaning in the chaos' },
    9: { label: 'Near Zero', desc: 'Almost nothing clear, pure immersion' },
    10: { label: 'Total Whiteout', desc: 'Just sounds and patterns' },
  };

  // ============================================
  // SETUP STATE
  // ============================================
  if (!sessionActive) {
    return (
      <div className="min-h-screen pb-24 md:pt-20 px-6">
        <div className="max-w-lg mx-auto py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex p-4 bg-teal-500/20 rounded-2xl mb-4">
              <CloudFog size={40} className="text-teal-400" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Fog Machine</h1>
            <p className="text-slate-400">Embrace productive confusion</p>
          </div>

          {/* Fog Level Selector */}
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 mb-6">
            <h3 className="text-lg font-semibold text-white mb-2">Fog Density</h3>
            <p className="text-slate-400 text-sm mb-4">
              How challenging should the content be?
            </p>
            
            {/* Slider */}
            <div className="relative mb-4">
              <input
                type="range"
                min="4"
                max="10"
                value={fogLevel}
                onChange={(e) => setFogLevel(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-full appearance-none cursor-pointer
                  [&::-webkit-slider-thumb]:appearance-none
                  [&::-webkit-slider-thumb]:w-6
                  [&::-webkit-slider-thumb]:h-6
                  [&::-webkit-slider-thumb]:rounded-full
                  [&::-webkit-slider-thumb]:bg-gradient-to-br
                  [&::-webkit-slider-thumb]:from-teal-400
                  [&::-webkit-slider-thumb]:to-cyan-500
                  [&::-webkit-slider-thumb]:shadow-lg
                  [&::-webkit-slider-thumb]:cursor-pointer"
              />
              {/* Gradient overlay */}
              <div 
                className="absolute top-0 left-0 h-2 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 pointer-events-none"
                style={{ width: `${((fogLevel - 4) / 6) * 100}%` }}
              />
            </div>

            {/* Level indicator */}
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs text-slate-500">Light</span>
              <div className="text-center">
                <span className="text-2xl font-bold text-teal-400">{fogLevel}</span>
                <p className="text-sm text-white font-medium">
                  {fogLevelDescriptions[fogLevel]?.label}
                </p>
              </div>
              <span className="text-xs text-slate-500">Dense</span>
            </div>

            {/* Description */}
            <div className="bg-teal-900/20 rounded-lg p-3 border border-teal-800/30">
              <p className="text-teal-300 text-sm text-center">
                {fogLevelDescriptions[fogLevel]?.desc}
              </p>
            </div>
          </div>

          {/* The Fog Method */}
          <div className="bg-gradient-to-br from-teal-900/30 to-cyan-900/30 rounded-2xl p-6 border border-teal-800/50 mb-6">
            <h3 className="text-lg font-semibold text-white mb-4">The Fog Method</h3>
            <ul className="text-slate-300 space-y-3 text-sm">
              <li className="flex gap-3">
                <span className="text-teal-400">→</span>
                <span>Content is <strong className="text-teal-400">above your level</strong> — that's the point</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-400">→</span>
                <span>Don't pause. Don't rewind. Don't look things up.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-400">→</span>
                <span>Let words wash over you like music</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-400">→</span>
                <span>Notice what <strong className="text-teal-400">emerges</strong> from the fog</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-400">→</span>
                <span>Your pattern-recognition brain works better when you stop micromanaging it</span>
              </li>
            </ul>
          </div>

          {/* Science note */}
          <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/50 mb-6">
            <p className="text-slate-400 text-xs text-center">
              💡 Research shows that comprehensible input at i+1 (slightly above your level) 
              drives acquisition better than studying at your exact level.
            </p>
          </div>

          {/* Start Button */}
          <button
            onClick={startSession}
            className="w-full py-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl text-white font-bold text-lg hover:opacity-90 transition-all shadow-lg shadow-teal-500/25 flex items-center justify-center gap-2"
          >
            Enter the Fog
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  // ============================================
  // ACTIVE SESSION
  // ============================================
  return (
    <div className="min-h-screen pb-24 md:pt-20 px-6">
      <div className="max-w-2xl mx-auto py-6">
        {/* Fog Timer Header */}
        <div className="flex justify-between items-center mb-6 bg-slate-800/50 rounded-xl p-4 border border-slate-700">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-teal-500/20 rounded-lg">
              <CloudFog size={24} className="text-teal-400" />
            </div>
            <div>
              <p className="text-white font-mono text-2xl font-bold">
                {formatTime(timeInFog)}
              </p>
              <p className="text-slate-400 text-xs">Time in the fog</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="text-right mr-4">
              <p className="text-teal-400 font-medium">Level {fogLevel}</p>
              <p className="text-xs text-slate-500">
                {fogLevelDescriptions[fogLevel]?.label}
              </p>
            </div>
            <button
              onClick={endSession}
              className="px-4 py-2 bg-slate-700 rounded-lg text-slate-300 hover:bg-slate-600 transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Emerge
            </button>
          </div>
        </div>

        {/* Content */}
        <ContentEmbed content={currentContent} />

        {/* Controls */}
        <div className="mt-6">
          <button
            onClick={shuffleContent}
            className="w-full py-3 bg-slate-700 rounded-xl text-white font-medium hover:bg-slate-600 transition-colors flex items-center justify-center gap-2"
          >
            <Shuffle size={18} />
            Different Content
          </button>
        </div>

        {/* Fog Reminders */}
        <div className="mt-6 space-y-3">
          <div className="p-4 bg-teal-900/20 rounded-xl border border-teal-800/30">
            <p className="text-teal-300 text-sm text-center italic">
              🔮 Don't pause. Don't translate. Just listen. Let it wash over you.
            </p>
          </div>
          
          <div className="p-3 bg-slate-800/30 rounded-lg">
            <p className="text-slate-500 text-xs text-center">
              Confusion is understanding in progress. Stay in the fog.
            </p>
          </div>
        </div>

        {/* Milestones */}
        {timeInFog > 0 && timeInFog % 300 === 0 && (
          <div className="mt-4 p-4 bg-gradient-to-r from-teal-900/30 to-cyan-900/30 rounded-xl border border-teal-700/50 animate-pulse">
            <p className="text-teal-300 text-center font-medium">
              🎉 {Math.floor(timeInFog / 60)} minutes in the fog! Keep going.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

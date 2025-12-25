import React, { useState, useMemo, useEffect } from 'react';
import { Shuffle, Flower2, CloudFog, Hammer, Sparkles, ChevronRight, Zap, Star, Flame } from 'lucide-react';

const mantras = [
  "The mess is the method.",
  "I learn by being wrong.",
  "Structure holds space for chaos.",
  "Confusion means I'm at my edge.",
  "Close enough, often enough, becomes fluent.",
  "My mistakes are my map.",
];

// Floating particle component for visual interest
function FloatingParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl animate-float-slow opacity-30"
          style={{
            width: `${60 + Math.random() * 80}px`,
            height: `${60 + Math.random() * 80}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `linear-gradient(135deg, 
              ${['#7c3aed', '#ec4899', '#06b6d4', '#f59e0b'][i % 4]}, 
              ${['#8b5cf6', '#f472b6', '#22d3ee', '#fbbf24'][i % 4]})`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: `${8 + i * 2}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HomeView({ setCurrentView, stats }) {
  const [mantraIndex, setMantraIndex] = useState(0);
  const [isMantraVisible, setIsMantraVisible] = useState(true);
  
  // Rotate mantras for engagement
  useEffect(() => {
    const interval = setInterval(() => {
      setIsMantraVisible(false);
      setTimeout(() => {
        setMantraIndex((prev) => (prev + 1) % mantras.length);
        setIsMantraVisible(true);
      }, 300);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const currentMantra = mantras[mantraIndex];

  return (
    <div className="min-h-screen pb-24 md:pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-transparent to-pink-200/30 dark:from-purple-900/40 dark:via-transparent dark:to-pink-900/20 animate-gradient" />

        {/* Floating particles */}
        <FloatingParticles />

        {/* Hero content */}
        <div className="relative px-6 py-16 md:py-24 text-center">
          {/* Animated badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6 hover:scale-105 transition-transform cursor-default animate-bounce-in">
            <Sparkles size={14} className="text-purple-600 dark:text-purple-400 animate-pulse" />
            <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">Learn Romanian Differently</span>
            <Zap size={14} className="text-pink-500 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
              Chaos
            </span>
            <span className="text-text-primary">Lingua</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-4 max-w-md mx-auto">
            Structured chaos for language learning
          </p>

          {/* Animated mantra */}
          <p 
            className={`text-text-muted italic text-sm max-w-sm mx-auto transition-all duration-300 ${
              isMantraVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
          >
            "{currentMantra}"
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-4 gap-3 max-w-lg mx-auto">
          <StatCard
            value={stats.chaosMinutes}
            label="Chaos"
            color="purple"
          />
          <StatCard
            value={stats.gardenMinutes || 0}
            label="Garden"
            color="rose"
          />
          <StatCard
            value={stats.fogMinutes}
            label="Fog"
            color="teal"
          />
          <StatCard
            value={stats.forgeMinutes || 0}
            label="Forge"
            color="amber"
          />
        </div>
      </div>

      {/* Session Cards */}
      <div className="px-6 space-y-4 max-w-lg mx-auto">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider flex items-center gap-2">
          <Star size={14} className="text-warning" />
          Start Learning
        </h2>

        <SessionCard
          icon={Shuffle}
          title="Chaos Window"
          description="Random content, timed exploration"
          gradient="from-purple-600 to-indigo-700"
          glowColor="rgba(124, 58, 237, 0.4)"
          onClick={() => setCurrentView('chaos')}
          delay={0}
        />

        <SessionCard
          icon={Flower2}
          title="Error Garden"
          description="Guess first, learn from mistakes"
          gradient="from-rose-600 to-orange-600"
          glowColor="rgba(225, 29, 72, 0.4)"
          onClick={() => setCurrentView('garden')}
          delay={1}
        />

        <SessionCard
          icon={CloudFog}
          title="Fog Machine"
          description="Above-level immersion"
          gradient="from-teal-600 to-cyan-600"
          glowColor="rgba(13, 148, 136, 0.4)"
          onClick={() => setCurrentView('fog')}
          delay={2}
        />

        <SessionCard
          icon={Hammer}
          title="Word Forge"
          description="Build sentences, active production"
          gradient="from-amber-600 to-orange-600"
          glowColor="rgba(217, 119, 6, 0.4)"
          onClick={() => setCurrentView('forge')}
          delay={3}
        />
      </div>

      {/* Philosophy Section */}
      <div className="px-6 py-10 max-w-lg mx-auto">
        <div className="bg-bg-secondary/80 backdrop-blur-sm rounded-2xl p-6 border border-border hover:border-accent/50 transition-colors duration-300">
          <h3 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <Flame size={18} className="text-warning" />
            The Philosophy
          </h3>
          <div className="space-y-4 text-sm">
            <PhilosophyItem
              color="purple"
              title="Structured Chaos"
              description="Plan the container, not the contents"
            />
            <PhilosophyItem
              color="rose"
              title="Mastery Through Mistakes"
              description="Errors are the curriculum"
            />
            <PhilosophyItem
              color="teal"
              title="Knowing Through Not-Knowing"
              description="Confusion is understanding in progress"
            />
            <PhilosophyItem
              color="amber"
              title="Forged Through Production"
              description="Speaking strengthens what listening started"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ value, label, color }) {
  const colorClasses = {
    purple: 'from-purple-100 to-indigo-100 dark:from-purple-900/50 dark:to-indigo-900/50 border-purple-300 dark:border-purple-800/50',
    rose: 'from-rose-100 to-orange-100 dark:from-rose-900/50 dark:to-orange-900/50 border-rose-300 dark:border-rose-800/50',
    teal: 'from-teal-100 to-cyan-100 dark:from-teal-900/50 dark:to-cyan-900/50 border-teal-300 dark:border-teal-800/50',
    amber: 'from-amber-100 to-orange-100 dark:from-amber-900/50 dark:to-orange-900/50 border-amber-300 dark:border-amber-800/50',
  };
  const textClasses = {
    purple: 'text-purple-600 dark:text-purple-400',
    rose: 'text-rose-600 dark:text-rose-400',
    teal: 'text-teal-600 dark:text-teal-400',
    amber: 'text-amber-600 dark:text-amber-400',
  };

  return (
    <div 
      className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-4 text-center border
        hover:scale-105 hover:shadow-lg transition-all duration-300 cursor-default group`}
    >
      <div className={`text-2xl font-bold ${textClasses[color]} group-hover:scale-110 transition-transform`}>
        {value}
      </div>
      <div className="text-xs text-text-muted">{label}</div>
    </div>
  );
}

function SessionCard({ icon: Icon, title, description, gradient, glowColor, onClick, delay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`w-full p-5 rounded-2xl bg-gradient-to-br ${gradient} text-left
        transform transition-all duration-300 ease-out
        hover:scale-[1.02] hover:-translate-y-1
        active:scale-[0.98] active:translate-y-0
        group relative overflow-hidden`}
      style={{
        boxShadow: isHovered 
          ? `0 20px 40px -15px ${glowColor}, 0 0 30px ${glowColor}`
          : '0 4px 15px rgba(0, 0, 0, 0.1)',
        animationDelay: `${delay * 0.1}s`,
      }}
    >
      {/* Animated shimmer overlay */}
      <div 
        className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent
          transition-transform duration-700 ease-out ${isHovered ? 'translate-x-full' : '-translate-x-full'}`}
      />
      
      {/* Content */}
      <div className="relative flex items-center gap-4">
        <div className={`p-3 bg-white/15 rounded-xl backdrop-blur-sm transition-all duration-300
          ${isHovered ? 'scale-110 rotate-6 bg-white/25' : ''}`}
        >
          <Icon size={24} className={`text-white transition-transform duration-300 ${isHovered ? 'scale-110' : ''}`} />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            {title}
            {isHovered && <Sparkles size={14} className="animate-pulse" />}
          </h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <ChevronRight
          size={20}
          className={`text-white/50 transition-all duration-300 ${isHovered ? 'text-white translate-x-1' : ''}`}
        />
      </div>
    </button>
  );
}

function PhilosophyItem({ color, title, description }) {
  const colorClasses = {
    purple: 'text-purple-600 dark:text-purple-400',
    rose: 'text-rose-600 dark:text-rose-400',
    teal: 'text-teal-600 dark:text-teal-400',
    amber: 'text-amber-600 dark:text-amber-400',
  };
  const bgClasses = {
    purple: 'bg-purple-500/10',
    rose: 'bg-rose-500/10',
    teal: 'bg-teal-500/10',
    amber: 'bg-amber-500/10',
  };

  return (
    <div className={`p-3 rounded-lg ${bgClasses[color]} hover:scale-[1.02] transition-transform cursor-default`}>
      <p className="text-text-secondary">
        <span className={`font-semibold ${colorClasses[color]}`}>{title}:</span>{' '}
        {description}
      </p>
    </div>
  );
}

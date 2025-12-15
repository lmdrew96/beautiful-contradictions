import React, { useState, useMemo } from 'react';
import { Shuffle, Flower2, CloudFog, Sparkles, ChevronRight } from 'lucide-react';

const mantras = [
  "The mess is the method.",
  "I learn by being wrong.",
  "Structure holds space for chaos.",
  "Confusion means I'm at my edge.",
  "Close enough, often enough, becomes fluent.",
  "My mistakes are my map.",
];

export default function HomeView({ setCurrentView, stats }) {
  const currentMantra = useMemo(() =>
    mantras[Math.floor(Math.random() * mantras.length)],
    []
  );

  return (
    <div className="min-h-screen pb-24 md:pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        {/* Background effects - lighter in light mode, darker in dark mode */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/40 via-bg-primary to-pink-200/30 dark:from-purple-900/40 dark:via-bg-primary dark:to-pink-900/20" />
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-purple-300/20 dark:bg-purple-500/30 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 right-10 w-80 h-80 bg-pink-300/20 dark:bg-pink-500/20 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-300/10 dark:bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Hero content */}
        <div className="relative px-6 py-16 md:py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30 mb-6">
            <Sparkles size={14} className="text-purple-600 dark:text-purple-400" />
            <span className="text-xs text-purple-600 dark:text-purple-300 font-medium">Learn Romanian Differently</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 dark:from-purple-400 dark:via-pink-400 dark:to-orange-400 bg-clip-text text-transparent">
              Chaos
            </span>
            <span className="text-text-primary">Lingua</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary mb-3 max-w-md mx-auto">
            Structured chaos for language learning
          </p>

          <p className="text-text-muted italic text-sm max-w-sm mx-auto">
            "{currentMantra}"
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-3 gap-3 max-w-lg mx-auto">
          <StatCard
            value={stats.chaosMinutes}
            label="Chaos"
            color="purple"
          />
          <StatCard
            value={stats.errorsHarvested}
            label="Errors"
            color="rose"
          />
          <StatCard
            value={stats.fogMinutes}
            label="Fog"
            color="teal"
          />
        </div>
      </div>

      {/* Session Cards */}
      <div className="px-6 space-y-4 max-w-lg mx-auto">
        <h2 className="text-sm font-medium text-text-muted uppercase tracking-wider">
          Start Learning
        </h2>

        <SessionCard
          icon={Shuffle}
          title="Chaos Window"
          description="Random content, timed exploration"
          gradient="from-purple-600 to-indigo-700"
          onClick={() => setCurrentView('chaos')}
        />

        <SessionCard
          icon={Flower2}
          title="Error Garden"
          description="Guess first, learn from mistakes"
          gradient="from-rose-600 to-orange-600"
          onClick={() => setCurrentView('garden')}
        />

        <SessionCard
          icon={CloudFog}
          title="Fog Machine"
          description="Above-level immersion"
          gradient="from-teal-600 to-cyan-600"
          onClick={() => setCurrentView('fog')}
        />
      </div>

      {/* Philosophy Section */}
      <div className="px-6 py-10 max-w-lg mx-auto">
        <div className="bg-bg-secondary rounded-2xl p-6 border border-border">
          <h3 className="text-lg font-semibold text-text-primary mb-4">The Philosophy</h3>
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
  };
  const textClasses = {
    purple: 'text-purple-600 dark:text-purple-400',
    rose: 'text-rose-600 dark:text-rose-400',
    teal: 'text-teal-600 dark:text-teal-400',
  };

  return (
    <div className={`bg-gradient-to-br ${colorClasses[color]} rounded-xl p-4 text-center border`}>
      <div className={`text-2xl font-bold ${textClasses[color]}`}>
        {value}
      </div>
      <div className="text-xs text-text-muted">{label}</div>
    </div>
  );
}

function SessionCard({ icon: Icon, title, description, gradient, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-5 rounded-2xl bg-gradient-to-br ${gradient} text-left
        hover:scale-[1.02] hover:shadow-xl transition-all duration-200
        active:scale-[0.98] group`}
    >
      <div className="flex items-center gap-4">
        <div className="p-3 bg-white/10 rounded-xl">
          <Icon size={24} className="text-white" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-white/70 text-sm">{description}</p>
        </div>
        <ChevronRight
          size={20}
          className="text-white/50 group-hover:text-white/80 group-hover:translate-x-1 transition-all"
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
  };

  return (
    <p className="text-text-secondary">
      <span className={`font-medium ${colorClasses[color]}`}>{title}:</span>{' '}
      {description}
    </p>
  );
}

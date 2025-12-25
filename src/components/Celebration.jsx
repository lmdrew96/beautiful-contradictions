import React, { useState, useEffect, useCallback } from 'react';
import { Sparkles, Star, Flame, Zap, Trophy, Heart, PartyPopper } from 'lucide-react';

/**
 * Celebration component - Creates dopamine-boosting visual feedback
 * Perfect for ADHD-friendly interfaces that need positive reinforcement
 */

// Confetti particle component
function ConfettiParticle({ color, delay, startX }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-full animate-confetti"
      style={{
        backgroundColor: color,
        left: `${startX}%`,
        top: '50%',
        animationDelay: `${delay}ms`,
        animationDuration: '1s',
      }}
    />
  );
}

// Floating emoji/icon for celebrations
function FloatingIcon({ Icon, delay, x, color }) {
  return (
    <div
      className="absolute animate-bounce-in"
      style={{
        left: `${x}%`,
        bottom: '20%',
        animationDelay: `${delay}ms`,
        color: color,
      }}
    >
      <Icon size={24} className="animate-float-slow" />
    </div>
  );
}

/**
 * StreakCelebration - Shows when user gets consecutive correct answers
 */
export function StreakCelebration({ streak, show }) {
  if (!show || streak < 2) return null;

  const getStreakEmoji = () => {
    if (streak >= 10) return '🔥';
    if (streak >= 7) return '⚡';
    if (streak >= 5) return '✨';
    if (streak >= 3) return '🌟';
    return '💫';
  };

  const getStreakColor = () => {
    if (streak >= 10) return 'from-red-500 to-orange-500';
    if (streak >= 7) return 'from-yellow-400 to-orange-500';
    if (streak >= 5) return 'from-purple-500 to-pink-500';
    return 'from-blue-500 to-cyan-500';
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div 
        className={`px-6 py-3 rounded-2xl bg-gradient-to-r ${getStreakColor()} 
          text-white font-bold text-xl shadow-2xl animate-bounce-in
          flex items-center gap-3`}
        style={{
          boxShadow: '0 0 40px rgba(255, 200, 0, 0.5)',
        }}
      >
        <span className="text-2xl">{getStreakEmoji()}</span>
        <span className={streak >= 5 ? 'streak-fire' : ''}>{streak} Streak!</span>
        <Flame size={24} className={streak >= 5 ? 'text-yellow-300 animate-pulse' : ''} />
      </div>
    </div>
  );
}

/**
 * CorrectAnswerBurst - Quick visual feedback for correct answers
 */
export function CorrectAnswerBurst({ show, onComplete }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  const colors = ['#22c55e', '#10b981', '#34d399', '#6ee7b7', '#a7f3d0'];
  const confetti = Array.from({ length: 12 }, (_, i) => ({
    color: colors[i % colors.length],
    delay: i * 50,
    startX: 30 + Math.random() * 40,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map((particle, i) => (
        <ConfettiParticle key={i} {...particle} />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-6xl animate-bounce-in">✓</div>
      </div>
    </div>
  );
}

/**
 * WrongAnswerShake - Gentle feedback for incorrect answers (not punishing)
 */
export function WrongAnswerFeedback({ show, onComplete }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onComplete?.();
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="px-6 py-3 bg-rose-500/20 backdrop-blur-sm rounded-2xl border border-rose-500/30 animate-shake">
        <p className="text-rose-400 font-medium flex items-center gap-2">
          <Heart size={18} />
          Almost! Keep trying
        </p>
      </div>
    </div>
  );
}

/**
 * SessionComplete - Celebration for finishing a session
 */
export function SessionCompleteCelebration({ show, stats, onDismiss }) {
  if (!show) return null;

  const icons = [Star, Sparkles, Zap, Trophy, PartyPopper];
  const colors = ['#f59e0b', '#ec4899', '#8b5cf6', '#06b6d4', '#22c55e'];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
    >
      {/* Floating celebration icons */}
      {icons.map((Icon, i) => (
        <FloatingIcon 
          key={i} 
          Icon={Icon} 
          delay={i * 100} 
          x={15 + i * 18} 
          color={colors[i]} 
        />
      ))}
      
      <div 
        className="bg-bg-secondary rounded-3xl p-8 max-w-sm mx-4 text-center animate-bounce-in shadow-2xl border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">
          Session Complete!
        </h2>
        <p className="text-text-secondary mb-6">
          Amazing work! You're making real progress.
        </p>
        
        {stats && (
          <div className="grid grid-cols-2 gap-4 mb-6">
            {stats.minutes && (
              <div className="bg-bg-tertiary rounded-xl p-3">
                <div className="text-2xl font-bold text-accent">{stats.minutes}</div>
                <div className="text-xs text-text-muted">Minutes</div>
              </div>
            )}
            {stats.correct !== undefined && (
              <div className="bg-bg-tertiary rounded-xl p-3">
                <div className="text-2xl font-bold text-success">{stats.correct}</div>
                <div className="text-xs text-text-muted">Correct</div>
              </div>
            )}
          </div>
        )}
        
        <button
          onClick={onDismiss}
          className="btn-gradient w-full py-3"
        >
          <span className="flex items-center justify-center gap-2">
            <Sparkles size={18} />
            Continue
          </span>
        </button>
      </div>
    </div>
  );
}

/**
 * MilestoneUnlock - For achieving milestones
 */
export function MilestoneUnlock({ show, milestone, onDismiss }) {
  if (!show) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onDismiss}
    >
      <div 
        className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-3xl p-8 max-w-sm mx-4 text-center animate-bounce-in shadow-2xl border border-amber-500/30"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4">
          <Trophy size={64} className="mx-auto text-amber-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2 rainbow-text">
          Milestone Unlocked!
        </h2>
        <p className="text-xl font-medium text-amber-400 mb-2">
          {milestone?.title || 'Achievement'}
        </p>
        <p className="text-text-secondary mb-6">
          {milestone?.description || 'You did something amazing!'}
        </p>
        
        <button
          onClick={onDismiss}
          className="btn-gradient w-full py-3"
        >
          <span className="flex items-center justify-center gap-2">
            <Star size={18} />
            Awesome!
          </span>
        </button>
      </div>
    </div>
  );
}

/**
 * ProgressPulse - Subtle animation when progress is made
 */
export function ProgressPulse({ children, pulse }) {
  return (
    <div className={`transition-all duration-300 ${pulse ? 'success-burst' : ''}`}>
      {children}
    </div>
  );
}

/**
 * Encouragement Toast - Quick encouraging messages
 */
const encouragements = [
  "You're on fire! 🔥",
  "Keep going! 💪",
  "Brilliant! ✨",
  "Nailed it! 🎯",
  "You're learning! 🌱",
  "So close! 💫",
  "Getting better! 📈",
  "Nice work! 👏",
];

export function EncouragementToast({ show }) {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (show) {
      setMessage(encouragements[Math.floor(Math.random() * encouragements.length)]);
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="fixed bottom-32 md:bottom-24 left-1/2 -translate-x-1/2 z-50 animate-bounce-in">
      <div className="px-4 py-2 bg-success/20 backdrop-blur-sm rounded-full border border-success/30 text-success font-medium">
        {message}
      </div>
    </div>
  );
}

export default {
  StreakCelebration,
  CorrectAnswerBurst,
  WrongAnswerFeedback,
  SessionCompleteCelebration,
  MilestoneUnlock,
  ProgressPulse,
  EncouragementToast,
};

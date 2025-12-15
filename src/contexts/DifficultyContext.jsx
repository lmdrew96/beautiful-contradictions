import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  calculateLevelFromPerformance,
  getEffectiveLevel as getEffectiveLevelUtil,
  getLevelProgress,
  DIFFICULTY_CONFIG,
} from '../utils/difficulty';

const DifficultyContext = createContext(null);

const STORAGE_KEY = 'cl-difficulty';

const DEFAULT_STATE = {
  levels: {
    chaos: 3,
    garden: 3,
    fog: 6,
    forge: 3,
  },
  overrides: {
    chaos: 'normal',
    garden: 'normal',
    fog: 'normal',
    forge: 'normal',
  },
  performance: {
    chaos: { sessions: [] },
    garden: { attempts: [] },
    fog: { sessions: [] },
    forge: { attempts: [] },
  },
  assessment: {
    completed: false,
    completedAt: null,
    initialLevel: null,
  },
  version: 1,
};

export function DifficultyProvider({ children }) {
  const [state, setState] = useState(DEFAULT_STATE);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        setState({ ...DEFAULT_STATE, ...parsed });
      }
    } catch (e) {
      console.warn('Failed to load difficulty state:', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage on change (debounced conceptually via state updates)
  useEffect(() => {
    if (!isLoaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Failed to save difficulty state:', e);
    }
  }, [state, isLoaded]);

  // Get the calculated level for a mode
  const getLevel = useCallback((mode) => {
    return state.levels[mode] || 3;
  }, [state.levels]);

  // Get the override setting for a mode
  const getOverride = useCallback((mode) => {
    return state.overrides[mode] || 'normal';
  }, [state.overrides]);

  // Get effective level (calculated + override adjustment)
  const getEffectiveLevel = useCallback((mode) => {
    const level = state.levels[mode] || 3;
    const override = state.overrides[mode] || 'normal';
    return getEffectiveLevelUtil(level, override);
  }, [state.levels, state.overrides]);

  // Set override for a mode
  const setOverride = useCallback((mode, value) => {
    setState(prev => ({
      ...prev,
      overrides: {
        ...prev.overrides,
        [mode]: value,
      },
    }));
  }, []);

  // Record a practice attempt (for garden and forge)
  const recordAttempt = useCallback((mode, difficulty, correct) => {
    setState(prev => {
      const attempts = [
        ...(prev.performance[mode]?.attempts || []),
        { difficulty, correct, timestamp: Date.now() },
      ].slice(-DIFFICULTY_CONFIG.WINDOW_SIZE);

      const newLevel = calculateLevelFromPerformance(attempts, prev.levels[mode]);

      return {
        ...prev,
        performance: {
          ...prev.performance,
          [mode]: { ...prev.performance[mode], attempts },
        },
        levels: {
          ...prev.levels,
          [mode]: newLevel,
        },
      };
    });
  }, []);

  // Record a session (for chaos and fog)
  const recordSession = useCallback((mode, level, duration) => {
    setState(prev => {
      const sessions = [
        ...(prev.performance[mode]?.sessions || []),
        { level, duration, timestamp: Date.now() },
      ].slice(-20);

      return {
        ...prev,
        performance: {
          ...prev.performance,
          [mode]: { ...prev.performance[mode], sessions },
        },
      };
    });
  }, []);

  // Complete placement assessment
  const completeAssessment = useCallback((initialLevel) => {
    setState(prev => ({
      ...prev,
      levels: {
        chaos: initialLevel,
        garden: initialLevel,
        fog: Math.min(10, initialLevel + 3),
        forge: initialLevel,
      },
      assessment: {
        completed: true,
        completedAt: Date.now(),
        initialLevel,
      },
    }));
  }, []);

  // Skip assessment (default to level 3)
  const skipAssessment = useCallback(() => {
    completeAssessment(3);
  }, [completeAssessment]);

  // Get progress toward next level for a mode
  const getProgress = useCallback((mode) => {
    const attempts = state.performance[mode]?.attempts || [];
    return getLevelProgress(attempts, state.levels[mode]);
  }, [state.performance, state.levels]);

  // Reset all levels and performance
  const resetLevels = useCallback(() => {
    setState(prev => ({
      ...DEFAULT_STATE,
      assessment: prev.assessment,
    }));
  }, []);

  // Check if assessment is needed
  const needsAssessment = !state.assessment.completed;

  const value = {
    // State
    levels: state.levels,
    overrides: state.overrides,
    assessment: state.assessment,
    isLoaded,
    needsAssessment,

    // Getters
    getLevel,
    getOverride,
    getEffectiveLevel,
    getProgress,

    // Actions
    setOverride,
    recordAttempt,
    recordSession,
    completeAssessment,
    skipAssessment,
    resetLevels,
  };

  return (
    <DifficultyContext.Provider value={value}>
      {children}
    </DifficultyContext.Provider>
  );
}

export function useDifficulty() {
  const context = useContext(DifficultyContext);
  if (!context) {
    throw new Error('useDifficulty must be used within DifficultyProvider');
  }
  return context;
}

export default DifficultyContext;

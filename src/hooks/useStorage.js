import { useState, useEffect, useCallback } from 'react';

/**
 * Hook for persistent state in localStorage
 */
export function useLocalStorage(key, initialValue) {
  // Get initial value from localStorage or use provided initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
}

/**
 * Hook for countdown timer
 */
export function useTimer(initialSeconds, onComplete) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  // Reset timer when initial seconds change
  useEffect(() => {
    setSeconds(initialSeconds);
  }, [initialSeconds]);

  // Timer logic
  useEffect(() => {
    if (!isRunning || seconds <= 0) {
      if (seconds <= 0 && isRunning) {
        setIsRunning(false);
        onComplete?.();
      }
      return;
    }

    const interval = setInterval(() => {
      setSeconds((s) => s - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, seconds, onComplete]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setSeconds(initialSeconds);
    setIsRunning(false);
  }, [initialSeconds]);
  const toggle = useCallback(() => setIsRunning((r) => !r), []);

  return {
    seconds,
    isRunning,
    start,
    pause,
    reset,
    toggle,
    progress: ((initialSeconds - seconds) / initialSeconds) * 100,
  };
}

/**
 * Hook for stopwatch (counts up)
 */
export function useStopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const reset = useCallback(() => {
    setSeconds(0);
    setIsRunning(false);
  }, []);
  const toggle = useCallback(() => setIsRunning((r) => !r), []);

  return { seconds, isRunning, start, pause, reset, toggle };
}

/**
 * Hook for random selection from array
 */
export function useRandomSelection(items) {
  const [selected, setSelected] = useState(() => 
    items.length > 0 ? items[Math.floor(Math.random() * items.length)] : null
  );

  const shuffle = useCallback(() => {
    if (items.length > 0) {
      setSelected(items[Math.floor(Math.random() * items.length)]);
    }
  }, [items]);

  return [selected, shuffle];
}

/**
 * Format seconds into MM:SS display
 */
export function formatTime(totalSeconds) {
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Shuffle an array (Fisher-Yates)
 */
export function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

const SYNC_DEBOUNCE_MS = 2000;

/**
 * Hook that syncs stats and errors between localStorage and Supabase
 *
 * Strategy:
 * 1. Always read from localStorage first (offline-first)
 * 2. On login: merge localStorage with Supabase (take higher values)
 * 3. On change: debounce sync to Supabase
 * 4. On app load with user: fetch from Supabase and merge
 */
export function useSupabaseSync(user, stats, setStats, errors, setErrors) {
  const [syncStatus, setSyncStatus] = useState('idle'); // 'idle' | 'syncing' | 'synced' | 'error'
  const [lastSyncedAt, setLastSyncedAt] = useState(null);
  const syncTimeoutRef = useRef(null);
  const initialSyncDoneRef = useRef(false);

  // Fetch data from Supabase and merge with local
  const fetchAndMerge = useCallback(async () => {
    if (!user || !isSupabaseConfigured()) return;

    setSyncStatus('syncing');

    try {
      // Fetch stats from Supabase
      const { data: remoteStats, error: statsError } = await supabase
        .from('user_stats')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Fetch errors from Supabase
      const { data: remoteErrors, error: errorsError } = await supabase
        .from('error_garden')
        .select('*')
        .eq('user_id', user.id);

      // Handle first-time user (no remote data yet)
      if (statsError?.code === 'PGRST116') {
        // No rows found - this is a new user, upload local data
        await uploadLocalData(user.id, stats, errors);
        setSyncStatus('synced');
        setLastSyncedAt(new Date());
        return;
      }

      if (statsError && statsError.code !== 'PGRST116') {
        throw statsError;
      }

      // Merge stats - take higher values
      if (remoteStats) {
        const mergedStats = {
          chaosMinutes: Math.max(stats.chaosMinutes || 0, remoteStats.chaos_minutes || 0),
          fogMinutes: Math.max(stats.fogMinutes || 0, remoteStats.fog_minutes || 0),
          totalSessions: Math.max(stats.totalSessions || 0, remoteStats.total_sessions || 0),
          errorsHarvested: stats.errorsHarvested || 0, // Keep local for backward compat
        };
        setStats(mergedStats);
      }

      // Merge errors - union by Romanian word, take higher wrongCount
      if (remoteErrors && !errorsError) {
        const localErrorMap = new Map(errors.map(e => [e.ro, e]));

        remoteErrors.forEach(remote => {
          const local = localErrorMap.get(remote.ro);
          if (local) {
            // Both have this word - take higher wrongCount
            localErrorMap.set(remote.ro, {
              ...local,
              wrongCount: Math.max(local.wrongCount, remote.wrong_count),
            });
          } else {
            // Remote only - add to local
            localErrorMap.set(remote.ro, {
              ro: remote.ro,
              en: remote.en,
              difficulty: remote.difficulty,
              category: remote.category,
              wrongCount: remote.wrong_count,
              addedAt: new Date(remote.added_at).getTime(),
            });
          }
        });

        setErrors(Array.from(localErrorMap.values()));
      }

      setSyncStatus('synced');
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Sync error:', err);
      setSyncStatus('error');
    }
  }, [user, stats, errors, setStats, setErrors]);

  // Upload local data to Supabase
  const uploadLocalData = async (userId, localStats, localErrors) => {
    // Upsert stats
    await supabase.from('user_stats').upsert({
      user_id: userId,
      chaos_minutes: localStats.chaosMinutes || 0,
      fog_minutes: localStats.fogMinutes || 0,
      total_sessions: localStats.totalSessions || 0,
      updated_at: new Date().toISOString(),
    }, {
      onConflict: 'user_id'
    });

    // Upsert errors
    if (localErrors.length > 0) {
      const errorRows = localErrors.map(e => ({
        user_id: userId,
        ro: e.ro,
        en: e.en,
        difficulty: e.difficulty,
        category: e.category,
        wrong_count: e.wrongCount,
        added_at: new Date(e.addedAt).toISOString(),
        updated_at: new Date().toISOString(),
      }));

      // Upsert each error (on conflict by user_id + ro)
      for (const row of errorRows) {
        await supabase.from('error_garden').upsert(row, {
          onConflict: 'user_id,ro'
        });
      }
    }
  };

  // Sync changes to Supabase (debounced)
  const syncToSupabase = useCallback(async () => {
    if (!user || !isSupabaseConfigured()) return;

    setSyncStatus('syncing');

    try {
      await uploadLocalData(user.id, stats, errors);
      setSyncStatus('synced');
      setLastSyncedAt(new Date());
    } catch (err) {
      console.error('Sync error:', err);
      setSyncStatus('error');
    }
  }, [user, stats, errors]);

  // Initial sync when user logs in
  useEffect(() => {
    if (user && isSupabaseConfigured() && !initialSyncDoneRef.current) {
      initialSyncDoneRef.current = true;
      fetchAndMerge();
    }

    // Reset flag when user logs out
    if (!user) {
      initialSyncDoneRef.current = false;
    }
  }, [user, fetchAndMerge]);

  // Debounced sync on data change
  useEffect(() => {
    if (!user || !isSupabaseConfigured() || !initialSyncDoneRef.current) return;

    // Clear existing timeout
    if (syncTimeoutRef.current) {
      clearTimeout(syncTimeoutRef.current);
    }

    // Set new debounced sync
    syncTimeoutRef.current = setTimeout(() => {
      syncToSupabase();
    }, SYNC_DEBOUNCE_MS);

    return () => {
      if (syncTimeoutRef.current) {
        clearTimeout(syncTimeoutRef.current);
      }
    };
  }, [stats, errors, user, syncToSupabase]);

  return {
    syncStatus,
    lastSyncedAt,
    forceSync: syncToSupabase,
  };
}

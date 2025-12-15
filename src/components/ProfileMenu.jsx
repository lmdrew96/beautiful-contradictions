import React, { useState, useRef, useEffect } from 'react';
import { User, LogOut, Cloud, CloudOff, Loader2, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileMenu({ syncStatus, onSignInClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, signOut, isConfigured } = useAuth();

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  const getSyncIcon = () => {
    switch (syncStatus) {
      case 'syncing':
        return <Loader2 size={12} className="animate-spin text-purple-400" />;
      case 'synced':
        return <Check size={12} className="text-green-400" />;
      case 'error':
        return <CloudOff size={12} className="text-rose-400" />;
      default:
        return null;
    }
  };

  // Not logged in - show sign in button
  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
      >
        <User size={16} />
        <span className="hidden sm:inline">Sign In</span>
      </button>
    );
  }

  // Logged in - show profile dropdown
  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 hover:text-white transition-colors text-sm"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="hidden sm:inline max-w-[120px] truncate">
          {user.email?.split('@')[0]}
        </span>
        {getSyncIcon()}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-slate-800 rounded-xl border border-slate-700 shadow-xl overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-slate-700">
            <p className="text-sm font-medium text-white truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              {isConfigured ? (
                <>
                  <Cloud size={12} className="text-green-400" />
                  <span className="text-xs text-green-400">Cloud sync enabled</span>
                </>
              ) : (
                <>
                  <CloudOff size={12} className="text-slate-500" />
                  <span className="text-xs text-slate-500">Offline mode</span>
                </>
              )}
            </div>
          </div>

          {/* Sync Status */}
          {syncStatus && (
            <div className="px-4 py-2 border-b border-slate-700">
              <div className="flex items-center gap-2">
                {getSyncIcon()}
                <span className="text-xs text-slate-400">
                  {syncStatus === 'syncing' && 'Syncing...'}
                  {syncStatus === 'synced' && 'All changes saved'}
                  {syncStatus === 'error' && 'Sync error'}
                  {syncStatus === 'idle' && 'Ready to sync'}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 text-left text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

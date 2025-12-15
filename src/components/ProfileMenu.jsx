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
        return <Loader2 size={12} className="animate-spin text-accent" />;
      case 'synced':
        return <Check size={12} className="text-success" />;
      case 'error':
        return <CloudOff size={12} className="text-error" />;
      default:
        return null;
    }
  };

  // Not logged in - show sign in button
  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary hover:bg-bg-tertiary rounded-lg text-text-secondary hover:text-text-primary transition-colors text-sm border border-border"
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
        className="flex items-center gap-2 px-3 py-1.5 bg-bg-secondary hover:bg-bg-tertiary rounded-lg text-text-secondary hover:text-text-primary transition-colors text-sm border border-border"
      >
        <div className="w-6 h-6 bg-accent rounded-full flex items-center justify-center text-white text-xs font-bold">
          {user.email?.[0]?.toUpperCase() || 'U'}
        </div>
        <span className="hidden sm:inline max-w-[120px] truncate">
          {user.email?.split('@')[0]}
        </span>
        {getSyncIcon()}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-bg-secondary rounded-xl border border-border shadow-xl overflow-hidden z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-border">
            <p className="text-sm font-medium text-text-primary truncate">{user.email}</p>
            <div className="flex items-center gap-2 mt-1">
              {isConfigured ? (
                <>
                  <Cloud size={12} className="text-success" />
                  <span className="text-xs text-success">Cloud sync enabled</span>
                </>
              ) : (
                <>
                  <CloudOff size={12} className="text-text-muted" />
                  <span className="text-xs text-text-muted">Offline mode</span>
                </>
              )}
            </div>
          </div>

          {/* Sync Status */}
          {syncStatus && (
            <div className="px-4 py-2 border-b border-border">
              <div className="flex items-center gap-2">
                {getSyncIcon()}
                <span className="text-xs text-text-muted">
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
              className="w-full px-4 py-2 text-left text-sm text-text-secondary hover:bg-bg-tertiary hover:text-text-primary transition-colors flex items-center gap-2"
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

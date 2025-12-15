import React, { useState } from 'react';
import { Home, Shuffle, Flower2, CloudFog, BarChart3, Settings } from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import SettingsModal from './SettingsModal';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chaos', label: 'Chaos', icon: Shuffle },
  { id: 'garden', label: 'Garden', icon: Flower2 },
  { id: 'fog', label: 'Fog', icon: CloudFog },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];

export default function Navigation({ currentView, setCurrentView, syncStatus, onSignInClick }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 bg-bg-secondary/95 backdrop-blur-lg border-t border-border z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b safe-area-bottom">
        <div className="max-w-4xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between py-2">
            {/* Nav Items */}
            <div className="flex justify-around md:justify-start md:gap-1 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => setCurrentView(item.id)}
                    className={`
                      flex flex-col md:flex-row items-center gap-1 px-3 py-2 rounded-xl
                      transition-all duration-200 min-w-[60px] md:min-w-0
                      ${isActive
                        ? 'bg-accent text-white shadow-lg'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary'
                      }
                    `}
                  >
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                    <span className="text-xs md:text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Settings & Profile - Desktop only */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-lg bg-bg-tertiary text-text-secondary hover:text-text-primary transition-colors"
                title="Settings"
              >
                <Settings size={18} />
              </button>
              <ProfileMenu
                syncStatus={syncStatus}
                onSignInClick={onSignInClick}
              />
            </div>
          </div>
        </div>

        {/* Mobile Profile & Settings Button - Fixed position top right */}
        <div className="md:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-lg bg-bg-secondary border border-border text-text-secondary hover:text-text-primary transition-colors"
            title="Settings"
          >
            <Settings size={18} />
          </button>
          <ProfileMenu
            syncStatus={syncStatus}
            onSignInClick={onSignInClick}
          />
        </div>
      </nav>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </>
  );
}

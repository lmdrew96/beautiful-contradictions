import React from 'react';
import { Home, Shuffle, Flower2, CloudFog, BarChart3 } from 'lucide-react';
import ProfileMenu from './ProfileMenu';

const navItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'chaos', label: 'Chaos', icon: Shuffle },
  { id: 'garden', label: 'Garden', icon: Flower2 },
  { id: 'fog', label: 'Fog', icon: CloudFog },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
];

export default function Navigation({ currentView, setCurrentView, syncStatus, onSignInClick }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-slate-900/95 backdrop-blur-lg border-t border-slate-700/50 z-50 md:top-0 md:bottom-auto md:border-t-0 md:border-b safe-area-bottom">
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
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                    }
                  `}
                >
                  <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-xs md:text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Profile Menu - Desktop only */}
          <div className="hidden md:block ml-4">
            <ProfileMenu
              syncStatus={syncStatus}
              onSignInClick={onSignInClick}
            />
          </div>
        </div>
      </div>

      {/* Mobile Profile Button - Fixed position top right */}
      <div className="md:hidden fixed top-4 right-4 z-50">
        <ProfileMenu
          syncStatus={syncStatus}
          onSignInClick={onSignInClick}
        />
      </div>
    </nav>
  );
}

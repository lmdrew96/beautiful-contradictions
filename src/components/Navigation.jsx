import React, { useState } from 'react';
import { Home, Shuffle, Flower2, CloudFog, Hammer, BarChart3, Settings, Sparkles } from 'lucide-react';
import ProfileMenu from './ProfileMenu';
import SettingsModal from './SettingsModal';
import LevelIndicator from './LevelIndicator';

const navItems = [
  { id: 'home', label: 'Home', icon: Home, color: 'from-purple-500 to-pink-500' },
  { id: 'chaos', label: 'Chaos', icon: Shuffle, color: 'from-purple-600 to-indigo-600' },
  { id: 'garden', label: 'Garden', icon: Flower2, color: 'from-rose-500 to-orange-500' },
  { id: 'fog', label: 'Fog', icon: CloudFog, color: 'from-teal-500 to-cyan-500' },
  { id: 'forge', label: 'Forge', icon: Hammer, color: 'from-amber-500 to-orange-500' },
  { id: 'progress', label: 'Progress', icon: BarChart3, color: 'from-blue-500 to-purple-500' },
];

export default function Navigation({ currentView, setCurrentView, syncStatus, onSignInClick }) {
  const [showSettings, setShowSettings] = useState(false);
  const [ripple, setRipple] = useState(null);

  const handleNavClick = (itemId, e) => {
    // Create ripple effect
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setRipple({ x, y, id: itemId });
    setTimeout(() => setRipple(null), 600);
    
    setCurrentView(itemId);
  };

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 z-50 md:top-0 md:bottom-auto safe-area-bottom">
        {/* Glassmorphism background */}
        <div className="absolute inset-0 bg-bg-secondary/80 backdrop-blur-lg border-t border-border/50 md:border-t-0 md:border-b" />
        
        <div className="relative max-w-4xl mx-auto px-2 md:px-4">
          <div className="flex items-center justify-between py-2">
            {/* Nav Items */}
            <div className="flex justify-around md:justify-start md:gap-1 flex-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = currentView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={(e) => handleNavClick(item.id, e)}
                    className={`
                      relative flex flex-col md:flex-row items-center gap-1 px-3 py-2 rounded-xl
                      min-w-[60px] md:min-w-0 overflow-hidden
                      transition-all duration-300 ease-out
                      ${isActive
                        ? 'text-white shadow-lg scale-105'
                        : 'text-text-muted hover:text-text-primary hover:bg-bg-tertiary/50 hover:scale-105'
                      }
                    `}
                  >
                    {/* Active gradient background */}
                    {isActive && (
                      <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-xl`} />
                    )}
                    
                    {/* Ripple effect */}
                    {ripple?.id === item.id && (
                      <span
                        className="absolute rounded-full bg-white/30 animate-ping"
                        style={{
                          left: ripple.x - 10,
                          top: ripple.y - 10,
                          width: 20,
                          height: 20,
                        }}
                      />
                    )}
                    
                    {/* Icon with animation */}
                    <span className={`relative z-10 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                      <Icon 
                        size={20} 
                        strokeWidth={isActive ? 2.5 : 2}
                        className={isActive ? 'animate-bounce-in' : ''}
                      />
                    </span>
                    
                    {/* Label */}
                    <span className={`relative z-10 text-xs md:text-sm font-medium transition-all duration-300 ${isActive ? 'font-bold' : ''}`}>
                      {item.label}
                    </span>
                    
                    {/* Active indicator dot (mobile) */}
                    {isActive && (
                      <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full md:hidden animate-bounce-in" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Level Indicator & Settings & Profile - Desktop only */}
            <div className="hidden md:flex items-center gap-2 ml-4">
              <LevelIndicator currentView={currentView} />
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 rounded-xl bg-bg-tertiary/50 text-text-secondary hover:text-text-primary hover:bg-bg-tertiary hover:rotate-45 transition-all duration-300"
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

        {/* Mobile Level & Settings - Fixed position top right */}
        <div className="md:hidden fixed top-4 right-4 z-50 flex items-center gap-2">
          <LevelIndicator currentView={currentView} compact />
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-xl bg-bg-secondary/80 backdrop-blur-sm border border-border/50 text-text-secondary hover:text-text-primary hover:rotate-45 transition-all duration-300 shadow-lg"
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

import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useStorage';
import { useSupabaseSync } from './hooks/useSupabaseSync';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Components
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import ChaosEngine from './components/ChaosEngine';
import ErrorGarden from './components/ErrorGarden';
import FogMachine from './components/FogMachine';
import ProgressView from './components/ProgressView';
import AuthModal from './components/AuthModal';

// Initial stats structure
const INITIAL_STATS = {
  chaosMinutes: 0,
  errorsHarvested: 0, // Kept for backward compatibility
  fogMinutes: 0,
  totalSessions: 0,
};

function AppContent() {
  // Current view state
  const [currentView, setCurrentView] = useState('home');
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Persistent state
  const [stats, setStats] = useLocalStorage('bc-stats', INITIAL_STATS);
  const [errors, setErrors] = useLocalStorage('bc-errors', []);

  // Auth and sync
  const { user } = useAuth();
  const { syncStatus } = useSupabaseSync(user, stats, setStats, errors, setErrors);

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView
            setCurrentView={setCurrentView}
            stats={stats}
          />
        );
      case 'chaos':
        return (
          <ChaosEngine
            updateStats={setStats}
          />
        );
      case 'garden':
        return (
          <ErrorGarden
            updateStats={setStats}
            errors={errors}
            setErrors={setErrors}
          />
        );
      case 'fog':
        return (
          <FogMachine
            updateStats={setStats}
          />
        );
      case 'progress':
        return (
          <ProgressView
            stats={stats}
            errors={errors}
            setErrors={setErrors}
          />
        );
      default:
        return (
          <HomeView
            setCurrentView={setCurrentView}
            stats={stats}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <Navigation
        currentView={currentView}
        setCurrentView={setCurrentView}
        syncStatus={syncStatus}
        onSignInClick={() => setShowAuthModal(true)}
      />

      {/* Main Content */}
      <main>
        {renderView()}
      </main>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

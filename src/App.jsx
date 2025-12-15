import React, { useState } from 'react';
import { useLocalStorage } from './hooks/useStorage';

// Components
import Navigation from './components/Navigation';
import HomeView from './components/HomeView';
import ChaosEngine from './components/ChaosEngine';
import ErrorGarden from './components/ErrorGarden';
import FogMachine from './components/FogMachine';
import ProgressView from './components/ProgressView';

// Initial stats structure
const INITIAL_STATS = {
  chaosMinutes: 0,
  errorsHarvested: 0,
  fogMinutes: 0,
  totalSessions: 0,
};

export default function App() {
  // Current view state
  const [currentView, setCurrentView] = useState('home');

  // Persistent state
  const [stats, setStats] = useLocalStorage('bc-stats', INITIAL_STATS);
  const [errors, setErrors] = useLocalStorage('bc-errors', []);

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
      />

      {/* Main Content */}
      <main>
        {renderView()}
      </main>
    </div>
  );
}

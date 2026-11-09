import React, { useState, useEffect } from 'react';
import { ScreenId, DiscographyItem, FilmProject } from './types';
import { DISCOGRAPHY_DATA, FILMS_DATA } from './data/indraData';
import { Header } from './components/Header';
import { ArchiveScreen } from './screens/ArchiveScreen';
import { ManifestoScreen } from './screens/ManifestoScreen';
import { ReelModal } from './components/ReelModal';
import { AudioPlayerBar } from './components/AudioPlayerBar';
import { soundEngine } from './utils/soundEngine';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('archive');
  const [transitionDirection, setTransitionDirection] = useState<'push' | 'push_back' | 'none'>('none');
  const [isReelOpen, setIsReelOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState<DiscographyItem>(DISCOGRAPHY_DATA[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Sync document title with current screen
  useEffect(() => {
    if (currentScreen === 'archive') {
      document.title = 'INDRAKI — Archivo Oficial y Portafolio Sonoro (Rioplatense)';
    } else {
      document.title = 'INDRAKI — Manifiesto del Delirio Cinematográfico';
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentScreen]);

  const handleNavigate = (targetScreen: ScreenId, sectionId?: string) => {
    if (targetScreen === currentScreen) {
      if (sectionId) {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }
      return;
    }

    if (currentScreen === 'archive' && targetScreen === 'manifesto') {
      setTransitionDirection('push');
    } else if (currentScreen === 'manifesto' && targetScreen === 'archive') {
      if (sectionId) {
        setTransitionDirection('none');
      } else {
        setTransitionDirection('push_back');
      }
    } else {
      setTransitionDirection('none');
    }

    setCurrentScreen(targetScreen);

    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleBackToArchive = () => {
    setTransitionDirection('push_back');
    setCurrentScreen('archive');
  };

  const handleOpenReel = (_film?: FilmProject) => {
    setIsReelOpen(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      soundEngine.stop();
      setIsPlaying(false);
    } else {
      soundEngine.play(activeTrack.id, activeTrack.bpm);
      setIsPlaying(true);
    }
  };

  const handleSelectTrack = (track: DiscographyItem) => {
    setActiveTrack(track);
    setIsPlaying(true);
  };

  return (
    <div className="relative min-h-screen bg-[#FAF7F2] text-[#111111] font-sans selection:bg-[#FF4D22] selection:text-white">
      {/* Blueprint Outer Frame Datum Corners */}
      <div className="fixed top-2 left-2 z-50 text-[10px] font-mono text-[#D9B98C] pointer-events-none select-none">
        + 00.00
      </div>
      <div className="fixed top-2 right-2 z-50 text-[10px] font-mono text-[#D9B98C] pointer-events-none select-none">
        00.99 +
      </div>
      <div className="fixed bottom-2 left-2 z-50 text-[10px] font-mono text-[#D9B98C] pointer-events-none select-none">
        + 99.00
      </div>
      <div className="fixed bottom-2 right-2 z-50 text-[10px] font-mono text-[#D9B98C] pointer-events-none select-none">
        99.99 +
      </div>

      {/* Global Technical Blueprint Header */}
      <Header
        currentScreen={currentScreen}
        onNavigate={handleNavigate}
        onOpenReel={handleOpenReel}
      />

      {/* Main Screen Content with Transition Animation */}
      <main
        className={`transition-all duration-300 ${
          transitionDirection === 'push'
            ? 'animate-in fade-in slide-in-from-right-4'
            : transitionDirection === 'push_back'
            ? 'animate-in fade-in slide-in-from-left-4'
            : 'animate-in fade-in'
        }`}
      >
        {currentScreen === 'archive' ? (
          <ArchiveScreen
            onNavigate={handleNavigate}
            onOpenReel={handleOpenReel}
            activeTrack={activeTrack}
            isPlaying={isPlaying}
            onSelectTrack={handleSelectTrack}
            onTogglePlay={handleTogglePlay}
          />
        ) : (
          <ManifestoScreen onBackToArchive={handleBackToArchive} />
        )}
      </main>

      {/* Interactive Cinematic Screening Room Modal */}
      <ReelModal
        isOpen={isReelOpen}
        onClose={() => setIsReelOpen(false)}
      />

      {/* Sticky Bottom Technical Audio Player Bar */}
      <AudioPlayerBar
        activeTrack={activeTrack}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onSelectTrack={handleSelectTrack}
      />
    </div>
  );
}

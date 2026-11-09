import React, { useState, useEffect } from 'react';
import { ScreenId } from '../types';

interface HeaderProps {
  currentScreen: ScreenId;
  onNavigate: (screen: ScreenId, sectionId?: string) => void;
  onOpenReel: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentScreen,
  onNavigate,
  onOpenReel,
}) => {
  const [timecode, setTimecode] = useState('00:00:00:00');
  const [isLive, setIsLive] = useState(true);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();
      // UTC-3 Rioplatense Time
      const hours = String((now.getUTCHours() + 21) % 24).padStart(2, '0');
      const minutes = String(now.getUTCMinutes()).padStart(2, '0');
      const seconds = String(now.getUTCSeconds()).padStart(2, '0');
      const frames = String(Math.floor((now.getUTCMilliseconds() / 1000) * 24)).padStart(2, '0');
      setTimecode(`${hours}:${minutes}:${seconds}:${frames}`);
    };
    updateTimer();
    const interval = setInterval(updateTimer, 41); // ~24fps
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#111111]/15 text-[#111111] transition-all">
      {/* Top Technical Telemetry Strip */}
      <div className="border-b border-[#111111]/10 bg-[#F3EFE6] px-3 sm:px-6 py-1 flex items-center justify-between text-[10px] font-mono tracking-widest text-[#555555]">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#FF4D22]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FF4D22] animate-pulse" />
            REC 24FPS
          </span>
          <span className="hidden md:inline text-[#111111]/30">|</span>
          <span className="hidden md:inline font-mono">
            SYS: DRAFTING ARCHIVE // REF 01-B
          </span>
          <span className="hidden lg:inline text-[#111111]/30">|</span>
          <span className="hidden lg:inline">
            COORDINATES: 34°36'12"S 58°22'54"W
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[#111111] font-mono font-bold tracking-widest">
            TC {timecode}
          </span>
          <span className="hidden sm:inline border border-[#111111]/20 px-1.5 py-0.2 text-[9px] bg-[#FAF7F2]">
            RIO-PLATA-MST
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-y-3">
        {/* Brand / Logo */}
        <div className="flex items-center gap-4">
          <div
            onClick={() => onNavigate('archive')}
            className="cursor-pointer group flex items-center gap-2.5"
            title="Ir al Archivo General"
          >
            <div className="w-8 h-8 bg-[#111111] text-[#FAF7F2] font-mono text-xs flex items-center justify-center font-bold tracking-tighter group-hover:bg-[#FF4D22] transition-colors">
              IND
            </div>
            <div>
              <div className="font-serif text-xl sm:text-2xl font-bold tracking-tight leading-none group-hover:text-[#FF4D22] transition-colors">
                INDRAKI
              </div>
              <div className="text-[9px] font-mono tracking-widest text-[#555555] uppercase mt-0.5">
                Archivo Sonoro & Cinematográfico
              </div>
            </div>
          </div>

          <a
            href="https://www.instagram.com/indraki13/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1.5 text-[10px] font-mono px-2.5 py-1 border border-[#111111]/30 hover:border-[#FF4D22] hover:text-[#FF4D22] text-[#111111] bg-[#FAF7F2] transition-colors"
            title="Instagram Oficial @indraki13"
          >
            <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            <span>@indraki13</span>
          </a>
        </div>

        {/* Navigation Links with required data-path attributes */}
        <nav className="flex items-center flex-wrap gap-1 sm:gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
          <a
            href="#selected-films"
            data-path="selected-films"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'archive') {
                onNavigate('archive', 'selected-films');
              } else {
                const el = document.getElementById('selected-films');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-2.5 py-1.5 border transition-all cursor-pointer ${
              currentScreen === 'archive'
                ? 'border-transparent text-[#111111] hover:border-[#111111] hover:bg-[#FAF7F2]'
                : 'border-transparent text-[#555555] hover:text-[#111111] hover:border-[#111111]'
            }`}
          >
            01. Filmografía
          </a>

          <a
            href="#discography"
            data-path="discography"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'archive') {
                onNavigate('archive', 'discography');
              } else {
                const el = document.getElementById('discography');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-2.5 py-1.5 border transition-all cursor-pointer ${
              currentScreen === 'archive'
                ? 'border-transparent text-[#111111] hover:border-[#111111] hover:bg-[#FAF7F2]'
                : 'border-transparent text-[#555555] hover:text-[#111111] hover:border-[#111111]'
            }`}
          >
            02. Discografía
          </a>

          <a
            href="#process-and-tech"
            data-path="process-and-tech"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'archive') {
                onNavigate('archive', 'process-and-tech');
              } else {
                const el = document.getElementById('process-and-tech');
                el?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className={`px-2.5 py-1.5 border transition-all cursor-pointer ${
              currentScreen === 'archive'
                ? 'border-transparent text-[#111111] hover:border-[#111111] hover:bg-[#FAF7F2]'
                : 'border-transparent text-[#555555] hover:text-[#111111] hover:border-[#111111]'
            }`}
          >
            03. Proceso & Tech
          </a>

          <a
            href="#about"
            data-path="about"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('manifesto');
            }}
            className={`px-2.5 py-1.5 border transition-all cursor-pointer ${
              currentScreen === 'manifesto'
                ? 'bg-[#111111] text-[#FAF7F2] border-[#111111] font-bold'
                : 'border-transparent text-[#111111] hover:border-[#111111] hover:bg-[#FAF7F2]'
            }`}
          >
            04. Manifiesto Delirio
          </a>
        </nav>

        {/* Ver Reel action button (Required: //header//a[contains(., 'Ver Reel')]) */}
        <div className="flex items-center gap-2">
          <a
            href="#ver-reel"
            onClick={(e) => {
              e.preventDefault();
              if (currentScreen !== 'archive') {
                onNavigate('archive');
              }
              onOpenReel();
            }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-[#111111] text-[#FAF7F2] text-[11px] sm:text-xs font-mono font-bold tracking-wider uppercase border border-[#111111] hover:bg-[#FF4D22] hover:border-[#FF4D22] transition-colors cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-[#FF4D22] group-hover:bg-[#FAF7F2]" />
            Ver Reel (2025/26)
          </a>
        </div>
      </div>
    </header>
  );
};

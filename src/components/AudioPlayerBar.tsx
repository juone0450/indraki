import React, { useState, useEffect, useRef } from 'react';
import { DISCOGRAPHY_DATA } from '../data/indraData';
import { soundEngine } from '../utils/soundEngine';
import { DiscographyItem } from '../types';

interface AudioPlayerBarProps {
  activeTrack: DiscographyItem;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (track: DiscographyItem) => void;
}

export const AudioPlayerBar: React.FC<AudioPlayerBarProps> = ({
  activeTrack,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
}) => {
  const [stems, setStems] = useState({
    sub: true,
    reed: true,
    noise: true,
    pulse: true,
  });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const toggleStem = (key: 'sub' | 'reed' | 'noise' | 'pulse') => {
    soundEngine.toggleStem(key);
    setStems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  useEffect(() => {
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(32);

    const draw = () => {
      soundEngine.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const count = 24;
      const barWidth = canvas.width / count;

      for (let i = 0; i < count; i++) {
        const val = dataArray[i] || (isPlaying ? (Math.sin(Date.now() / 150 + i * 0.4) * 0.5 + 0.5) * 80 + 20 : 4);
        const barHeight = (val / 120) * canvas.height;

        ctx.fillStyle = i === 0 || i === 1 ? '#FF4D22' : '#111111';
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1.5, barHeight);
      }

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-[#FAF7F2] border-t-2 border-[#111111] shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3">
        {/* Play/Pause Button + Current Track Info */}
        <div className="flex items-center gap-3 min-w-[240px]">
          <button
            onClick={onTogglePlay}
            className="w-9 h-9 bg-[#111111] text-[#FAF7F2] hover:bg-[#FF4D22] transition-colors flex items-center justify-center font-mono font-bold text-xs cursor-pointer border border-[#111111]"
            title={isPlaying ? 'Pausar Master' : 'Reproducir Master'}
          >
            {isPlaying ? '■' : '▶'}
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-[#FF4D22] font-bold">
                {activeTrack.trackCode}
              </span>
              <span className="text-[10px] font-mono text-[#555555]">
                [{activeTrack.bpm} BPM // {activeTrack.key}]
              </span>
            </div>
            <div className="font-serif text-sm sm:text-base font-bold text-[#111111] truncate max-w-[260px] sm:max-w-xs">
              {activeTrack.title}
            </div>
          </div>
        </div>

        {/* Live FFT Canvas */}
        <div className="hidden md:flex items-center gap-2 border-x border-[#111111]/15 px-4">
          <div className="text-[9px] font-mono text-[#555555] flex flex-col justify-between h-7">
            <span>R-SPEC</span>
            <span>24/96</span>
          </div>
          <div className="w-28 h-7 bg-[#F3EFE6] border border-[#111111]/20 p-0.5">
            <canvas ref={canvasRef} width={112} height={24} className="w-full h-full" />
          </div>
        </div>

        {/* Real-time Interactive Stems Mixer */}
        <div className="flex items-center flex-wrap gap-1.5 text-[10px] font-mono">
          <span className="text-[#555555] mr-1 hidden sm:inline">STEMS:</span>
          
          <button
            onClick={() => toggleStem('sub')}
            className={`px-2 py-0.5 border cursor-pointer transition-colors ${
              stems.sub
                ? 'bg-[#111111] text-[#FAF7F2] border-[#111111]'
                : 'bg-transparent text-[#555555] border-[#111111]/30 line-through'
            }`}
          >
            SUB 45Hz
          </button>

          <button
            onClick={() => toggleStem('reed')}
            className={`px-2 py-0.5 border cursor-pointer transition-colors ${
              stems.reed
                ? 'bg-[#111111] text-[#FAF7F2] border-[#111111]'
                : 'bg-transparent text-[#555555] border-[#111111]/30 line-through'
            }`}
          >
            BANDONEÓN
          </button>

          <button
            onClick={() => toggleStem('noise')}
            className={`px-2 py-0.5 border cursor-pointer transition-colors ${
              stems.noise
                ? 'bg-[#111111] text-[#FAF7F2] border-[#111111]'
                : 'bg-transparent text-[#555555] border-[#111111]/30 line-through'
            }`}
          >
            TAPE HISS
          </button>

          <button
            onClick={() => toggleStem('pulse')}
            className={`px-2 py-0.5 border cursor-pointer transition-colors ${
              stems.pulse
                ? 'bg-[#FF4D22] text-[#FAF7F2] border-[#FF4D22]'
                : 'bg-transparent text-[#555555] border-[#111111]/30 line-through'
            }`}
          >
            PULSE
          </button>
        </div>

        {/* Quick Track Switcher */}
        <div className="hidden lg:flex items-center gap-1 text-[10px] font-mono">
          {DISCOGRAPHY_DATA.map((trk, i) => (
            <button
              key={trk.id}
              onClick={() => {
                onSelectTrack(trk);
                soundEngine.play(trk.id, trk.bpm);
              }}
              className={`w-6 h-6 border cursor-pointer font-bold transition-all ${
                activeTrack.id === trk.id
                  ? 'bg-[#111111] text-[#FAF7F2] border-[#111111]'
                  : 'bg-transparent text-[#111111] border-[#111111]/30 hover:border-[#111111]'
              }`}
            >
              0{i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

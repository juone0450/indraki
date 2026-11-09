import React, { useState, useEffect, useRef } from 'react';
import { FILMS_DATA } from '../data/indraData';
import { soundEngine } from '../utils/soundEngine';
import { TechnicalBadge } from './TechnicalBadge';

interface ReelModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ReelModal: React.FC<ReelModalProps> = ({ isOpen, onClose }) => {
  const [selectedFilmIndex, setSelectedFilmIndex] = useState(0);
  const [aspectRatio, setAspectRatio] = useState<'2.39:1' | '16:9' | '1.43:1'>('2.39:1');
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(34);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const currentFilm = FILMS_DATA[selectedFilmIndex];

  useEffect(() => {
    if (isOpen) {
      soundEngine.play(currentFilm.id, 64);
      setIsPlaying(true);
    } else {
      soundEngine.stop();
      setIsPlaying(false);
    }
  }, [isOpen, selectedFilmIndex]);

  // Audio waveform animation on canvas
  useEffect(() => {
    if (!isOpen) return;
    let animId: number;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dataArray = new Uint8Array(64);

    const render = () => {
      soundEngine.getByteFrequencyData(dataArray);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = canvas.width / 40;
      for (let i = 0; i < 40; i++) {
        const val = dataArray[i] || (isPlaying ? Math.sin(Date.now() / 200 + i) * 30 + 40 : 5);
        const barHeight = (val / 255) * canvas.height;
        ctx.fillStyle = i % 5 === 0 ? '#FF4D22' : '#D9B98C';
        ctx.fillRect(i * barWidth, canvas.height - barHeight, barWidth - 1.5, barHeight);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isOpen, isPlaying]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#16181D]/90 backdrop-blur-md p-3 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-5xl bg-[#16181D] border border-[#D9B98C]/40 text-[#FAF7F2] shadow-2xl reticle-corner my-auto">
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between border-b border-[#D9B98C]/30 px-4 py-2.5 bg-[#111111] text-[11px] font-mono">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-[#FF4D22] font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D22] animate-ping" />
              CINEMA SCREENING ROOM // MONITOR 01
            </span>
            <TechnicalBadge
              leftText="FEED A"
              rightText="ANAMORPHIC DCI"
              variant="dark"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-[#D9B98C]">
              <span>ASPECT:</span>
              {(['2.39:1', '16:9', '1.43:1'] as const).map((ratio) => (
                <button
                  key={ratio}
                  onClick={() => setAspectRatio(ratio)}
                  className={`px-2 py-0.5 border text-[10px] cursor-pointer transition-colors ${
                    aspectRatio === ratio
                      ? 'bg-[#FF4D22] border-[#FF4D22] text-[#FAF7F2] font-bold'
                      : 'border-[#D9B98C]/30 text-[#FAF7F2]/70 hover:border-[#FAF7F2]'
                  }`}
                >
                  {ratio}
                </button>
              ))}
            </div>

            <a
              href="https://www.instagram.com/indraki13/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D9B98C] hover:text-[#FF4D22] text-xs font-mono transition-colors hidden sm:inline"
            >
              @indraki13 ↗
            </a>

            <button
              onClick={onClose}
              className="px-3 py-1 bg-[#FAF7F2] text-[#111111] hover:bg-[#FF4D22] hover:text-[#FAF7F2] font-bold transition-colors cursor-pointer"
            >
              [ ESC CERRAR ]
            </button>
          </div>
        </div>

        {/* Video Canvas Container with Anamorphic Framing */}
        <div className="relative bg-black flex items-center justify-center overflow-hidden border-b border-[#D9B98C]/20 p-2 sm:p-6">
          <div
            className="relative w-full overflow-hidden transition-all duration-300 border border-[#D9B98C]/40"
            style={{
              aspectRatio:
                aspectRatio === '2.39:1'
                  ? '2.39 / 1'
                  : aspectRatio === '16:9'
                  ? '16 / 9'
                  : '1.43 / 1',
              maxHeight: '56vh',
            }}
          >
            {/* Mode: YouTube Video Player vs Stills */}
            <div className="w-full h-full">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/-nDtNHDbX1M?si=zOpdYezKGNSP9maJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Corner crosshairs for telemetry */}
            <div className="absolute top-2 left-2 pointer-events-none text-[9px] font-mono text-[#D9B98C] bg-black/60 px-1">
              INDRAKI // YOUTUBE FEED
            </div>
            <div className="absolute top-2 right-2 pointer-events-none text-[9px] font-mono text-[#D9B98C] bg-black/60 px-1">
              4K DCI DRAFT ⌝
            </div>
          </div>
        </div>

        {/* Playback Scrubber & Telemetry */}
        <div className="p-4 bg-[#16181D] space-y-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                if (isPlaying) {
                  soundEngine.stop();
                  setIsPlaying(false);
                } else {
                  soundEngine.play(currentFilm.id);
                  setIsPlaying(true);
                }
              }}
              className="px-4 py-2 bg-[#FF4D22] text-[#FAF7F2] font-mono font-bold text-xs hover:bg-[#E63B10] transition-colors cursor-pointer flex items-center gap-2"
            >
              <span>{isPlaying ? '■ STOP' : '▶ PLAY SOUNDTRACK'}</span>
            </button>

            <div className="flex-1 flex flex-col justify-center">
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full accent-[#FF4D22] h-1.5 bg-[#FAF7F2]/20 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] font-mono text-[#D9B98C] mt-1">
                <span>00:04:12:18</span>
                <span>TC SYNC: {currentFilm.duration}</span>
              </div>
            </div>

            {/* Audio Waveform Canvas */}
            <div className="w-24 sm:w-36 h-8 bg-black/60 border border-[#D9B98C]/30 p-1 flex items-center">
              <canvas
                ref={canvasRef}
                width={140}
                height={30}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Film Selection Strip */}
          <div className="border-t border-[#D9B98C]/20 pt-3 flex flex-wrap items-center justify-between gap-2">
            <span className="text-[10px] font-mono text-[#555555] uppercase tracking-wider">
              CARRETE SELECCIONADO:
            </span>
            <div className="flex flex-wrap gap-2">
              {FILMS_DATA.map((film, idx) => (
                <button
                  key={film.id}
                  onClick={() => {
                    setSelectedFilmIndex(idx);
                    setProgress(Math.floor(Math.random() * 40 + 20));
                  }}
                  className={`px-3 py-1 text-xs font-mono border transition-all cursor-pointer ${
                    selectedFilmIndex === idx
                      ? 'bg-[#FAF7F2] text-[#111111] border-[#FAF7F2] font-bold'
                      : 'border-[#D9B98C]/30 text-[#FAF7F2]/70 hover:border-[#FAF7F2]'
                  }`}
                >
                  {film.sheetNo} — {film.title} ({film.year})
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

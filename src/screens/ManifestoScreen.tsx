import React, { useState } from 'react';
import { MANIFESTO_TEXTS } from '../data/indraData';
import { TechnicalBadge } from '../components/TechnicalBadge';
import { soundEngine } from '../utils/soundEngine';

interface ManifestoScreenProps {
  onBackToArchive: () => void;
}

export const ManifestoScreen: React.FC<ManifestoScreenProps> = ({ onBackToArchive }) => {
  const [isPlayingAtmosphere, setIsPlayingAtmosphere] = useState(false);

  const toggleAtmosphere = () => {
    if (isPlayingAtmosphere) {
      soundEngine.stop();
      setIsPlayingAtmosphere(false);
    } else {
      soundEngine.play('track-01', 54);
      setIsPlayingAtmosphere(true);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111111] pb-28">
      {/* Top Breadcrumb & Return Bar */}
      <div className="border-b border-[#111111]/15 bg-[#F3EFE6] px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
          {/* CRITICAL ELEMENT: //a[contains(., 'VOLVER AL ARCHIVO GENERAL')] */}
          <a
            href="#volver-al-archivo"
            onClick={(e) => {
              e.preventDefault();
              onBackToArchive();
            }}
            className="inline-flex items-center gap-2 font-bold text-[#111111] hover:text-[#FF4D22] transition-colors cursor-pointer group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            VOLVER AL ARCHIVO GENERAL
          </a>

          <div className="flex items-center gap-2 text-[#555555]">
            <span>DOC. REF: MANIFIESTO-DELIRIO-01</span>
            <span className="text-[#111111]/30">|</span>
            <span className="text-[#FF4D22] font-bold">EDICIÓN DEFINITIVA</span>
          </div>
        </div>
      </div>

      {/* Manifesto Document Container */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14">
        {/* Document Header Blueprint Block */}
        <div className="border-2 border-[#111111] p-6 sm:p-8 bg-[#FAF7F2] bg-blueprint-grid reticle-corner mb-12">
          {/* Top telemetry tags */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#111111]/20 pb-4 mb-6 gap-2 text-xs font-mono">
            <TechnicalBadge leftText={MANIFESTO_TEXTS.metadata.sheet} rightText={MANIFESTO_TEXTS.metadata.revision} />
            <span className="text-[#555555]">{MANIFESTO_TEXTS.metadata.location}</span>
          </div>

          <div className="space-y-3">
            <div className="text-[11px] font-mono text-[#FF4D22] uppercase tracking-widest font-bold">
              DECLARACIÓN ESTÉTICA FUNDACIONAL // RÍO DE LA PLATA
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[#111111] leading-tight tracking-tight">
              {MANIFESTO_TEXTS.header}
            </h1>

            <p className="font-sans text-base sm:text-lg text-[#555555] italic">
              {MANIFESTO_TEXTS.subtitle}
            </p>

            <div className="pt-2">
              <a
                href="https://www.instagram.com/indraki13/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#FAF7F2] hover:bg-[#FF4D22] text-xs font-mono transition-colors font-bold"
              >
                <span>Instagram Oficial: @indraki13 ↗</span>
              </a>
            </div>
          </div>

          {/* Interactive Acoustic Atmosphere Player */}
          <div className="mt-8 pt-6 border-t border-[#111111]/15 flex flex-wrap items-center justify-between gap-4 bg-[#F3EFE6] p-4 border">
            <div>
              <div className="text-xs font-mono font-bold text-[#111111]">
                {isPlayingAtmosphere ? '● PAISAJE SONORO DEL MANIFIESTO EN CURSO' : '○ PAISAJE SONORO DEL MANIFIESTO'}
              </div>
              <div className="text-[11px] font-mono text-[#555555]">
                Generación en tiempo real: Drone de Río (43.2 Hz), respiración de fuelle y ruido de cinta.
              </div>
            </div>

            <button
              onClick={toggleAtmosphere}
              className={`px-4 py-2 text-xs font-mono font-bold uppercase transition-colors cursor-pointer border ${
                isPlayingAtmosphere
                  ? 'bg-[#FF4D22] text-[#FAF7F2] border-[#FF4D22]'
                  : 'bg-[#111111] text-[#FAF7F2] border-[#111111] hover:bg-[#FF4D22] hover:border-[#FF4D22]'
              }`}
            >
              {isPlayingAtmosphere ? '■ Silenciar Frecuencias' : '▶ Activar Frecuencias [43.2 Hz]'}
            </button>
          </div>
        </div>

        {/* The 4 Theses */}
        <div className="space-y-12 mb-16">
          {MANIFESTO_TEXTS.theses.map((thesis) => (
            <section
              key={thesis.num}
              className="border-b border-[#111111]/15 pb-10 space-y-4"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 bg-[#111111] text-[#FAF7F2] font-mono font-bold text-sm flex items-center justify-center">
                  {thesis.num}
                </span>
                <h2 className="font-mono text-xs sm:text-sm font-bold tracking-wider uppercase text-[#111111]">
                  {thesis.title}
                </h2>
              </div>

              <blockquote className="border-l-2 border-[#FF4D22] pl-4 sm:pl-6 py-1 my-3 bg-[#F3EFE6]/50">
                <p className="font-serif text-xl sm:text-2xl text-[#111111] italic font-normal leading-relaxed">
                  {thesis.quote}
                </p>
              </blockquote>

              <p className="font-sans text-base sm:text-lg text-[#111111]/90 leading-relaxed pt-2">
                {thesis.body}
              </p>
            </section>
          ))}
        </div>

        {/* Archival Photographic Plates & Technical Drawings */}
        <div className="border border-[#111111]/20 bg-[#F3EFE6] p-6 mb-16">
          <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3 mb-6 text-xs font-mono">
            <span className="font-bold text-[#FF4D22]">LÁMINAS DE REGISTRO VISUAL & FÍSICO</span>
            <span className="text-[#555555]">PROYECTO INDRA.WAV // 2025</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="aspect-video bg-black overflow-hidden border border-[#111111]/30 relative">
                <img
                  src="https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80"
                  alt="Placa I - Puerto de Montevideo"
                  className="w-full h-full object-cover filter contrast-125 grayscale"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono bg-black/80 text-[#D9B98C] px-1.5 py-0.5">
                  PLACA I // 35MM KODAK 5219
                </span>
              </div>
              <div className="text-xs font-mono text-[#555555]">
                <strong className="text-[#111111]">FIG. A:</strong> Dársena fluvial bajo niebla de invierno.
                Lente Panavision 40mm a T1.4. Resonancia del eco de sirenas en cascos metálicos.
              </div>
            </div>

            <div className="space-y-2">
              <div className="aspect-video bg-black overflow-hidden border border-[#111111]/30 relative">
                <img
                  src="https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
                  alt="Placa II - Cinta Studer"
                  className="w-full h-full object-cover filter contrast-125"
                />
                <span className="absolute bottom-2 left-2 text-[9px] font-mono bg-black/80 text-[#D9B98C] px-1.5 py-0.5">
                  PLACA II // STUDER A800 24T
                </span>
              </div>
              <div className="text-xs font-mono text-[#555555]">
                <strong className="text-[#111111]">FIG. B:</strong> Cabezales de lectura magnética a 30 IPS.
                Saturación armónica forzada en el canal de sub-bajos a +3dB.
              </div>
            </div>
          </div>
        </div>

        {/* Nocturnal Call Sheet Extraction */}
        <div className="border border-[#111111]/20 bg-[#FAF7F2] p-6 mb-16">
          <div className="border-b border-[#111111]/15 pb-3 mb-4 flex items-center justify-between text-xs font-mono">
            <span className="font-bold text-[#111111]">EXTRACTOS DE BITÁCORA DE RODAJE</span>
            <span className="text-[#FF4D22]">HORARIOS NOCTURNOS (ART)</span>
          </div>

          <div className="divide-y divide-[#111111]/10 text-xs font-mono">
            {MANIFESTO_TEXTS.callSheetLog.map((log, i) => (
              <div key={i} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-bold text-[#FF4D22]">{log.call}</span>
                  <span className="text-[#555555]">[{log.time}]</span>
                  <span className="font-bold text-[#111111]">{log.scene}</span>
                </div>
                <div className="text-[#555555] font-sans sm:max-w-md">
                  {log.notes}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Colophon & Official Seal */}
        <div className="border-t-2 border-[#111111] pt-8 text-center space-y-4">
          <div className="inline-block w-12 h-12 bg-[#111111] text-[#FAF7F2] font-mono text-base font-bold flex items-center justify-center mx-auto">
            IND
          </div>
          <div className="font-serif text-2xl font-bold">
            INDRAKI — REGISTRO FONOGRÁFICO Y CINEMATOGRÁFICO
          </div>
          <div className="flex justify-center items-center gap-2">
            <a
              href="https://www.instagram.com/indraki13/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 border border-[#FF4D22] text-[#FF4D22] hover:bg-[#FF4D22] hover:text-white transition-colors text-xs font-mono font-bold"
            >
              <span>Instagram Oficial: @indraki13 ↗</span>
            </a>
          </div>
          <p className="font-mono text-xs text-[#555555] max-w-lg mx-auto">
            Registrado y archivado entre Montevideo y Buenos Aires por INDRAKI. Todos los derechos sonoros y visuales
            reservados bajo licencia de archivo independiente. Copias maestras en película química de 35mm
            y cinta magnética de 2 pulgadas.
          </p>

          {/* Bottom Return Button (also matching xpath //a[contains(., 'VOLVER AL ARCHIVO GENERAL')]) */}
          <div className="pt-6">
            <a
              href="#volver-al-archivo"
              onClick={(e) => {
                e.preventDefault();
                onBackToArchive();
              }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#111111] text-[#FAF7F2] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#FF4D22] transition-colors cursor-pointer border border-[#111111]"
            >
              ← VOLVER AL ARCHIVO GENERAL
            </a>
          </div>
        </div>
      </article>
    </div>
  );
};

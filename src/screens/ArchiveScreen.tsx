import React, { useState } from 'react';
import { FILMS_DATA, DISCOGRAPHY_DATA, TECHNICAL_SPECS } from '../data/indraData';
import { FilmProject, DiscographyItem, ScreenId } from '../types';
import { TechnicalBadge } from '../components/TechnicalBadge';
import { soundEngine } from '../utils/soundEngine';

interface ArchiveScreenProps {
  onNavigate: (screen: ScreenId, sectionId?: string) => void;
  onOpenReel: (film?: FilmProject) => void;
  activeTrack: DiscographyItem;
  isPlaying: boolean;
  onSelectTrack: (track: DiscographyItem) => void;
  onTogglePlay: () => void;
}

export const ArchiveScreen: React.FC<ArchiveScreenProps> = ({
  onNavigate,
  onOpenReel,
  activeTrack,
  isPlaying,
  onSelectTrack,
  onTogglePlay,
}) => {
  const [selectedFilmFilter, setSelectedFilmFilter] = useState<'all' | '35mm' | '16mm' | '65mm'>('all');
  const [activeTabProcess, setActiveTabProcess] = useState<'gear' | 'signal-chain' | 'callsheet'>('gear');

  const filteredFilms = FILMS_DATA.filter((film) => {
    if (selectedFilmFilter === 'all') return true;
    if (selectedFilmFilter === '35mm') return film.format.includes('35mm');
    if (selectedFilmFilter === '16mm') return film.format.includes('16mm');
    if (selectedFilmFilter === '65mm') return film.format.includes('65mm');
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#111111] pb-28">
      {/* SECTION 1: ARCHITECTURAL HERO & DATUM BENCHMARK
          CRITICAL: //section[1]//h1[1] MUST lead to Screen 2 (Manifesto) */}
      <section className="relative border-b border-[#111111]/20 bg-[#FAF7F2] bg-blueprint-grid pt-8 pb-16 sm:py-20 px-4 sm:px-8 overflow-hidden">
        {/* Architectural Datum Watermarks & Grid Benchmarks */}
        <div className="absolute top-3 left-4 text-[9px] font-mono text-[#D9B98C] uppercase tracking-widest pointer-events-none select-none">
          + DATUM 00 120.000 // POS X-AXIS // SHEET 00-ARCHIVE
        </div>
        <div className="absolute top-3 right-4 text-[9px] font-mono text-[#D9B98C] uppercase tracking-widest pointer-events-none select-none">
          SEC.01 // PLOT SCALE 1:1 // REF 48kHz-96kHz +
        </div>

        <div className="max-w-6xl mx-auto relative z-10">
          {/* Metadata pill header */}
          <div className="flex flex-wrap items-center gap-2 mb-6">
            <TechnicalBadge leftText="SHEET 00" rightText="ARCHIVO GENERAL 2025-2026" />
            <TechnicalBadge leftText="ESTADO" rightText="OPERATIVO // 96kHz 24-BIT" variant="signal" />
            <span className="text-[11px] font-mono text-[#555555] ml-auto hidden sm:inline">
              PRODUCCIÓN AUDIOVISUAL & FONOGRAFÍA RIOPLATENSE
            </span>
          </div>

          {/* CRITICAL ELEMENT: //section[1]//h1[1] */}
          <div className="mb-8">
            <h1
              onClick={() => onNavigate('manifesto')}
              className="cursor-pointer group font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#111111] leading-[1.05] transition-all"
              title="Click para abrir el Manifiesto del Delirio Cinematográfico"
            >
              <span className="block group-hover:text-[#FF4D22] transition-colors">
                INDRAKI
              </span>
              <span className="italic font-light text-[#555555] group-hover:text-[#111111] transition-colors block text-3xl sm:text-5xl md:text-6xl lg:text-7xl mt-1">
                Delirio Cinematográfico & Resonancia Rioplatense
              </span>
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-3 text-xs font-mono text-[#FF4D22]">
              <span className="font-bold underline cursor-pointer" onClick={() => onNavigate('manifesto')}>
                [ LEER MANIFIESTO COMPLETO ↗ ]
              </span>
              <span className="text-[#555555] text-[10px]">
                // Declaración de principios estéticos, sonido turbio y grano óptico
              </span>
              <a
                href="https://www.instagram.com/indraki13/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-2 py-0.5 border border-[#FF4D22] text-[#FF4D22] hover:bg-[#FF4D22] hover:text-white transition-colors"
              >
                <span>INSTAGRAM: @indraki13 ↗</span>
              </a>
            </div>
          </div>

          {/* Hero Technical Overview Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-6 border-t border-[#111111]/15 text-sm">
            <div className="md:col-span-7 space-y-4">
              <p className="font-sans text-base sm:text-lg text-[#111111] leading-relaxed">
                Bitácora de producción, catálogo cinematográfico y banco fonográfico de <strong>INDRAKI</strong>.
                Investigación audiovisual radicada en las márgenes del Río de la Plata (Montevideo / Buenos Aires),
                articulando película química de 35mm y 16mm, lentes anamórficas de alto contraste,
                grabaciones de campo industriales y bandoneón procesado a través de osciladores valvulares.
              </p>

              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={() => onOpenReel()}
                  className="px-5 py-2.5 bg-[#111111] text-[#FAF7F2] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#FF4D22] transition-colors cursor-pointer border border-[#111111]"
                >
                  ● Ver Reel Audiovisual [2025/2026]
                </button>
                <a
                  href="https://www.instagram.com/indraki13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-2.5 bg-[#FAF7F2] text-[#111111] font-mono text-xs uppercase font-bold tracking-wider hover:border-[#FF4D22] hover:text-[#FF4D22] transition-colors cursor-pointer border border-[#111111] inline-flex items-center gap-2"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  <span>Instagram @indraki13</span>
                </a>
                <button
                  onClick={() => onNavigate('manifesto')}
                  className="px-5 py-2.5 bg-transparent text-[#111111] font-mono text-xs uppercase font-bold tracking-wider hover:bg-[#111111] hover:text-[#FAF7F2] transition-colors cursor-pointer border border-[#111111]"
                >
                  Examinar Manifiesto ↗
                </button>
              </div>
            </div>

            <div className="md:col-span-5 bg-[#F3EFE6] border border-[#111111]/15 p-4 sm:p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between border-b border-[#111111]/10 pb-2 text-[10px] font-mono uppercase text-[#555555]">
                  <span>RESUMEN TÉCNICO DE CAMPO</span>
                  <span className="text-[#FF4D22] font-bold">ACTIVO</span>
                </div>
                <div className="space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-[#555555]">ARTISTA / DIRECTOR:</span>
                    <span className="font-bold text-[#111111]">INDRAKI (@indraki13)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">FORMATOS PRIMARIOS:</span>
                    <span className="font-bold text-[#111111]">35mm / 65mm / Super 16</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">SISTEMA ÓPTICO:</span>
                    <span className="font-bold text-[#111111]">Panavision Anamorphic</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">CAPTURA DE AUDIO:</span>
                    <span className="font-bold text-[#111111]">Studer A800 24-Track 2"</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">AFINACIÓN ACÚSTICA:</span>
                    <span className="font-bold text-[#111111]">43.2 Hz / Sub-Bajo Estuario</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-[#111111]/10 flex items-center justify-between text-[10px] font-mono text-[#555555]">
                <span>ÚLTIMA CALIBRACIÓN: OCTUBRE 2025</span>
                <span className="text-[#111111] font-bold">REV C</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED SCREENING / OFFICIAL YOUTUBE VIDEO EMBED */}
      <section className="border-b border-[#111111]/20 bg-[#16181D] text-[#FAF7F2] py-12 px-4 sm:px-8 reticle-corner">
        <div className="max-w-5xl mx-auto">
          {/* Header Bar */}
          <div className="flex flex-wrap items-center justify-between border-b border-[#D9B98C]/30 pb-3 mb-6 gap-2 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D22] animate-pulse" />
              <span className="text-[#FF4D22] font-bold">PROYECCIÓN DESTACADA // INDRAKI</span>
              <span className="text-[#D9B98C] hidden sm:inline">| VIDEO OFICIAL DE ESTUDIO</span>
            </div>
            <a
              href="https://www.instagram.com/indraki13/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[#D9B98C] hover:text-[#FF4D22] transition-colors text-[11px]"
            >
              <span>Instagram Oficial: @indraki13 ↗</span>
            </a>
          </div>

          {/* Embedded YouTube Player with Blueprint Modernism Framing */}
          <div className="relative border border-[#D9B98C]/40 bg-black shadow-2xl p-2 sm:p-4">
            <div className="relative w-full aspect-video overflow-hidden border border-[#D9B98C]/20">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/-nDtNHDbX1M?si=zOpdYezKGNSP9maJ"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="w-full h-full"
              />
            </div>

            {/* Bottom Telemetry for Video */}
            <div className="flex flex-wrap items-center justify-between pt-3 text-[11px] font-mono text-[#D9B98C] gap-2">
              <div className="flex items-center gap-3">
                <span className="text-white font-bold">INDRAKI // OBRA AUDIOVISUAL</span>
                <span>• EMISIÓN EN STREAMING DCI</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[#FF4D22]">REF: YT-NDTNHD</span>
                <span className="text-[#555555]">|</span>
                <a
                  href="https://www.instagram.com/indraki13/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-[#FF4D22] underline"
                >
                  @indraki13
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: SELECTED FILMS (FILMOGRAFÍA SELECCIONADA) */}
      <section id="selected-films" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Section Header with Drafting Metadata */}
        <div className="border-b-2 border-[#111111] pb-4 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#FF4D22]">01 // FILMOGRAFÍA</span>
              <span className="text-xs font-mono text-[#555555]">| CATÁLOGO AUDIONAVAL</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#111111] font-normal">
              Películas, Cortometrajes & Ensayos Ópticos
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-mono">
            <span className="text-[#555555] mr-2 hidden sm:inline">EMULSIÓN:</span>
            {(['all', '35mm', '16mm', '65mm'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilmFilter(filter)}
                className={`px-3 py-1 border transition-all cursor-pointer uppercase ${
                  selectedFilmFilter === filter
                    ? 'bg-[#111111] text-[#FAF7F2] border-[#111111] font-bold'
                    : 'bg-transparent text-[#111111] border-[#111111]/30 hover:border-[#111111]'
                }`}
              >
                {filter === 'all' ? 'Todos' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Film Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredFilms.map((film) => (
            <article
              key={film.id}
              className="bg-[#F3EFE6] border border-[#111111]/20 p-5 sm:p-6 flex flex-col justify-between relative group hover:border-[#111111] transition-all reticle-corner shadow-none"
            >
              <div>
                {/* Top Utility Bar */}
                <div className="flex items-center justify-between border-b border-[#111111]/15 pb-3 mb-4 text-[11px] font-mono">
                  <TechnicalBadge leftText={film.sheetNo} rightText={film.revision} />
                  <span className="text-[#555555] tracking-widest">{film.year} // {film.duration}</span>
                </div>

                {/* Film Title & Role */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono text-[#FF4D22] uppercase tracking-widest mb-1">
                    {film.role}
                  </div>
                  <h3 className="font-serif text-3xl sm:text-4xl text-[#111111] font-normal leading-tight group-hover:text-[#FF4D22] transition-colors">
                    {film.title}
                  </h3>
                  {film.awards && (
                    <div className="mt-1 text-xs font-mono text-[#111111] bg-[#D9B98C]/30 px-2 py-0.5 inline-block border-l-2 border-[#111111]">
                      ★ {film.awards}
                    </div>
                  )}
                </div>

                {/* Still preview container with anamorphic ratio */}
                <div
                  onClick={() => onOpenReel(film)}
                  className="relative overflow-hidden border border-[#111111]/25 mb-5 cursor-pointer bg-black group/still"
                  style={{ aspectRatio: '2.39 / 1' }}
                >
                  <img
                    src={film.stillPlaceholder}
                    alt={film.title}
                    className="w-full h-full object-cover filter grayscale contrast-125 group-hover/still:grayscale-0 group-hover/still:scale-105 transition-all duration-500"
                  />
                  {/* Overlay telemetry */}
                  <div className="absolute inset-0 bg-black/40 group-hover/still:bg-black/10 transition-colors p-3 flex flex-col justify-between text-[10px] font-mono text-white pointer-events-none">
                    <div className="flex justify-between">
                      <span className="bg-black/70 px-1.5 py-0.5">{film.aspectRatio}</span>
                      <span className="bg-[#FF4D22] px-1.5 py-0.5 font-bold">● VER CARRETE</span>
                    </div>
                    <div className="flex justify-between items-end">
                      <span className="bg-black/70 px-1.5 py-0.5 truncate max-w-[200px]">{film.lens}</span>
                      <span className="bg-black/70 px-1.5 py-0.5">{film.location}</span>
                    </div>
                  </div>
                </div>

                {/* Logline */}
                <p className="font-sans text-sm text-[#111111]/90 leading-relaxed mb-4">
                  {film.logline}
                </p>

                {/* Technical Specifications Matrix */}
                <div className="bg-[#FAF7F2] border border-[#111111]/15 p-3.5 space-y-2 text-xs font-mono mb-4">
                  <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                    <span className="text-[#555555]">FORMATO FÍSICO:</span>
                    <span className="text-[#111111] font-semibold">{film.format}</span>
                  </div>
                  <div className="flex justify-between border-b border-[#111111]/10 pb-1">
                    <span className="text-[#555555]">ÓPTICA:</span>
                    <span className="text-[#111111] font-semibold">{film.lens}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#555555]">MASTER SONORO:</span>
                    <span className="text-[#FF4D22] font-semibold">{film.soundFormat}</span>
                  </div>
                </div>

                {/* Technical Shoot Notes */}
                <div className="space-y-1 mb-5">
                  <span className="text-[10px] font-mono text-[#555555] uppercase block font-bold">
                    NOTAS DE RODAJE & LABORATORIO:
                  </span>
                  <ul className="list-none space-y-1 text-xs text-[#555555] font-sans">
                    {film.technicalNotes.map((note, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#FF4D22] font-mono text-[10px]">↳</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom Actions and Color Palette */}
              <div className="border-t border-[#111111]/15 pt-3.5 flex items-center justify-between">
                {/* Color swatches */}
                <div className="flex items-center gap-1.5">
                  <span className="text-[9px] font-mono text-[#555555] mr-1">LUT:</span>
                  {film.colorPalette.map((col, i) => (
                    <div
                      key={i}
                      className="w-4 h-4 border border-[#111111]/30"
                      style={{ backgroundColor: col }}
                      title={`Color Hex: ${col}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => onOpenReel(film)}
                  className="px-3.5 py-1.5 bg-[#111111] text-[#FAF7F2] text-xs font-mono uppercase font-bold hover:bg-[#FF4D22] transition-colors cursor-pointer"
                >
                  [● Cargar en Sala]
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* SECTION 3: DISCOGRAPHY & SOUND CATALOG */}
      <section id="discography" className="border-t border-b border-[#111111]/20 bg-[#F3EFE6] py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="border-b-2 border-[#111111] pb-4 mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-[#FF4D22]">02 // DISCOGRAFÍA</span>
                <span className="text-xs font-mono text-[#555555]">| CATÁLOGO FONOGRÁFICO & MASTERING</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif text-[#111111] font-normal">
                Grabaciones en Cinta, Frecuencias y Stems
              </h2>
            </div>
            <div className="text-xs font-mono text-[#555555]">
              STUDER A800 // 24-TRACK // 30 IPS MASTER
            </div>
          </div>

          {/* Discography Tracks Table / Cards */}
          <div className="space-y-4">
            {DISCOGRAPHY_DATA.map((track) => {
              const isThisPlaying = isPlaying && activeTrack.id === track.id;

              return (
                <div
                  key={track.id}
                  className={`border transition-all p-4 sm:p-6 ${
                    activeTrack.id === track.id
                      ? 'bg-[#FAF7F2] border-[#111111] shadow-sm'
                      : 'bg-[#FAF7F2]/60 border-[#111111]/15 hover:border-[#111111]'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                    {/* Track Play Button & Basic Code */}
                    <div className="md:col-span-4 flex items-center gap-3">
                      <button
                        onClick={() => {
                          if (activeTrack.id === track.id) {
                            onTogglePlay();
                          } else {
                            onSelectTrack(track);
                            soundEngine.play(track.id, track.bpm);
                          }
                        }}
                        className={`w-10 h-10 border flex items-center justify-center font-mono font-bold text-xs cursor-pointer transition-colors ${
                          isThisPlaying
                            ? 'bg-[#FF4D22] text-[#FAF7F2] border-[#FF4D22]'
                            : 'bg-[#111111] text-[#FAF7F2] border-[#111111] hover:bg-[#FF4D22] hover:border-[#FF4D22]'
                        }`}
                        title={isThisPlaying ? 'Pausar' : 'Reproducir'}
                      >
                        {isThisPlaying ? '■' : '▶'}
                      </button>

                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono text-[#FF4D22] font-bold">
                            {track.trackCode}
                          </span>
                          <span className="text-[10px] font-mono text-[#555555]">
                            {track.album} ({track.year})
                          </span>
                        </div>
                        <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#111111]">
                          {track.title}
                        </h4>
                      </div>
                    </div>

                    {/* Metadata & Specs */}
                    <div className="md:col-span-4 space-y-1 text-xs font-mono">
                      <div className="text-[#555555]">
                        DURACIÓN: <span className="text-[#111111] font-bold">{track.duration}</span> • BPM:{' '}
                        <span className="text-[#111111] font-bold">{track.bpm}</span> • TONALIDAD:{' '}
                        <span className="text-[#111111] font-bold">{track.key}</span>
                      </div>
                      <div className="text-[11px] text-[#555555] truncate" title={track.masterSpecs}>
                        MASTER: <span className="text-[#111111]">{track.masterSpecs}</span>
                      </div>
                      <div className="text-[11px] text-[#555555]">
                        ATMÓSFERA: <span className="italic text-[#111111]">{track.mood}</span>
                      </div>
                    </div>

                    {/* Stems Badges & Actions */}
                    <div className="md:col-span-4 flex flex-col items-start md:items-end gap-2">
                      <div className="flex flex-wrap gap-1">
                        {track.stems.map((stem, sIdx) => (
                          <span
                            key={sIdx}
                            className="px-2 py-0.5 bg-[#F3EFE6] border border-[#111111]/20 text-[10px] font-mono text-[#111111]"
                          >
                            {stem}
                          </span>
                        ))}
                      </div>

                      <div className="text-[11px] font-mono text-[#555555] mt-1">
                        {track.description}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION 4: PROCESS & OPTICAL LABORATORY */}
      <section id="process-and-tech" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="border-b-2 border-[#111111] pb-4 mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-mono font-bold text-[#FF4D22]">03 // PROCESO & ESPECIFICACIONES</span>
              <span className="text-xs font-mono text-[#555555]">| HARDWARE ANALÓGICO & RIGS ÓPTICOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-[#111111] font-normal">
              Laboratorio Técnico & Cadena de Audio
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {(['gear', 'signal-chain', 'callsheet'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTabProcess(tab)}
                className={`px-3 py-1 text-xs font-mono border uppercase cursor-pointer transition-colors ${
                  activeTabProcess === tab
                    ? 'bg-[#111111] text-[#FAF7F2] border-[#111111] font-bold'
                    : 'border-[#111111]/30 text-[#111111] hover:border-[#111111]'
                }`}
              >
                {tab === 'gear' ? '01. Equipamiento' : tab === 'signal-chain' ? '02. Cadena de Señal' : '03. Call Sheet'}
              </button>
            ))}
          </div>
        </div>

        {/* Tab 1: Gear Inventory */}
        {activeTabProcess === 'gear' && (
          <div className="border border-[#111111]/20 bg-[#FAF7F2] overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-[#F3EFE6] border-b border-[#111111]/20 text-[#555555] uppercase">
                <tr>
                  <th className="py-3 px-4">CATEGORÍA</th>
                  <th className="py-3 px-4">DISPOSITIVO / INSTRUMENTO</th>
                  <th className="py-3 px-4">ESPECIFICACIÓN DE LABORATORIO</th>
                  <th className="py-3 px-4">REF SERIAL</th>
                  <th className="py-3 px-4">FUNCIÓN EN ESTUDIO</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#111111]/10">
                {TECHNICAL_SPECS.map((gear, i) => (
                  <tr key={i} className="hover:bg-[#F3EFE6]/50 transition-colors">
                    <td className="py-3 px-4 font-bold text-[#FF4D22]">{gear.category}</td>
                    <td className="py-3 px-4 font-bold text-[#111111]">{gear.item}</td>
                    <td className="py-3 px-4 text-[#555555]">{gear.spec}</td>
                    <td className="py-3 px-4 font-mono text-[10px] text-[#555555]">{gear.serialRef}</td>
                    <td className="py-3 px-4 text-[#111111]">{gear.roleInStudio}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Tab 2: Signal Chain Schematic Drafting */}
        {activeTabProcess === 'signal-chain' && (
          <div className="bg-[#16181D] text-[#FAF7F2] border border-[#D9B98C]/40 p-6 sm:p-8 reticle-corner space-y-6">
            <div className="flex items-center justify-between border-b border-[#D9B98C]/30 pb-3">
              <span className="font-mono text-xs text-[#FF4D22] font-bold">
                DIAGRAMA ESQUEMÁTICO // FLUJO DE GRABACIÓN & CONVERSIÓN
              </span>
              <span className="font-mono text-xs text-[#D9B98C]">
                ESCALA 1:1 • IMPEDANCIA 600 OHMS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center font-mono text-xs">
              <div className="border border-[#D9B98C]/40 p-4 bg-[#111111]">
                <div className="text-[10px] text-[#FF4D22]">ETAPA 01: CAPTURA</div>
                <div className="font-bold text-sm text-white mt-1">BANDONEÓN AA (1938)</div>
                <div className="text-[10px] text-[#D9B98C] mt-1">Mic Hidrófono + Neumman U67</div>
              </div>

              <div className="flex items-center justify-center text-[#FF4D22] font-bold text-xl">
                →
              </div>

              <div className="border border-[#D9B98C]/40 p-4 bg-[#111111]">
                <div className="text-[10px] text-[#FF4D22]">ETAPA 02: PREAMPLIFICACIÓN</div>
                <div className="font-bold text-sm text-white mt-1">NEVE 1073 + PULTEC EQ</div>
                <div className="text-[10px] text-[#D9B98C] mt-1">Transformadores Marinair</div>
              </div>

              <div className="flex items-center justify-center text-[#FF4D22] font-bold text-xl">
                →
              </div>

              <div className="border border-[#D9B98C]/40 p-4 bg-[#111111]">
                <div className="text-[10px] text-[#FF4D22]">ETAPA 03: SATURACIÓN CINTA</div>
                <div className="font-bold text-sm text-white mt-1">STUDER A800 24T</div>
                <div className="text-[10px] text-[#D9B98C] mt-1">30 IPS • Cinta ATR 2"</div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#D9B98C]/20 flex flex-wrap items-center justify-between text-xs font-mono text-[#D9B98C]">
              <span>CALIBRACIÓN DE CABEZALES: AZIMUTH 90° // BIAS OVERBIAS +3dB</span>
              <span className="text-[#FF4D22] font-bold">TOTAL HARMONIC DISTORTION: 0.8% ANALOG WARMTH</span>
            </div>
          </div>
        )}

        {/* Tab 3: Call Sheet Log */}
        {activeTabProcess === 'callsheet' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#FAF7F2] border border-[#111111]/20 p-5">
              <div className="flex justify-between text-[10px] font-mono border-b border-[#111111]/15 pb-2 mb-3">
                <span className="font-bold text-[#FF4D22]">CALL 01 // NOCTURNO</span>
                <span>02:30 ART</span>
              </div>
              <h4 className="font-serif text-lg font-bold mb-1">Dársena Sur / Puerto de La Boca</h4>
              <p className="text-xs text-[#555555] font-sans leading-relaxed">
                Temperatura 6°C con 98% humedad. Vaho sobre las lentes. Rodaje con emulsión Kodak 500T forzada a 1000 ISO.
                Sonido directo de sirenas y olas contra el muelle.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#111111]/20 p-5">
              <div className="flex justify-between text-[10px] font-mono border-b border-[#111111]/15 pb-2 mb-3">
                <span className="font-bold text-[#FF4D22]">CALL 02 // SUBTERRÁNEO</span>
                <span>04:45 ART</span>
              </div>
              <h4 className="font-serif text-lg font-bold mb-1">Túneles de la Estación Central MVD</h4>
              <p className="text-xs text-[#555555] font-sans leading-relaxed">
                Captura de impulsos de respuesta (reverb) con disparos de fogueo calibre 38. Bandoneón tocado a 15 metros bajo tierra.
                Lente Switar 10mm T1.4.
              </p>
            </div>

            <div className="bg-[#FAF7F2] border border-[#111111]/20 p-5">
              <div className="flex justify-between text-[10px] font-mono border-b border-[#111111]/15 pb-2 mb-3">
                <span className="font-bold text-[#FF4D22]">CALL 03 // HORA AZUL</span>
                <span>18:15 ART</span>
              </div>
              <h4 className="font-serif text-lg font-bold mb-1">Escollera Sarandí / Faro de Montevideo</h4>
              <p className="text-xs text-[#555555] font-sans leading-relaxed">
                Luz natural filtrada por la bruma del río. Viento del este a 35 nudos. Tomas en película de 65mm con óptica Cineovision.
                Grabación binaural del viento contra el muro de piedra.
              </p>
            </div>
          </div>
        )}
      </section>

      {/* FOOTER CALLOUT TO MANIFESTO */}
      <section className="bg-[#111111] text-[#FAF7F2] py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="text-[10px] font-mono text-[#FF4D22] uppercase tracking-widest mb-1">
              DOCUMENTO TEÓRICO FUNDACIONAL
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif text-white">
              ¿Desea examinar los principios del Delirio Cinematográfico?
            </h3>
            <p className="text-xs font-mono text-[#FAF7F2]/60 mt-1 max-w-xl">
              Un manifiesto sobre el río como espejo de azufre, el grano como resistencia política y la transmutación del tango a través de osciladores analógicos.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="https://www.instagram.com/indraki13/"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3 bg-transparent text-[#FAF7F2] font-mono font-bold text-xs uppercase tracking-wider hover:bg-white hover:text-[#111111] transition-colors cursor-pointer border border-[#FAF7F2]/40 whitespace-nowrap inline-flex items-center gap-2"
            >
              <span>Instagram @indraki13 ↗</span>
            </a>
            <button
              onClick={() => onNavigate('manifesto')}
              className="px-6 py-3 bg-[#FF4D22] text-[#FAF7F2] font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#E63B10] transition-colors cursor-pointer border border-[#FF4D22] whitespace-nowrap"
            >
              Abrir Manifiesto ↗
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

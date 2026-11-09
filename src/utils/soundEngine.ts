/**
 * Web Audio Synthetic Engine for INDRA.WAV
 * Produces authentic avant-garde rioplatense ambient tape drone,
 * bandoneón microtonal textures, analog warmth and low-end pressure.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentTrackId: string | null = null;
  
  // Nodes
  private masterGain: GainNode | null = null;
  private analyser: AnalyserNode | null = null;
  
  // Stems gains
  private subGain: GainNode | null = null;
  private reedGain: GainNode | null = null;
  private noiseGain: GainNode | null = null;
  private pulseGain: GainNode | null = null;
  
  // Oscillators and intervals
  private oscillators: OscillatorNode[] = [];
  private noiseNode: AudioNode | null = null;
  private pulseTimer: number | null = null;

  public stemMutes: Record<string, boolean> = {
    sub: false,
    reed: false,
    noise: false,
    pulse: false,
  };

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 128;
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);

      // Stems
      this.subGain = this.ctx.createGain();
      this.reedGain = this.ctx.createGain();
      this.noiseGain = this.ctx.createGain();
      this.pulseGain = this.ctx.createGain();

      this.subGain.connect(this.masterGain);
      this.reedGain.connect(this.masterGain);
      this.noiseGain.connect(this.masterGain);
      this.pulseGain.connect(this.masterGain);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public play(trackId: string, bpm: number = 68) {
    this.initContext();
    if (!this.ctx || !this.masterGain) return;

    this.stop();
    this.isPlaying = true;
    this.currentTrackId = trackId;

    const t = this.ctx.currentTime;

    // 1. Sub Bass Drone (Low F# / D)
    const baseFreq = trackId.includes('02') ? 55.0 : 46.25; // A1 or F#1
    const subOsc = this.ctx.createOscillator();
    subOsc.type = 'triangle';
    subOsc.frequency.setValueAtTime(baseFreq, t);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(140, t);

    subOsc.connect(subFilter);
    if (this.subGain) subFilter.connect(this.subGain);
    subOsc.start(t);
    this.oscillators.push(subOsc);

    // 2. Microtonal Bandoneón / Reed Texture (detuned saws with envelope)
    const reedFreqs = [baseFreq * 2, baseFreq * 3.01, baseFreq * 4.98];
    reedFreqs.forEach((freq, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, t);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450 + idx * 180, t);
      filter.Q.setValueAtTime(3.5, t);

      const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
      if (panner) panner.pan.setValueAtTime((idx - 1) * 0.4, t);

      if (panner && this.reedGain) {
        osc.connect(filter);
        filter.connect(panner);
        panner.connect(this.reedGain);
      } else if (this.reedGain) {
        osc.connect(filter);
        filter.connect(this.reedGain);
      }
      osc.start(t);
      this.oscillators.push(osc);
    });

    // 3. Tape Hiss & Vinyl River Noise
    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.04;
    }
    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1200, t);

    whiteNoise.connect(noiseFilter);
    if (this.noiseGain) noiseFilter.connect(this.noiseGain);
    whiteNoise.start(t);
    this.noiseNode = whiteNoise;

    // 4. Subtle periodic heartbeat / sync pulse
    const intervalMs = (60 / bpm) * 1000;
    this.pulseTimer = window.setInterval(() => {
      if (!this.ctx || !this.pulseGain || !this.isPlaying || this.stemMutes.pulse) return;
      const now = this.ctx.currentTime;
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();
      kickOsc.frequency.setValueAtTime(90, now);
      kickOsc.frequency.exponentialRampToValueAtTime(30, now + 0.12);
      kickGain.gain.setValueAtTime(0.5, now);
      kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      kickOsc.connect(kickGain);
      kickGain.connect(this.pulseGain);
      kickOsc.start(now);
      kickOsc.stop(now + 0.16);
    }, intervalMs);

    this.updateStemGains();
  }

  public stop() {
    this.oscillators.forEach(osc => {
      try { osc.stop(); osc.disconnect(); } catch {}
    });
    this.oscillators = [];

    if (this.noiseNode) {
      try {
        (this.noiseNode as AudioBufferSourceNode).stop();
        this.noiseNode.disconnect();
      } catch {}
      this.noiseNode = null;
    }

    if (this.pulseTimer) {
      clearInterval(this.pulseTimer);
      this.pulseTimer = null;
    }

    this.isPlaying = false;
    this.currentTrackId = null;
  }

  public toggleStem(stemKey: 'sub' | 'reed' | 'noise' | 'pulse') {
    this.stemMutes[stemKey] = !this.stemMutes[stemKey];
    this.updateStemGains();
  }

  private updateStemGains() {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.subGain) this.subGain.gain.setTargetAtTime(this.stemMutes.sub ? 0 : 0.8, t, 0.05);
    if (this.reedGain) this.reedGain.gain.setTargetAtTime(this.stemMutes.reed ? 0 : 0.45, t, 0.05);
    if (this.noiseGain) this.noiseGain.gain.setTargetAtTime(this.stemMutes.noise ? 0 : 0.35, t, 0.05);
    if (this.pulseGain) this.pulseGain.gain.setTargetAtTime(this.stemMutes.pulse ? 0 : 0.65, t, 0.05);
  }

  public getByteFrequencyData(dataArray: Uint8Array) {
    if (this.analyser && this.isPlaying) {
      // Cast for TypeScript 5.5+ DOM type definition compatibility
      (this.analyser as unknown as { getByteFrequencyData: (arr: Uint8Array) => void }).getByteFrequencyData(dataArray);
    } else {
      dataArray.fill(0);
    }
  }

  public getStatus() {
    return {
      isPlaying: this.isPlaying,
      currentTrackId: this.currentTrackId,
      stemMutes: { ...this.stemMutes }
    };
  }
}

export const soundEngine = new SoundEngine();

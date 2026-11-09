export interface FilmProject {
  id: string;
  sheetNo: string;
  revision: string;
  title: string;
  year: string;
  role: string;
  format: string;
  aspectRatio: string;
  lens: string;
  soundFormat: string;
  duration: string;
  logline: string;
  location: string;
  technicalNotes: string[];
  awards?: string;
  colorPalette: string[];
  stillPlaceholder: string;
  videoPlaceholderUrl?: string;
}

export interface DiscographyItem {
  id: string;
  trackCode: string;
  title: string;
  album: string;
  year: string;
  duration: string;
  bpm: number;
  key: string;
  stems: string[];
  masterSpecs: string;
  mood: string;
  description: string;
}

export interface TechnicalGear {
  category: string;
  item: string;
  spec: string;
  serialRef: string;
  roleInStudio: string;
}

export type ScreenId = 'archive' | 'manifesto';

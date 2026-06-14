export interface Config {
  handwritingFont: string;
  fontSize: string;
  inkColor: string;
  letterSpacing: string;
  wordSpacing: string;
  lineSpacing: string;
  lineOffset: string;
  topPadding: string;
  paperLines: boolean;
  pageEffect: 'none' | 'shadows' | 'scanner' | 'vintage' | 'warm-glow' | 'crumpled';
  resolution: number;
  paperImage?: string;
}

export const DEFAULT_CONFIG: Config = {
  handwritingFont: 'Caveat',
  fontSize: '12',
  inkColor: '#000f55',
  letterSpacing: '0',
  wordSpacing: '0',
  lineSpacing: '24',
  lineOffset: '0',
  topPadding: '10',
  paperLines: true,
  pageEffect: 'none',
  resolution: 2,
};

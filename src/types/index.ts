export interface Config {
  handwritingFont: string;
  fontSize: string;
  inkColor: string;
  letterSpacing: string;
  wordSpacing: string;
  topPadding: string;
  paperLines: boolean;
  pageEffect: 'none' | 'shadows' | 'scanner';
  resolution: number;
  paperImage?: string;
}

export const DEFAULT_CONFIG: Config = {
  handwritingFont: 'Caveat',
  fontSize: '12',
  inkColor: '#000f55',
  letterSpacing: '0',
  wordSpacing: '0',
  topPadding: '10',
  paperLines: true,
  pageEffect: 'none',
  resolution: 2,
};

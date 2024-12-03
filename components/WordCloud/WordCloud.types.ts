export interface WordCloudProps {
  words: {
    [word: string]: [number, number];
  };
}

export interface Word {
  text: string;
  size: number;
  value: number;
  frequency: number;
  x?: number;
  y?: number;
}

export interface Movie {
  id: string;
  title: string;
  rating: number;
  cover: string;
  release: string;
}

export interface MovieDetail {
  id: string;
  title: string;
  rating: number;
  imageUrl: string;
  year: number;
  director: string[];
  duration: string;
  genre: string[];
  plot: string;
  cast: string[];
  reviews?: MovieReview[];
  revenue?: number;
  ROI: number;
  actors: string[];
  age: number;
  boxoffice: number;
  budget: number;
  cover: string;
  directors: string[];
  genres: string[];
  link: string;
  origin: string;
  ratings: { [key: string]: number };
  release: string;
  runtime: number;
  wordcloud: {
    [word: string]: [number, number];
  };
}

export interface MovieReview {
  id: string;
  userId: string;
  rating: number;
  comment: string;
  date: string;
}

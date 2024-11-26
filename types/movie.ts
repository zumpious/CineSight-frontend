export interface Movie {
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
  }

  export interface MovieReview {
    id: string;
    userId: string;
    rating: number;
    comment: string;
    date: string;
  }
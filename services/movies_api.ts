import { Movie } from '@/types/movie';
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export interface MovieFilters {
  year?: number;
  rating?: number;
  page?: number;
  page_size?: number;
}

export interface MovieResponse {
  movies: Movie[];
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    has_next: boolean;
    has_previous: boolean;
  };
}

export const fetchMovies = async (
  filters: MovieFilters = {}
): Promise<MovieResponse> => {
  const params = new URLSearchParams();

  if (filters.year) params.append('year', filters.year.toString());
  if (filters.rating) params.append('rating', filters.rating.toString());
  if (filters.page) params.append('page', filters.page.toString());
  if (filters.page_size)
    params.append('page_size', filters.page_size.toString());

  const response = await axios.get<MovieResponse>(
    `${API_BASE_URL}/movies?${params.toString()}`
  );
  return response.data;
};

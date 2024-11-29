// api/movies.ts
import axios from "axios";
import { Movie } from "@/types/movie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export interface MovieFilters {
  year?: number;
  rating?: number;
  limit?: number;
  offset?: number;
}

export const fetchMovies = async (filters: MovieFilters = {}): Promise<Movie[]> => {
  const params = new URLSearchParams();
  
  if (filters.year) params.append('year', filters.year.toString());
  if (filters.rating) params.append('rating', filters.rating.toString());
  if (filters.limit) params.append('limit', filters.limit.toString());
  if (filters.offset) params.append('offset', filters.offset.toString());

  const response = await axios.get<Movie[]>(`${API_BASE_URL}/movies?${params.toString()}`);
  return response.data;
};
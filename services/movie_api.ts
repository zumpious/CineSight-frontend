import axios from 'axios';
import { MovieDetail } from '@/types/movie';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const fetchMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);

  console.log(response.data);

  return response.data;
};
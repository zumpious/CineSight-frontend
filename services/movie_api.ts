import axios from 'axios';
import { MovieDetail } from '@/types/movie';

const API_BASE_URL = 'http://localhost:8000/api';

export const fetchMovieById = async (id: string): Promise<MovieDetail> => {
  const response = await axios.get(`${API_BASE_URL}/movies/${id}`);

  console.log(response.data);

  return response.data;
};
import axios from "axios";
import { Movie } from "@/types/movie";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error('NEXT_PUBLIC_API_BASE_URL is not defined');
}

export const fetchPreview = async (): Promise<Movie[]> => {
  const response = await axios.get<Movie[]>(`${API_BASE_URL}/preview`);
  return response.data;
};
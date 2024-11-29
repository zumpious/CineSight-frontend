'use client';
import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard/MovieCard';
import { fetchMovies, MovieFilters } from '@/services/movies_api';
import { Movie } from '@/types/movie';

const ITEMS_PER_PAGE = 8;
const YEARS = Array.from({length: 43}, (_, i) => 2022 - i);
const RATINGS = Array.from({length: 10}, (_, i) => i + 1);

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [selectedYear, setSelectedYear] = useState<number | null>(2022);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const loadMovies = async (reset: boolean = false) => {
    setLoading(true);
    try {
      const newOffset = reset ? 0 : offset;
      const filters = {
        year: selectedYear || undefined,
        rating: selectedRating || undefined,
        limit: ITEMS_PER_PAGE,
        offset: newOffset,
      };
      
      const newMovies = await fetchMovies(filters);
      setMovies(reset ? newMovies : [...movies, ...newMovies]);
      setOffset(reset ? ITEMS_PER_PAGE : offset + ITEMS_PER_PAGE);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchInitialMovies = async () => {
      await loadMovies(true);
    };
    fetchInitialMovies();
  }, [selectedYear, selectedRating]); 

  const handleYearClick = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Movies</h1>

        {/* Year filters */}
        <div className="mb-6">
          <h2 className="text-xl mb-3">Filter by Year</h2>
          <div className="flex flex-wrap gap-2">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`px-3 py-1 rounded ${
                  selectedYear === year 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Rating filters */}
        <div className="mb-8">
          <h2 className="text-xl mb-3">Filter by Rating</h2>
          <div className="flex flex-wrap gap-2">
            {RATINGS.map(rating => (
              <button
                key={rating}
                onClick={() => handleRatingClick(rating)}
                className={`px-3 py-1 rounded ${
                  selectedRating === rating 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {rating}
              </button>
            ))}
          </div>
        </div>

        {loading && <div className="text-center">Loading...</div>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              {...movie}
            />
          ))}
        </div>

        {movies.length > 0 && !loading && (
          <div className="mt-8 text-center">
            <button
              onClick={() => loadMovies()}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
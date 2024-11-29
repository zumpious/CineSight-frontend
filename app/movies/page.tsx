'use client';
import { useState, useEffect } from 'react';
import MovieCard from '@/components/MovieCard/MovieCard';
import { fetchMovies } from '@/services/movies_api';
import { Movie } from '@/types/movie';

const YEARS = Array.from({ length: 43 }, (_, i) => 2022 - i);
const RATINGS = Array.from({ length: 10 }, (_, i) => i + 1);

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(2022);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const loadMovies = async () => {
    setLoading(true);
    try {
      const filters = {
        year: selectedYear || undefined,
        rating: selectedRating || undefined,
      };

      const newMovies = await fetchMovies(filters);
      setMovies(newMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [selectedYear, selectedRating]);

  const handleYearClick = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:gap-8">
        {/* Mobile Filters - Displayed Above Movies */}
        <div className="block md:hidden w-full pt-10">
          <div className="mb-4">
            <label htmlFor="mobile-year-filter" className="block text-3xl font-medium mb-2">
              Filter by Year
            </label>
            <select
              id="mobile-year-filter"
              value={selectedYear || ''}
              onChange={(e) => setSelectedYear(Number(e.target.value) || null)}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">All Years</option>
              {YEARS.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="mobile-rating-filter" className="block text-3xl font-medium mb-2">
              Filter by Rating
            </label>
            <select
              id="mobile-rating-filter"
              value={selectedRating || ''}
              onChange={(e) => setSelectedRating(Number(e.target.value) || null)}
              className="w-full p-2 border rounded text-black"
            >
              <option value="">All Ratings</option>
              {RATINGS.map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Sticky Sidebar - Only on Laptop and Above */}
        <div className="hidden md:block w-1/4 sticky top-0 h-screen pt-10 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Filters</h1>

          {/* Year filters */}
          <div className="mb-6">
            <h2 className="text-xl mb-3">Filter by Year</h2>
            <div className="grid grid-cols-4 gap-2 pr-4">
              {YEARS.map((year) => (
                <button
                  key={year}
                  onClick={() => handleYearClick(year)}
                  className={`
                    px-2 h-6
                    flex items-center justify-center
                    rounded
                    text-sm
                    ${selectedYear === year
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {year}
                </button>
              ))}
            </div>
          </div>

          {/* Rating filters */}
          <div className="mb-8">
            <h2 className="text-xl mb-3">Filter by Rating</h2>
            <div className="grid grid-cols-5 gap-2 pr-4">
              {RATINGS.map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleRatingClick(rating)}
                  className={`
                    px-2 h-6
                    flex items-center justify-center
                    rounded
                    text-sm
                    ${selectedRating === rating
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }
                  `}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 pt-10">
          <h1 className="text-3xl font-bold mb-8">Movies</h1>

          {loading && <div className="text-center">Loading...</div>}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

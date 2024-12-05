'use client';
import FilterButton from '@/components/FilterButton';
import FilterSelect from '@/components/FilterSelect';
import LoadMoreButton from '@/components/LoadMoreButton';
import MovieCard from '@/components/MovieCard/MovieCard';
import {
  fetchMovies,
  MovieFilters,
  MovieResponse,
} from '@/services/movies_api';
import { Movie } from '@/types/movie';
import { useEffect, useState } from 'react';

const YEARS = Array.from({ length: 43 }, (_, i) => 2022 - i);
const RATINGS = Array.from({ length: 10 }, (_, i) => i + 1);
const PAGE_SIZE = 20;

export default function MoviesPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedYear, setSelectedYear] = useState<number | null>(2022);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);

  const loadMovies = async (page: number = 1) => {
    setLoading(true);
    try {
      const filters: MovieFilters = {
        year: selectedYear || undefined,
        rating: selectedRating || undefined,
        page,
        page_size: PAGE_SIZE,
      };

      const response: MovieResponse = await fetchMovies(filters);
      setMovies((prevMovies) =>
        page === 1 ? response.movies : [...prevMovies, ...response.movies]
      );
      setHasNext(response.pagination.has_next);
      setCurrentPage(response.pagination.current_page);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies(1);
  }, [selectedYear, selectedRating]);

  const handleYearClick = (year: number) => {
    setSelectedYear(selectedYear === year ? null : year);
  };

  const handleRatingClick = (rating: number) => {
    setSelectedRating(selectedRating === rating ? null : rating);
  };

  const handleLoadMore = () => {
    if (hasNext) {
      loadMovies(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 flex flex-col md:flex-row md:gap-8">
        {/* Mobile Filters - Displayed Above Movies */}
        <div className="block md:hidden w-full pt-10">
          <FilterSelect<number>
            label="Filter by Year"
            id="mobile-year-filter"
            value={selectedYear}
            onChange={(value) => setSelectedYear(value)}
            options={YEARS}
            allLabel="All Years"
          />
          <FilterSelect<number>
            label="Filter by Rating"
            id="mobile-rating-filter"
            value={selectedRating}
            onChange={(value) => setSelectedRating(value)}
            options={RATINGS}
            allLabel="All Ratings"
          />
        </div>

        {/* Sticky Sidebar - Only on Laptop and Above */}
        <div className="hidden md:block w-1/4 sticky top-0 h-screen pt-10 overflow-y-auto">
          <h1 className="text-3xl font-bold mb-6">Filters</h1>

          {/* Year filters */}
          <div className="mb-6">
            <h2 className="text-xl mb-3">Filter by Year</h2>
            <div className="grid grid-cols-4 gap-2 pr-4">
              {YEARS.map((year) => (
                <FilterButton
                  key={year}
                  text={year.toString()}
                  onClick={() => handleYearClick(year)}
                  selected={selectedYear === year}
                />
              ))}
            </div>
          </div>

          {/* Rating filters */}
          <div className="mb-8">
            <h2 className="text-xl mb-3">Filter by Rating</h2>
            <div className="grid grid-cols-5 gap-2 pr-4">
              {RATINGS.map((rating) => (
                <FilterButton
                  key={rating}
                  text={rating.toString()}
                  onClick={() => handleRatingClick(rating)}
                  selected={selectedRating === rating}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 pt-10">
          <h1 className="text-3xl font-bold mb-8">Movies</h1>

          {loading && <div className="text-center">Loading...</div>}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>

          {hasNext && !loading && (
            <div className="flex justify-center my-8">
              <LoadMoreButton onClick={handleLoadMore} loading={loading} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

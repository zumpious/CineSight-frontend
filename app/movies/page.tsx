import MovieCard from '@/components/MovieCard/MovieCard';

// Temporary mock data - replace with actual API call
const MOCK_MOVIES = [
  {
    id: '1',
    title: 'Inception',
    rating: 8.8,
    imageUrl: '/movie1.jpg',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    rating: 9.0,
    imageUrl: '/movie2.jpg',
  },
  {
    id: '3',
    title: 'Inception',
    rating: 8.8,
    imageUrl: '/movie1.jpg',
  },
  {
    id: '4',
    title: 'The Dark Knight',
    rating: 9.0,
    imageUrl: '/movie2.jpg',
  },
  {
    id: '5',
    title: 'Inception',
    rating: 8.8,
    imageUrl: '/movie1.jpg',
  },
  {
    id: '6',
    title: 'The Dark Knight',
    rating: 9.0,
    imageUrl: '/movie2.jpg',
  },
];

export default async function MoviesPage() {
  // Todo fetch movies from our API
  // const movies = await fetchMovies();

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">All Movies</h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {MOCK_MOVIES.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              rating={movie.rating}
              imageUrl={movie.imageUrl}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
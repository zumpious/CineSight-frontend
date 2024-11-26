import Image from 'next/image';
import Link from 'next/link';

interface MovieDetailProps {
  params: {
    movieId: string;
  };
}

// Mock data - replace with API call
const MOCK_MOVIE = {
  id: '1',
  title: 'Inception',
  rating: 8.8,
  imageUrl: '/movie1.jpg',
  year: 2010,
  director: 'Christopher Nolan',
  duration: '2h 28min',
  genre: ['Action', 'Sci-Fi', 'Thriller'],
  plot: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
  cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Ellen Page'],
};

export default async function MovieDetail({ params }: MovieDetailProps) {
  // In real implementation:
  // const movie = await fetchMovieById(params.movieId);
  const movie = MOCK_MOVIE;

  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/movies"
          className="inline-flex items-center mb-6 text-accent-color hover:text-accent-color/80"
        >
          ← Back to Movies
        </Link>

        {/* Movie Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="relative h-[450px] md:col-span-1">
            <Image
              src={movie.imageUrl}
              alt={movie.title}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
          
          <div className="md:col-span-2">
            <h1 className="text-4xl font-bold mb-4">{movie.title}</h1>
            <div className="flex items-center gap-4 mb-6">
              <span className="flex items-center gap-1">
                <span>⭐</span> {movie.rating}
              </span>
              <span>{movie.year}</span>
              <span>{movie.duration}</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">{movie.plot}</p>
              
              <div>
                <h2 className="text-xl font-bold mb-2">Director</h2>
                <p>{movie.director}</p>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Genre</h2>
                <div className="flex gap-2">
                  {movie.genre.map((g) => (
                    <span 
                      key={g}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Cast</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.cast.map((actor) => (
                    <span 
                      key={actor}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function loading() {
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-6 w-32 bg-gray-800 rounded mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="h-[450px] bg-gray-800 rounded-lg" />
            <div className="md:col-span-2 space-y-4">
              <div className="h-8 bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-800 rounded w-1/4" />
              <div className="h-32 bg-gray-800 rounded" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
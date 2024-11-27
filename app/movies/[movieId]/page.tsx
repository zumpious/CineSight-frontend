import Image from 'next/image';
import Link from 'next/link';
import { fetchMovieById } from '@/services/movie_api';
import { MovieDetail as MovieDetailType } from '@/types/movie';

interface MovieDetailProps {
  params: {
    movieId: string;
  };
}

export default async function MovieDetail({ params }: MovieDetailProps) {
  const local_params = await params;
  const movie: MovieDetailType = await fetchMovieById(local_params.movieId);
  
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
              src={movie.cover}
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
              <span>{new Date(movie.release).toLocaleDateString()}</span>
              <span>{movie.runtime} min</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-lg">{movie.origin}</p>
              <p className="text-lg">Age: {movie.age}</p>
              <p className="text-lg">Box Office: ${movie.boxoffice.toLocaleString()}</p>
              <p className="text-lg">Budget: ${movie.budget.toLocaleString()}</p>
              <p className="text-lg">ROI: {movie.ROI}%</p>
              
              <div>
                <h2 className="text-xl font-bold mb-2">Directors</h2>
                <div className="flex gap-2">
                  {movie.directors.map((director) => (
                    <span 
                      key={director}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {director}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Genres</h2>
                <div className="flex gap-2">
                  {movie.genres.map((genre) => (
                    <span 
                      key={genre}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Actors</h2>
                <div className="flex flex-wrap gap-2">
                  {movie.actors.map((actor) => (
                    <span 
                      key={actor}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {actor}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">Rating Details</h2>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(movie.ratings).map(([key, value]) => (
                    <span 
                      key={key}
                      className="bg-secondary-color px-3 py-1 rounded-full text-sm"
                    >
                      {key}: {value}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold mb-2">More Info</h2>
                <a href={movie.link} className="text-accent-color hover:underline">
                  {movie.link}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
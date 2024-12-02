import Image from 'next/image';
import Link from 'next/link';
import { fetchMovieById } from '@/services/movie_api';
import { MovieDetail as MovieDetailType } from '@/types/movie';
import WordCloud from '@/components/WordCloud/WordCloud';
import { MovieDetailProps} from './page.types';

export default async function MovieDetail({ params }: MovieDetailProps) {
  const local_params = await params;
  const movie: MovieDetailType = await fetchMovieById(local_params.movieId);
  
  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-4">
        {/* Back button */}
        <Link
          href="/movies"
          className="inline-flex items-center mb-6 text-accent-color hover:text-accent-color/80 
                    tansform transition-transform hover:scale-105"
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
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
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
              <p className="text-lg">Budget: ${movie.budget.toLocaleString()}</p>
              <p className="text-lg">Box Office: ${movie.boxoffice.toLocaleString()}</p>
              <p className="text-lg flex items-center">
                {movie.ROI >= 0 ? (
                  <svg
                    className="w-5 h-5 text-green-600 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M5 10l5-5 5 5H5z" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5 text-red-600 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M15 10l-5 5-5-5h10z" />
                  </svg>
                )}
                <span className={`${movie.ROI >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  ROI: {movie.ROI.toFixed(2)}%
                </span>
              </p>
              
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

        {/* Word Cloud Section */}
        <div className="mt-12 flex justify-center md:justify-end">
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl font-bold mb-6">Word Cloud of Most Frequent Words in IMDB User Reviews</h2>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                <WordCloud words={movie.wordcloud} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
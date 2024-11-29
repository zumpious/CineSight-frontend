import Image from "next/image";
import Link from "next/link";
import MovieCard from "@/components/MovieCard/MovieCard";
import { release } from "os";

// Mock featured movies - replace with API call later
const FEATURED_MOVIES = [
  {
    id: '1',
    title: 'Inception',
    rating: 8.8,
    imageUrl: '/movie1.jpg',
    release: '2010',
  },
  {
    id: '2',
    title: 'The Dark Knight',
    rating: 9.0,
    imageUrl: '/movie2.jpg',
    release: '2010',
  },
  {
    id: '3',
    title: 'Interstellar',
    rating: 8.6,
    imageUrl: '/movie3.jpg',
    release: '2010',
  },
  {
    id: '4',
    title: 'Pulp Fiction',
    rating: 8.9,
    imageUrl: '/movie4.jpg',
    release: '2010',
  }
]


export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-primary-color z-10" />
        <div className="absolute inset-0">
          <Image
            src="/hero-bg.jpg"
            alt="Featured Movie"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 relative z-20">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
            Discover Amazing Movies
          </h1>
          <p className="text-xl text-gray-200 mb-8 max-w-2xl">
            Explore thousands of movies with ratings, reviews, and detailed information
            from IMDB. Analyze dozen of interactive plots suchs as wordclouds generated 
            by a movies user reviews or income comparision between movies.
          </p>
          <Link 
            href="/movies" 
            className="bg-accent-color text-primary-color px-8 py-3 rounded-full 
                     font-semibold hover:bg-accent-color/90 transition-colors"
          >
            Explore Movies
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary-color">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="mb-4">🎬</div>
              <h3 className="text-xl font-bold mb-2">Latest Movies</h3>
              <p className="text-text-secondary">Stay updated with the newest releases</p>
            </div>
            <div className="text-center">
              <div className="mb-4">⭐</div>
              <h3 className="text-xl font-bold mb-2">IMDB Ratings</h3>
              <p className="text-text-secondary">Authentic ratings and reviews</p>
            </div>
            <div className="text-center">
              <div className="mb-4">📱</div>
              <h3 className="text-xl font-bold mb-2">Mobile Friendly</h3>
              <p className="text-text-secondary">Access anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Featured Movies</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {FEATURED_MOVIES.map((movie) => (
              <MovieCard
                key={movie.id}
                id={movie.id}
                title={movie.title}
                rating={movie.rating}
                cover={movie.imageUrl}
                release={movie.release}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link 
              href="/movies"
              className="border border-accent-color text-accent-color px-8 py-3 
                      rounded-full hover:bg-accent-color hover:text-primary-color 
                      transition-colors"
            >
              View All Movies
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

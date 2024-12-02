'use client';
import { useState, useEffect } from 'react';
import Image from "next/image";
import MovieCard from "@/components/MovieCard/MovieCard";
import Carousel from '@/components/Carousel';
import { fetchPreview } from "@/services/preview-api";
import { Movie } from "@/types/movie";
import PillLink from '@/components/PillLink';

export default function Home() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPreview = async () => {
    setLoading(true);
    try {
      const newMovies = await fetchPreview();
      setMovies(newMovies);
    } catch (error) {
      console.error('Error loading movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPreview();
  }, []);
  
  return (
    <div className="bg-secondary-color">
      {/* Hero Section */}
      <section className="relative w-full h-[100vh] -mt-16"> {/* -mt-16 matches nav height */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-primary-color z-10" />
        <div className="absolute inset-0">
          <Image
            src="/img/background.jpg"
            alt="Featured Movie"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="container mx-auto px-4 relative z-20">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
              Discover Amazing Movies
            </h1>
            <p className="text-xl text-gray-200 mb-8 max-w-2xl">
              Explore thousands of movies with ratings, reviews, and detailed information
              from IMDB. Analyze dozen of interactive plots suchs as wordclouds generated 
              by a movies user reviews or income comparision between movies.
            </p>
            <PillLink href="/movies" text="View All Movies" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="relative">
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
      </div>

      {/* Latest Movies Preview */}
      <div className="relative">
        <section className="py-10 bg-secondary-color">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Latest Movies</h2>
            {loading && <div className="text-center">Loading...</div>}
            <Carousel>
              {movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  id={movie.id}
                  title={movie.title}
                  rating={movie.rating}
                  cover={movie.cover}
                  release={movie.release}
                />
              ))}
            </Carousel>
            <div className="text-center mt-12">
              <PillLink href="/movies" text="View All Movies" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 px-4">
        <div className="text-9xl font-bold text-accent animate-bounce">
          404
        </div>
        
        <h1 className="text-4xl font-bold">
          Page Not Found
        </h1>
        
        <p className="text-text-secondary max-w-md mx-auto">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <Link 
          href="/"
          className="inline-block bg-accent-color text-primary-color px-8 py-3 
                   rounded-full font-semibold hover:bg-accent-color/90 
                   transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
export default function MovieDetailLoading() {
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

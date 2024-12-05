import { LoadMoreButtonProps } from './LoadMoreButton.types';

export default function LoadMoreButton({
  onClick,
  loading,
}: LoadMoreButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-2
        flex items-center justify-center
        rounded
        text-lg
        border-[0.5px]
        transition-colors
        ${loading ? 'bg-gray-500 text-white' : 'bg-black text-white border-white hover:bg-white hover:text-black'}
      `}
      disabled={loading}
    >
      {loading ? 'Loading...' : 'Load More'}
    </button>
  );
}

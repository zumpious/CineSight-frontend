import { useRef, useState, useEffect } from 'react';
import { CarouselProps } from './Carousel.types';

export default function Carousel({ children, slidesPerView = 4 }: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [showPrevButton, setShowPrevButton] = useState(false);
  const [showNextButton, setShowNextButton] = useState(true);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;

    const itemWidth = carouselRef.current.offsetWidth / slidesPerView;
    const scrollAmount = itemWidth * slidesPerView;
    const newScrollPosition = carouselRef.current.scrollLeft + 
      (direction === 'left' ? -scrollAmount : scrollAmount);

    carouselRef.current.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth'
    });
  };

  const updateButtonVisibility = () => {
    if (!carouselRef.current) return;

    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
    setShowPrevButton(scrollLeft > 0);
    setShowNextButton(scrollLeft + clientWidth < scrollWidth);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', updateButtonVisibility);
      updateButtonVisibility();
    }

    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', updateButtonVisibility);
      }
    };
  }, []);

  return (
    <div className="relative">
      {showPrevButton && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 
                     bg-secondary-color p-3 rounded-full shadow-lg z-10
                     hover:bg-accent-color transition-colors"
          aria-label="Previous slides"
        >
          <svg className="w-6 h-6" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div 
        ref={carouselRef}
        className="overflow-x-auto scrollbar-hide scroll-smooth"
      >
        <div 
          className="grid grid-flow-col gap-6"
          style={{
            gridTemplateColumns: `repeat(${Array.isArray(children) ? children.length : 1}, minmax(0, 1fr))`,
            width: `calc(${Array.isArray(children) ? children.length : 1} * (100% / ${slidesPerView}))`
          }}
        >
          {children}
        </div>
      </div>

      {showNextButton && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 
                     bg-secondary-color p-3 rounded-full shadow-lg z-10
                     hover:bg-accent-color transition-colors"
          aria-label="Next slides"
        >
          <svg className="w-6 h-6" fill="none" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}
    </div>
  );
}
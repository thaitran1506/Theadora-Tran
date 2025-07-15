import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Photo } from '../types/Photo';
import PhotoCard from './PhotoCard';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [visiblePhotos, setVisiblePhotos] = useState<Set<number>>(new Set());
  const [scrollPosition, setScrollPosition] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Calculate which photos should be visible based on scroll position
  const visiblePhotoRange = useMemo(() => {
    const cardWidth = 320; // w-80 = 320px
    const margin = 16; // mx-4 = 16px
    const totalCardWidth = cardWidth + margin * 2;
    
    const startIndex = Math.max(0, Math.floor(scrollPosition / totalCardWidth) - 2);
    const endIndex = Math.min(photos.length - 1, Math.floor(scrollPosition / totalCardWidth) + 6);
    
    return { startIndex, endIndex };
  }, [scrollPosition, photos.length]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const photoId = parseInt(entry.target.getAttribute('data-photo-id') || '0');
            setVisiblePhotos(prev => new Set(Array.from(prev).concat(photoId)));
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const photoElements = document.querySelectorAll('[data-photo-id]');
    photoElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [photos]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setScrollPosition(containerRef.current.scrollLeft);
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div className="relative">
      {/* Scroll indicator - moved higher up */}
      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg border border-gray-200">
          <p className="text-sm text-gray-600 font-medium">
            Scroll to explore Thea's journey →
          </p>
        </div>
      </div>

      {/* Photo timeline */}
      <div 
        ref={containerRef}
        className="flex overflow-x-auto pb-8 px-4 scrollbar-thin scrollbar-thumb-baby-pink scrollbar-track-gray-100"
        style={{ scrollbarWidth: 'thin' }}
      >
        {photos.map((photo, index) => {
          const isInVisibleRange = index >= visiblePhotoRange.startIndex && index <= visiblePhotoRange.endIndex;
          
          return (
            <div
              key={photo.id}
              data-photo-id={photo.id}
              className={`transition-all duration-700 ${
                visiblePhotos.has(photo.id) 
                  ? 'opacity-100 transform translate-y-0' 
                  : 'opacity-0 transform translate-y-8'
              }`}
              style={{ 
                transitionDelay: `${index * 50}ms`,
                // Only render if in visible range or already loaded
                display: isInVisibleRange || visiblePhotos.has(photo.id) ? 'block' : 'none'
              }}
            >
              <PhotoCard photo={photo} />
            </div>
          );
        })}
      </div>

      {/* Timeline connector */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-baby-pink to-transparent opacity-30 pointer-events-none" />
      
      {/* Performance indicator */}
      <div className="absolute bottom-4 right-4 text-xs text-gray-400 bg-white/80 px-2 py-1 rounded">
        Showing {visiblePhotoRange.endIndex - visiblePhotoRange.startIndex + 1} of {photos.length} photos
      </div>
    </div>
  );
};

export default PhotoGallery; 
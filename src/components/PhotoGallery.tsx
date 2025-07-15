import React, { useState, useEffect, useRef } from 'react';
import { Photo } from '../types/Photo';
import PhotoCard from './PhotoCard';

interface PhotoGalleryProps {
  photos: Photo[];
}

const PhotoGallery: React.FC<PhotoGalleryProps> = ({ photos }) => {
  const [visiblePhotos, setVisiblePhotos] = useState<Set<number>>(new Set());
  const containerRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative">
      {/* Scroll indicator */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg">
          <p className="text-sm text-gray-600">
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
        {photos.map((photo, index) => (
          <div
            key={photo.id}
            data-photo-id={photo.id}
            className={`transition-all duration-700 ${
              visiblePhotos.has(photo.id) 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform translate-y-8'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <PhotoCard photo={photo} />
          </div>
        ))}
      </div>

      {/* Timeline connector */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-baby-pink to-transparent opacity-30 pointer-events-none" />
    </div>
  );
};

export default PhotoGallery; 
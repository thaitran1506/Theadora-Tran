import React, { useState, useRef, useEffect } from 'react';
import { Photo } from '../types/Photo';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageError, setImageError] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div className="flex-shrink-0 w-80 mx-4 first:ml-0 last:mr-0" ref={cardRef}>
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
        <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
          {isInView && !imageError && (
            <img
              ref={imageRef}
              src={photo.image}
              alt={photo.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
              }`}
              loading="lazy"
              onLoad={handleImageLoad}
              onError={handleImageError}
              sizes="(max-width: 768px) 100vw, 320px"
            />
          )}
          
          {/* Loading placeholder */}
          {!imageLoaded && isInView && !imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-8 h-8 border-4 border-baby-pink border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Error placeholder */}
          {imageError && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-2">📸</div>
                <p className="text-sm text-gray-500">Image not available</p>
              </div>
            </div>
          )}
          
          {/* Image overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 bg-gradient-to-br from-baby-pink/10 to-lavender/10">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-semibold text-gray-800 font-serif">
              {photo.title}
            </h3>
            <span className="text-sm text-gray-600 bg-white/70 px-2 py-1 rounded-full">
              {formatDate(photo.date)}
            </span>
          </div>
          
          <p className="text-gray-700 leading-relaxed text-sm">
            {photo.description}
          </p>
          
          <div className="mt-4 flex items-center">
            <div className="w-2 h-2 bg-baby-pink rounded-full mr-2"></div>
            <span className="text-xs text-gray-500">
              {photo.id} of 32 memories
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoCard; 
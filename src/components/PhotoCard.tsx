import React from 'react';
import { Photo } from '../types/Photo';

interface PhotoCardProps {
  photo: Photo;
}

const PhotoCard: React.FC<PhotoCardProps> = ({ photo }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="flex-shrink-0 w-80 mx-4 first:ml-0 last:mr-0">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-xl animate-fade-in">
        <div className="relative h-64 overflow-hidden">
          <img
            src={photo.image}
            alt={photo.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            loading="lazy"
          />
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
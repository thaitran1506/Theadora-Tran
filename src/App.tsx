import React, { useState, useEffect } from 'react';
import { Photo } from './types/Photo';
import Header from './components/Header';
import PhotoGallery from './components/PhotoGallery';
import Footer from './components/Footer';
import './App.css';

function App() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPhotos = async () => {
      try {
        const response = await fetch('/photos.json');
        if (!response.ok) {
          throw new Error('Failed to load photos');
        }
        const data: Photo[] = await response.json();
        
        // Sort photos chronologically by date
        const sortedPhotos = data.sort((a, b) => 
          new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        
        setPhotos(sortedPhotos);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setLoading(false);
      }
    };

    loadPhotos();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white via-lavender to-mint flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-baby-pink border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Thea's precious memories...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-off-white via-lavender to-mint flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😢</div>
          <p className="text-gray-600 mb-2">Oops! Something went wrong</p>
          <p className="text-sm text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-off-white via-lavender to-mint">
      <Header />
      <main className="max-w-full">
        <PhotoGallery photos={photos} />
      </main>
      <Footer />
    </div>
  );
}

export default App;

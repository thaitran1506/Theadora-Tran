import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-8 px-4 mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-baby-pink"></div>
          <div className="text-2xl">💕</div>
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-lavender"></div>
        </div>
        
        <p className="text-gray-600 font-light">
          Made with love by Dad
        </p>
        
        <p className="text-sm text-gray-500 mt-2">
          Every moment with you is a treasure, Thea
        </p>
      </div>
    </footer>
  );
};

export default Footer; 
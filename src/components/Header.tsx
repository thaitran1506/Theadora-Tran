import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <div className="w-8 h-8 bg-baby-pink rounded-full mr-3 animate-pulse"></div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 font-serif">
            Thea's Journey
          </h1>
          <div className="w-8 h-8 bg-lavender rounded-full ml-3 animate-pulse"></div>
        </div>
        
        <p className="text-lg text-gray-600 mb-6 font-light">
          A timeline of precious moments and beautiful memories
        </p>
        
        <div className="flex items-center justify-center space-x-4">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-baby-pink"></div>
          <div className="w-3 h-3 bg-mint rounded-full"></div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-lavender"></div>
        </div>
      </div>
    </header>
  );
};

export default Header; 
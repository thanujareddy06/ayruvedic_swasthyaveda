import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-black/20 backdrop-blur-sm shadow-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <span className="text-3xl font-bold font-serif text-brand-gold">
              AyurMind
            </span>
             <span className="ml-3 text-sm text-brand-cream/70 mt-2">
                Your AI Ayurvedic Wellness Planner
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

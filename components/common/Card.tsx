import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-brand-green/10 backdrop-blur-lg rounded-xl shadow-lg p-6 border border-white/10 ${className}`}>
      {children}
    </div>
  );
};

export default Card;
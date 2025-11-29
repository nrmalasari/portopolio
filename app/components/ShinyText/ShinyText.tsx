'use client'

import React from 'react';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  color?: 'purple' | 'pink' | 'blue' | 'white';
}

const ShinyText: React.FC<ShinyTextProps> = ({ 
  text, 
  disabled = false, 
  speed = 2, 
  className = '',
  size = 'lg',
  color = 'purple'
}) => {
  // Mapping ukuran teks
  const sizeClasses = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl md:text-6xl',
    xl: 'text-6xl md:text-7xl'
  };

  // Mapping warna gradient
  const colorGradients = {
    purple: 'from-purple-400 via-purple-300 to-purple-500',
    pink: 'from-pink-400 via-pink-300 to-pink-500',
    blue: 'from-blue-400 via-blue-300 to-blue-500',
    white: 'from-white via-gray-200 to-white'
  };

  return (
    <div className={`relative inline-block ${sizeClasses[size]} font-bold ${className}`}>
      {/* Teks utama dengan gradient */}
      <span className={`bg-clip-text text-transparent bg-gradient-to-r ${colorGradients[color]} bg-[length:200%_100%] bg-right`}>
        {text}
      </span>
      
      {/* Overlay shimmer effect - hanya untuk teks */}
      {!disabled && (
        <span 
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent bg-[length:200%_100%] bg-left"
          style={{
            animation: `shimmer ${speed}s infinite linear`,
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            color: 'transparent',
          }}
        >
          {text}
        </span>
      )}
    </div>
  );
};

export default ShinyText;
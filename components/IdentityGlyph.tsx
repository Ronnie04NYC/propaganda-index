import React, { useEffect, useState } from 'react';

interface IdentityGlyphProps {
  seed: string;
  className?: string;
  color?: string; // Kept for interface compatibility
}

export const IdentityGlyph: React.FC<IdentityGlyphProps> = ({ seed, className = '' }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    // Generate the hash from the seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }

    const palette = [
      '#00ff41', // cyber-green
      '#ff00ff', // cyber-pink
      '#00d9f7', // cyber-blue
      '#fdfd00', // cyber-yellow
      '#ffffff'  // white
    ];

    // Create a canvas to draw the JPG
    const canvas = document.createElement('canvas');
    // High resolution for saving (1024x1024)
    const size = 1024; 
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // 1. Fill Background (JPG doesn't support transparent, so we use Cyber Black)
      ctx.fillStyle = '#050a0e'; 
      ctx.fillRect(0, 0, size, size);

      // 2. Draw the 8x8 Grid
      const blockSize = size / 8;
      
      for (let i = 0; i < 64; i++) {
        const val = Math.sin(hash * (i + 1)) * 10000;
        const rand = val - Math.floor(val);
        
        // Threshold determines density (0.5 = 50% fill)
        if (rand > 0.5) {
          const colorIndex = Math.floor((rand * 1000) % palette.length);
          const x = (i % 8) * blockSize;
          const y = Math.floor(i / 8) * blockSize;
          
          ctx.fillStyle = palette[colorIndex];
          ctx.fillRect(x, y, blockSize, blockSize);
        }
      }

      // 3. Convert to JPG (High Quality)
      const jpgUrl = canvas.toDataURL('image/jpeg', 1.0);
      setImageSrc(jpgUrl);
    }
  }, [seed]);

  return (
    <img 
      src={imageSrc} 
      alt="Identity Glyph - Right Click to Save"
      title="Right Click -> Save Image As..."
      className={`bg-black/40 border border-gray-700/50 ${className}`}
      style={{ imageRendering: 'pixelated', display: 'block' }}
    />
  );
};
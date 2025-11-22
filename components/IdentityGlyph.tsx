import React, { useMemo } from 'react';

interface IdentityGlyphProps {
  seed: string;
  className?: string;
  color?: string; // Kept for interface compatibility, but ignored for multicolor mode
}

export const IdentityGlyph: React.FC<IdentityGlyphProps> = ({ seed, className = '' }) => {
  // Deterministic random number generator based on seed string
  const blocks = useMemo(() => {
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
      hash = ((hash << 5) - hash) + seed.charCodeAt(i);
      hash |= 0; // Convert to 32bit integer
    }
    
    const palette = [
      'bg-cyber-green shadow-[0_0_4px_#00ff41]',
      'bg-cyber-pink shadow-[0_0_4px_#ff00ff]',
      'bg-cyber-blue shadow-[0_0_4px_#00d9f7]',
      'bg-cyber-yellow shadow-[0_0_4px_#fdfd00]',
      'bg-white shadow-[0_0_4px_#ffffff]'
    ];

    const result = [];
    // Generate 64 bits of data (8x8 grid)
    for (let i = 0; i < 64; i++) {
      // Use a pseudo-random function based on the hash and position
      const val = Math.sin(hash * (i + 1)) * 10000;
      const rand = val - Math.floor(val);
      
      // Threshold determines density (0.5 = 50% fill)
      if (rand > 0.5) {
        // Use the random value to deterministically pick a color from the palette
        const colorIndex = Math.floor((rand * 1000) % palette.length);
        result.push(palette[colorIndex]);
      } else {
        result.push(null);
      }
    }
    return result;
  }, [seed]);

  return (
    <div className={`w-full h-full aspect-square grid grid-cols-8 gap-0.5 p-1 bg-black/40 border border-gray-700/50 ${className}`}>
      {blocks.map((colorClass, i) => (
        <div
          key={i}
          className={`w-full h-full transition-all duration-500 ${
            colorClass 
              ? `${colorClass} opacity-90` 
              : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  );
};
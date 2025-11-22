import React, { useMemo } from 'react';

interface IdentityGlyphProps {
  seed: string;
  className?: string;
  color?: string; // Kept for interface compatibility
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
      '#00ff41', // cyber-green
      '#ff00ff', // cyber-pink
      '#00d9f7', // cyber-blue
      '#fdfd00', // cyber-yellow
      '#ffffff'  // white
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
        const x = i % 8;
        const y = Math.floor(i / 8);
        result.push({ x, y, color: palette[colorIndex] });
      }
    }
    return result;
  }, [seed]);

  return (
    <svg 
      viewBox="0 0 8 8" 
      className={`w-full h-full bg-black/40 border border-gray-700/50 ${className}`}
      preserveAspectRatio="none"
      shapeRendering="crispEdges"
    >
      {blocks.map((block, i) => (
        <rect
          key={i}
          x={block.x}
          y={block.y}
          width="1"
          height="1"
          fill={block.color}
          className="opacity-90"
        />
      ))}
    </svg>
  );
};
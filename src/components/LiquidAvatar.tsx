'use client';

import React, { useState, useEffect, useId } from 'react';

interface LiquidAvatarProps {
  src: string;
  alt: string;
  className?: string;
}

export default function LiquidAvatar({ src, alt, className = '' }: LiquidAvatarProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [scale, setScale] = useState(0);
  const [freqX, setFreqX] = useState(0.03);
  const [freqY, setFreqY] = useState(0.04);
  const filterId = useId().replace(/:/g, ''); // Generate unique ID for filters

  useEffect(() => {
    let frameId: number;
    let start: number | null = null;

    const animateRipple = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;

      if (isHovered) {
        // Elevate displacement scale up to 18-20 for waving effect
        setScale((prev) => (prev < 18 ? prev + 1 : 18));
        // Oscillate frequency values to simulate liquid current flow
        setFreqX(0.03 + Math.sin(elapsed * 0.003) * 0.01);
        setFreqY(0.04 + Math.cos(elapsed * 0.004) * 0.015);
      } else {
        // Return scale smoothly back to static 0
        setScale((prev) => (prev > 0 ? prev - 1.2 : 0));
      }

      frameId = requestAnimationFrame(animateRipple);
    };

    frameId = requestAnimationFrame(animateRipple);
    return () => cancelAnimationFrame(frameId);
  }, [isHovered]);

  const handleTap = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsHovered(true);
      setTimeout(() => {
        setIsHovered(false);
      }, 1500);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleTap}
      className={`relative overflow-hidden cursor-pointer select-none ${className}`}
    >
      {/* SVG Liquid Filter Definition */}
      <svg className="absolute w-0 h-0 pointer-events-none">
        <defs>
          <filter id={`liquid-filter-${filterId}`}>
            <feTurbulence
              type="fractalNoise"
              baseFrequency={`${freqX} ${freqY}`}
              numOctaves="2"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale={scale}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      {/* Profile Avatar Image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="w-full h-full object-cover transition-transform duration-500 scale-[1.01] hover:scale-105"
        style={{
          filter: `url(#liquid-filter-${filterId})`,
        }}
      />
    </div>
  );
}

'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

const lowercaseGlyphs = 'abcdefghijklmnopqrstuvwxyz01';
const uppercaseGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const symbolGlyphs = '!@#$%&*?';

export default function useTextScramble(initialText: string) {
  const [text, setText] = useState(initialText);
  const frameRef = useRef<number | null>(null);
  
  // Keep text updated if initialText changes (e.g. key updates)
  useEffect(() => {
    setText(initialText);
  }, [initialText]);

  const scramble = useCallback(() => {
    let iteration = 0;
    const maxIteration = initialText.length;
    
    if (frameRef.current) cancelAnimationFrame(frameRef.current);

    const tick = () => {
      setText(() =>
        initialText
          .split('')
          .map((letter, index) => {
            if (letter === ' ') return ' ';
            if (index < iteration) {
              return initialText[index];
            }
            if (/[a-z]/.test(letter)) {
              return lowercaseGlyphs[Math.floor(Math.random() * lowercaseGlyphs.length)];
            }
            if (/[A-Z]/.test(letter)) {
              return uppercaseGlyphs[Math.floor(Math.random() * uppercaseGlyphs.length)];
            }
            return symbolGlyphs[Math.floor(Math.random() * symbolGlyphs.length)];
          })
          .join('')
      );

      if (iteration < maxIteration) {
        iteration += 0.4; // controls decrypt speed rate
        frameRef.current = requestAnimationFrame(tick);
      } else {
        setText(initialText);
      }
    };

    tick();
  }, [initialText]);

  // Clean up animation on unmount
  useEffect(() => {
    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return { text, scramble };
}

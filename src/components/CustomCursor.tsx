'use client';

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [cursorType, setCursorType] = useState<'default' | 'hover' | 'view' | 'copy' | 'link'>('default');
  const [cursorText, setCursorText] = useState('');
  const [visible, setVisible] = useState(false);

  // Position of the mouse
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Physics-based spring animations for a fluid, natural delay
  const springConfig = { stiffness: 350, damping: 28, mass: 0.6 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  const dotSpringConfig = { stiffness: 820, damping: 32, mass: 0.15 };
  const dotX = useSpring(mouseX, dotSpringConfig);
  const dotY = useSpring(mouseY, dotSpringConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Check if the element has custom cursor text
      const cursorTextEl = target.closest('[data-cursor-text]');
      if (cursorTextEl) {
        const textVal = cursorTextEl.getAttribute('data-cursor-text');
        setCursorType('hover');
        setCursorText(textVal || '');
        return;
      }

      // Check if the element or its parent has a data-cursor attribute
      const interactiveEl = target.closest('[data-cursor]');
      if (interactiveEl) {
        const type = interactiveEl.getAttribute('data-cursor') as any;
        setCursorType(type || 'hover');
        
        if (type === 'view') {
          setCursorText('VIEW');
        } else if (type === 'copy') {
          setCursorText('COPY');
        } else {
          setCursorText('');
        }
        return;
      }

      // Check if it's a clickable element (button, link, input)
      const clickableEl = target.closest('a, button, input, textarea, [role="button"]');
      if (clickableEl) {
        setCursorType('link');
        setCursorText('');
        return;
      }

      // Reset to default
      setCursorType('default');
      setCursorText('');
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    // Hide cursor when leaving window
    const handleMouseLeave = () => setVisible(false);
    const handleMouseEnter = () => setVisible(true);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!visible) return null;

  // Render sizes and styles based on state
  const isHovered = cursorType !== 'default';
  const size = cursorText ? 64 : cursorType === 'view' || cursorType === 'copy' ? 56 : isHovered ? 40 : 18;
  const borderStyle = cursorText
    ? 'border-indigo-500 bg-indigo-500/5 text-indigo-600 dark:text-indigo-400 font-mono text-[8px] font-bold tracking-wider flex items-center justify-center text-center px-1'
    : cursorType === 'link' 
      ? 'border-dashed border-indigo-500 bg-indigo-500/5 animate-[spin_8s_linear_infinite]' 
      : cursorType === 'view' || cursorType === 'copy'
        ? 'border-indigo-500 bg-slate-950 text-white font-mono text-[9px] font-bold tracking-wider flex items-center justify-center'
        : 'border-slate-350 dark:border-indigo-500/50 bg-transparent';

  return (
    <>
      {/* Inner Glowing Core Dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-indigo-500 pointer-events-none z-50 hidden lg:block shadow-[0_0_8px_rgba(99,102,241,0.8)]"
      />

      {/* Dynamic Glowing Follower Ring */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
          width: size,
          height: size,
        }}
        className={`fixed top-0 left-0 rounded-full border pointer-events-none z-50 transition-colors duration-300 hidden lg:flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.05)] ${borderStyle}`}
      >
        {cursorText && (
          <motion.span 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="select-none text-[8px]"
          >
            {cursorText}
          </motion.span>
        )}
      </motion.div>
    </>
  );
}

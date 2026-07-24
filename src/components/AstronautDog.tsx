'use client';

import React from 'react';

export default function AstronautDog() {
  return (
    <div className="absolute -top-7.5 right-6 z-20 pointer-events-none select-none flex flex-col items-center opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-bottom">
      {/* 1. Thought Bubble */}
      <div className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-bottom pb-1.5 flex flex-col items-center">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-0.5 shadow-md text-[8px] font-sans font-bold text-slate-700 dark:text-slate-350 whitespace-nowrap leading-none flex items-center gap-1">
          <span>Launch me!</span>
          <span className="animate-bounce">🚀</span>
        </div>
        {/* Thought bubble trail bubbles */}
        <div className="flex gap-0.5 justify-center mt-0.5 pr-2">
          <span className="h-1 w-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs" />
          <span className="h-0.5 w-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs" />
        </div>
      </div>

      {/* 2. Astronaut Dog Body */}
      <div className="relative w-8 h-6 flex items-end justify-center">
        {/* Space Dog Container (Bobs up on hover) */}
        <div 
          className="astronaut-dog w-6 h-6 transition-all duration-500 ease-out origin-bottom transform translate-y-0.5 group-hover:-translate-y-2.5 relative flex items-center justify-center"
        >
          {/* Dog Head inside Helmet */}
          <div className="w-[18px] h-[18px] bg-amber-100 dark:bg-amber-200 rounded-full relative flex items-center justify-center">
            {/* Floppy Dog Ears */}
            <span className="absolute -top-0.5 -left-1 w-[5px] h-[11px] bg-amber-600 dark:bg-amber-700 rounded-full transform -rotate-12" />
            <span className="absolute -top-0.5 -right-1 w-[5px] h-[11px] bg-amber-600 dark:bg-amber-700 rounded-full transform rotate-12" />

            {/* Eyes */}
            <span className="absolute top-1.5 left-1 w-0.5 h-0.5 rounded-full bg-slate-800" />
            <span className="absolute top-1.5 right-1 w-0.5 h-0.5 rounded-full bg-slate-800" />

            {/* Nose/Snout */}
            <span className="absolute top-2 w-[5px] h-[3px] bg-amber-300 dark:bg-amber-400 rounded-full flex items-center justify-center">
              <span className="w-0.5 h-0.5 rounded-full bg-slate-950" />
            </span>
          </div>

          {/* Glass Space Helmet Overlay */}
          <div className="absolute inset-0 border border-white/40 dark:border-slate-700/60 bg-white/10 dark:bg-slate-950/20 backdrop-blur-[0.5px] rounded-full shadow-[inset_0_2px_4px_rgba(255,255,255,0.4),0_2px_6px_rgba(99,102,241,0.15)]" />

          {/* Waving Paw (visible on hover) */}
          <span 
            className="absolute bottom-0 -left-1 w-[6px] h-[6px] bg-amber-100 dark:bg-amber-200 border border-white/20 dark:border-slate-850 rounded-full origin-bottom-right opacity-0 scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100"
            style={{ 
              animation: 'wave-paw 0.8s ease-in-out infinite alternate'
            }}
          />
        </div>
      </div>

      {/* Injecting CSS Keyframes specifically for Astronaut Dog floating and waving */}
      <style dangerouslySetInnerHTML={{ __html: `
        .group:hover .astronaut-dog {
          animation: bob-float 1.5s ease-in-out infinite alternate;
        }
        @keyframes bob-float {
          0% { transform: translateY(-10px); }
          100% { transform: translateY(-6px); }
        }
        @keyframes wave-paw {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(-45deg); }
        }
      `}} />
    </div>
  );
}

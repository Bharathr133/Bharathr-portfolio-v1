'use client';

import React from 'react';

export default function CozyCat() {
  return (
    <div className="absolute -top-7 right-6 z-20 pointer-events-none select-none flex flex-col items-center">
      {/* 1. Thought Bubble */}
      <div className="opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 origin-bottom pb-1.5 flex flex-col items-center">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-2 py-0.5 shadow-md text-[8px] font-sans font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap leading-none">
          Please click... 💤
        </div>
        {/* Thought bubble trail bubbles */}
        <div className="flex gap-0.5 justify-center mt-0.5 pr-2">
          <span className="h-1 w-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs" />
          <span className="h-0.5 w-0.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs" />
        </div>
      </div>

      {/* 2. Cozy Sleeping Cat Body */}
      <div className="relative w-8 h-4 flex items-end justify-center">
        {/* Cat Body (Stretches on hover) */}
        <div 
          className="w-7 h-3 bg-slate-400 dark:bg-slate-500 rounded-t-full transition-all duration-300 origin-bottom transform translate-y-0.5 group-hover:translate-y-0 group-hover:h-4.5 group-hover:w-5.5 relative"
          style={{ borderRadius: '10px 10px 0 0' }}
        >
          {/* Ears */}
          <span className="absolute -top-1 left-0.5 w-0 h-0 border-l-[2.5px] border-l-transparent border-r-[2.5px] border-r-transparent border-b-[4px] border-b-slate-400 dark:border-b-slate-500 transform -rotate-12 transition-transform duration-300 group-hover:scale-110" />
          <span className="absolute -top-1 right-2 w-0 h-0 border-l-[2.5px] border-l-transparent border-r-[2.5px] border-r-transparent border-b-[4px] border-b-slate-400 dark:border-b-slate-500 transform rotate-12 transition-transform duration-300 group-hover:scale-110" />

          {/* Sleeping Eyes (Closed lines) -> Awake Eyes (Glow dots) */}
          <div className="absolute top-1 left-1.5 flex gap-1 transition-opacity duration-300 group-hover:opacity-0">
            <span className="w-1 h-[1px] bg-slate-600 dark:bg-slate-700 rounded-full" />
            <span className="w-1 h-[1px] bg-slate-600 dark:bg-slate-700 rounded-full" />
          </div>
          <div className="absolute top-1 left-1.5 flex gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <span className="w-0.5 h-0.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="w-0.5 h-0.5 rounded-full bg-indigo-400 animate-pulse" />
          </div>

          {/* Tail */}
          <span 
            className="absolute bottom-0 -right-2 w-3 h-1 bg-slate-400 dark:bg-slate-500 rounded-full origin-left transition-all duration-300 transform rotate-12 group-hover:rotate-45 group-hover:-translate-y-0.5"
            style={{ borderRadius: '0 8px 8px 0' }}
          />
        </div>
      </div>
    </div>
  );
}

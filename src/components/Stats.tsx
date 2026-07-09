'use client';

import React, { useEffect, useRef, useState } from 'react';
import { stats } from '../data/portfolio';

function StatCard({ value, label }: { value: string; label: string }) {
  const [currentVal, setCurrentVal] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [hasAnimated, setHasAnimated] = useState(false);

  const targetNum = parseInt(value.replace(/[^0-9]/g, '')) || 0;
  const isPlus = value.includes('+');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          let start = 0;
          const duration = 1500;
          const stepTime = Math.max(Math.floor(duration / targetNum), 30);
          
          const timer = setInterval(() => {
            start += Math.ceil(targetNum / (duration / stepTime));
            if (start >= targetNum) {
              setCurrentVal(targetNum);
              clearInterval(timer);
            } else {
              setCurrentVal(start);
            }
          }, stepTime);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.2 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [targetNum, hasAnimated]);

  return (
    <div
      ref={cardRef}
      className="relative flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 shadow-sm dark:shadow-xl hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 group rounded-2xl"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />
      <span className="text-4xl md:text-5xl font-black text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform duration-300">
        {currentVal}
        {isPlus && '+'}
      </span>
      <span className="mt-2 text-xs md:text-sm font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-300 transition-colors duration-300 text-center">
        {label}
      </span>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative bg-slate-100/50 dark:bg-slate-900/40 py-16 border-y border-slate-200/60 dark:border-slate-900 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, idx) => (
            <StatCard key={idx} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
}

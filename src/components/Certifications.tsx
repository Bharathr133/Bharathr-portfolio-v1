'use client';

import React, { useRef, useState, useEffect } from 'react';
import { certifications } from '../data/portfolio';
import { Maximize2, X, Award, ChevronLeft, ChevronRight } from 'lucide-react';
import TiltCard from './TiltCard';
import useTextScramble from '../hooks/useTextScramble';
import { motion, AnimatePresence } from 'framer-motion';
import AstronautDog from './AstronautDog';

export default function Certifications() {
  const [activeCertUrl, setActiveCertUrl] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeCertIdx, setActiveCertIdx] = useState(0);
  const [activeFilter, setActiveFilter] = useState<'all' | 'dev' | 'cloud' | 'others'>('all');

  const { text: scrambleTitle, scramble: triggerScrambleTitle } = useTextScramble('My Certifications');

  const filteredCerts = certifications.filter((cert) => {
    if (activeFilter === 'all') return true;
    const title = cert.title.toLowerCase();
    if (activeFilter === 'dev') {
      return title.includes('kodnest') || title.includes('coddy') || title.includes('hackerrank') || title.includes('udemy');
    }
    if (activeFilter === 'cloud') {
      return title.includes('aws') || title.includes('ibm');
    }
    if (activeFilter === 'others') {
      return title.includes('tcs') || title.includes('besant') || title.includes('skilected');
    }
    return true;
  });

  // Check scroll positions and active index to show indicators/dots
  const handleCertScroll = () => {
    if (scrollContainerRef.current && filteredCerts.length > 0) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      if (clientWidth > 0) {
        const cardWidth = scrollWidth / filteredCerts.length;
        const index = Math.min(filteredCerts.length - 1, Math.max(0, Math.round(scrollLeft / cardWidth)));
        setActiveCertIdx(index);
      }
      setCanScrollLeft(scrollLeft > 5);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 5);
    }
  };

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (el) {
      el.addEventListener('scroll', handleCertScroll);
      // Run initial check
      handleCertScroll();
      // Handle resizing
      window.addEventListener('resize', handleCertScroll);
    }
    return () => {
      if (el) {
        el.removeEventListener('scroll', handleCertScroll);
      }
      window.removeEventListener('resize', handleCertScroll);
    };
  }, [filteredCerts.length]);

  // Autoplay certifications swiper every 4 seconds on mobile screen sizes
  useEffect(() => {
    if (filteredCerts.length === 0) return;
    const timer = setInterval(() => {
      if (scrollContainerRef.current && window.innerWidth < 768) {
        const nextIdx = (activeCertIdx + 1) % filteredCerts.length;
        const scrollWidth = scrollContainerRef.current.scrollWidth;
        const cardWidth = scrollWidth / filteredCerts.length;
        scrollContainerRef.current.scrollTo({
          left: nextIdx * cardWidth,
          behavior: 'smooth'
        });
        setActiveCertIdx(nextIdx);
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activeCertIdx, filteredCerts.length]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const cardWidth = 320 + 24; // Card width + gap
      const scrollAmount = direction === 'left' ? -cardWidth * 2 : cardWidth * 2;
      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="certifications" className="relative bg-slate-50 dark:bg-slate-950 py-16 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_90%_70%,rgba(168,85,247,0.02),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <Award className="h-4 w-4" />
              <span>Verified Credentials</span>
            </span>
            <h2 
              onMouseEnter={triggerScrambleTitle}
              className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-mono select-none cursor-default"
            >
              {scrambleTitle}
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Swipe horizontally or click the navigation arrows to browse my certified achievements. Click on any certificate to view it in full screen.
          </p>
        </div>

        {/* Category Filter Bar */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-150/40 dark:bg-slate-900/60 p-1.5 rounded-2xl border border-slate-200/50 dark:border-slate-800/40 w-fit select-none font-mono text-[9px] mb-8">
          <button
            onClick={() => {
              setActiveFilter('all');
              setActiveCertIdx(0);
            }}
            className={`group relative overflow-visible px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
              activeFilter === 'all'
                ? 'bg-white dark:bg-slate-950 text-indigo-655 dark:text-indigo-400 font-bold shadow-2xs border-slate-200 dark:border-slate-855'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/40'
            }`}
            data-cursor-text="TAP FILTER"
          >
            <AstronautDog />
            ALL CREDENTIALS ({certifications.length})
          </button>
          <button
            onClick={() => {
              setActiveFilter('dev');
              setActiveCertIdx(0);
            }}
            className={`group relative overflow-visible px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
              activeFilter === 'dev'
                ? 'bg-white dark:bg-slate-950 text-indigo-655 dark:text-indigo-400 font-bold shadow-2xs border-slate-200 dark:border-slate-855'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/40'
            }`}
            data-cursor-text="TAP FILTER"
          >
            <AstronautDog />
            DEVELOPMENT & CORE
          </button>
          <button
            onClick={() => {
              setActiveFilter('cloud');
              setActiveCertIdx(0);
            }}
            className={`group relative overflow-visible px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
              activeFilter === 'cloud'
                ? 'bg-white dark:bg-slate-950 text-indigo-655 dark:text-indigo-400 font-bold shadow-2xs border-slate-200 dark:border-slate-855'
                : 'bg-transparent text-slate-555 border-transparent hover:text-slate-800 hover:bg-slate-200/40'
            }`}
            data-cursor-text="TAP FILTER"
          >
            <AstronautDog />
            CLOUD & IBM
          </button>
          <button
            onClick={() => {
              setActiveFilter('others');
              setActiveCertIdx(0);
            }}
            className={`group relative overflow-visible px-3 py-1.5 rounded-xl cursor-pointer transition-all border ${
              activeFilter === 'others'
                ? 'bg-white dark:bg-slate-950 text-indigo-655 dark:text-indigo-400 font-bold shadow-2xs border-slate-200 dark:border-slate-855'
                : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/40'
            }`}
            data-cursor-text="TAP FILTER"
          >
            <AstronautDog />
            CORPORATE & OTHERS
          </button>
        </div>

        {/* Horizontal scroll slider container */}
        <div className="relative group/scroll">
          
          {/* Scroll Left Button */}
          {canScrollLeft && (
            <button
              onClick={() => handleScroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-lg hover:border-indigo-500/30 transition-all duration-300 hidden md:block"
              aria-label="Scroll Left"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}

          {/* Scroll Right Button */}
          {canScrollRight && (
            <button
              onClick={() => handleScroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-lg hover:border-indigo-500/30 transition-all duration-300 hidden md:block"
              aria-label="Scroll Right"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          )}

          {/* Horizontal scroll box */}
          <div
            ref={scrollContainerRef}
            onScroll={handleCertScroll}
            className="flex gap-6 overflow-x-auto scrollbar-hide py-4 -mx-6 px-6 md:-mx-8 md:px-8 snap-x snap-mandatory scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            <AnimatePresence mode="popLayout">
              {filteredCerts.map((cert) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  key={cert.title}
                  className="w-[80vw] xs:w-[82vw] sm:w-[320px] shrink-0 snap-center"
                >
                  <TiltCard className="w-full">
                    <div
                      onClick={() => setActiveCertUrl(cert.image)}
                      data-cursor-text="LARGE VIEW"
                      className="group flex flex-col overflow-hidden rounded-[20px_10px_32px_12px] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_15px_30px_-15px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.4)] hover:border-indigo-500/40 hover:dark:border-slate-700 transition-all duration-300 cursor-pointer relative"
                    >
                      {/* Browser Window Mockup Header */}
                      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-50/80 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 select-none">
                        <div className="flex items-center gap-1 shrink-0">
                          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                        </div>
                        <span className="text-[9px] text-slate-500 dark:text-slate-400 font-bold font-mono truncate max-w-[120px]">
                          {cert.image}
                        </span>
                        <div className="h-2 w-2 rounded-full bg-indigo-500/20" />
                      </div>

                      {/* Image frame */}
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={`/certificates/${encodeURIComponent(cert.image)}`}
                          alt={cert.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 select-none"
                          draggable={false}
                          loading="lazy"
                        />
                        
                        <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                          <Maximize2 className="h-6 w-6 text-indigo-400 mb-2 animate-bounce" />
                          <span className="text-xs font-bold uppercase tracking-wider font-mono">View Large</span>
                        </div>
                      </div>

                      {/* Card Title Details */}
                      <div className="p-5 flex flex-col justify-between flex-1 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                        <h3 className="font-bold text-slate-800 dark:text-white text-sm group-hover:text-indigo-650 dark:group-hover:text-indigo-400 transition-colors line-clamp-1">
                          {cert.title}
                        </h3>
                        <div className="mt-4 flex items-center justify-between border-t border-slate-100 dark:border-slate-800/80 pt-3 text-[9px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider font-mono">
                          <span>Issued Year</span>
                          <span className="text-indigo-650 dark:text-indigo-400">{cert.issueYear}</span>
                        </div>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile Swiper Indicators */}
          <div className="flex justify-center gap-1.5 mt-6 md:hidden w-full select-none">
            {filteredCerts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const scrollWidth = scrollContainerRef.current.scrollWidth;
                    const cardWidth = scrollWidth / filteredCerts.length;
                    scrollContainerRef.current.scrollTo({
                      left: idx * cardWidth,
                      behavior: 'smooth'
                    });
                    setActiveCertIdx(idx);
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === activeCertIdx ? 'w-4.5 bg-indigo-600 dark:bg-indigo-400' : 'w-1.5 bg-slate-300 dark:bg-slate-800'
                }`}
                aria-label={`Go to certification slide ${idx + 1}`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      {activeCertUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 backdrop-blur-md"
          onClick={() => setActiveCertUrl(null)}
        >
          <button
            onClick={() => setActiveCertUrl(null)}
            className="absolute top-6 right-6 p-2.5 rounded-full bg-slate-900 text-slate-400 hover:text-white border border-slate-800 transition-colors z-50"
            aria-label="Close certificate preview"
          >
            <X className="h-6 w-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[80vh] w-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/certificates/${encodeURIComponent(activeCertUrl)}`}
              alt="Certificate Full View"
              className="max-w-full max-h-[80vh] object-contain rounded-xl shadow-2xl border border-slate-800"
            />
          </div>
        </div>
      )}
    </section>
  );
}

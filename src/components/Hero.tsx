'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, FileText, Check, MapPin, ArrowRight, Briefcase } from 'lucide-react';
import { personalInfo, stats } from '../data/portfolio';
import TechIcon from './TechIcons';
import { motion } from 'framer-motion';

const marqueeSkills = [
  { name: 'Java 21', iconKey: 'java' },
  { name: 'Spring Boot 3', iconKey: 'springboot' },
  { name: 'React 19', iconKey: 'react' },
  { name: 'Next.js', iconKey: 'nextjs' },
  { name: 'Tailwind v4', iconKey: 'tailwind' },
  { name: 'Microservices', iconKey: 'microservices' },
  { name: 'Spring Cloud', iconKey: 'springcloud' },
  { name: 'Jackrabbit Oak', iconKey: 'jackrabbit' },
  { name: 'OpenPDF', iconKey: 'openpdf' },
  { name: 'PostgreSQL', iconKey: 'postgresql' },
  { name: 'Hibernate / JPA', iconKey: 'hibernate' },
  { name: 'Docker', iconKey: 'docker' },
  { name: 'Flyway', iconKey: 'flyway' },
  { name: 'Postman', iconKey: 'postman' },
  { name: 'Git', iconKey: 'git' },
];

function AnimatedStatValue({ value }: { value: string }) {
  const [currentVal, setCurrentVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
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
          const duration = 1200;
          const stepTime = Math.max(Math.floor(duration / targetNum), 25);
          
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
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [targetNum, hasAnimated]);

  return (
    <span ref={ref}>
      {currentVal}
      {isPlus && '+'}
    </span>
  );
}

export default function Hero() {
  const marqueeItems = [...marqueeSkills, ...marqueeSkills];
  const [copied, setCopied] = useState(false);
  const [activeBentoIdx, setActiveBentoIdx] = useState(0);
  const bentoScrollRef = useRef<HTMLDivElement>(null);

  const handleBentoScroll = () => {
    if (bentoScrollRef.current) {
      const { scrollLeft, clientWidth } = bentoScrollRef.current;
      if (clientWidth > 0) {
        const index = Math.round(scrollLeft / clientWidth);
        setActiveBentoIdx(index);
      }
    }
  };

  // Autoplay Bento Swiper every 4 seconds on mobile screen sizes
  useEffect(() => {
    const timer = setInterval(() => {
      if (bentoScrollRef.current && window.innerWidth < 1024) {
        const nextIdx = (activeBentoIdx + 1) % 4;
        const clientWidth = bentoScrollRef.current.clientWidth;
        if (clientWidth > 0) {
          bentoScrollRef.current.scrollTo({
            left: nextIdx * (clientWidth - 32),
            behavior: 'smooth'
          });
          setActiveBentoIdx(nextIdx);
        }
      }
    }, 4000);

    return () => clearInterval(timer);
  }, [activeBentoIdx]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-300"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100 dark:opacity-85 pointer-events-none" />

      {/* Modern gradient spotlight blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full z-10 flex flex-col gap-14">
        
        {/* Bento Grid Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Heading and info (approx 5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-5 items-start text-left">
            <span className="font-mono text-xs uppercase tracking-widest text-indigo-600 dark:text-indigo-400 font-bold px-3 py-1 rounded-full bg-indigo-50/50 dark:bg-indigo-950/30 border border-indigo-100/20 dark:border-indigo-900/30">
              Java Backend Developer
            </span>
            
            <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white font-serif leading-[1.12]">
              Building scalable backend APIs<br />and modern web applications.
            </h1>

            <p className="text-sm md:text-base leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
              Java Backend Developer with hands-on experience developing Spring Boot microservices, REST APIs, PostgreSQL databases, and responsive React applications. Passionate about clean architecture, performance optimization, and solving real-world engineering challenges.
            </p>

            {/* Active Status Indicator */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 dark:bg-emerald-500/10 border border-emerald-500/20 text-emerald-655 dark:text-emerald-400 text-xs font-mono select-none">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Open to Full-Time Java Backend Developer Opportunities</span>
            </div>

            {/* Action Buttons */}
            <div className="mt-2 flex flex-wrap gap-4 items-center">
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3.5 text-xs font-bold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
              >
                <FileText className="h-4 w-4" />
                <span>Download Resume</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => {
                  const contactSec = document.getElementById('contact');
                  if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="group flex items-center justify-center gap-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800/80 px-6 py-3.5 text-xs font-bold text-slate-800 dark:text-slate-200 shadow-sm hover:border-indigo-500/50 hover:bg-slate-50/50 dark:hover:bg-slate-950/40 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
              >
                <Mail className="h-4 w-4 text-indigo-500" />
                <span>Contact Me</span>
              </button>
            </div>
          </div>

          {/* Right Column: Bento Grid on Desktop, Swiper Carousel on Mobile */}
          <div className="lg:col-span-7 w-full flex flex-col gap-2">
            <div 
              ref={bentoScrollRef}
              onScroll={handleBentoScroll}
              className="w-full flex lg:grid lg:grid-cols-2 gap-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory scrollbar-hide -mx-6 px-6 lg:mx-0 lg:px-0 py-2"
            >
              
              {/* Bento Card 1: Avatar & Intro */}
              <div className="snap-center shrink-0 w-[84vw] xs:w-[86vw] sm:w-[360px] lg:w-auto lg:shrink-1 lg:col-span-2 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 shadow-xs rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 hover:border-indigo-500/30 transition-all duration-300">
                <div className="relative h-20 w-20 rounded-full border-2 border-indigo-500/60 overflow-hidden shadow-md shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img 
                    src="/headshot.jpg" 
                    alt="Bharath R - Java Full Stack Developer Bangalore" 
                    className="h-full w-full object-cover"
                  />
                  <span className="absolute bottom-1 right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900 animate-pulse" />
                </div>
                <div className="text-center sm:text-left space-y-1">
                  <div className="flex items-center justify-center sm:justify-start gap-1.5">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white font-serif">Bharath R</h2>
                  </div>
                  <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 font-bold uppercase tracking-wider">
                    Java Full-Stack Engineer
                  </p>
                  <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-slate-550 dark:text-slate-400 font-medium">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>Bangalore, India</span>
                  </div>
                </div>
              </div>

              {/* Bento Card 2: Quick Email Copy Trigger */}
              <button
                onClick={handleCopyEmail}
                className="snap-center shrink-0 w-[84vw] xs:w-[86vw] sm:w-[360px] lg:w-auto lg:shrink-1 group backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 shadow-xs rounded-2xl p-5 flex flex-col justify-between items-start text-left hover:border-indigo-500/50 hover:shadow-md transition-all duration-300 cursor-pointer min-h-[140px] focus:outline-none"
              >
                <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 transition-colors group-hover:bg-indigo-600 group-hover:text-white">
                  {copied ? <Check className="h-4.5 w-4.5" /> : <Mail className="h-4.5 w-4.5" />}
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-1">
                    Contact Recruiter Socket
                  </span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-250 truncate block max-w-full">
                    {copied ? 'SUCCESS: COPIED EMAIL' : personalInfo.email}
                  </span>
                </div>
              </button>

              {/* Bento Card 3: Core Architecture Stack circles */}
              <div className="snap-center shrink-0 w-[84vw] xs:w-[86vw] sm:w-[360px] lg:w-auto lg:shrink-1 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 shadow-xs rounded-2xl p-5 flex flex-col justify-between items-start min-h-[140px] hover:border-indigo-500/30 transition-all duration-300">
                <div className="h-9 w-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
                  <Briefcase className="h-4.5 w-4.5" />
                </div>
                <div className="w-full">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-2">
                    Primary Stack Align
                  </span>
                  <div className="flex items-center gap-2">
                    {['java', 'springboot', 'react', 'postgresql', 'docker'].map((key) => (
                      <div 
                        key={key} 
                        className="h-7 w-7 rounded-lg bg-slate-100 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-855 p-1 flex items-center justify-center shadow-2xs hover:scale-110 transition-transform cursor-pointer"
                        title={key.toUpperCase()}
                      >
                        <TechIcon iconKey={key} className="h-full w-full" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bento Card 4: Verified Vitals stats metrics */}
              <div className="snap-center shrink-0 w-[84vw] xs:w-[86vw] sm:w-[360px] lg:w-auto lg:shrink-1 lg:col-span-2 backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 shadow-xs rounded-2xl p-5 hover:border-indigo-500/30 transition-all duration-300">
                <span className="text-[10px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-4">
                  Verified Credentials &amp; Engineering Metrics
                </span>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="flex flex-col border-r last:border-r-0 border-slate-200/50 dark:border-slate-800/50 last:pr-0 pr-1.5 sm:pr-4">
                      <span className="text-2xl md:text-3xl font-extrabold text-indigo-655 dark:text-indigo-400 font-mono">
                        <AnimatedStatValue value={stat.value} />
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-bold text-slate-550 dark:text-slate-500 uppercase tracking-wider mt-1">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Mobile Swiper Indicators */}
            <div className="flex justify-center gap-1.5 mt-2 lg:hidden w-full select-none">
              {[0, 1, 2, 3].map((idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    if (bentoScrollRef.current) {
                      const clientWidth = bentoScrollRef.current.clientWidth;
                      bentoScrollRef.current.scrollTo({
                        left: idx * (clientWidth - 32),
                        behavior: 'smooth'
                      });
                    }
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    idx === activeBentoIdx ? 'w-4.5 bg-indigo-600 dark:bg-indigo-400' : 'w-1.5 bg-slate-300 dark:bg-slate-800'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Tech Marquee Container */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="overflow-hidden py-4.5 bg-white/60 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/40 shadow-sm dark:shadow-[0_20px_45px_rgba(0,0,0,0.2)] rounded-3xl relative group transition-colors duration-300"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="animate-marquee gap-6 items-center">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 py-1.5 px-3.5 rounded-xl bg-slate-50/50 dark:bg-slate-950/40 hover:bg-slate-100 dark:hover:bg-slate-900 border border-slate-100/50 dark:border-slate-900/60 transition-colors duration-300 cursor-pointer shrink-0 select-none group/pill"
              >
                <div className="h-5.5 w-5.5 shrink-0 flex items-center justify-center">
                  <TechIcon iconKey={item.iconKey} className="h-full w-full" />
                </div>
                <span className="text-xs font-bold tracking-wide text-slate-550 dark:text-slate-455">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}

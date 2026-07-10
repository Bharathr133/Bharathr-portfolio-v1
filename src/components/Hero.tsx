'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
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

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-32 pb-24 transition-colors duration-300"
    >
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-100 dark:opacity-85 pointer-events-none" />

      {/* Modern gradient spotlight blurs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-gradient-to-tr from-indigo-500/10 via-purple-500/10 to-pink-500/5 blur-[120px] pointer-events-none animate-pulse duration-[8000ms]" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8 w-full z-10 flex flex-col gap-14">
        
        {/* Main Content: Heading & Info (Clean Full Width Single Column) */}
        <div className="max-w-3xl flex flex-col gap-5 items-start text-left">
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-5.5xl font-serif leading-[1.12]">
            I build secure backend systems and clean web dashboards.
          </h1>

          <p className="text-sm md:text-base leading-relaxed text-slate-550 dark:text-slate-400 font-medium">
            Specializing in Java, Spring Boot, and React.js.
          </p>

          {/* Social Connection Sockets */}
          <div className="flex items-center gap-4.5 text-slate-500 dark:text-slate-400 pt-2">
            <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-650 dark:hover:text-white transition-colors" aria-label="GitHub">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-655 dark:hover:text-white transition-colors" aria-label="LinkedIn">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-650 dark:hover:text-white transition-colors" aria-label="Email">
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Dynamic Numeric stats dashboard bar */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/30 dark:border-slate-800/40 shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-3xl px-8 py-5 md:px-12 md:py-6.5 flex flex-row flex-wrap justify-between items-center gap-6 sm:gap-12 transition-colors duration-300"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-[100px]">
              <span className="text-3xl md:text-4xl font-extrabold text-indigo-655 dark:text-indigo-400">
                <AnimatedStatValue value={stat.value} />
              </span>
              <span className="mt-1 text-[10px] md:text-xs font-bold tracking-wider uppercase text-slate-450 dark:text-slate-500 font-mono">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

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

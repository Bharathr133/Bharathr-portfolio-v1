'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mail, ArrowRight, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo, stats } from '../data/portfolio';
import TechIcon from './TechIcons';
import Magnetic from './Magnetic';
import TiltCard from './TiltCard';
import { motion } from 'framer-motion';

const marqueeSkills = [
  { name: 'Java', iconKey: 'java' },
  { name: 'Spring Boot', iconKey: 'springboot' },
  { name: 'React.js', iconKey: 'react' },
  { name: 'Next.js', iconKey: 'nextjs' },
  { name: 'Tailwind CSS', iconKey: 'tailwind' },
  { name: 'Microservices', iconKey: 'microservices' },
  { name: 'Spring Cloud', iconKey: 'springcloud' },
  { name: 'Hibernate', iconKey: 'hibernate' },
  { name: 'PostgreSQL', iconKey: 'postgresql' },
  { name: 'SQL', iconKey: 'sql' },
  { name: 'Docker', iconKey: 'docker' },
  { name: 'Railway', iconKey: 'railway' },
  { name: 'Vercel', iconKey: 'vercel' },
  { name: 'Netlify', iconKey: 'netlify' },
  { name: 'Neon DB', iconKey: 'neon' },
  { name: 'MySQL', iconKey: 'mysql' },
  { name: 'CI/CD', iconKey: 'cicd' },
  { name: 'Git', iconKey: 'git' },
  { name: 'GitHub', iconKey: 'github' },
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
          const duration = 1500;
          const stepTime = Math.max(Math.floor(duration / targetNum), 35);
          
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
  const [titleIndex, setTitleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const fullTitle = personalInfo.titles[titleIndex];
      
      if (!isDeleting) {
        setCurrentText(fullTitle.substring(0, currentText.length + 1));
        setTypingSpeed(100);

        if (currentText === fullTitle) {
          setTypingSpeed(2000);
          setIsDeleting(true);
        }
      } else {
        setCurrentText(fullTitle.substring(0, currentText.length - 1));
        setTypingSpeed(50);

        if (currentText === '') {
          setIsDeleting(false);
          setTitleIndex((prevIndex) => (prevIndex + 1) % personalInfo.titles.length);
          setTypingSpeed(500);
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, titleIndex, typingSpeed]);

  const handleDownloadClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    
    const resumeDownloaded = localStorage.getItem('resumeDownloaded') === 'true';
    if (resumeDownloaded) {
      alert("You have already downloaded my resume. Thank you!");
      return;
    }

    const allowDownload = localStorage.getItem('allowDownload') === 'true';
    if (allowDownload) {
      const link = document.createElement('a');
      link.href = '/resume.pdf';
      link.download = 'Bharath_R_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      localStorage.setItem('resumeDownloaded', 'true');
      localStorage.removeItem('allowDownload');
      localStorage.removeItem('downloadRequested');
      alert("Resume downloaded successfully!");
      return;
    }

    localStorage.setItem('downloadRequested', 'true');
    alert("To download my resume, please fill out the contact form first to unlock the download.");
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const marqueeItems = [...marqueeSkills, ...marqueeSkills];

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 dark:bg-slate-950 pt-28 pb-20 transition-colors duration-300"
    >
      {/* Premium ambient glows behind raw background */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 h-[350px] w-[350px] rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 h-[300px] w-[300px] rounded-full bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 blur-[90px] pointer-events-none" />

      {/* Subtle grid mesh */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 dark:opacity-20" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8 w-full z-10 flex flex-col gap-14">
        
        {/* Top: Raw Profile Block (No Card, Breaths freely on background) */}
        <div className="flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
          
          {/* Avatar with clean visual anchor (Soft shadow, no hard card borders) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative h-32 w-32 md:h-38 md:w-38 shrink-0 rounded-[32px] overflow-hidden shadow-lg bg-white dark:bg-slate-900 p-1.5 transition-colors duration-300"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/zenistuCoder.jpg"
              alt="Bharath R"
              className="h-full w-full object-cover rounded-[24px] select-none"
              draggable={false}
            />
          </motion.div>

          {/* Title and Descriptions Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex-1 flex flex-col items-center md:items-start"
          >
            {/* Status Dot */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold mb-4 shadow-[0_4px_12px_rgba(16,185,129,0.06)] dark:shadow-none transition-colors">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Available for Full-time/Freelance</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl font-serif">
              Hi, I&apos;m <span className="text-indigo-650 dark:text-indigo-400">{personalInfo.name}</span>
            </h1>

            {/* Typewriter */}
            <div className="mt-3 h-8 text-xl md:text-2xl font-bold text-slate-700 dark:text-slate-300 font-mono">
              <span className="border-r-2 border-indigo-600 dark:border-indigo-400 pr-1 animate-pulse">{currentText}</span>
            </div>

            <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400 max-w-2xl font-medium">
              {personalInfo.subtitle}
            </p>

            {/* CTAs and Clean Minimal Socials */}
            <div className="mt-8 flex flex-wrap gap-5 items-center justify-center md:justify-start">
              <Magnetic>
                <a
                  href="#contact"
                  onClick={scrollToContact}
                  className="group flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-indigo-500 hover:shadow-lg transition-all duration-300"
                >
                  <span>Hire Me</span>
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </Magnetic>
              
              <Magnetic>
                <a
                  href="#contact"
                  onClick={handleDownloadClick}
                  id="download-resume-btn"
                  className="flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 px-6 py-3 text-xs font-bold text-slate-800 dark:text-white shadow-md hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-300"
                >
                  Download CV
                </a>
              </Magnetic>

              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block" />

              {/* Social Icons (Floating minimal button rows instead of card) */}
              <div className="flex items-center gap-5 text-slate-500 dark:text-slate-400">
                <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors" aria-label="GitHub">
                  <GithubIcon className="h-5 w-5" />
                </a>
                <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600 dark:hover:text-white transition-colors" aria-label="LinkedIn">
                  <LinkedinIcon className="h-5 w-5" />
                </a>
                <a href={`mailto:${personalInfo.email}`} className="hover:text-indigo-600 dark:hover:text-white transition-colors" aria-label="Email">
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Part: Single Horizontal Stat Dashboard Bar (Elevated shadow-md, NO borders) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white dark:bg-slate-900 shadow-md dark:shadow-[0_20px_50px_rgba(0,0,0,0.35)] rounded-2xl px-8 py-6 md:px-12 md:py-8 flex flex-row flex-wrap justify-between items-center gap-6 sm:gap-12 transition-colors duration-300"
        >
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center sm:items-start text-center sm:text-left flex-1 min-w-[100px]">
              <span className="text-3xl md:text-4xl font-extrabold text-indigo-650 dark:text-indigo-400">
                <AnimatedStatValue value={stat.value} />
              </span>
              <span className="mt-1 text-[10px] md:text-xs font-bold tracking-wider uppercase text-slate-500 dark:text-slate-400">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* Tech Marquee with edge-fading mask & shadow (no borders) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="overflow-hidden py-5 bg-white dark:bg-slate-900 shadow-md dark:shadow-[0_20px_45px_rgba(0,0,0,0.25)] rounded-2xl relative group transition-colors duration-300"
          style={{
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div className="animate-marquee gap-5 items-center">
            {marqueeItems.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2.5 py-2 px-4 rounded-xl bg-slate-50 dark:bg-slate-950 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-300 cursor-pointer shrink-0 select-none group/pill"
              >
                <div className="h-5 w-5 shrink-0 flex items-center justify-center text-slate-500 dark:text-slate-400 group-hover/pill:scale-105 transition-transform duration-300">
                  <TechIcon iconKey={item.iconKey} className="h-full w-full" />
                </div>
                <span className="text-xs font-bold tracking-wide text-slate-600 dark:text-slate-350">
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

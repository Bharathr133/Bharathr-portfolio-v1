'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Sun, Moon, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Magnetic from './Magnetic';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/portfolio';

const navLinks = [
  { id: 'home', path: '/', label: 'Home' },
  { id: 'about', path: '/about', label: 'About' },
  { id: 'skills', path: '/skills', label: 'Skills' },
  { id: 'projects', path: '/projects', label: 'Projects' },
  { id: 'experience', path: '/experience', label: 'Experience' },
  { id: 'certifications', path: '/certifications', label: 'Certifications' },
  { id: 'contact', path: '/contact', label: 'Contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileProjects, setShowMobileProjects] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on mount — light is always the default
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
      // User explicitly chose dark previously
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      // First visit OR user chose light — always light
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // lock in light as default
      setIsDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setIsDarkMode(true);
    }
  };

  // Sync active nav item with path when on subpage
  useEffect(() => {
    if (pathname !== '/') {
      const activeLink = navLinks.find(link => link.path === pathname);
      if (activeLink) {
        setActiveSection(activeLink.id);
      }
    } else {
      setActiveSection('home');
    }
  }, [pathname]);

  // Handle scroll spy (only active on homepage)
  useEffect(() => {
    if (pathname !== '/') {
      setScrolled(true); // Always keep navbar clean and styled on subpages
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setIsOpen(false);
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(link.id);
      if (element) {
        const offset = 90;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
        window.history.pushState(null, '', link.path);
      }
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-4xl transition-all duration-500 rounded-full border border-slate-200/50 dark:border-slate-800/80 backdrop-blur-xl ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/75 py-2 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
            : 'bg-white/50 dark:bg-slate-900/40 py-3.5 px-7 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Magnetic>
            <Link
              href="/"
              onClick={(e) => handleLinkClick(e, navLinks[0])}
              className="flex items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-indigo-650 dark:hover:text-indigo-400 transition-colors font-serif"
            >
              <Code className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-500" />
              <span className="hidden sm:inline">Bharath R</span>
              <span className="sm:hidden">BR</span>
            </Link>
          </Magnetic>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 font-mono">
              {navLinks.map((link) => (
                <Magnetic key={link.id} range={25}>
                  <Link
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link)}
                    className={`text-[11px] font-bold uppercase tracking-wider transition-all hover:text-indigo-655 dark:hover:text-indigo-400 py-1 relative block ${
                      activeSection === link.id
                        ? 'text-indigo-605 dark:text-indigo-400'
                        : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    {link.label}
                    {activeSection === link.id && (
                      <span className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-605 dark:bg-indigo-500 rounded-full" />
                    )}
                  </Link>
                </Magnetic>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2 border-l border-slate-200/50 dark:border-slate-800/80 pl-4">
              {/* Theme Toggle */}
              <Magnetic range={25}>
                <button
                  onClick={toggleTheme}
                  className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-605 dark:hover:text-indigo-450 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300 cursor-pointer"
                  aria-label="Toggle light/dark theme"
                >
                  {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </Magnetic>

              {/* Mobile Menu Toggle */}
              <Magnetic range={25}>
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-605 dark:hover:text-white cursor-pointer"
                  aria-label="Toggle menu"
                >
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
              </Magnetic>
            </div>
          </div>
        </div>
      </header>

      {/* Immersive Full-Screen Blur Mobile Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="fixed inset-0 z-35 bg-white/98 dark:bg-slate-950/98 backdrop-blur-3xl md:hidden flex flex-col justify-between p-8 pt-28 font-mono select-none"
          >
            {/* Centered Navigation Links with Large Typography */}
            <nav className="flex flex-col gap-6 text-center mt-8">
              {navLinks.map((link, idx) => {
                const isProjectsLink = link.id === 'projects';
                return (
                  <motion.div
                    key={link.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 + 0.1 }}
                    className="flex flex-col items-center"
                  >
                    {isProjectsLink ? (
                      <>
                        <button
                          onClick={() => setShowMobileProjects(!showMobileProjects)}
                          className={`text-2xl font-black font-sans tracking-tight uppercase transition-all cursor-pointer flex items-center justify-center gap-2 ${
                            activeSection === 'projects'
                              ? 'text-indigo-600 dark:text-indigo-400'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                          }`}
                        >
                          <span>{link.label}</span>
                          <ChevronDown
                            className={`h-5 w-5 transition-transform duration-300 ${
                              showMobileProjects ? 'rotate-180 text-indigo-500' : 'text-slate-400'
                            }`}
                          />
                        </button>

                        {/* Mobile Projects Submenu Drawer */}
                        <AnimatePresence>
                          {showMobileProjects && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.22 }}
                              className="overflow-hidden w-full max-w-[240px] mt-2"
                            >
                              <div className="flex flex-col bg-slate-50 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/60 rounded-2xl overflow-hidden">
                                {projects.map((proj, pIdx) => (
                                  <Link
                                    key={proj.id}
                                    href={`/projects/${proj.id}`}
                                    onClick={() => {
                                      setIsOpen(false);
                                      setShowMobileProjects(false);
                                    }}
                                    className={`flex items-center gap-2 px-4 py-2.5 text-[11px] font-mono font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 transition-all ${
                                      pIdx !== projects.length - 1 ? 'border-b border-slate-200/50 dark:border-slate-800/50' : ''
                                    }`}
                                  >
                                    <ChevronRight className="h-3 w-3 shrink-0 text-indigo-400" />
                                    <span className="truncate">{proj.title.split(' – ')[0].split(' - ')[0]}</span>
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <Link
                        href={link.path}
                        onClick={(e) => {
                          setIsOpen(false);
                          handleLinkClick(e, link);
                        }}
                        className={`text-2xl font-black font-sans tracking-tight uppercase transition-all block ${
                          activeSection === link.id
                            ? 'text-indigo-600 dark:text-indigo-400 font-extrabold'
                            : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                        }`}
                      >
                        {link.label}
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </nav>

            {/* Mobile Menu Footer Dashboard */}
            <div className="border-t border-slate-200 dark:border-slate-850 pt-6 flex flex-col gap-4 text-center items-center shrink-0">
              <span className="text-[9px] text-slate-400 dark:text-slate-600 uppercase tracking-widest font-bold">
                {"// Secure Socket Connection"}
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/Bharathr133"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 flex items-center justify-center cursor-pointer"
                  aria-label="GitHub"
                >
                  <GithubIcon className="h-4.5 w-4.5" />
                </a>
                <a
                  href="https://linkedin.com/in/bharath-r"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-550 dark:text-slate-400 flex items-center justify-center cursor-pointer"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="h-4.5 w-4.5" />
                </a>
              </div>
              <span className="text-[9px] text-slate-400 dark:text-slate-600 select-none">
                Bangalore, India • Compiled v1.0
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Sun, Moon } from 'lucide-react';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];

export default function Header() {
  const [activeSection, setActiveSection] = useState('home');
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Load theme preference on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
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

  useEffect(() => {
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
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    const element = document.getElementById(id);
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
    }
  };

  return (
    <>
      <header
        className={`fixed top-4 left-4 right-4 md:top-6 z-40 max-w-4xl mx-auto w-[calc(100%-2rem)] md:w-full transition-all duration-500 rounded-full border border-slate-200/50 dark:border-slate-800/80 backdrop-blur-xl ${
          scrolled
            ? 'bg-white/80 dark:bg-slate-950/75 py-2 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.06)]'
            : 'bg-white/50 dark:bg-slate-900/40 py-3.5 px-7 shadow-[0_10px_30px_rgba(0,0,0,0.02)]'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, 'home')}
            className="flex items-center gap-2 text-base font-extrabold tracking-tight text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors font-serif"
          >
            <Code className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-500" />
            <span className="hidden sm:inline">Bharath R</span>
            <span className="sm:hidden">BR</span>
          </a>

          {/* Navigation & Controls */}
          <div className="flex items-center gap-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6 font-mono">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleLinkClick(e, link.id)}
                  className={`text-[11px] font-bold uppercase tracking-wider transition-all hover:text-indigo-650 dark:hover:text-indigo-400 py-1 relative ${
                    activeSection === link.id
                      ? 'text-indigo-600 dark:text-indigo-400'
                      : 'text-slate-500 dark:text-slate-400'
                  }`}
                >
                  {link.label}
                  {activeSection === link.id && (
                    <span className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-600 dark:bg-indigo-500 rounded-full" />
                  )}
                </a>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2 border-l border-slate-200/50 dark:border-slate-800/80 pl-4">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-450 hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-all duration-300"
                aria-label="Toggle light/dark theme"
              >
                {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Dropdown Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-35 bg-slate-950/10 dark:bg-slate-950/40 backdrop-blur-xs md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile capsule dropdown */}
      {isOpen && (
        <div className="fixed top-20 left-4 right-4 z-40 md:hidden p-4 rounded-3xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border border-slate-200/50 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)] animate-in fade-in slide-in-from-top-4 duration-300 font-mono">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => handleLinkClick(e, link.id)}
                className={`py-2.5 px-4 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all ${
                  activeSection === link.id
                    ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30 font-bold'
                    : 'text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-900'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}

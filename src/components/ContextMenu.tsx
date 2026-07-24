'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Home, Sun, Moon, Mail, FileText, Check } from 'lucide-react';
import { GithubIcon } from './SocialIcons';

export default function ContextMenu() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    // Detect dark mode status
    const updateThemeStatus = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    updateThemeStatus();

    // Listen for custom theme updates
    const observer = new MutationObserver(updateThemeStatus);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);
      setCopied(false);
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setVisible(false);
      }
    };

    const handleScroll = () => {
      setVisible(false);
    };

    window.addEventListener('contextmenu', handleContextMenu);
    window.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('contextmenu', handleContextMenu);
      window.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleTheme = () => {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setIsDarkMode(isDark);
    setVisible(false);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('12345bharathr.com@gmail.com');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setVisible(false);
    }, 1200);
  };

  const navigateTo = (path: string) => {
    router.push(path);
    setVisible(false);
  };

  const openLink = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
    setVisible(false);
  };

  // Adjust menu position if it bleeds out of the screen bounds
  const getAdjustedPosition = () => {
    if (typeof window === 'undefined') return { top: position.y, left: position.x };
    const menuWidth = 190;
    const menuHeight = 220;
    let adjustedX = position.x;
    let adjustedY = position.y;

    if (position.x + menuWidth > window.innerWidth) {
      adjustedX = window.innerWidth - menuWidth - 10;
    }
    if (position.y + menuHeight > window.innerHeight) {
      adjustedY = window.innerHeight - menuHeight - 10;
    }
    return { top: adjustedY, left: adjustedX };
  };

  const adjustedPos = getAdjustedPosition();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          ref={menuRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.12 }}
          style={{
            position: 'fixed',
            top: adjustedPos.top,
            left: adjustedPos.left,
            zIndex: 99999,
          }}
          className="w-48 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-slate-200/60 dark:border-slate-800/80 rounded-2xl shadow-2xl p-2.5 font-mono select-none"
        >
          <div className="text-[7.5px] font-bold text-slate-400 dark:text-slate-600 px-2.5 pb-2 border-b border-slate-100 dark:border-slate-800 mb-1.5 uppercase tracking-widest">
            Dev Options
          </div>
          
          <ul className="space-y-0.5 text-[10px]">
            <li>
              <button
                onClick={() => navigateTo('/')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <Home className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>Return to Hub</span>
              </button>
            </li>
            
            <li>
              <button
                onClick={toggleTheme}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                {isDarkMode ? (
                  <>
                    <Sun className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                    <span>Mode: Light</span>
                  </>
                ) : (
                  <>
                    <Moon className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                    <span>Mode: Dark</span>
                  </>
                )}
              </button>
            </li>

            <li>
              <button
                onClick={copyEmail}
                className="w-full flex items-center justify-between px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                  <span>Copy Contact</span>
                </div>
                {copied && (
                  <Check className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                )}
              </button>
            </li>

            <li>
              <button
                onClick={() => {
                  setVisible(false);
                  sessionStorage.setItem('resumeRequested', 'true');
                  const contactSec = document.getElementById('contact');
                  if (contactSec) {
                    contactSec.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                  window.dispatchEvent(new CustomEvent('request-resume-download'));
                }}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <FileText className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                <span>Open Resume</span>
              </button>
            </li>

            <li>
              <button
                onClick={() => openLink('https://github.com/Bharathr133')}
                className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-left text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer border-t border-slate-100 dark:border-slate-850/60 mt-1.5 pt-1.5"
              >
                <GithubIcon className="h-3.5 w-3.5 text-indigo-500 shrink-0 fill-indigo-500/20" />
                <span>GitHub Socket</span>
              </button>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

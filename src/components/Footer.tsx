'use client';

import React, { useState } from 'react';
import { Mail, Terminal, Copy, Check, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { personalInfo } from '../data/portfolio';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { id: 'home', path: '/', label: 'cd /home' },
  { id: 'about', path: '/about', label: 'cd /about' },
  { id: 'skills', path: '/skills', label: 'cd /skills' },
  { id: 'projects', path: '/projects', label: 'cd /projects' },
  { id: 'experience', path: '/experience', label: 'cd /experience' },
  { id: 'certifications', path: '/certifications', label: 'cd /certs' },
  { id: 'contact', path: '/contact', label: 'cd /contact' },
];

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("12345bharathr.com@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    if (pathname === '/') {
      e.preventDefault();
      const element = document.getElementById(link.id);
      if (element) {
        const offset = 80;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = element.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        window.history.pushState(null, '', link.path);
      }
    }
  };

  return (
    <footer className="relative bg-slate-900 border-t border-slate-800 py-16 transition-colors duration-300 overflow-hidden">
      {/* Soft background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8 w-full z-10 flex flex-col gap-12 font-mono">
        
        {/* Terminal Header Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2 text-slate-400 text-xs">
            <Terminal className="h-4 w-4 text-indigo-500" />
            <span>bharathr@portfolio:~# <span className="text-slate-500">cat system_status.json</span></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] text-slate-500 uppercase tracking-wider font-bold">ONLINE</span>
          </div>
        </div>

        {/* Console Footprint Grid */}
        <div className="grid gap-8 md:grid-cols-2">
          
          {/* Column 1: Navigation Directories */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none border-b border-slate-800 pb-1.5">
              {"// Navigation Directory"}
            </span>
            <nav className="grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs text-slate-400">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link)}
                  className="hover:text-indigo-400 transition-colors w-fit flex items-center gap-1"
                >
                  <span className="text-slate-650">&gt;</span>
                  <span>{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Column 2: Connection Channels & Location */}
          <div className="flex flex-col gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none border-b border-slate-800 pb-1.5">
              {"// Connection channels & Location"}
            </span>
            
            <div className="grid gap-6 sm:grid-cols-2 items-start">
              {/* Clipboard copy command utility */}
              <div className="flex flex-col gap-2">
                <span className="text-[9px] text-slate-600">execute command to copy email:</span>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center justify-between p-3 rounded-2xl bg-slate-950/90 border border-slate-800/80 cursor-pointer hover:border-indigo-500/30 hover:bg-slate-950 transition-all font-mono text-[10.5px] w-full text-left"
                >
                  <div className="flex items-center gap-2 text-slate-400">
                    <Mail className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="truncate">12345bharathr.com@gmail.com</span>
                  </div>
                  <div className="flex items-center shrink-0">
                    {copied ? (
                      <div className="flex items-center gap-1 text-emerald-400 font-bold text-[9px] uppercase">
                        <Check className="h-3 w-3" />
                        <span>COPIED</span>
                      </div>
                    ) : (
                      <Copy className="h-3.5 w-3.5 text-slate-500 hover:text-slate-300 transition-colors" />
                    )}
                  </div>
                </button>
              </div>

              {/* Location Details & Socials */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] text-slate-600">current locator:</span>
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <MapPin className="h-3.5 w-3.5 text-slate-600 shrink-0" />
                    <span>LOCATION: Bangalore, India</span>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[9px] text-slate-600">secure social sockets:</span>
                  <div className="flex items-center gap-3 text-slate-500">
                    <a
                      href={personalInfo.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-2 rounded-lg bg-slate-950/80 border border-slate-850/80 flex items-center justify-center"
                      aria-label="GitHub"
                    >
                      <GithubIcon className="h-4.5 w-4.5" />
                    </a>
                    <a
                      href={personalInfo.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-white transition-colors p-2 rounded-lg bg-slate-950/80 border border-slate-850/80 flex items-center justify-center"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="h-4.5 w-4.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Base bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between pt-8 border-t border-slate-800/80 text-[10px] text-slate-600 gap-4">
          <p>&copy; {currentYear} Bharath R. Compiled with production metrics.</p>
          <div className="flex items-center gap-1 text-slate-655 font-mono text-[9px] uppercase select-none">
            <span>Security context: SHA-256 Verified</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

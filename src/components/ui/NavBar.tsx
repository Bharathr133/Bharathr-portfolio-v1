// src/components/ui/NavBar.tsx

'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { ThemeToggle } from './ThemeToggle';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

export const NavBar = () => {
  const [active, setActive] = useState('home');

  // Update active section on scroll
  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY + 120; // offset for sticky height
      let current = 'home';
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos) {
          current = sec.id;
        }
      }
      setActive(current);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className="fixed top-0 inset-x-0 z-40 backdrop-blur-md bg-white/70 dark:bg-black/70 border-b border-muted-foreground/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-2 px-4">
        <div className="flex space-x-6">
          {sections.map((sec) => (
            <Link
              key={sec.id}
              href={`#${sec.id}`}
              className={`text-sm font-medium hover:text-primary transition-colors ${active === sec.id ? 'text-primary' : 'text-muted-foreground'}`}
            >
              {sec.label}
            </Link>
          ))}
        </div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

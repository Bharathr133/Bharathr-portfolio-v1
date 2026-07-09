'use client';

import React, { useEffect, useRef, useState } from 'react';
import { skillCategories, SkillCategory } from '../data/portfolio';
import TechIcon from './TechIcons';
import * as LucideIcons from 'lucide-react';
import TiltCard from './TiltCard';
import { Tab } from './ui/Tab';

function getSkillLevel(progress: number): string {
  if (progress >= 95) return 'Expert';
  if (progress >= 90) return 'Advanced';
  if (progress >= 80) return 'Core Mastery';
  return 'Competent';
}

function CircularSkillCard({ name, progress, color, iconKey }: { name: string; progress: number; color: string; iconKey: string }) {
  const [offset, setOffset] = useState(163.36); // Full circumference initially
  const cardRef = useRef<HTMLDivElement>(null);
  const circumference = 163.36; // 2 * pi * r (r=26)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          // Calculate dashoffset matching target progress
          const targetOffset = circumference - (progress / 100) * circumference;
          setOffset(targetOffset);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [progress]);

  return (
    <TiltCard className="w-full">
      <div
        ref={cardRef}
        className="relative flex items-center gap-4 p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 rounded-[20px_6px_24px_12px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.45)] hover:border-indigo-500/40 hover:dark:border-slate-700 transition-all duration-300 w-full group overflow-hidden"
      >
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[20px_6px_24px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

        {/* Circular SVG Progress Ring */}
        <div className="relative h-16 w-16 shrink-0 flex items-center justify-center">
          <svg className="h-full w-full -rotate-90">
            {/* Background circle track */}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="transparent"
              strokeWidth="4"
              className="stroke-slate-100 dark:stroke-slate-950 transition-colors duration-300"
            />
            {/* Foreground circle indicator */}
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="transparent"
              strokeWidth="4"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              style={{
                stroke: color,
                transition: 'stroke-dashoffset 1.2s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            />
          </svg>
          
          {/* Official brand SVG icon in the center of the ring */}
          <div className="absolute h-6 w-6 flex items-center justify-center text-slate-600 dark:text-slate-400 group-hover:scale-110 transition-transform duration-300">
            <TechIcon iconKey={iconKey} className="h-full w-full" />
          </div>
        </div>

        {/* Skill Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate font-serif">
            {name}
          </h4>
          <div className="flex items-center justify-between mt-1 text-[10px] font-bold uppercase tracking-wider font-mono">
            <span className="text-slate-400 dark:text-slate-500">{getSkillLevel(progress)}</span>
            <span className="text-indigo-650 dark:text-indigo-400">{progress}%</span>
          </div>
        </div>
      </div>
    </TiltCard>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(skillCategories[0].title);
  
  const selectedCategory = skillCategories.find((cat) => cat.title === activeCategory) || skillCategories[0];

  return (
    <section id="skills" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.03),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl w-full">
        
        {/* Asymmetrical Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 px-6 md:px-8 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <LucideIcons.Laptop className="h-4 w-4" />
              <span>Technology Matrix</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Technical Skillset
            </h2>
          </div>
          <p className="text-slate-550 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Circular SVG progress indicators show my level of core mastery, loaded with interactive hover cards and official logos.
          </p>
        </div>

        {/* Tab navigation for skill categories */}
        <div className="px-6 md:px-8 mb-8">
          <Tab
            items={skillCategories.map((cat) => ({ id: cat.title, label: cat.title }))}
            defaultActive={skillCategories[0].title}
            onChange={(id) => setActiveCategory(id)}
          />
        </div>

        {/* Skills Cards Grid - Full Width 3 Columns */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 px-6 md:px-8">
          {selectedCategory.skills.map((skill, idx) => (
            <CircularSkillCard
              key={idx}
              name={skill.name}
              progress={skill.progress}
              color={skill.color}
              iconKey={skill.iconKey}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

'use client';

import React, { useState } from 'react';
import { skillCategories, SkillCategory } from '../data/portfolio';
import TechIcon from './TechIcons';
import * as LucideIcons from 'lucide-react';
import TiltCard from './TiltCard';
import { motion } from 'framer-motion';

interface SkillCardProps {
  name: string;
  color: string;
  iconKey: string;
  evidence?: string;
}

function SkillCard({ name, color, iconKey, evidence }: SkillCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <TiltCard className="w-full">
      <div
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative flex items-start gap-4 p-5 bg-white dark:bg-slate-900 rounded-[20px_6px_24px_12px] shadow-xs dark:shadow-[0_15px_35px_rgba(0,0,0,0.4)] transition-all duration-300 w-full group overflow-hidden border border-slate-200/40 dark:border-slate-800/80"
        style={{
          borderColor: isHovered ? color : '',
          boxShadow: isHovered ? `0 12px 30px -12px ${color}35, inset 0 0 12px ${color}10` : '',
        }}
      >
        <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-[20px_6px_24px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xs pointer-events-none" />

        {/* Tech Icon Container with dynamic glow */}
        <div 
          className="relative h-11 w-11 shrink-0 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 transition-transform duration-300 group-hover:scale-105"
          style={{ 
            boxShadow: isHovered ? `0 0 15px ${color}30` : `inset 0 0 8px ${color}10`,
            borderColor: isHovered ? `${color}40` : ''
          }}
        >
          <div className="h-5.5 w-5.5 flex items-center justify-center">
            <TechIcon iconKey={iconKey} className="h-full w-full" />
          </div>
        </div>

        {/* Skill Details */}
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white truncate font-mono uppercase tracking-wider">
            {name}
          </h4>
          {evidence && (
            <p className="mt-2 text-[10.5px] text-slate-550 dark:text-slate-400 leading-relaxed font-medium">
              {evidence}
            </p>
          )}
        </div>
      </div>
    </TiltCard>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.02),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <LucideIcons.Laptop className="h-4 w-4" />
              <span>Technology Matrix</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Technical Core &amp; Stack
            </h2>
          </div>
          <p className="text-slate-550 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            A comprehensive breakdown of architectural competencies, frameworks, and deployment utilities paired with real-world implementation logs.
          </p>
        </div>

        {/* Layered Category Rows - All visible simultaneously */}
        <div className="flex flex-col gap-16">
          {skillCategories.map((category, catIdx) => {
            // Pick a matching Lucide icon for category styling
            const Icon = catIdx === 0 ? LucideIcons.Laptop : catIdx === 1 ? LucideIcons.Server : LucideIcons.Cpu;

            return (
              <motion.div 
                key={catIdx} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6, delay: catIdx * 0.12 }}
                className="flex flex-col gap-6"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 border-b border-slate-200/60 dark:border-slate-900 pb-3">
                  <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 text-indigo-600 dark:text-indigo-400">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="text-sm font-extrabold tracking-wider uppercase font-mono text-slate-700 dark:text-slate-350">
                    {category.title}
                  </h3>
                  <span className="text-[10px] font-mono text-slate-450 dark:text-slate-500 font-bold ml-auto">
                    {category.skills.length} MODULES ACTIVE
                  </span>
                </div>

                {/* Cards Grid */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {category.skills.map((skill, skillIdx) => (
                    <SkillCard
                      key={skillIdx}
                      name={skill.name}
                      color={skill.color}
                      iconKey={skill.iconKey}
                      evidence={skill.evidence}
                    />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

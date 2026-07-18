'use client';

import React, { useState, useEffect } from 'react';
import { skillCategories, Skill } from '../data/portfolio';
import TechIcon from './TechIcons';
import { Laptop, Server, Cpu, Terminal, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Skills() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const activeCategory = skillCategories[activeCategoryIdx];
  
  // Pick matching icon for category list
  const getCategoryIcon = (idx: number) => {
    switch (idx) {
      case 0: return Laptop;
      case 1: return Server;
      default: return Cpu;
    }
  };

  // Set default active log when switching categories
  useEffect(() => {
    if (activeCategory && activeCategory.skills.length > 0) {
      const firstSkill = activeCategory.skills[0];
      setTimeout(() => {
        setHoveredSkill(firstSkill);
      }, 0);
    }
  }, [activeCategoryIdx, activeCategory]);

  return (
    <section id="skills" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/85 dark:border-slate-900 transition-colors duration-300">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,rgba(99,102,241,0.015),transparent_40%)]" />

      <div className="relative mx-auto max-w-6xl px-6 md:px-8 w-full">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <Terminal className="h-4 w-4" />
              <span>Technology Matrix</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Technical Core &amp; Stack
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium font-mono">
            An interactive dashboard mapping my architectural competencies, frameworks, and deployment utilities.
          </p>
        </div>

        {/* Dynamic Bento Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Category Selector Dock (approx 4 cols) */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            
            {/* Category selection list */}
            <div className="backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl p-4 flex flex-row lg:flex-col gap-2 shadow-xs overflow-x-auto lg:overflow-visible scrollbar-hide shrink-0">
              <span className="text-[9px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest px-2 mb-2 hidden lg:block">
                Select Skill Category
              </span>
              
              {skillCategories.map((category, idx) => {
                const Icon = getCategoryIcon(idx);
                const isActive = idx === activeCategoryIdx;
                
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveCategoryIdx(idx)}
                    className={`group shrink-0 flex items-center gap-2 sm:gap-3.5 p-2.5 sm:p-3 rounded-xl border text-left transition-all duration-300 cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 border-indigo-600 text-white shadow-xs' 
                        : 'bg-white/40 dark:bg-slate-950/20 border-slate-200/50 dark:border-slate-900/50 text-slate-700 dark:text-slate-400 hover:bg-white dark:hover:bg-slate-900'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 dark:bg-slate-900 text-slate-500'
                    }`}>
                      <Icon className="h-4 w-4" />
                    </div>
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">
                      {category.title}
                    </span>
                    <ChevronRight className={`h-4 w-4 transition-transform duration-300 hidden lg:block ${
                      isActive ? 'translate-x-0.5 text-white' : 'opacity-0 group-hover:opacity-100 text-slate-400'
                    }`} />
                  </button>
                );
              })}
            </div>

            {/* Category summary panel */}
            <div className="hidden lg:flex backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl p-5 flex-col justify-between flex-1 shadow-xs min-h-[160px]">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[9px] font-bold font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    Category Overview
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif mb-2">
                  {activeCategory.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400 font-medium">
                  {activeCategoryIdx === 0 && "Building responsive single-page interfaces, optimizing performance frameworks, and designing layout variables for seamless user interactions."}
                  {activeCategoryIdx === 1 && "Architecting secure transactional backend pipelines, microservice communication interfaces, structured data mapping, and automated reporting systems."}
                  {activeCategoryIdx === 2 && "Containerizing application micro-networks, automating deployments, scripting environment validations, and managing branch control workflows."}
                </p>
              </div>
              <div className="border-t border-slate-200/50 dark:border-slate-800/50 pt-3 mt-4 flex items-center justify-between font-mono text-[9px] text-slate-400 dark:text-slate-500">
                <span>MODULE VERIFICATION</span>
                <span className="font-bold text-indigo-650 dark:text-indigo-400">
                  {activeCategory.skills.length} MODULES READY
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Dynamic Pills Grid & Interactive Console (approx 8 cols) */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Interactive Grid of Pills */}
            <div className="backdrop-blur-md bg-white/60 dark:bg-slate-900/60 border border-slate-200/40 dark:border-slate-800/40 rounded-2xl p-6 shadow-xs flex-1 flex flex-col justify-center">
              <span className="text-[9px] font-bold font-mono text-slate-400 uppercase tracking-widest block mb-4">
                Active Modules Matrix (Hover to inspect credentials)
              </span>
              
              <div className="flex flex-wrap gap-3">
                <AnimatePresence mode="popLayout">
                  {activeCategory.skills.map((skill, idx) => {
                    const isSelected = hoveredSkill?.name === skill.name;
                    return (
                      <motion.button
                        key={skill.name}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.25, delay: idx * 0.04 }}
                        onMouseEnter={() => setHoveredSkill(skill)}
                        onClick={() => {
                          setHoveredSkill(skill);
                          setIsBottomSheetOpen(true);
                        }}
                        className={`flex items-center gap-2.5 px-4.5 py-3 rounded-xl border text-left cursor-pointer transition-all duration-300 hover:scale-[1.03] focus:outline-none ${
                          isSelected 
                            ? 'bg-slate-950 border-slate-800 text-white shadow-xs' 
                            : 'bg-white dark:bg-slate-950/40 border-slate-200/50 dark:border-slate-900/50 text-slate-800 dark:text-slate-300'
                        }`}
                        style={{
                          boxShadow: isSelected ? `0 0 15px ${skill.color}15, inset 0 0 8px ${skill.color}10` : '',
                          borderColor: isSelected ? skill.color : ''
                        }}
                      >
                        <div 
                          className="h-6 w-6 rounded-lg bg-slate-50 dark:bg-slate-900/50 p-1 flex items-center justify-center border border-slate-200/30 dark:border-slate-800"
                          style={{
                            boxShadow: isSelected ? `0 0 10px ${skill.color}30` : ''
                          }}
                        >
                          <TechIcon iconKey={skill.iconKey} className="h-full w-full" />
                        </div>
                        <span className="text-xs font-bold font-mono tracking-wide uppercase">
                          {skill.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
              </div>
            </div>

            {/* Interactive Console Logger / Experience Previewer */}
            <div className="backdrop-blur-md bg-slate-950/95 border border-slate-900 rounded-2xl p-4 lg:p-5 shadow-xs font-mono text-xs leading-relaxed text-slate-400 select-none min-h-[110px] lg:min-h-[140px] flex flex-col">
              <div className="hidden sm:flex items-center justify-between border-b border-slate-900 pb-2 mb-3.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-yellow-500/80" />
                  <span className="h-1.5 w-1.5 rounded-full bg-green-500/80" />
                  <span className="text-[7.5px] text-slate-600 uppercase tracking-widest font-bold ml-2">
                    Experience Inspector CLI
                  </span>
                </div>
                <Terminal className="h-3.5 w-3.5 text-slate-650" />
              </div>
              
              <div className="flex-1 flex flex-col gap-1 justify-center">
                {hoveredSkill ? (
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-indigo-400 font-bold">SYSTEM_LOG &gt;</span>
                      <span className="text-slate-200 font-bold uppercase tracking-wide">
                        {hoveredSkill.name}
                      </span>
                      <span 
                        className="text-[9px] font-bold px-2 py-0.5 rounded-md border font-mono ml-auto uppercase"
                        style={{ 
                          color: hoveredSkill.color, 
                          borderColor: `${hoveredSkill.color}30`, 
                          backgroundColor: `${hoveredSkill.color}08` 
                        }}
                      >
                        Active stack
                      </span>
                    </div>
                    <p className="text-slate-300 dark:text-slate-400 leading-relaxed font-mono pl-4 border-l-2 border-slate-800">
                      {hoveredSkill.evidence}
                    </p>
                  </div>
                ) : (
                  <div className="text-slate-600 italic">
                    Hover over a tech module to view production logging...
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Mobile Bottom Sheet Modal */}
      <AnimatePresence>
        {isBottomSheetOpen && hoveredSkill && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsBottomSheetOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/80 lg:hidden"
            />
            {/* Bottom Sheet Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-x-0 bottom-0 z-50 lg:hidden rounded-t-[32px] bg-slate-900 dark:bg-slate-950 border-t border-slate-800 p-6 pb-10 shadow-[0_-15px_30px_rgba(0,0,0,0.3)] font-sans"
            >
              {/* Pull Indicator Handle */}
              <div className="mx-auto w-12 h-1.5 bg-slate-800 dark:bg-slate-800 rounded-full mb-5" />
              
              <div className="flex items-center gap-3.5 mb-4">
                <div 
                  className="h-10 w-10 rounded-xl bg-slate-950 p-1.5 flex items-center justify-center border border-slate-850"
                  style={{ boxShadow: `0 0 12px ${hoveredSkill.color}20` }}
                >
                  <TechIcon iconKey={hoveredSkill.iconKey} className="h-full w-full" />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold uppercase font-mono tracking-wider text-white">
                    {hoveredSkill.name}
                  </h4>
                  <span className="text-[10px] font-bold text-indigo-400 font-mono tracking-wide uppercase">
                    Production Experience Log
                  </span>
                </div>
                <button 
                  onClick={() => setIsBottomSheetOpen(false)}
                  className="ml-auto p-1.5 rounded-full bg-slate-800 text-slate-400 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <div className="p-4 rounded-2xl bg-slate-950 border border-slate-900 text-xs font-mono text-slate-300 leading-relaxed min-h-[80px]">
                <p className="border-l-2 border-indigo-500 pl-3">
                  {hoveredSkill.evidence}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}

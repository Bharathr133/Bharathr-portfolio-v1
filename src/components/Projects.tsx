'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { projects, CaseStudyDetails } from '../data/portfolio';
import { ExternalLink, Terminal, Shield, Lock, File, Database, GitFork, Cpu, ChevronRight, ArrowLeft, ArrowRight, X, Maximize2 } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import SystemDesign from './SystemDesign';
import useTextScramble from '../hooks/useTextScramble';

export interface MetricItem {
  label: string;
  value: string;
  highlighted?: boolean;
}

export const projectMetrics: Record<string, MetricItem[]> = {
  'dox-app': [
    { label: 'WORKFLOW DELAYS', value: '-40%', highlighted: true },
    { label: 'STORAGE CORE', value: 'OAK REPO' },
    { label: 'COMPLIANCE', value: 'AUDIT-READY' }
  ],
  'manufacturing-system': [
    { label: 'DISCOVERY PORT', value: 'PORT 8761' },
    { label: 'FAULT TOLERANCE', value: 'RESILIENCE4J', highlighted: true },
    { label: 'DATA ISOLATION', value: '3x DBs' }
  ],
  'pneumonia-detection': [
    { label: 'DETECTION RATE', value: '94.2%', highlighted: true },
    { label: 'INFERENCE SPEED', value: '<120ms' },
    { label: 'ARCHITECTURE', value: '5x CNN' }
  ]
};

// Mockup components using SVG and HTML elements to simulate real apps
function DoxAppMockup() {
  const [logs, setLogs] = useState<string[]>([
    "JWT check: Valid. User roles: [ROLE_ADMIN]",
    "AES-256 Envelope handshake: verified",
    "DB pool status: 15 active connections"
  ]);

  useEffect(() => {
    const logPool = [
      "Doc encrypt: File path verified",
      "PDF Watermark: text injection success",
      "Jackrabbit Node: revision path updated",
      "Flyway check: Schema 1.4 active",
      "API request: 200 OK via dox-gateway",
      "Session audit: access logging synced",
      "File checks: MD5 checksum verified"
    ];
    let counter = 0;
    const interval = setInterval(() => {
      const timestamp = new Date().toTimeString().split(' ')[0];
      const newLog = `[${timestamp}] ${logPool[counter % logPool.length]}`;
      setLogs(prev => {
        const next = [...prev.slice(1), newLog];
        return next;
      });
      counter++;
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 text-slate-300 font-mono text-[10px] p-4 flex flex-col justify-between select-none">
      {/* Top dashboard control bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5 text-indigo-400 font-bold">
          <Shield className="h-3.5 w-3.5" />
          <span>DOX-GATEWAY v1.4</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-slate-500 text-[8px] uppercase">JWT Session Active</span>
        </div>
      </div>

      {/* Directory Folder Grid layout */}
      <div className="grid grid-cols-2 gap-2 flex-1 overflow-hidden my-1">
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-bold text-slate-200">/shared_docs</span>
            <Lock className="h-3 w-3 text-indigo-400" />
          </div>
          <span className="text-[8px] text-slate-500 mt-2">6 files • Read-Write</span>
        </div>
        <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800/80 flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="font-bold text-slate-200">/secure_vault</span>
            <Lock className="h-3 w-3 text-fuchsia-400" />
          </div>
          <span className="text-[8px] text-slate-500 mt-2">2 files • Owner Only</span>
        </div>
        <div className="col-span-2 p-3 rounded-lg bg-slate-900/40 border border-dashed border-slate-800 flex flex-col items-center justify-center text-center gap-1.5">
          <File className="h-4 w-4 text-slate-650 animate-pulse" />
          <span className="text-slate-400 text-[9px]">Drag file to secure upload</span>
          <span className="text-slate-600 text-[7px]">Maximum upload size: 25MB</span>
        </div>
      </div>

      {/* Real-time backend validation logs at footer */}
      <div className="border-t border-slate-800 pt-2 shrink-0">
        <div className="text-[8px] text-slate-500 font-bold mb-1 flex items-center gap-1">
          <Terminal className="h-3 w-3 text-indigo-500" />
          <span>MIDDLEWARE SYSTEM AUDIT LOGS:</span>
        </div>
        <div className="space-y-0.5 text-[8px] leading-tight text-emerald-400">
          {logs.map((log, idx) => (
            <div key={idx} className="truncate">
              <span className="text-slate-600">&gt;</span> {log}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PneumoniaDetectionMockup() {
  return (
    <div className="w-full h-full bg-slate-950 text-slate-300 font-mono text-[10px] p-4 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
          <Database className="h-3.5 w-3.5" />
          <span>CNN RAD-ANALYZER v2.0</span>
        </div>
        <span className="text-[8px] text-slate-500 uppercase">Model: Inception-v3</span>
      </div>

      {/* Visual scanning container */}
      <div className="relative flex-1 bg-slate-900 rounded-lg overflow-hidden border border-slate-800 flex items-center justify-center p-2">
        {/* Animated scanning line overlay */}
        <div className="absolute inset-x-0 h-0.5 bg-emerald-500/70 shadow-[0_0_10px_#10b981] animate-[scan_3s_ease-in-out_infinite] z-10" />
        
        {/* Simulated lung X-Ray SVG representation */}
        <svg viewBox="0 0 100 100" className="h-28 w-28 opacity-60">
          <path d="M25,20 C35,10 45,25 45,55 C45,75 35,90 20,80 C10,70 15,30 25,20 Z" fill="none" stroke="#64748b" strokeWidth="1.5" />
          <path d="M75,20 C65,10 55,25 55,55 C55,75 65,90 80,80 C90,70 85,30 75,20 Z" fill="none" stroke="#64748b" strokeWidth="1.5" />
          {/* Highlighted anomaly spots */}
          <circle cx="33" cy="45" r="5" fill="rgba(239, 68, 68, 0.4)" className="animate-pulse" />
          <circle cx="36" cy="55" r="7" fill="rgba(239, 68, 68, 0.3)" />
        </svg>

        {/* Live scanning HUD badge */}
        <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-950/80 border border-red-850 text-red-400 text-[8px] uppercase tracking-wider rounded font-bold">
          Anomaly Detected
        </div>
      </div>

      {/* Classification results footer */}
      <div className="border-t border-slate-800 pt-2 shrink-0 mt-2">
        <div className="flex justify-between items-center text-[9px] mb-1">
          <span className="font-bold text-slate-400">PNEUMONIA PROBABILITY:</span>
          <span className="font-bold text-red-500 text-[10px] animate-pulse">94.2%</span>
        </div>
        <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
          <div className="bg-red-500 h-full rounded-full" style={{ width: '94.2%' }} />
        </div>
      </div>
    </div>
  );
}

function ManufacturingSystemMockup() {
  const [progress, setProgress] = useState({ turning: 75, molding: 30, millingActive: false });

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => ({
        turning: Math.floor(Math.random() * 20) + 70,
        molding: Math.floor(Math.random() * 30) + 20,
        millingActive: !prev.millingActive
      }));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-slate-950 text-slate-300 font-mono text-[10px] p-4 flex flex-col justify-between select-none">
      {/* Top dashboard control bar */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5 text-blue-400 font-bold">
          <Cpu className="h-3.5 w-3.5" />
          <span>FACTORY-MONITOR v2.1</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
          <span className="text-slate-500 text-[8px] uppercase">EUREKA GATEWAY ACTIVE</span>
        </div>
      </div>

      {/* Machine Status List */}
      <div className="space-y-1.5 flex-1 overflow-hidden my-1">
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">TURNING-01</span>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress.turning}%` }} />
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[7px] uppercase font-bold">RUNNING</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">MILLING-02</span>
          {progress.millingActive ? (
            <div className="flex items-center gap-2">
              <div className="w-16 bg-slate-800 rounded-full h-1 overflow-hidden">
                <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: '45%' }} />
              </div>
              <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[7px] uppercase font-bold">RUNNING</span>
            </div>
          ) : (
            <span className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 text-[7px] uppercase font-bold">IDLE</span>
          )}
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">PRESS-03</span>
          <span className="px-1.5 py-0.5 rounded bg-yellow-950/80 text-yellow-450 text-[7px] uppercase font-bold">MAINTENANCE</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">MOLDING-04</span>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-blue-500 h-full transition-all duration-500" style={{ width: `${progress.molding}%` }} />
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-400 text-[7px] uppercase font-bold">RUNNING</span>
          </div>
        </div>
      </div>

      {/* Quality Stats Footer */}
      <div className="border-t border-slate-800 pt-2 shrink-0 flex justify-between text-[8px] text-slate-500 font-bold">
        <div className="flex gap-2">
          <span>PASSED: <span className="text-emerald-400">482</span></span>
          <span>FAILED: <span className="text-red-400">12</span></span>
        </div>
        <span>DEFECT: <span className="text-red-400 animate-pulse">2.4%</span></span>
      </div>
    </div>
  );
}

// Map project ID to its mockup
export function ProjectVisualizer({ id }: { id: string }) {
  switch (id) {
    case 'dox-app':
      return <DoxAppMockup />;
    case 'pneumonia-detection':
      return <PneumoniaDetectionMockup />;
    case 'manufacturing-system':
      return <ManufacturingSystemMockup />;
    default:
      return (
        <div className="w-full h-full bg-slate-950 flex items-center justify-center text-slate-600 font-mono text-xs">
          [No Mockup Configured]
        </div>
      );
  }
}

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { text: scrambleTitle, scramble: triggerScrambleTitle } = useTextScramble('Featured Projects');

  const featuredProjects = projects.filter((p) => p.caseStudy !== undefined);
  const otherProjects = projects.filter((p) => p.caseStudy === undefined);
  const count = featuredProjects.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % count);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + count) % count);
  };

  const getCardPosition = (idx: number) => {
    let diff = idx - activeIndex;
    if (diff < 0) diff += count;
    
    // Shift indices so the active is in center, others left/right
    if (diff > count / 2) diff -= count;
    
    const isActive = diff === 0;
    
    // Tighter offsets — cards don't fly from far away
    const scale = isActive ? 1 : 0.87;
    const zIndex = isActive ? 30 : 20 - Math.abs(diff);
    const x = diff * 110; 
    const rotate = diff * 5; 
    const opacity = Math.abs(diff) > 1 ? 0 : 1;

    return { scale, zIndex, x, rotate, opacity, isActive };
  };

  return (
    <section id="projects" className="relative bg-slate-50 dark:bg-slate-950 py-16 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.01),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <GitFork className="h-4 w-4" />
              <span>Project Case Studies</span>
            </span>
            <h2 
              onMouseEnter={triggerScrambleTitle}
              className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-mono select-none cursor-default"
            >
              {scrambleTitle}
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Browse through interactive 3D cards, drag to cycle folders, and launch live telemetry terminal monitors.
          </p>
        </div>

        {/* 3D Interactive Carousel Deck Wrapper */}
        <div className="relative h-[480px] w-full flex items-center justify-center overflow-visible select-none my-10">
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 md:left-6 z-45 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-lg hover:border-indigo-500/35 transition-all duration-300 cursor-pointer"
            aria-label="Previous Project"
          >
            <ChevronRight className="h-5 w-5 rotate-180" />
          </button>

          {/* Card Stack Deck */}
          <div className="relative w-[280px] xs:w-[320px] md:w-[350px] h-[400px] flex items-center justify-center overflow-visible">
            {featuredProjects.map((project, idx) => {
              const { scale, zIndex, x, rotate, opacity, isActive } = getCardPosition(idx);
              
              return (
                <motion.div
                  key={project.id}
                  animate={{
                    x,
                    scale,
                    rotate,
                    opacity,
                    zIndex,
                  }}
                  transition={{ type: 'tween', duration: 0.35, ease: 'easeInOut' }}
                  drag={isActive ? 'x' : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -60) handleNext();
                    else if (info.offset.x > 60) handlePrev();
                  }}
                  onClick={() => {
                    if (!isActive) setActiveIndex(idx);
                  }}
                  data-cursor-text={isActive ? 'DRAG DECK' : 'SELECT'}
                  className={`absolute w-full h-full rounded-[32px_12px_32px_12px] overflow-hidden border border-slate-200/50 dark:border-slate-850 bg-white dark:bg-slate-900 shadow-xl flex flex-col p-6 justify-between ${
                    isActive ? 'cursor-grab active:cursor-grabbing border-indigo-500/30' : 'cursor-pointer'
                  }`}
                  style={{
                    transformStyle: 'preserve-3d',
                    boxShadow: isActive ? '0 25px 50px -12px rgba(99, 102, 241, 0.15)' : undefined,
                    willChange: 'transform, opacity',
                  }}
                >
                  {/* Card Gloss Header */}
                  <div className="flex items-center justify-between border-b border-slate-200/40 dark:border-slate-800/40 pb-3 shrink-0">
                    <span className="text-[9px] font-mono font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                      {project.id.replace('-', ' ')} // active_node
                    </span>
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  </div>

                  {/* Card Mid: Image/Graphic Frame */}
                  <div className="flex-1 my-5 relative rounded-2xl overflow-hidden border border-slate-200/30 dark:border-slate-800 bg-slate-950 group/img">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    
                    {/* Inline Content overlay */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <span className="text-[8px] font-bold font-mono text-indigo-400 block mb-1">PROJECT TARGET</span>
                      <h3 className="text-sm font-bold text-white font-serif tracking-tight truncate">
                        {project.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Bottom: Primary Info & Trigger */}
                  <div className="flex flex-col gap-4 shrink-0">
                    <p className="text-[11px] text-slate-550 dark:text-slate-400 leading-relaxed font-medium line-clamp-2 text-left">
                      {project.description}
                    </p>
                    
                    <Link
                      href={isActive ? `/projects/${project.id}` : '#'}
                      onClick={(e) => {
                        if (!isActive) e.preventDefault();
                      }}
                      className={`w-full py-3 rounded-xl font-mono text-[9px] font-bold uppercase tracking-wider border transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 ${
                        isActive
                          ? 'bg-indigo-600 border-indigo-600 text-white shadow-md hover:bg-indigo-700 hover:shadow-indigo-500/10'
                          : 'bg-transparent border-slate-200 dark:border-slate-800 text-slate-400 dark:text-slate-550 pointer-events-none'
                      }`}
                    >
                      <ArrowRight className="h-3 w-3" /> Launch Case Study
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 md:right-6 z-45 p-3 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 shadow-lg hover:border-indigo-500/35 transition-all duration-300 cursor-pointer"
            aria-label="Next Project"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center gap-2 mt-4 select-none">
          {featuredProjects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                idx === activeIndex ? 'w-6 bg-indigo-600' : 'w-2 bg-slate-300 dark:bg-slate-800'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>


        {/* Compact Other Work list */}
        {otherProjects.length > 0 && (
          <div className="mt-32 pt-16 border-t border-slate-200/80 dark:border-slate-900">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white font-serif mb-6 flex items-center gap-2">
              <Terminal className="h-4 w-4 text-slate-500" />
              <span>Other Open Source Pipelines</span>
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-900 text-slate-400 font-mono font-bold uppercase tracking-wider text-[8.5px] pb-3 select-none">
                    <th className="pb-3 pr-4">Project Title</th>
                    <th className="pb-3 pr-4 hidden md:table-cell">Technical Description</th>
                    <th className="pb-3 pr-4">Stack Tags</th>
                    <th className="pb-3 text-right">Repository</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-900 font-medium">
                  {otherProjects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-100/50 hover:dark:bg-slate-900/10 transition-colors">
                      <td className="py-4 pr-4 font-bold text-slate-900 dark:text-slate-100">
                        {project.title}
                      </td>
                      <td className="py-4 pr-4 text-slate-500 dark:text-slate-400 max-w-xs hidden md:table-cell leading-relaxed font-medium">
                        {project.description}
                      </td>
                      <td className="py-4 pr-4">
                        <div className="flex flex-wrap gap-1.5">
                          {project.tags.slice(0, 3).map((tag, idx) => (
                            <span 
                              key={idx} 
                              className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-slate-500 dark:text-slate-400 border border-slate-200/20 dark:border-slate-800/60"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-4 text-right">
                        <a 
                          href={project.link} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-indigo-650 dark:text-indigo-400 hover:text-indigo-500 transition-colors font-bold"
                        >
                          <span>Explore</span>
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

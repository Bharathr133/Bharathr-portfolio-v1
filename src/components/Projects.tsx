'use client';

import React, { useState } from 'react';
import { projects, Project, CaseStudyDetails } from '../data/portfolio';
import { ExternalLink, Terminal, Shield, Lock, FileText, CheckCircle, AlertCircle, Play, Heart, MessageSquare, File, Database, GitFork, Cpu } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { motion } from 'framer-motion';
import SystemDesign from './SystemDesign';

interface MetricItem {
  label: string;
  value: string;
  highlighted?: boolean;
}

const projectMetrics: Record<string, MetricItem[]> = {
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
          <div className="truncate"><span className="text-slate-650">&gt;</span> JWT check: Valid. User roles: [ROLE_ADMIN]</div>
          <div className="truncate"><span className="text-slate-655">&gt;</span> AES-256 Envelope handshake: verified</div>
          <div className="truncate text-slate-400"><span className="text-slate-650">&gt;</span> DB pool status: 15 active connections</div>
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
              <div className="bg-blue-500 h-full" style={{ width: '75%' }} />
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-450 text-[7px] uppercase font-bold">RUNNING</span>
          </div>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">MILLING-02</span>
          <span className="px-1.5 py-0.5 rounded bg-slate-950 text-slate-500 text-[7px] uppercase font-bold">IDLE</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">PRESS-03</span>
          <span className="px-1.5 py-0.5 rounded bg-yellow-950/80 text-yellow-450 text-[7px] uppercase font-bold">MAINTENANCE</span>
        </div>
        <div className="flex items-center justify-between p-1.5 rounded bg-slate-900 border border-slate-800">
          <span className="text-slate-200">MOLDING-04</span>
          <div className="flex items-center gap-2">
            <div className="w-16 bg-slate-800 rounded-full h-1 overflow-hidden">
              <div className="bg-blue-500 h-full" style={{ width: '30%' }} />
            </div>
            <span className="px-1.5 py-0.5 rounded bg-blue-950 text-blue-450 text-[7px] uppercase font-bold">RUNNING</span>
          </div>
        </div>
      </div>

      {/* Quality Stats Footer */}
      <div className="border-t border-slate-800 pt-2 shrink-0 flex justify-between text-[8px] text-slate-500 font-bold">
        <div className="flex gap-2">
          <span>PASSED: <span className="text-emerald-400">482</span></span>
          <span>FAILED: <span className="text-red-400">12</span></span>
        </div>
        <span>DEFECT: <span className="text-red-450 animate-pulse">2.4%</span></span>
      </div>
    </div>
  );
}

// Map project ID to its mockup
function ProjectVisualizer({ id }: { id: string }) {
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
  const [showSysDesign, setShowSysDesign] = useState(false);
  // Filter out featured case study projects
  const featuredProjects = projects.filter((p) => p.caseStudy !== undefined);
  // Smaller ones go to the "Other Work" section below
  const otherProjects = projects.filter((p) => p.caseStudy === undefined);

  return (
    <section id="projects" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.01),transparent_45%)]" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <GitFork className="h-4 w-4" />
              <span>Project Case Studies</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Featured Engineering Work
            </h2>
          </div>
          <p className="text-slate-550 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Deep technical breakdowns showcasing core architecture problems, real engineering constraints, trade-off decisions, and measurable outcomes.
          </p>
        </div>

        {/* Deep Case Studies Grid */}
        <div className="flex flex-col gap-28">
          {featuredProjects.map((project, index) => {
            const isEven = index % 2 === 0;
            const study = project.caseStudy as CaseStudyDetails;
            const metrics = projectMetrics[project.id] || [];

            return (
              <div key={project.id} className="flex flex-col gap-8">
                <div 
                  className={`flex flex-col lg:flex-row gap-12 items-stretch ${
                    isEven ? '' : 'lg:flex-row-reverse'
                  }`}
                >
                {/* Mockup Display Pane */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 min-h-[260px] lg:w-1/2 rounded-[28px_8px_32px_12px] overflow-hidden border border-slate-200/60 dark:border-slate-800 bg-slate-950 flex flex-col shadow-sm dark:shadow-[0_20px_50px_rgba(0,0,0,0.45)]"
                >
                  {/* Simulated Browser Chrome Header */}
                  <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 select-none shrink-0">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500/80" />
                      <span className="h-2 w-2 rounded-full bg-yellow-500/80" />
                      <span className="h-2 w-2 rounded-full bg-green-500/80" />
                    </div>
                    <span className="text-[9px] font-mono font-bold text-slate-550">
                      localhost:3000/{project.id}
                    </span>
                    <Terminal className="h-3.5 w-3.5 text-slate-600" />
                  </div>

                  {/* Render Visual Interface */}
                  <div className="flex-1 min-h-0 relative">
                    <ProjectVisualizer id={project.id} />
                  </div>
                </motion.div>

                {/* Case Study Details Pane */}
                <motion.div 
                  initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="flex-1 lg:w-1/2 flex flex-col justify-between gap-6 font-sans"
                >
                  <div>
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-3.5">
                      {project.tags.slice(0, 4).map((tag, idx) => (
                        <span 
                          key={idx} 
                          className="text-[9px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wide bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200/30 dark:border-slate-800/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-serif">
                      {project.title}
                    </h3>

                    {/* Problem / Constraint block */}
                    <div className="mt-4 space-y-3.5 text-xs leading-relaxed text-slate-550 dark:text-slate-400 font-medium">
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200 block mb-0.5 font-bold uppercase tracking-wider font-mono text-[9px] text-slate-400">Problem Context:</strong>
                        <p>{study.problem}</p>
                      </div>
                      <div>
                        <strong className="text-slate-900 dark:text-slate-200 block mb-0.5 font-bold uppercase tracking-wider font-mono text-[9px] text-slate-400">Key Constraints:</strong>
                        <p>{study.constraints}</p>
                      </div>
                    </div>

                    {/* Decisions block */}
                    <div className="mt-4 pt-4 border-t border-slate-200/50 dark:border-slate-900/60">
                      <strong className="text-[9px] font-bold uppercase tracking-wider font-mono text-slate-455 dark:text-slate-400 block mb-2">Technical Execution:</strong>
                      <ul className="space-y-1.5 text-xs text-slate-550 dark:text-slate-400 pl-4 list-disc font-medium leading-relaxed">
                        {study.decisions.map((dec, idx) => (
                          <li key={idx}>{dec}</li>
                        ))}
                      </ul>
                    </div>

                    {/* Lessons / Post-mortem block */}
                    <div className="mt-4 p-3 bg-slate-100/50 dark:bg-slate-900/40 rounded-2xl border border-slate-200/30 dark:border-slate-855 text-xs">
                      <span className="text-[9px] font-bold text-indigo-600 dark:text-indigo-400 block mb-1.5 flex items-center gap-1.5 uppercase font-mono">
                        <Cpu className="h-3.5 w-3.5" />
                        <span>Retrospective &amp; Scaling lessons</span>
                      </span>
                      <p className="text-slate-550 dark:text-slate-400 italic leading-relaxed font-medium">
                        &ldquo;{study.lessons}&rdquo;
                      </p>
                    </div>

                    {/* Outcomes Metrics Dashboard Grid */}
                    {metrics.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4">
                        {metrics.map((m, mIdx) => (
                          <div 
                            key={mIdx} 
                            className={`p-2 sm:p-2.5 rounded-xl border flex flex-col justify-between ${
                              m.highlighted 
                                ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/40 dark:border-emerald-900/40' 
                                : 'bg-slate-100/50 dark:bg-slate-900/40 border-slate-200/30 dark:border-slate-850'
                            }`}
                          >
                            <span className="text-[7.5px] font-bold font-mono text-slate-500 uppercase tracking-wider">{m.label}</span>
                            <span className={`text-xs font-extrabold mt-1 font-mono ${
                              m.highlighted ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-900 dark:text-slate-200'
                            }`}>
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions Links */}
                  <div className="flex flex-wrap items-center gap-6 pt-4.5 border-t border-slate-200/50 dark:border-slate-900/60 shrink-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-white transition-colors"
                    >
                      <GithubIcon className="h-4 w-4" />
                      <span>Review Repository</span>
                    </a>

                    {project.id === 'manufacturing-system' && (
                      <button
                        onClick={() => setShowSysDesign(!showSysDesign)}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 transition-colors cursor-pointer"
                      >
                        <Cpu className="h-4 w-4" />
                        <span>{showSysDesign ? 'Hide System Blueprint' : 'Inspect System Blueprint'}</span>
                      </button>
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Collapsible System Design Drawer */}
              {project.id === 'manufacturing-system' && showSysDesign && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full overflow-hidden"
                >
                  <SystemDesign />
                </motion.div>
              )}
            </div>
            );
          })}
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
                  <tr className="border-b border-slate-200 dark:border-slate-900 text-slate-450 font-mono font-bold uppercase tracking-wider text-[8.5px] pb-3 select-none">
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

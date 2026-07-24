'use client';

import React, { useState, use } from 'react';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { projects, CaseStudyDetails } from '@/data/portfolio';
import { ProjectVisualizer, projectMetrics } from '@/components/Projects';
import SystemDesign from '@/components/SystemDesign';
import { GithubIcon } from '@/components/SocialIcons';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Cpu, Terminal, ExternalLink, Activity, Sparkles, ShieldAlert, Award, FileText, ArrowUpRight } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ProjectDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  
  const project = projects.find((p) => p.id === id);
  if (!project || !project.caseStudy) {
    notFound();
  }

  const study = project.caseStudy as CaseStudyDetails;
  const metrics = projectMetrics[project.id] || [];

  const [activeStage, setActiveStage] = useState<number>(0);
  const [showSysDesign, setShowSysDesign] = useState(false);

  const handleBack = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back();
    } else {
      router.push('/#projects');
    }
  };

  const stages = [
    {
      label: '01 // OBSTACLES',
      title: 'Operational Obstacles',
      icon: <ShieldAlert className="h-4 w-4" />,
    },
    {
      label: '02 // BLUEPRINT',
      title: 'Engineering Blueprint',
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      label: '03 // TELEMETRY',
      title: 'Telemetry & Verification',
      icon: <Activity className="h-4 w-4" />,
    },
    {
      label: '04 // RETROSPECTIVE',
      title: 'Retrospective Lessons',
      icon: <Terminal className="h-4 w-4" />,
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-indigo-500/20 selection:text-indigo-900 relative overflow-x-hidden pb-12">
      {/* Light Mesh Gradient Accent Background Lights */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-550/10 to-purple-550/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-pink-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-60" />
      
      {/* Minimalist Floating Navigation */}
      <div className="w-full max-w-6xl mx-auto px-6 pt-8 flex items-center justify-between z-10 shrink-0 select-none">
        <button 
          onClick={handleBack}
          className="inline-flex items-center gap-2 px-4.5 py-2 text-xs font-mono font-bold uppercase tracking-wider text-slate-655 hover:text-slate-900 bg-white hover:bg-slate-50 border border-slate-200 rounded-full transition-all duration-300 cursor-pointer shadow-xs backdrop-blur-md"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Return to Hub</span>
        </button>

        <span className="text-[10px] font-mono font-bold text-slate-550 uppercase tracking-widest bg-white border border-slate-205 px-3 py-1 rounded-full backdrop-blur-md">
           bharathr.app // {project.id}
        </span>
      </div>

      {/* Main Container */}
      <main className="flex-1 w-full max-w-6xl mx-auto px-6 mt-8 flex flex-col gap-8">
        
        {/* Hero Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-slate-200 pb-6 relative">
          <div className="space-y-3.5 max-w-3xl">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span 
                  key={idx} 
                  className="text-[9px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-indigo-700 border border-slate-200 shadow-2xs"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight bg-gradient-to-r from-indigo-650 via-purple-650 to-pink-650 text-transparent bg-clip-text font-sans leading-none">
              {project.title}
            </h1>
            <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Core CTAs */}
          <div className="flex flex-wrap items-center gap-3 shrink-0 select-none">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-600/10 cursor-pointer"
            >
              <GithubIcon className="h-4 w-4 fill-white text-white" />
              <span>Repository</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>

            {project.id === 'manufacturing-system' && (
              <button
                onClick={() => setShowSysDesign(!showSysDesign)}
                className="inline-flex items-center gap-2 px-4.5 py-2.5 rounded-xl text-xs font-mono font-bold uppercase tracking-wider bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 transition-all duration-300 shadow-xs cursor-pointer"
              >
                <Cpu className="h-4 w-4" />
                <span>{showSysDesign ? 'Hide Blueprint' : 'Inspect Blueprint'}</span>
              </button>
            )}
          </div>
        </div>

        {/* Dual Panel Workspace Block */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch">
          
          {/* Left Panel: Telemetry Monitor Console */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between bg-white border border-slate-200 rounded-3xl p-5 shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div>
              <div className="flex items-center justify-between mb-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">TELEMETRY_PIPELINE_ACTIVE</span>
                </div>
                <span className="text-[8px] font-mono bg-slate-50 px-2 py-0.5 rounded-full border border-slate-200 text-slate-600">PORT_8080</span>
              </div>
              
              <div className="w-full h-[280px] sm:h-[320px] lg:h-[350px] rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 flex flex-col shadow-inner relative">
                <ProjectVisualizer id={project.id} />
              </div>
            </div>
          </div>

          {/* Right Panel: Sleek Workspace Console with In-Card Scrolling */}
          <div className="flex-1 w-full bg-white border border-slate-200 rounded-3xl shadow-sm flex flex-col md:flex-row overflow-hidden min-h-[360px] lg:h-[412px]">
            {/* Stage Selector Sidebar */}
            <div className="w-full md:w-52 bg-slate-50/80 border-b md:border-b-0 md:border-r border-slate-200 p-4 flex flex-row md:flex-col gap-1.5 select-none overflow-x-auto md:overflow-y-auto scrollbar-hide shrink-0 justify-start md:justify-start items-center md:items-stretch">
              <span className="text-[8px] font-mono font-bold text-slate-400 uppercase tracking-widest hidden md:block mb-2 px-2">Case Study Chapters</span>
              {stages.map((stage, idx) => {
                const isActive = idx === activeStage;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveStage(idx)}
                    className={`shrink-0 flex items-center gap-2 px-3 py-2 md:py-2.5 rounded-xl text-left transition-all duration-205 cursor-pointer border ${
                      isActive 
                        ? 'bg-white border-slate-200 shadow-2xs text-indigo-650 font-bold' 
                        : 'bg-transparent text-slate-500 border-transparent hover:text-slate-800 hover:bg-slate-200/40'
                    }`}
                  >
                    <div className={`p-1 rounded-lg border transition-all ${
                      isActive 
                        ? 'bg-indigo-500/5 text-indigo-600 border-indigo-200/50' 
                        : 'bg-transparent text-slate-400 border-transparent'
                    }`}>
                      {stage.icon}
                    </div>
                    <span className="text-[10px] font-mono uppercase tracking-wider">{stage.label}</span>
                  </button>
                );
              })}
            </div>

            {/* In-Card Scrollable Content Pane */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-indigo-500/40 hover:scrollbar-thumb-indigo-500/60 bg-white flex flex-col justify-between">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStage}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-4 text-xs md:text-sm text-slate-655 font-medium leading-relaxed"
                >
                  <h3 className="text-base font-bold text-slate-900 font-serif tracking-tight border-b border-slate-100 pb-2">
                    {stages[activeStage].title}
                  </h3>

                  {activeStage === 0 && (
                    <div className="space-y-4 pt-1">
                      <div>
                        <strong className="text-[8px] font-mono text-slate-450 uppercase tracking-widest block mb-1">Architectural Problem</strong>
                        <p className="text-slate-600 leading-relaxed font-medium">{study.problem}</p>
                      </div>
                      <div className="pt-3.5 border-t border-slate-100">
                        <strong className="text-[8px] font-mono text-slate-450 uppercase tracking-widest block mb-1">System Constraints</strong>
                        <p className="text-slate-600 leading-relaxed font-medium">{study.constraints}</p>
                      </div>
                    </div>
                  )}

                  {activeStage === 1 && (
                    <div className="space-y-2.5 pt-1">
                      <strong className="text-[8px] font-mono text-slate-455 uppercase tracking-widest block mb-1">Execution Decisions</strong>
                      <ul className="space-y-2 pl-4 list-disc text-slate-600 font-medium leading-relaxed">
                        {study.decisions.map((dec, idx) => (
                          <li key={idx} className="marker:text-indigo-500">{dec}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {activeStage === 2 && (
                    <div className="space-y-4 pt-1">
                      {metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-3">
                          {metrics.map((m, mIdx) => (
                            <div key={mIdx} className="p-3 rounded-2xl bg-slate-50 border border-slate-200/50 flex flex-col justify-between shadow-2xs">
                              <span className="text-[7px] font-bold font-mono text-slate-400 uppercase tracking-wider">{m.label}</span>
                              <span className="text-sm font-black mt-1.5 font-sans text-indigo-650">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="p-3.5 bg-emerald-500/5 rounded-2xl border border-emerald-200">
                        <span className="text-[8px] font-mono text-emerald-600 uppercase tracking-widest block mb-1">Production Outcomes</span>
                        <p className="text-slate-600 font-medium leading-relaxed">{study.outcome}</p>
                      </div>
                    </div>
                  )}

                  {activeStage === 3 && (
                    <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 font-mono text-[10.5px] leading-relaxed">
                      <span className="text-[8.5px] font-bold text-indigo-650 block mb-2 flex items-center gap-1.5 uppercase select-none">
                        <Terminal className="h-3.5 w-3.5" />
                        <span>post_mortem_lessons.sh</span>
                      </span>
                      <p className="text-slate-600 italic leading-relaxed pl-3.5 border-l border-slate-300">
                        &ldquo;{study.lessons}&rdquo;
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </main>

      {/* Collapsible System Design Drawer */}
      {project.id === 'manufacturing-system' && showSysDesign && (
        <div className="w-full max-w-6xl mx-auto px-6 mt-8">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <SystemDesign />
          </div>
        </div>
      )}
    </div>
  );
}

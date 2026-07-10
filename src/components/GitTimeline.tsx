'use client';

import React from 'react';
import { internships, educations } from '../data/portfolio';
import { GitBranch, GitCommit, Calendar, Tag, GitPullRequest } from 'lucide-react';
import { motion } from 'framer-motion';

interface GitLogItem {
  id: string;
  hash: string;
  type: 'education' | 'internship';
  branchName: 'feat/education' | 'feat/internship';
  title: string;
  subtitle: string;
  date: string;
  description: string;
  highlights?: string[];
  skills?: string[];
}

export default function GitTimeline() {
  // Combine and structure the data chronologically / logically
  const gitLogs: GitLogItem[] = [
    {
      id: 'intern-parvam',
      hash: 'c7d92ae',
      type: 'internship' as const,
      branchName: 'feat/internship' as const,
      title: internships[2].title, // ParvaM
      subtitle: internships[2].company,
      date: internships[2].date,
      description: internships[2].description,
      highlights: internships[2].highlights,
      skills: internships[2].skills,
    },
    {
      id: 'edu-be',
      hash: 'd2d10af',
      type: 'education' as const,
      branchName: 'feat/education' as const,
      title: educations[2].degree, // BE Computer Science
      subtitle: educations[2].school,
      date: educations[2].date,
      description: educations[2].description,
    },
    {
      id: 'intern-kodnest',
      hash: 'e5e81bd',
      type: 'internship' as const,
      branchName: 'feat/internship' as const,
      title: internships[1].title, // KodNest Training
      subtitle: internships[1].company,
      date: internships[1].date,
      description: internships[1].description,
      highlights: internships[1].highlights,
      skills: internships[1].skills,
    },
    {
      id: 'intern-swajyot',
      hash: 'f6e94ca',
      type: 'internship' as const,
      branchName: 'feat/internship' as const,
      title: internships[0].title, // Swajyot Technologies
      subtitle: internships[0].company,
      date: internships[0].date,
      description: internships[0].description,
      highlights: internships[0].highlights,
      skills: internships[0].skills,
    }
  ].reverse(); // Show most recent commits first

  return (
    <section id="experience" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_30%,rgba(99,102,241,0.02),transparent_35%)]" />

      <div className="relative mx-auto max-w-5xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <GitPullRequest className="h-4 w-4" />
              <span>Career Graph</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Work & Education
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            This graph represents my academic milestones and full stack training programs, structured as branch commits and merges.
          </p>
        </div>

        {/* Git Graph Timeline */}
        <div className="relative max-w-4xl mx-auto pl-8 sm:pl-16">
          {/* Main vertical line for Git log track */}
          <div className="absolute left-[19px] sm:left-[35px] top-4 bottom-4 w-[2px] bg-slate-200 dark:bg-slate-800" />

          {/* Git Log List */}
          <div className="space-y-12">
            {gitLogs.map((log, logIdx) => (
              <motion.div 
                key={log.id} 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: logIdx * 0.1 }}
                className="relative group flex flex-col md:flex-row gap-6 md:gap-8 items-start"
              >
                
                {/* Visual commit node marker */}
                <div className="absolute -left-[27px] sm:-left-[43px] top-1.5 h-6 w-6 rounded-full bg-white dark:bg-slate-900 border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center group-hover:border-indigo-600 dark:group-hover:border-indigo-500 group-hover:scale-110 transition-all duration-300 z-10 shadow-sm">
                  <div className="h-1.5 w-1.5 rounded-full bg-slate-400 group-hover:bg-indigo-600 dark:group-hover:bg-indigo-500" />
                </div>

                {/* Commit ID Badge & Branch Info */}
                <div className="flex flex-row md:flex-col items-center md:items-end gap-2 shrink-0 w-full md:w-36 pt-1">
                  <span className="font-mono text-xs text-indigo-650 dark:text-indigo-400 font-semibold bg-indigo-50 dark:bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-100 dark:border-indigo-500/20 flex items-center gap-1">
                    <GitCommit className="h-3 w-3" />
                    <span>{log.hash}</span>
                  </span>
                  
                  <span className="font-mono text-[10px] text-slate-550 dark:text-slate-400 font-semibold flex items-center gap-1">
                    <GitBranch className="h-3 w-3 text-indigo-500/60" />
                    <span>{log.branchName}</span>
                  </span>
                </div>

                {/* Commit content Card */}
                <div className="w-full p-6 md:p-8 bg-white dark:bg-slate-900/40 border border-slate-200/80 dark:border-slate-800 rounded-[24px_8px_32px_12px] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.06)] dark:shadow-[0_20px_45px_-15px_rgba(0,0,0,0.5)] hover:border-slate-350 dark:hover:border-slate-700 transition-all duration-300 relative overflow-hidden flex-1">
                  {/* Ambient Light border gradient */}
                  <div className="absolute -inset-[1px] bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-[24px_8px_32px_12px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm pointer-events-none" />

                  {/* Header info */}
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-655 dark:group-hover:text-indigo-400 transition-colors">
                        {log.title}
                      </h3>
                      <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                        {log.subtitle}
                      </p>
                    </div>
                    
                    <span className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-950 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800">
                      <Calendar className="h-3 w-3" />
                      <span>{log.date}</span>
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                    {log.description}
                  </p>

                  {/* Highlights Bullet List */}
                  {log.highlights && log.highlights.length > 0 && (
                    <div className="mb-4">
                      <ul className="space-y-1.5">
                        {log.highlights.map((highlight, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400">
                            <span className="text-indigo-650 dark:text-indigo-500 font-bold shrink-0 mt-0.5">&gt;</span>
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Skills tags */}
                  {log.skills && log.skills.length > 0 && (
                    <div className="border-t border-slate-100 dark:border-slate-850/80 pt-4 mt-4">
                      <div className="flex flex-wrap gap-2">
                        {log.skills.map((skill, sIdx) => (
                          <span
                            key={sIdx}
                            className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-slate-50/50 dark:bg-slate-950 text-slate-600 dark:text-slate-350 border border-slate-200 dark:border-slate-800 uppercase tracking-wide font-mono"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </motion.div>
            ))}
          </div>

          {/* Academic Footnotes Footer */}
          <div className="mt-20 pt-10 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-slate-400 dark:text-slate-500 mb-6">
              Secondary Academic Milestones
            </h4>
            <div className="grid gap-8 sm:grid-cols-2 text-slate-500 dark:text-slate-400 leading-relaxed">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-850">
                <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 font-mono block mb-1">PU COLLEGE DIPLOMA &bull; 2019 - 2021</span>
                <strong className="text-slate-900 dark:text-slate-200 text-xs block font-serif">Higher Secondary Education (PCMB)</strong>
                <span className="text-[11px] text-slate-500 block font-medium mt-0.5">AECS Magnolia PU College, Mulbagal</span>
                <p className="mt-2 text-[11px]">Completed pre-university science stream with a focus on mathematics and logic, laying the foundation for computer engineering.</p>
              </div>
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900/30 border border-slate-200/40 dark:border-slate-850">
                <span className="text-[10px] font-bold text-indigo-650 dark:text-indigo-400 font-mono block mb-1">HIGH SCHOOL CERTIFICATE &bull; 2017 - 2019</span>
                <strong className="text-slate-900 dark:text-slate-200 text-xs block font-serif">Secondary Schooling (SSC)</strong>
                <span className="text-[11px] text-slate-500 block font-medium mt-0.5">Adharsha High School, Rayalapad</span>
                <p className="mt-2 text-[11px]">Finished secondary grade curriculum with core science and mathematical excellence, developing early logic skills.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

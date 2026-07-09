'use client';

import React, { useState } from 'react';
import { projects, Project } from '../data/portfolio';
import { ExternalLink, Terminal, Play, Cpu, GitFork } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import TiltCard from './TiltCard';
import { Tab } from './ui/Tab';
import { Modal } from './ui/Modal';
import { motion } from 'framer-motion';

const categories = ['All', 'Spring Boot', 'Python', 'ML/AI', 'Web'];

const themeStyles = {
  cyberpunk: {
    badge: 'bg-fuchsia-50 dark:bg-fuchsia-500/10 text-fuchsia-600 dark:text-fuchsia-400 border border-fuchsia-200 dark:border-fuchsia-500/20',
    card: 'bg-white dark:bg-slate-900/70 border-slate-200 dark:border-fuchsia-500/30 hover:border-fuchsia-500 hover:dark:border-fuchsia-400 shadow-[0_15px_35px_-15px_rgba(240,70,250,0.06)] dark:shadow-[0_20px_40px_rgba(240,70,250,0.03)] hover:shadow-[0_25px_45px_rgba(240,70,250,0.15)] dark:hover:shadow-[0_25px_45px_rgba(240,70,250,0.12)]',
    tag: 'bg-fuchsia-50 dark:bg-fuchsia-900/40 text-fuchsia-600 dark:text-fuchsia-300 border border-fuchsia-100 dark:border-fuchsia-500/20',
    accentText: 'text-fuchsia-600 dark:text-fuchsia-400',
    accentBtn: 'bg-fuchsia-600 hover:bg-fuchsia-500 shadow-[0_8px_20px_-6px_rgba(240,70,250,0.4)]',
    address: 'dox-app.git',
    mockLogs: [
      'Initializing DOX-APP Secure Cluster...',
      'Binding connection to Spring Boot Gateway...',
      'Role-based JWT Verification: PASS',
      'Establishing MySQL pools: 15 active, 0 idle',
      'GET /api/v1/documents/shared - 200 OK'
    ]
  },
  corporate: {
    badge: 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20',
    card: 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-blue-500/30 hover:border-blue-500 hover:dark:border-blue-400 shadow-[0_15px_35px_-15px_rgba(59,130,246,0.06)] dark:shadow-[0_20px_40px_rgba(59,130,246,0.03)] hover:shadow-[0_25px_45px_rgba(59,130,246,0.15)] dark:hover:shadow-[0_25px_45px_rgba(59,130,246,0.12)]',
    tag: 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20',
    accentText: 'text-blue-600 dark:text-blue-400',
    accentBtn: 'bg-blue-600 hover:bg-blue-500 shadow-[0_8px_20px_-6px_rgba(59,130,246,0.4)]',
    address: 'enterprise-app.git',
    mockLogs: [
      'Starting KodBook Web Application...',
      'Registering Spring Security Filters...',
      'Mapping JPA Entity relationships...',
      'Hibernate: create-drop schema check: OK',
      'POST /social/posts/create - 201 Created'
    ]
  },
  sunset: {
    badge: 'bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-200 dark:border-orange-500/20',
    card: 'bg-white dark:bg-slate-900/40 border-slate-200 dark:border-orange-500/30 hover:border-orange-500 hover:dark:border-orange-400 shadow-[0_15px_35px_-15px_rgba(249,115,22,0.06)] dark:shadow-[0_20px_40px_rgba(249,115,22,0.03)] hover:shadow-[0_25px_45px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_25px_45px_rgba(249,115,22,0.12)]',
    tag: 'bg-orange-50 dark:bg-orange-900/40 text-orange-600 dark:text-orange-300 border border-orange-100 dark:border-orange-500/20',
    accentText: 'text-orange-600 dark:text-orange-400',
    accentBtn: 'bg-orange-600 hover:bg-orange-500 shadow-[0_8px_20px_-6px_rgba(249,115,22,0.4)]',
    address: 'meal-mate.git',
    mockLogs: [
      'Bootstrapping Meal-Mate Service...',
      'Loading Menu configurations...',
      'Active Order socket listener running...',
      'Syncing meal-order database collections...',
      'GET /orders/stream/active - 101 Switching Protocol'
    ]
  },
  emerald: {
    badge: 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20',
    card: 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-emerald-500/30 hover:border-emerald-500 hover:dark:border-emerald-400 shadow-[0_15px_35px_-15px_rgba(16,185,129,0.06)] dark:shadow-[0_20px_40px_rgba(16,185,129,0.03)] hover:shadow-[0_25px_45px_rgba(16,185,129,0.15)] dark:hover:shadow-[0_25px_45px_rgba(16,185,129,0.12)]',
    tag: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20',
    accentText: 'text-emerald-600 dark:text-emerald-400',
    accentBtn: 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)]',
    address: 'ml-detector.git',
    mockLogs: [
      'Loading Deep Learning CNN models...',
      'Importing TensorFlow weights...',
      'Image Matrix pixel-array parsing...',
      'Inference evaluation complete: 94.2% accuracy',
      'POST /ml/predict/pneumonia - 200 OK'
    ]
  },
  minimal: {
    badge: 'bg-slate-150 dark:bg-slate-500/10 text-slate-700 dark:text-slate-400 border border-slate-200 dark:border-slate-500/20',
    card: 'bg-white dark:bg-slate-950/40 border-slate-200 dark:border-slate-850 hover:border-slate-500 hover:dark:border-slate-500 shadow-sm dark:shadow-none hover:shadow-[0_15px_30px_rgba(0,0,0,0.05)] dark:hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)]',
    tag: 'bg-slate-100 dark:bg-slate-900/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800',
    accentText: 'text-slate-900 dark:text-white',
    accentBtn: 'bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-200 shadow-[0_5px_15px_rgba(0,0,0,0.1)]',
    address: 'static-portfolio.git',
    mockLogs: [
      'Parsing Static Assets...',
      'Hydrating page metadata structures...',
      'Evaluating GSAP smooth layouts...',
      'Optimizing Webpack client packages...',
      'GET /index.html - 200 OK (Cache HIT)'
    ]
  }
};

const featuredProjectIds = ['dox-app', 'pneumonia-detection'];

function StandardProjectCard({ project }: { project: Project }) {
  const styles = themeStyles[project.theme] || themeStyles.corporate;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="h-full"
    >
      <TiltCard className="w-full h-full">
        <div
          className={`group flex flex-col overflow-hidden rounded-[28px_8px_32px_12px] border transition-all duration-300 h-full ${styles.card}`}
        >
          {/* Browser Window Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-850 select-none">
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="h-3 w-3 rounded-full bg-red-400/80 dark:bg-red-500/80" />
              <span className="h-3 w-3 rounded-full bg-yellow-400/80 dark:bg-yellow-500/80" />
              <span className="h-3 w-3 rounded-full bg-green-400/80 dark:bg-green-500/80" />
            </div>
            <div className="flex-1 max-w-[140px] sm:max-w-xs mx-auto px-4 py-1 bg-slate-100 dark:bg-slate-900 border border-slate-200/50 dark:border-slate-800 rounded font-mono text-[9px] text-slate-500 dark:text-slate-400 text-center truncate">
              {styles.address || `${project.id}.git`}
            </div>
            <div className="shrink-0 text-slate-400 dark:text-slate-500">
              <Terminal className="h-3.5 w-3.5" />
            </div>
          </div>

          {/* Screenshot viewport */}
          <div className="relative h-48 w-full overflow-hidden bg-slate-950">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.title}
              className={`h-full w-full object-cover transition-transform duration-10000 select-none ${
                isHovered ? 'scale-110 translate-y-6' : 'scale-100 translate-y-0'
              }`}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 dark:from-slate-900/40 to-transparent pointer-events-none" />
            <span className={`absolute top-3 right-3 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${styles.badge} pointer-events-none`}>
              {project.theme}
            </span>

            {/* Hover Live Output Log */}
            {isHovered && (
              <div className="absolute inset-0 bg-slate-900/90 flex flex-col p-4 font-mono text-[9px] text-emerald-400 leading-relaxed overflow-hidden justify-end">
                <div className="text-[10px] text-indigo-400 font-bold mb-2 flex items-center gap-1 border-b border-slate-800 pb-1">
                  <Play className="h-3 w-3 fill-current" />
                  <span>PREVIEW OUTPUT SIMULATOR:</span>
                </div>
                {styles.mockLogs.map((log, idx) => (
                  <div key={idx} className="truncate">
                    <span className="text-slate-500 mr-1">$</span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Content details */}
          <div className="flex flex-1 flex-col p-6">
            <h3 className={`text-lg font-bold tracking-tight ${styles.accentText}`}>
              {project.title}
            </h3>
            <p className="mt-3 text-xs leading-relaxed text-slate-650 dark:text-slate-400 line-clamp-3">
              {project.description}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {project.tags.map((tag, idx) => (
                <span key={idx} className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wide ${styles.tag}`}>
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between mt-auto">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-650 dark:text-slate-350 hover:text-indigo-650 dark:hover:text-white transition-colors"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Code</span>
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1 text-[10px] font-bold px-3 py-1.5 rounded-lg text-white transition-all duration-300 ${styles.accentBtn}`}
              >
                <span>Live View</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>
      </TiltCard>
    </div>
  );
}

function FeaturedSplitProjectCard({ project, onClick }: { project: Project; onClick?: () => void }) {
  const styles = themeStyles[project.theme] || themeStyles.corporate;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      className="w-full h-full cursor-pointer"
    >
      <TiltCard className="w-full h-full">
        <div
          className={`group flex flex-col lg:flex-row overflow-hidden rounded-[28px_8px_32px_12px] border transition-all duration-300 h-full ${styles.card}`}
        >
          {/* Left Pane: Browser window frame */}
          <div className="flex-1 lg:w-3/5 flex flex-col border-b lg:border-b-0 lg:border-r border-slate-200 dark:border-slate-800/80">
            {/* Mockup Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50/80 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 select-none">
              <div className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
                <span className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>
              <span className="text-[9px] font-bold font-mono text-slate-500">
                {styles.address || `${project.id}.git`}
              </span>
              <Terminal className="h-3.5 w-3.5 text-slate-500" />
            </div>

            {/* Viewport */}
            <div className="relative flex-1 min-h-[220px] bg-slate-950 overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.image}
                alt={project.title}
                className={`h-full w-full object-cover transition-transform duration-10000 select-none ${
                  isHovered ? 'scale-110 translate-y-8' : 'scale-100 translate-y-0'
                }`}
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 to-transparent pointer-events-none" />
              <span className={`absolute top-3 right-3 text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${styles.badge}`}>
                Featured app
              </span>

              {/* Hover Terminal Logs */}
              {isHovered && (
                <div className="absolute inset-0 bg-slate-900/92 flex flex-col p-5 font-mono text-[9.5px] text-emerald-400 leading-relaxed overflow-hidden justify-end">
                  <div className="text-[10px] text-indigo-400 font-bold mb-3 flex items-center gap-1 border-b border-slate-800 pb-1.5">
                    <Play className="h-3 w-3 fill-current animate-pulse" />
                    <span>PREVIEW SERVICE PIPELINE LOGS:</span>
                  </div>
                  {styles.mockLogs.map((log, idx) => (
                    <div key={idx} className="truncate">
                      <span className="text-slate-600 mr-2">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  <div className="mt-3 text-[9px] text-indigo-400 italic text-right">
                    Spring Container: ONLINE
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Pane: Info & Description */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between bg-slate-50/20 dark:bg-slate-900/10 font-sans">
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-wider font-mono text-indigo-650 dark:text-indigo-400 mb-2">
                <Cpu className="h-3.5 w-3.5" />
                <span>Featured Architecture</span>
              </div>
              
              <h3 className={`text-xl font-bold tracking-tight font-serif ${styles.accentText}`}>
                {project.title}
              </h3>
              
              <p className="mt-4 text-xs leading-relaxed text-slate-655 dark:text-slate-400">
                {project.description}
              </p>
              
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag, idx) => (
                  <span key={idx} className={`text-[9px] px-2.5 py-0.5 rounded-md font-bold uppercase tracking-wide ${styles.tag}`}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 dark:border-slate-900/60 flex items-center justify-between">
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-650 dark:text-slate-350 hover:text-indigo-650 dark:hover:text-white transition-colors animate-pulse"
              >
                <GithubIcon className="h-4 w-4" />
                <span>Source Code</span>
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-1.5 text-[10px] font-bold px-4 py-2 rounded-xl text-white transition-all duration-300 ${styles.accentBtn}`}
              >
                <span>Launch Live Preview</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

        </div>
      </TiltCard>
    </div>
  );
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalProject, setModalProject] = useState<Project | null>(null);

  const filteredProjects = projects.filter((project) => {
    if (selectedCategory === 'All') return true;
    
    if (selectedCategory === 'Spring Boot') {
      return project.tags.some(tag => tag.toLowerCase().includes('spring') || tag.toLowerCase().includes('sql') || tag.toLowerCase().includes('microservices'));
    }
    if (selectedCategory === 'Python') {
      return project.tags.some(tag => tag.toLowerCase() === 'python');
    }
    if (selectedCategory === 'ML/AI') {
      return project.tags.some(tag => ['tensorflow', 'cnn', 'scikit-learn', 'image processing', 'machine learning'].includes(tag.toLowerCase()));
    }
    if (selectedCategory === 'Web') {
      return project.tags.some(tag => ['html', 'css', 'javascript', 'react', 'html5', 'css3', 'gsap', 'react.js', 'tailwind css'].includes(tag.toLowerCase()));
    }
    
    return project.tags.some(tag => tag.toLowerCase() === selectedCategory.toLowerCase());
  });

  return (
    <section id="projects" className="relative bg-slate-50 dark:bg-slate-950 py-24 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.01),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Asymmetrical Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <GitFork className="h-4 w-4" />
              <span>Project Catalog</span>
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-serif">
              Featured Work
            </h2>
          </div>
          <p className="text-slate-550 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Hover over any project browser card to trigger a scrolling mockup and reveal live backend pipeline execution logs!
          </p>
        </div>

        {/* Filters */}
        {/* Tab navigation for project categories */}
        <Tab
          items={categories.map((cat) => ({ id: cat, label: cat }))}
          defaultActive="All"
          onChange={(id) => setSelectedCategory(id)}
          className="mb-8"
        />

        {/* Asymmetric Projects Grid */}
        <motion.div
          className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 [transform-style:preserve-3d]"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          animate="show"
        >
          {filteredProjects.map((project) => {
            const isFeatured = featuredProjectIds.includes(project.id) && selectedCategory === 'All';
            return (
              <motion.div
                key={project.id}
                className={isFeatured ? 'lg:col-span-2' : ''}
                variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              >
                {isFeatured ? (
                  <FeaturedSplitProjectCard project={project} onClick={() => setModalProject(project)} />
                ) : (
                  <StandardProjectCard project={project} />
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
      {/* Modal for featured project preview */}
      {modalProject && (
        <Modal isOpen={true} onClose={() => setModalProject(null)} title={modalProject.title}>
          <iframe src={modalProject.link} className="w-full h-96 rounded-md" />
        </Modal>
      )}
    </section>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X, Sparkles } from 'lucide-react';

interface GuideStep {
  id: string;
  title: string;
  descDesktop: string;
  descMobile: string;
  actionHintDesktop: string;
  actionHintMobile: string;
  pictorial: () => React.JSX.Element;
}

// -------------------------------------------------------------
// Tiny Pictorial Guides
// -------------------------------------------------------------

const HeroPictorial = () => (
  <div className="h-12 w-full bg-indigo-500/5 dark:bg-slate-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-indigo-500/10 mb-2.5 select-none">
    <div 
      className="h-7 w-12 bg-white dark:bg-slate-900 rounded-md border border-slate-200 dark:border-slate-800 shadow-sm flex items-center justify-center text-[8px] text-indigo-500 font-mono font-bold"
      style={{
        animation: 'tilt-sim 3s ease-in-out infinite',
        transformStyle: 'preserve-3d',
        perspective: '100px'
      }}
    >
      3D
    </div>
    <div className="absolute top-7 left-1/2 h-1.5 w-1.5 bg-indigo-500 rounded-full animate-ping pointer-events-none" />
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes tilt-sim {
        0%, 100% { transform: rotateY(-15deg) rotateX(10deg); }
        50% { transform: rotateY(15deg) rotateX(-10deg); }
      }
    `}} />
  </div>
);

const AboutPictorial = () => (
  <div className="h-12 w-full bg-slate-950 rounded-xl flex flex-col p-2 font-mono text-[8px] text-emerald-400 mb-2.5 border border-emerald-500/15 select-none">
    <div className="flex gap-0.5 mb-1 shrink-0">
      <span className="h-1 w-1 rounded-full bg-red-400/80" />
      <span className="h-1 w-1 rounded-full bg-yellow-400/80" />
      <span className="h-1 w-1 rounded-full bg-green-400/80" />
    </div>
    <div className="truncate">
      <span>$ sudo hack</span>
      <span className="ml-0.5" style={{ animation: 'blink-sim 1s infinite' }}>_</span>
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes blink-sim {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }
    `}} />
  </div>
);

const SkillsPictorial = () => (
  <div className="h-12 w-full bg-indigo-500/5 dark:bg-slate-950 rounded-xl flex items-center justify-center gap-1.5 relative overflow-hidden border border-indigo-500/10 mb-2.5 select-none">
    <span 
      className="h-2 w-2 rounded-full bg-indigo-500" 
      style={{ animation: 'bounce-sim 1.2s infinite ease-in' }} 
    />
    <span 
      className="h-2 w-2 rounded-full bg-purple-500" 
      style={{ animation: 'bounce-sim 1.2s infinite ease-in', animationDelay: '0.2s' }} 
    />
    <span 
      className="h-2 w-2 rounded-full bg-pink-500" 
      style={{ animation: 'bounce-sim 1.2s infinite ease-in', animationDelay: '0.4s' }} 
    />
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes bounce-sim {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
      }
    `}} />
  </div>
);

const ProjectsPictorial = () => (
  <div className="h-12 w-full bg-indigo-500/5 dark:bg-slate-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-indigo-500/10 mb-2.5 select-none">
    <div className="h-6 w-9 bg-slate-350 dark:bg-slate-800 rounded absolute left-3 opacity-40 scale-90" />
    <div className="h-6 w-9 bg-slate-350 dark:bg-slate-800 rounded absolute right-3 opacity-40 scale-90" />
    <div 
      className="h-7 w-11 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded absolute z-10 shadow-sm"
      style={{ animation: 'slide-sim 3s infinite ease-in-out' }}
    />
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes slide-sim {
        0%, 100% { transform: translateX(0); }
        50% { transform: translateX(6px); }
      }
    `}} />
  </div>
);

const CertsPictorial = () => (
  <div className="h-12 w-full bg-indigo-500/5 dark:bg-slate-950 rounded-xl flex flex-col p-1.5 justify-center gap-1 border border-indigo-500/10 mb-2.5 select-none">
    <div className="flex gap-1 text-[7px] font-mono justify-center">
      <span className="px-1 py-0.5 rounded bg-indigo-500/20 text-indigo-650 dark:text-indigo-400 font-bold border border-indigo-500/20 animate-pulse">ACTIVE</span>
      <span className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">DEV</span>
      <span className="px-1 py-0.5 rounded bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400">CLOUD</span>
    </div>
  </div>
);

const ContactPictorial = () => (
  <div className="h-12 w-full bg-indigo-500/5 dark:bg-slate-950 rounded-xl flex items-center justify-center relative overflow-hidden border border-indigo-500/10 mb-2.5 select-none">
    <div 
      className="h-7 w-12 bg-white dark:bg-slate-900 border border-indigo-500/20 dark:border-indigo-500/35 rounded shadow-sm text-[5px] font-mono p-1 flex flex-col justify-between text-indigo-655 dark:text-indigo-400"
      style={{ animation: 'fade-menu 3s infinite ease-in-out' }}
    >
      <div className="border-b border-slate-100 dark:border-slate-800 pb-0.5 leading-none">SHORTCUTS</div>
      <div className="h-0.5 w-6 bg-indigo-500/30 rounded-full" />
      <div className="h-0.5 w-8 bg-indigo-500/30 rounded-full" />
    </div>
    <style dangerouslySetInnerHTML={{ __html: `
      @keyframes fade-menu {
        0%, 100% { opacity: 0.2; transform: scale(0.95); }
        50% { opacity: 1; transform: scale(1); }
      }
    `}} />
  </div>
);

// -------------------------------------------------------------
// Guide Step Content Matrix (Dynamic instructions per device)
// -------------------------------------------------------------

const GUIDE_STEPS: Record<string, GuideStep> = {
  hero: {
    id: 'hero',
    title: '🌐 Interactive Workspace',
    descDesktop: 'Hover over the bento cards to tilt them in 3D parallax, and hover over my profile photo to ripple it like liquid water!',
    descMobile: 'Tap on my profile picture to trigger a liquid water ripple! Note: 3D card tilt is best experienced with a desktop mouse.',
    actionHintDesktop: 'Move your cursor over grids and avatar.',
    actionHintMobile: 'Tap the profile picture to see liquid ripples.',
    pictorial: HeroPictorial
  },
  about: {
    id: 'about',
    title: '💻 Command Line Shell CLI',
    descDesktop: 'A working interactive terminal console! Click the green input bar at the bottom and type "help" or type "sudo hack" for an easter egg.',
    descMobile: 'A fully working terminal console! Tap the green input bar at the bottom and type "help" or "sudo hack" on your mobile keyboard.',
    actionHintDesktop: 'Type commands in the console input.',
    actionHintMobile: 'Tap the input bar and type a command.',
    pictorial: AboutPictorial
  },
  skills: {
    id: 'skills',
    title: '🎮 Core Skills Sandbox',
    descDesktop: 'Switch tabs above to load the Gravity Sandbox! You can grab, toss, and bounce skills badges off the canvas walls.',
    descMobile: 'Switch tabs above to load the Gravity Sandbox! Drag, fling, and bounce skills badges off the canvas walls with your finger.',
    actionHintDesktop: 'Select "Gravity Sandbox" and drag badges.',
    actionHintMobile: 'Tap "Gravity Sandbox" and drag badges with your finger.',
    pictorial: SkillsPictorial
  },
  projects: {
    id: 'projects',
    title: '📂 Project Carousel Cards',
    descDesktop: 'Drag the active card folder left or right to swipe through systems, or click to open the GxP-style revision control dashboard.',
    descMobile: 'Swipe the active card left or right with your finger to cycle projects, and tap card to view the case study console.',
    actionHintDesktop: 'Drag cards or click to view case study.',
    actionHintMobile: 'Swipe cards or tap to open case study.',
    pictorial: ProjectsPictorial
  },
  certifications: {
    id: 'certifications',
    title: '🏆 Credentials Panel',
    descDesktop: 'Filter verified credentials instantly by categories. Click on any certificate card to view it in full high-res preview.',
    descMobile: 'Filter credentials instantly by categories. Tap any certificate card to view it in full screen preview.',
    actionHintDesktop: 'Tap categories or click cards.',
    actionHintMobile: 'Tap categories or tap cards to preview.',
    pictorial: CertsPictorial
  },
  contact: {
    id: 'contact',
    title: '🔌 Dev Context Menu Panel',
    descDesktop: 'Right-click anywhere on the screen to trigger the developer context shortcuts (theme switch, resume link, copy email).',
    descMobile: 'Custom right-click shortcuts are active on desktop. Visit on desktop and right-click to trigger the developer widget!',
    actionHintDesktop: 'Right-click anywhere on the webpage.',
    actionHintMobile: 'Open this portfolio on a desktop to try it.',
    pictorial: ContactPictorial
  }
};

export default function TourGuide() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const sectionsOrder = ['hero', 'about', 'skills', 'projects', 'certifications', 'contact'];
  const currentStepIndex = sectionsOrder.indexOf(activeSection);

  useEffect(() => {
    // Check screen size
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);

    // Check if user has visited before
    const hasVisited = localStorage.getItem('bharath-tour-completed');
    const welcomed = localStorage.getItem('bharath-welcomed');
    
    let tourTimer: NodeJS.Timeout;
    if (!hasVisited) {
      setIsFirstVisit(true);
      // Wait for welcome loader to finish before opening tour guide automatically!
      const delay = welcomed === 'true' ? 1200 : 3200;
      tourTimer = setTimeout(() => {
        setIsOpen(true);
      }, delay);
    }

    // Scroll Observer to track active section
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px', // Trigger near middle of viewport
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && sectionsOrder.includes(entry.target.id)) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    sectionsOrder.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Detect scrolling state to hide card dynamically on scroll
    let scrollTimer: NodeJS.Timeout;
    const handleScrollState = () => {
      setIsScrolling(true);
      clearTimeout(scrollTimer);
      scrollTimer = setTimeout(() => {
        setIsScrolling(false);
      }, 250);
    };

    window.addEventListener('scroll', handleScrollState);

    return () => {
      sectionsOrder.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.unobserve(el);
      });
      window.removeEventListener('scroll', handleScrollState);
      window.removeEventListener('resize', checkDevice);
      clearTimeout(scrollTimer);
      if (tourTimer) clearTimeout(tourTimer);
    };
  }, []);

  const handleDismiss = () => {
    setIsOpen(false);
    setIsDismissed(true);
    localStorage.setItem('bharath-tour-completed', 'true');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleNext = () => {
    if (currentStepIndex < sectionsOrder.length - 1) {
      const nextSection = sectionsOrder[currentStepIndex + 1];
      setActiveSection(nextSection);
      scrollToSection(nextSection);
    } else {
      handleDismiss();
    }
  };

  const handleBack = () => {
    if (currentStepIndex > 0) {
      const prevSection = sectionsOrder[currentStepIndex - 1];
      setActiveSection(prevSection);
      scrollToSection(prevSection);
    }
  };

  const currentStep = GUIDE_STEPS[activeSection] || GUIDE_STEPS.hero;
  const PictorialComp = currentStep.pictorial;

  // Only show card if guide is open and user is not currently scrolling
  const shouldShowCard = isOpen && !isScrolling;

  return (
    <>
      {/* Floating Indicator Help Toggle Button */}
      <div className="fixed bottom-6 left-6 z-[99] select-none">
        <button
          onClick={() => {
            setIsOpen(!isOpen);
            if (isFirstVisit) setIsFirstVisit(false);
          }}
          className="relative p-3.5 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-indigo-650 dark:text-indigo-400 shadow-lg hover:shadow-indigo-500/10 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-center cursor-pointer"
          title="Toggle Guided Tour"
        >
          <HelpCircle className="h-5 w-5" />
          {!isOpen && !isDismissed && (
            <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500"></span>
            </span>
          )}
        </button>
      </div>

      {/* Floating Guide Panel */}
      <AnimatePresence>
        {shouldShowCard && (
          <motion.div
            initial={{ opacity: 0, y: 35, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 35, scale: 0.9 }}
            transition={{ type: 'spring', damping: 15, stiffness: 220 }}
            className="fixed bottom-22 left-4 sm:left-6 z-[99] w-[calc(100vw-32px)] sm:w-[260px] rounded-2xl bg-white/95 dark:bg-slate-900/95 border border-slate-200/60 dark:border-slate-800/80 shadow-[0_20px_50px_rgba(99,102,241,0.15)] backdrop-blur-md overflow-hidden font-sans p-4.5 select-none"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 pb-2 mb-2.5">
              <div className="flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase font-mono tracking-wider">
                <Sparkles className="h-3.5 w-3.5 text-indigo-500 shrink-0 animate-pulse" />
                <span>Tour Guide</span>
              </div>
              <button
                onClick={handleDismiss}
                className="p-1 rounded-md text-slate-400 hover:text-slate-655 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all cursor-pointer"
                title="Dismiss Tour"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Pictorial Animated Guide */}
            <PictorialComp />

            {/* Content Details */}
            <div className="space-y-2">
              <h4 className="text-xs font-black text-slate-900 dark:text-white font-mono leading-tight">
                {currentStep.title}
              </h4>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                {isMobile ? currentStep.descMobile : currentStep.descDesktop}
              </p>

              {/* Action Hint */}
              <div className="bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-100/10 dark:border-indigo-900/20 rounded-xl p-2.5 flex gap-1.5 items-start mt-2">
                <span className="text-indigo-550 dark:text-indigo-400 font-mono text-[7px] font-bold border border-indigo-500/20 px-1 py-0.5 rounded bg-indigo-500/5 shrink-0 mt-0.5">
                  TRY IT
                </span>
                <span className="text-[9px] text-slate-600 dark:text-slate-350 font-bold leading-normal font-mono">
                  {isMobile ? currentStep.actionHintMobile : currentStep.actionHintDesktop}
                </span>
              </div>
            </div>

            {/* Progress Tickers */}
            <div className="flex items-center gap-1 mt-3">
              {sectionsOrder.map((stepId, idx) => (
                <div 
                  key={stepId} 
                  className={`h-0.5 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex ? 'w-4 bg-indigo-650 dark:bg-indigo-400' : 'w-1 bg-slate-200 dark:bg-slate-800'
                  }`}
                />
              ))}
            </div>

            {/* Guide Step Controls */}
            <div className="flex items-center justify-between mt-3.5 pb-0.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/60 font-mono text-[8px] font-bold">
              <button
                onClick={handleBack}
                disabled={currentStepIndex === 0}
                className={`px-2 py-1 rounded-md border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-850 transition-colors ${
                  currentStepIndex === 0 ? 'opacity-40 cursor-not-allowed text-slate-400' : 'cursor-pointer text-slate-700 dark:text-slate-300'
                }`}
              >
                &lt; BACK
              </button>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleDismiss}
                  className="text-slate-400 hover:text-slate-655 dark:hover:text-slate-250 cursor-pointer"
                >
                  SKIP
                </button>
                <button
                  onClick={handleNext}
                  className="px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs cursor-pointer flex items-center gap-0.5 transition-all"
                >
                  <span>{currentStepIndex === sectionsOrder.length - 1 ? 'FINISH' : 'NEXT >'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

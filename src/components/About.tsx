'use client';

import React, { useState, useRef, useEffect } from 'react';
import { personalInfo } from '../data/portfolio';
import { Terminal as TerminalIcon } from 'lucide-react';
import TiltCard from './TiltCard';
import useTextScramble from '../hooks/useTextScramble';
import LiquidAvatar from './LiquidAvatar';

interface CommandLog {
  input: string;
  output: string;
}

export default function About() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showMatrix, setShowMatrix] = useState(false);
  const { text: scrambleTitle, scramble: triggerScrambleTitle } = useTextScramble('About Me & Terminal Console');
  const [terminalHistory, setTerminalHistory] = useState<CommandLog[]>([
    { input: '', output: 'Welcome to Bharath\'s interactive terminal CLI! Type "help" to start.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isInputFocused, setIsInputFocused] = useState(false);
  
  // Terminal commands history for arrow key navigation
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
 
  const terminalLogsRef = useRef<HTMLDivElement>(null);
 
  // Keep terminal inner container scrolled to bottom without shifting browser page view
  useEffect(() => {
    if (terminalLogsRef.current) {
      terminalLogsRef.current.scrollTop = terminalLogsRef.current.scrollHeight;
    }
  }, [terminalHistory]);
 
  const executeCommand = (cmdText: string) => {
    const command = cmdText.trim().toLowerCase();
    if (!command) return;
 
    // Add to commands history
    setCommandHistory((prev) => {
      const nextHistory = [...prev, cmdText];
      return nextHistory;
    });
    setHistoryIndex(-1); // Reset index on new submit

    let output = '';
    const cleanCmd = command.toLowerCase().trim();

    // Check for Matrix Easter Egg!
    if (cleanCmd === 'hack' || cleanCmd === 'sudo hack' || cleanCmd === 'matrix') {
      setShowMatrix(true);
      setTimeout(() => {
        setShowMatrix(false);
        setTerminalHistory((prev) => [
          ...prev,
          {
            input: cmdText,
            output: 'DECRYPTION COMPLETE. SYSTEM UNLOCKED.\n\n[ACCESS GRANTED] Decrypted core credential keys:\n  * Position: Java Full-Stack Developer\n  * Location: Bangalore, India / Remote\n  * Core Philosophy: "Write clean code, build resilient microservices, scale without failure."\n\nHIRE_ME_PROTOCOL status: READY. Contact me below! 🚀'
          }
        ]);
      }, 3000);
      return;
    }
    
    // Custom keywords matched with GenZ funny response styles with full respect
    if (cleanCmd.includes('gf') || cleanCmd.includes('girlfriend') || cleanCmd.includes('crush') || cleanCmd.includes('marry')) {
      output = "Error 404: Girlfriend not found. 💀 Currently in a committed relationship with clean code and Spring Boot compilation. No cap, we out here grinding on systems! ⚡";
    } else if (cleanCmd.includes('salary') || cleanCmd.includes('money') || cleanCmd.includes('pay') || cleanCmd.includes('hired')) {
      output = "Bro is asking for the bag! 💰 Let's sync up on email to discuss the numbers. Strictly premium execution, zero fluff. Let's get this bread together! 🚀";
    } else if (cleanCmd.includes('zenitsu') || cleanCmd.includes('anime') || cleanCmd.includes('demon slayer')) {
      output = "Zenitsu is valid fr! ⚡ Thunder breathing, first form: Thunderclap and Flash! But currently, I'm focusing on Java breathing, first form: Spring Boot compilation! 💥";
    } else if (cleanCmd.includes('hobby') || cleanCmd.includes('hobbies') || cleanCmd.includes('game') || cleanCmd.includes('gaming')) {
      output = "Coding is the main hobby, no cap. But when I'm AFK, I'm probably listening to music, reviewing system designs, or sipping coffee. ☕ Keeping it chill.";
    } else if (cleanCmd.includes('who') || cleanCmd.includes('about') || cleanCmd.includes('bharath')) {
      output = "I'm Bharath R, a Java Full-Stack Engineer out here building backend APIs that don't crash. Real engineering, zero fluff. Let's build something epic! 🚀";
    } else {
      switch (cleanCmd) {
        case 'help':
          output = 'Available commands:\n  - bio            : Read my biography summary\n  - skills         : Read my tech matrix\n  - projects       : List my development projects\n  - experience     : View my internships & education\n  - certifications : List my verified credentials\n  - contact        : View my email & location\n  - clear          : Clear the console screen';
          break;
        case 'bio':
          output = `${personalInfo.bioSummary}\n\nStack expertise: ${personalInfo.bioDetails[0]}`;
          break;
        case 'skills':
          output = 'Core Skillset:\n  [Frontend] : React.js, Tailwind CSS, JavaScript, HTML5/CSS3\n  [Backend]  : Java Spring Boot, Microservices, Spring Cloud, Hibernate\n  [Tools]    : Docker, Git, CI/CD pipelines, Postman';
          break;
        case 'projects':
          output = 'Development Projects:\n  - DOX-APP: Secure document management system (Spring Boot, React)\n  - Pneumonia Detection: CNN deep learning scans model (Python, TensorFlow)\n  - KodBook: Social media MVC application (Spring Boot, SQL)\n  - Meal-Mate: Restaurant ordering dashboard (Python, JavaScript)\n  - Blood Group: Fingerprint pattern predictor (Python, Scikit-Learn)\n  - Portfolio: Next.js + Framer Motion interactive site (Next.js, Tailwind v4)';
          break;
        case 'experience':
          output = 'Experience & Milestones:\n\n[1] Java Full Stack Developer Intern\n    Company : Swajyot Technologies Pvt. Ltd.\n    Period  : March 2026 – Present\n    Overview: Contributing to enterprise full-stack solutions using Java, Spring Boot, React, and PostgreSQL.\n    Tasks   :\n      * Develop and maintain enterprise web applications using Spring Boot & React.js\n      * Design PostgreSQL database schemas and build optimized query structures\n      * Containerize microservices with Docker and deploy to Railway/Vercel platforms\n      * Integrate secure JWT authentication, document gates, and automated PDF builders\n    Skills  : Java, Spring Boot, React.js, PostgreSQL, Microservices, Docker, DevOps, REST APIs, Tailwind CSS, Git\n\n[2] Full Stack Development Training\n    Company : KodNest (6 Months)\n    Tasks   : Mastered Java Spring Boot and Microservices basics for backend development.\n    Skills  : Java, Python, Spring Boot, SQL, React.js, HTML/CSS, JavaScript\n\n[3] Internship 2.0 Program\n    Company : ParvaM ConsulTech Pvt. Ltd. (Oct 2023 – Nov 2023)\n    Tasks   : Designed and presented the sustainability-focused business idea "Bio Gas Plantation".\n    Skills  : Business Strategy, Team Collaboration, Project Planning\n\n[4] Academic Education\n    * Bachelor of Engineering in CSE (2021-2025) - DSMSCE Bangalore | CGPA: 8.01\n    * Higher Secondary in Science (2019-2021) - AECS Magnolia PU College\n    * Secondary School (2017-2019) - Adharsha High School';
          break;
        case 'certifications':
          output = 'Verified Credentials:\n  - KodNest Full Stack Certification (2025)\n  - AWS Summit Attendee (2025)\n  - IBM Professional Certificate (2025)\n  - HackerRank Java/Problem Solving (2025)\n  - TCS iON Career Edge (2025)\n  - Skilected Certified Professional (2025)\n  - Besant Technologies Certification (2025)\n  - Udemy Full Stack Course completion (2025)\n  - Coddy Tech algorithms certificate (2024)';
          break;
        case 'contact':
          output = `Location: ${personalInfo.location}\nEmail: ${personalInfo.email}\nGitHub: ${personalInfo.github}\nLinkedIn: ${personalInfo.linkedin}`;
          break;
        case 'clear':
          setTerminalHistory([]);
          setInputVal('');
          return;
        default: {
          // Check if input looks like keyboard-mashing (length > 5 with very few vowels, or multiple words)
          const vowels = command.match(/[aeiouy]/gi);
          const vowelCount = vowels ? vowels.length : 0;
          const isGibberish = command.length > 5 && (vowelCount === 0 || vowelCount / command.length < 0.15 || command.split(' ').length > 2);
          
          if (isGibberish) {
            output = `Command not recognized. (Bro is out here mashing keys ⌨️💀). Please type "help" for a list of valid commands so we can show you the real deal! 🚀`;
          } else {
            output = `Command not recognized: "${command}". (That command is not giving, fr 💀). Type "help" to see the list of valid commands so we can get to business! 🚀`;
          }
        }
      }
    }
 
    setTerminalHistory((prev) => [...prev, { input: cmdText, output }]);
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    executeCommand(inputVal);
    setInputVal('');
  };

  // Keyboard navigation for CLI commands list using Arrow keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (commandHistory.length === 0) return;

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <section id="about" className="relative bg-slate-50 dark:bg-slate-950 py-16 border-b border-slate-200/80 dark:border-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(99,102,241,0.03),transparent_35%)]" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Asymmetrical Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 border-l-4 border-indigo-650 pl-6">
          <div>
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest font-mono flex items-center gap-1.5 mb-2">
              <TerminalIcon className="h-4 w-4" />
              <span>Developer Workspace</span>
            </span>
            <h2 
              onMouseEnter={triggerScrambleTitle}
              className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl font-mono select-none cursor-default"
            >
              {scrambleTitle}
            </h2>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm max-w-md leading-relaxed font-medium">
            Explore my profile interactively using my custom shell CLI. Type <code className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">&quot;help&quot;</code> to print out all available system command protocols.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-12 items-stretch [transform-style:preserve-3d]">
          
          {/* Left: 3D Flip Avatar Card */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center">
            <div 
              className="relative w-64 h-64 md:w-72 md:h-72 cursor-pointer [perspective:1000px] group"
              onClick={() => setIsFlipped(!isFlipped)}
              data-cursor-text="FLIP CARD"
            >
              <div 
                className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${
                  isFlipped ? '[transform:rotateY(180deg)]' : ''
                }`}
              >
                {/* Front Side */}
                <div className="absolute inset-0 w-full h-full rounded-[24px_8px_32px_12px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] [backface-visibility:hidden]">
                  <LiquidAvatar
                    src="/headshot.jpg"
                    alt="Bharath R - Java Full Stack Developer Bangalore"
                    className="w-full h-full"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 flex justify-between items-center text-white font-mono">
                    <span className="text-xs font-bold tracking-wide">Bharath R // Full Stack</span>
                  </div>
                </div>

                {/* Back Side */}
                <div className="absolute inset-0 w-full h-full rounded-[24px_8px_32px_12px] overflow-hidden border border-slate-200 dark:border-slate-800 shadow-[0_15px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_20px_45px_rgba(0,0,0,0.4)] [backface-visibility:hidden] [transform:rotateY(180deg)] bg-white dark:bg-slate-900 flex flex-col items-center justify-center p-6 text-center transition-colors duration-300">
                  <div className="h-16 w-16 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-650 dark:text-indigo-400">
                    <TerminalIcon className="h-8 w-8" />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-lg font-serif">Bharath R</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed max-w-[200px] font-medium">
                    I build enterprise document management platforms, REST web services, and microservice container clusters.
                  </p>
                  <span className="mt-4 text-xs font-semibold text-indigo-650 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-500/10 px-2.5 py-1 rounded-full border border-indigo-100 dark:border-indigo-500/25 font-mono">
                    Click to flip back
                  </span>
                </div>
              </div>
            </div>
            
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-4 italic font-medium">
              *Click card to flip and read backend focus
            </p>
          </div>

          {/* Right: CLI Terminal with click-to-execute shortcuts */}
          <div className="lg:col-span-8 flex flex-col">
            <TiltCard className="w-full h-full flex flex-col">
              <div className="flex flex-col w-full h-full bg-slate-900 text-slate-200 border border-slate-950 dark:border-slate-800 rounded-[20px_6px_24px_12px] shadow-[0_25px_55px_rgba(0,0,0,0.18)] dark:shadow-[0_30px_65px_rgba(0,0,0,0.7)] overflow-hidden font-mono text-xs leading-relaxed flex-1 select-none">
                
                <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-950">
                  <div className="flex items-center gap-1.5 shrink-0">
                    <span className="h-3 w-3 rounded-full bg-red-500/80" />
                    <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
                    <span className="h-3 w-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">
                    bharathr@portfolio: ~/workspace
                  </span>
                  <TerminalIcon className="h-4 w-4 text-slate-600 shrink-0" />
                </div>

                <div
                  ref={terminalLogsRef}
                  className="flex-1 overflow-y-auto p-5 space-y-4 max-h-[250px] min-h-[200px] scrollbar-hide bg-slate-950/40"
                >
                  {terminalHistory.map((log, idx) => (
                    <div key={idx} className="space-y-1">
                      {log.input && (
                        <div className="flex items-center gap-1 text-emerald-450 font-semibold text-xs">
                          <span className="text-slate-500">bharathr@portfolio:~$</span>
                          <span className="text-emerald-450">{log.input}</span>
                        </div>
                      )}
                      <div className="text-slate-300 text-xs whitespace-pre-wrap pl-2 leading-relaxed font-mono">
                        {log.output}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Keyboard Input Bar */}
                <form 
                  onSubmit={handleCommandSubmit}
                  className="relative flex items-center gap-1.5 px-5 py-3.5 bg-slate-950 border-t border-slate-900/60 shrink-0 font-mono text-xs cursor-text"
                  onClick={() => {
                    const inputEl = document.getElementById('terminal-keyboard-input');
                    if (inputEl) inputEl.focus();
                  }}
                  data-cursor-text="TYPE HACK"
                >
                  <style dangerouslySetInnerHTML={{ __html: `
                    @keyframes terminal-blink {
                      0%, 100% { opacity: 1; }
                      50% { opacity: 0; }
                    }
                    .custom-terminal-cursor {
                      animation: terminal-blink 1.0s step-end infinite;
                    }
                  ` }} />

                  <span className="text-slate-500 font-semibold shrink-0 select-none">bharathr@portfolio:~$</span>
                  
                  <div className="relative flex-1 flex items-center min-w-0 h-4">
                    {/* Ghost input to capture keystrokes */}
                    <input
                      id="terminal-keyboard-input"
                      type="text"
                      value={inputVal}
                      onChange={(e) => setInputVal(e.target.value)}
                      onKeyDown={handleKeyDown}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text focus:outline-none select-text"
                      autoComplete="off"
                      autoCapitalize="off"
                      spellCheck="false"
                    />

                    {/* Styled rendering on top of the ghost input */}
                    <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none w-full min-w-0">
                      <span className="text-emerald-400 whitespace-pre truncate">{inputVal}</span>
                      <span className={`w-1.5 h-3.5 bg-emerald-400 ml-0.5 shrink-0 ${isInputFocused ? 'custom-terminal-cursor' : 'opacity-70'}`} />
                      {!inputVal && (
                        <span className="absolute left-0 text-slate-500 text-xs font-mono pointer-events-none select-none truncate pr-4">
                          use Up/Down arrow for history or type command...
                        </span>
                      )}
                    </div>
                  </div>
                </form>

              </div>
            </TiltCard>
          </div>
        </div>
      </div>
      
      {showMatrix && <MatrixRain />}
    </section>
  );
}

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / 20);
    const yPositions = Array(columns).fill(0);

    const chars = '01';

    const draw = () => {
      ctx.fillStyle = 'rgba(2, 6, 23, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#6366f1';
      ctx.font = '15px monospace';

      yPositions.forEach((y, index) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = index * 20;
        ctx.fillText(char, x, y);

        if (y > 100 + Math.random() * 10000) {
          yPositions[index] = 0;
        } else {
          yPositions[index] = y + 20;
        }
      });
    };

    const interval = setInterval(draw, 35);

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] bg-slate-950 flex items-center justify-center font-mono select-none">
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
      <div className="relative z-10 px-8 py-6 rounded-3xl bg-white/95 dark:bg-slate-900/90 border border-indigo-500/20 dark:border-indigo-500/30 text-center shadow-2xl backdrop-blur-md max-w-sm">
        <span className="h-2 w-2 rounded-full bg-indigo-650 animate-ping inline-block mr-2" />
        <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest animate-pulse">
          Decrypting secure core keys...
        </span>
        <div className="w-full bg-slate-100 dark:bg-slate-950 h-1 rounded-full overflow-hidden mt-4 border border-slate-200 dark:border-slate-850">
          <div className="h-full bg-indigo-650 dark:bg-indigo-500 rounded-full" style={{ width: '100%', transition: 'width 3s ease-in-out' }} />
        </div>
      </div>
    </div>
  );
}

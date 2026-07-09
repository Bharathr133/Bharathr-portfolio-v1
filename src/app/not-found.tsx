'use client';

import React, { useState, useEffect, useRef, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, AlertTriangle, ArrowRight, Home, Cpu, Code, User, Mail, RefreshCw } from 'lucide-react';

interface TerminalLine {
  text: string;
  type: 'info' | 'error' | 'success' | 'input' | 'warning';
}

export default function NotFound() {
  const router = useRouter();
  const [inputVal, setInputVal] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<TerminalLine[]>([
    { text: 'SYSTEM DIAGNOSTICS DEVIATION DETECTED...', type: 'warning' },
    { text: 'VERIFYING ROUTING INTEGRITY...', type: 'info' },
    { text: 'ERROR: HTTP_404_PAGE_NOT_FOUND', type: 'error' },
    { text: 'The requested segment does not exist in our static routing tables.', type: 'error' },
    { text: "Type 'help' to view available system protocols or use the controls below.", type: 'success' },
  ]);
  const [matrixActive, setMatrixActive] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto scroll terminal to bottom
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLogs]);

  // Matrix Code Rain Easter Egg
  useEffect(() => {
    if (!matrixActive || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const katakana = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphabet = katakana.split('');

    const fontSize = 16;
    const columns = canvas.width / fontSize;

    const rainDrops: number[] = [];
    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#10b981'; // Emerald text
      ctx.font = fontSize + 'px monospace';

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet[Math.floor(Math.random() * alphabet.length)];
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    const interval = setInterval(draw, 30);

    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [matrixActive]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    if (!trimmedCmd) return;

    const newLogs = [...terminalLogs, { text: `guest@bharathr-portfolio:~$ ${cmd}`, type: 'input' as const }];

    switch (trimmedCmd) {
      case 'help':
        newLogs.push(
          { text: 'Available commands:', type: 'info' },
          { text: '  home      - Navigate to the landing page', type: 'info' },
          { text: '  about     - Learn details about Bharath R', type: 'info' },
          { text: '  projects  - View showcase projects catalog', type: 'info' },
          { text: '  skills    - List developer skill tags', type: 'info' },
          { text: '  contact   - Request contact form protocols', type: 'info' },
          { text: '  matrix    - Initialize Matrix virtual grid simulation', type: 'success' },
          { text: '  clear     - Purge terminal records from memory', type: 'info' }
        );
        break;
      case 'home':
        newLogs.push({ text: 'Rerouting payload to Home Gateway...', type: 'success' });
        setTimeout(() => router.push('/'), 1000);
        break;
      case 'about':
        newLogs.push(
          { text: 'Developer Profile: Bharath R', type: 'success' },
          { text: 'Role: Senior Java Full Stack Developer & ML Engineer', type: 'info' },
          { text: 'Location: Bangalore, India', type: 'info' },
          { text: 'Specialties: Spring Boot, Microservices, React.js, Deep Learning', type: 'info' }
        );
        break;
      case 'projects':
        newLogs.push({ text: 'Redirecting to featured projects catalog...', type: 'success' });
        setTimeout(() => router.push('/#projects'), 1000);
        break;
      case 'skills':
        newLogs.push({ text: 'Redirecting to technical skills deck...', type: 'success' });
        setTimeout(() => router.push('/#skills'), 1000);
        break;
      case 'contact':
        newLogs.push({ text: 'Opening secure contact communications protocol...', type: 'success' });
        setTimeout(() => router.push('/#contact'), 1000);
        break;
      case 'matrix':
      case 'sudo hack':
        setMatrixActive(true);
        newLogs.push(
          { text: 'SUDO PROTOCOL GRANTED.', type: 'warning' },
          { text: 'OVERRIDING SECURITY FIREWALLS...', type: 'warning' },
          { text: 'SYSTEM DECOMPILING... GREEN PILL INITIATED.', type: 'success' }
        );
        break;
      case 'clear':
        setTerminalLogs([]);
        setInputVal('');
        return;
      default:
        newLogs.push({
          text: `Command '${trimmedCmd}' unrecognized. Type 'help' for system protocols.`,
          type: 'error',
        });
        break;
    }

    setTerminalLogs(newLogs);
    setInputVal('');
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(inputVal);
  };

  const triggerPreset = (cmd: string) => {
    handleCommand(cmd);
  };

  return (
    <div className="relative min-h-[calc(100vh-64px)] w-full flex items-center justify-center bg-slate-950 text-emerald-400 p-4 md:p-8 font-mono select-none overflow-hidden mt-16">
      {/* Canvas for Matrix Code Rain */}
      {matrixActive && (
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full opacity-35 pointer-events-none z-0"
        />
      )}

      {/* Grid Overlay background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#022c22_1px,transparent_1px),linear-gradient(to_bottom,#022c22_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-35 z-0" />

      {/* Cyber Glow background element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0" />

      {/* CRT Scanline Filter effect */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.45)_100%)] z-10" />
      <div 
        className="absolute inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-3xl relative z-10 border border-emerald-500/30 rounded-lg overflow-hidden bg-black/85 backdrop-blur-md shadow-[0_0_50px_rgba(16,185,129,0.15)]"
      >
        {/* Terminal Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-emerald-500/20 select-none">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500/60" />
            <span className="h-3 w-3 rounded-full bg-yellow-500/60" />
            <span className="h-3 w-3 rounded-full bg-emerald-500/60" />
            <span className="text-xs text-emerald-500/70 font-semibold ml-2 flex items-center gap-1.5">
              <Terminal className="h-3.5 w-3.5 animate-pulse" />
              <span>bash - router_anomaly_handler.sh</span>
            </span>
          </div>
          <span className="text-[10px] text-emerald-500/50">v4.0.4-LOCKED</span>
        </div>

        {/* Terminal Screen Body */}
        <div className="p-6 h-[380px] overflow-y-auto flex flex-col gap-2 scrollbar-hide text-xs md:text-sm">
          <div className="flex items-center gap-3 border-b border-emerald-950 pb-4 mb-2">
            <AlertTriangle className="h-10 w-10 text-yellow-500 shrink-0 animate-bounce" />
            <div>
              <div className="text-sm md:text-base font-bold text-yellow-500 uppercase tracking-widest">
                System Boundary Violation
              </div>
              <div className="text-[10px] md:text-xs text-slate-500">
                HOST: bharathr-portfolio // PORT: 3000 // ROUTE: 404
              </div>
            </div>
          </div>

          <AnimatePresence mode="popLayout">
            {terminalLogs.map((log, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                className={`leading-relaxed whitespace-pre-wrap ${
                  log.type === 'error'
                    ? 'text-red-500'
                    : log.type === 'warning'
                    ? 'text-yellow-500 font-semibold'
                    : log.type === 'success'
                    ? 'text-emerald-400 font-bold'
                    : log.type === 'input'
                    ? 'text-white'
                    : 'text-emerald-500/80'
                }`}
              >
                {log.text}
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={terminalEndRef} />
        </div>

        <form 
          onSubmit={onSubmit} 
          className="relative flex border-t border-emerald-500/20 bg-slate-950 px-4 py-3 items-center cursor-text font-mono text-sm"
          onClick={() => {
            const inputEl = document.getElementById('notfound-keyboard-input');
            if (inputEl) inputEl.focus();
          }}
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

          <span className="text-emerald-400 font-bold mr-2 select-none">guest@bharathr-portfolio:~$</span>
          
          <div className="relative flex-1 flex items-center min-w-0 h-5">
            {/* Ghost input to capture keystrokes */}
            <input
              id="notfound-keyboard-input"
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-text focus:outline-none select-text"
              autoComplete="off"
              autoFocus
            />

            {/* Styled rendering on top of the ghost input */}
            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none w-full min-w-0">
              <span className="text-white whitespace-pre truncate">{inputVal}</span>
              <span className="w-1.5 h-3.5 bg-emerald-400 ml-0.5 shrink-0 custom-terminal-cursor" />
              {!inputVal && (
                <span className="absolute left-0 text-slate-500 text-sm font-mono pointer-events-none select-none truncate pr-4">
                  Type 'help' or commands...
                </span>
              )}
            </div>
          </div>

          <button type="submit" className="text-emerald-500 hover:text-emerald-400 font-bold text-xs ml-2 flex items-center gap-1 z-20">
            <span>RUN</span>
            <ArrowRight className="h-3 w-3" />
          </button>
        </form>

        {/* Quick Commands Dashboard */}
        <div className="px-6 py-4 bg-slate-900/60 border-t border-emerald-500/10 flex flex-wrap gap-2 justify-center items-center">
          <span className="text-[10px] text-slate-500 uppercase tracking-widest mr-2 select-none">Presets:</span>
          
          <button
            type="button"
            onClick={() => triggerPreset('home')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/45 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold transition-all duration-300 cursor-pointer"
          >
            <Home className="h-3.5 w-3.5" />
            <span>Home Port</span>
          </button>

          <button
            type="button"
            onClick={() => triggerPreset('projects')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/45 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold transition-all duration-300 cursor-pointer"
          >
            <Code className="h-3.5 w-3.5" />
            <span>Projects</span>
          </button>

          <button
            type="button"
            onClick={() => triggerPreset('skills')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-950/45 hover:bg-emerald-900/40 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 text-xs font-semibold transition-all duration-300 cursor-pointer"
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>Skills Catalog</span>
          </button>

          <button
            type="button"
            onClick={() => triggerPreset('matrix')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/40 hover:bg-red-900/30 text-red-400 border border-red-500/20 hover:border-red-500/45 text-xs font-semibold transition-all duration-300 cursor-pointer"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span>Grid Hack</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

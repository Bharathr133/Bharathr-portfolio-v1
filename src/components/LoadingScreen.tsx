'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Particle {
  x: number;
  y: number;
  destX: number;
  destY: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
}

interface InkParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  alpha: number;
  color: string;
  decay: number;
}

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const refreshMouseRef = useRef({ x: -1000, y: -1000, lastX: 0, lastY: 0 });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const hasVisited = localStorage.getItem('bharath-welcomed');
    const isFirst = hasVisited !== 'true';
    setIsFirstVisit(isFirst);

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    if (isFirst) {
      // -------------------------------------------------------------
      // PRELOADER 1: INTERACTIVE PARTICLE GALAXY (First-Time Welcome)
      // -------------------------------------------------------------
      const handleMouseMove = (e: MouseEvent) => {
        mouseRef.current = { x: e.clientX, y: e.clientY };
      };
      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
        }
      };
      const handleMouseLeave = () => {
        mouseRef.current = { x: -1000, y: -1000 };
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('mouseleave', handleMouseLeave);

      const offscreen = document.createElement('canvas');
      const oCtx = offscreen.getContext('2d');
      if (oCtx) {
        offscreen.width = canvas.width;
        offscreen.height = canvas.height;

        oCtx.fillStyle = '#ffffff';
        oCtx.textAlign = 'center';
        oCtx.textBaseline = 'middle';
        
        const fontSize = Math.min(canvas.width / 8, 80);
        oCtx.font = `bold ${fontSize}px system-ui, -apple-system, sans-serif`;
        oCtx.fillText('BHARATH R', canvas.width / 2, canvas.height / 2);

        const imgData = oCtx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;
        const sampledParticles: Particle[] = [];

        const step = Math.max(3, Math.floor(canvas.width / 350));
        for (let y = 0; y < canvas.height; y += step) {
          for (let x = 0; x < canvas.width; x += step) {
            const index = (y * canvas.width + x) * 4;
            const alpha = data[index + 3];
            if (alpha > 128) {
              sampledParticles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                destX: x,
                destY: y,
                vx: 0,
                vy: 0,
                radius: Math.random() * 1.5 + 1,
                color: Math.random() > 0.5 ? '#6366f1' : '#a855f7'
              });
            }
          }
        }

        let animationFrameId: number;
        let progressVal = 0;

        const animate = () => {
          ctx.fillStyle = 'rgba(2, 6, 23, 0.2)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          sampledParticles.forEach((p) => {
            const dx = p.destX - p.x;
            const dy = p.destY - p.y;
            p.vx += dx * 0.04;
            p.vy += dy * 0.04;
            p.vx *= 0.86;
            p.vy *= 0.86;

            const mdx = mouseRef.current.x - p.x;
            const mdy = mouseRef.current.y - p.y;
            const dist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (dist < 100) {
              const force = (100 - dist) / 100;
              const angle = Math.atan2(mdy, mdx);
              p.vx -= Math.cos(angle) * force * 8;
              p.vy -= Math.sin(angle) * force * 8;
            }

            p.x += p.vx;
            p.y += p.vy;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.shadowBlur = 4;
            ctx.shadowColor = p.color;
            ctx.fill();
            ctx.shadowBlur = 0;
          });

          if (progressVal < 100) {
            progressVal += 0.75;
            setProgress(Math.min(Math.round(progressVal), 100));
          }

          animationFrameId = requestAnimationFrame(animate);
        };

        animate();

        const handleResize = () => {
          if (canvas) {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
          }
        };
        window.addEventListener('resize', handleResize);

        const hideTimeout = setTimeout(() => {
          setIsVisible(false);
          localStorage.setItem('bharath-welcomed', 'true');
        }, 2800);

        return () => {
          cancelAnimationFrame(animationFrameId);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('touchmove', handleTouchMove);
          window.removeEventListener('mouseleave', handleMouseLeave);
          window.removeEventListener('resize', handleResize);
          clearTimeout(hideTimeout);
        };
      }
    } else {
      // -------------------------------------------------------------
      // PRELOADER 2: FLUID INK SWIRLS DISPERSION (Subsequent Refresh)
      // -------------------------------------------------------------
      const particles: InkParticle[] = [];

      const handleMouseMove = (e: MouseEvent) => {
        const dx = e.clientX - refreshMouseRef.current.lastX;
        const dy = e.clientY - refreshMouseRef.current.lastY;
        const speed = Math.sqrt(dx * dx + dy * dy);

        if (speed > 2) {
          const colorSet = [
            'rgba(99, 102, 241, ALPHA)',
            'rgba(168, 85, 247, ALPHA)',
            'rgba(236, 72, 153, ALPHA)'
          ];
          for (let i = 0; i < 2; i++) {
            particles.push({
              x: e.clientX,
              y: e.clientY,
              vx: (Math.random() - 0.5) * 4 + dx * 0.15,
              vy: (Math.random() - 0.5) * 4 + dy * 0.15,
              radius: Math.random() * 10 + 15,
              maxRadius: Math.random() * 40 + 50,
              alpha: 0.65,
              color: colorSet[Math.floor(Math.random() * colorSet.length)],
              decay: Math.random() * 0.008 + 0.012
            });
          }
        }
        refreshMouseRef.current = {
          x: e.clientX,
          y: e.clientY,
          lastX: e.clientX,
          lastY: e.clientY
        };
      };

      const handleTouchMove = (e: TouchEvent) => {
        if (e.touches.length > 0) {
          const t = e.touches[0];
          const fakeEvent = { clientX: t.clientX, clientY: t.clientY } as MouseEvent;
          handleMouseMove(fakeEvent);
        }
      };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('touchmove', handleTouchMove);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const initialColors = [
        'rgba(99, 102, 241, ALPHA)',
        'rgba(168, 85, 247, ALPHA)',
        'rgba(236, 72, 153, ALPHA)'
      ];
      
      for (let i = 0; i < 35; i++) {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.random() * 30;
        particles.push({
          x: centerX + Math.cos(angle) * dist,
          y: centerY + Math.sin(angle) * dist,
          vx: Math.cos(angle + Math.PI / 2) * (Math.random() * 4 + 2),
          vy: Math.sin(angle + Math.PI / 2) * (Math.random() * 4 + 2),
          radius: Math.random() * 12 + 18,
          maxRadius: Math.random() * 35 + 45,
          alpha: 0.7,
          color: initialColors[i % initialColors.length],
          decay: Math.random() * 0.005 + 0.008
        });
      }

      let animationFrameId: number;
      let time = 0;

      const animateFluid = () => {
        ctx.fillStyle = '#020617';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        time += 0.015;

        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.vx += Math.sin(p.y * 0.008 + time * 2) * 0.15;
          p.vy += Math.cos(p.x * 0.008 + time * 2) * 0.15;
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          p.radius += (p.maxRadius - p.radius) * 0.06;
          p.alpha -= p.decay;

          if (p.alpha <= 0.01) {
            particles.splice(i, 1);
            continue;
          }

          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
          grad.addColorStop(0, p.color.replace('ALPHA', p.alpha.toFixed(2)));
          grad.addColorStop(0.3, p.color.replace('ALPHA', (p.alpha * 0.4).toFixed(2)));
          grad.addColorStop(1, 'rgba(2, 6, 23, 0)');

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = grad;
          ctx.fill();
        }

        animationFrameId = requestAnimationFrame(animateFluid);
      };

      animateFluid();

      const handleResize = () => {
        if (canvas) {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        }
      };
      window.addEventListener('resize', handleResize);

      const hideTimeout = setTimeout(() => {
        setIsVisible(false);
      }, 1600);

      return () => {
        cancelAnimationFrame(animationFrameId);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('resize', handleResize);
        clearTimeout(hideTimeout);
      };
    }
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 font-mono select-none"
        >
          {/* Shared Single Canvas for both Preloaders */}
          <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full z-10" />

          {isFirstVisit ? (
            /* =========================================================
               PRELOADER 1: WELCOME OVERLAYS
               ========================================================= */
            <div className="absolute inset-0 w-full h-full flex flex-col items-center justify-center pointer-events-none z-20">
              <div className="relative text-center mt-[160px] space-y-3">
                <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest font-mono border border-slate-900 px-3 py-1 rounded-full bg-slate-950/80 shadow-md">
                  💡 Move cursor to swirl particles
                </span>
                <div className="text-[9px] font-bold text-slate-500 font-mono tracking-widest uppercase">
                  INITIALIZING SECURE PROTOCOL // {progress}%
                </div>
              </div>
            </div>
          ) : (
            /* =========================================================
               PRELOADER 2: REFRESH MONOGRAM OVERLAYS (Behind the fluid swells)
               ========================================================= */
            <div className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none z-0">
              <div className="relative select-none flex flex-col items-center justify-center">
                <span className="font-serif text-[11vw] xs:text-7xl font-extrabold tracking-widest text-slate-800/60 leading-none">
                  B R
                </span>
                <div className="text-[7px] font-mono font-bold tracking-[0.3em] uppercase text-indigo-500/25 mt-3.5">
                  RECONNECTING NODE
                </div>
                <div className="text-[6.5px] font-mono text-slate-650 tracking-widest mt-1.5 opacity-50">
                  💡 Swipe finger/mouse to swirl paint
                </div>
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

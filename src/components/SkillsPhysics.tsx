'use client';

import React, { useEffect, useRef, useState } from 'react';
import { RefreshCw, Play, Pause } from 'lucide-react';

interface SkillBody {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  label: string;
  color: string;
  textColor: string;
  isDragging: boolean;
}

const skillsList = [
  { label: 'Java 21', color: '#f8fafc', text: '#0f172a' },
  { label: 'Spring Boot', color: '#e0f2fe', text: '#0369a1' },
  { label: 'PostgreSQL', color: '#f0fdf4', text: '#15803d' },
  { label: 'Docker', color: '#eff6ff', text: '#1d4ed8' },
  { label: 'REST APIs', color: '#faf5ff', text: '#7e22ce' },
  { label: 'Microservices', color: '#fff1f2', text: '#be123c' },
  { label: 'React.js', color: '#ecfdf5', text: '#047857' },
  { label: 'Next.js', color: '#f8fafc', text: '#0f172a' },
  { label: 'Git', color: '#fdf2f8', text: '#be185d' },
  { label: 'Jackrabbit Oak', color: '#fff7ed', text: '#c2410c' },
  { label: 'Hibernate / JPA', color: '#f5f5f4', text: '#44403c' },
  { label: 'Flyway', color: '#fffbeb', text: '#b45309' },
  { label: 'JUnit 5', color: '#f0fdfa', text: '#0f766e' },
  { label: 'MockUp Logs', color: '#f5f3ff', text: '#6d28d9' }
];

export default function SkillsPhysics() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const bodiesRef = useRef<SkillBody[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, px: 0, py: 0, isDown: false, draggedIndex: -1 });

  // Initialize particles
  const initParticles = (width: number, height: number) => {
    bodiesRef.current = skillsList.map((skill, index) => {
      // Fit radius to text length
      const radius = skill.label.length * 4.5 + 24;
      return {
        x: Math.random() * (width - radius * 2) + radius,
        y: Math.random() * (height / 2 - radius) + radius,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4,
        radius,
        label: skill.label,
        color: skill.color,
        textColor: skill.text,
        isDragging: false
      };
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle resizing
    const resizeCanvas = () => {
      if (containerRef.current && canvasRef.current) {
        const width = containerRef.current.clientWidth;
        const height = 360;
        canvasRef.current.width = width;
        canvasRef.current.height = height;
        if (bodiesRef.current.length === 0) {
          initParticles(width, height);
        }
      }
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    let animationFrameId: number;

    const updatePhysics = () => {
      if (!isPlaying) return;

      const width = canvas.width;
      const height = canvas.height;
      const gravity = 0.25;
      const bounce = 0.55;
      const friction = 0.985;
      const bodies = bodiesRef.current;

      // Update positions & apply gravity
      bodies.forEach((body, idx) => {
        if (body.isDragging) {
          // Dragging updates velocity directly based on cursor path delta
          body.vx = mouseRef.current.x - mouseRef.current.px;
          body.vy = mouseRef.current.y - mouseRef.current.py;
          body.x = mouseRef.current.x;
          body.y = mouseRef.current.y;
        } else {
          body.vy += gravity;
          body.vx *= friction;
          body.vy *= friction;
          body.x += body.vx;
          body.y += body.vy;
        }

        // Boundary Collisions
        // Left
        if (body.x - body.radius < 0) {
          body.x = body.radius;
          body.vx = -body.vx * bounce;
        }
        // Right
        if (body.x + body.radius > width) {
          body.x = width - body.radius;
          body.vx = -body.vx * bounce;
        }
        // Top
        if (body.y - body.radius < 0) {
          body.y = body.radius;
          body.vy = -body.vy * bounce;
        }
        // Bottom
        if (body.y + body.radius > height) {
          body.y = height - body.radius;
          body.vy = -body.vy * bounce;
          // Apply horizontal friction on the floor
          body.vx *= 0.95;
        }
      });

      // Handle Node-to-Node Collisions (Elastic Grid overlap checks)
      for (let i = 0; i < bodies.length; i++) {
        for (let j = i + 1; j < bodies.length; j++) {
          const b1 = bodies[i];
          const b2 = bodies[j];

          const dx = b2.x - b1.x;
          const dy = b2.y - b1.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = b1.radius + b2.radius;

          if (dist < minDist) {
            // Overlap correction
            const overlap = minDist - dist;
            const nx = dx / dist;
            const ny = dy / dist;

            // Push them apart equally
            if (!b1.isDragging) {
              b1.x -= nx * overlap * 0.5;
              b1.y -= ny * overlap * 0.5;
            }
            if (!b2.isDragging) {
              b2.x += nx * overlap * 0.5;
              b2.y += ny * overlap * 0.5;
            }

            // Elastic bounce impulse vector resolution
            const kx = b1.vx - b2.vx;
            const ky = b1.vy - b2.vy;
            const p = 2 * (nx * kx + ny * ky) / 2; // Equal mass assumption

            if (!b1.isDragging) {
              b1.vx -= p * nx * bounce;
              b1.vy -= p * ny * bounce;
            }
            if (!b2.isDragging) {
              b2.vx += p * nx * bounce;
              b2.vy += p * ny * bounce;
            }
          }
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const bodies = bodiesRef.current;

      // Draw bounding box details
      ctx.strokeStyle = 'rgba(148, 163, 184, 0.08)';
      ctx.lineWidth = 1;
      ctx.strokeRect(0, 0, canvas.width, canvas.height);

      bodies.forEach((body) => {
        // Draw card shadow glow
        ctx.shadowColor = 'rgba(0, 0, 0, 0.05)';
        ctx.shadowBlur = 12;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 4;

        // Draw node capsule pill
        ctx.fillStyle = body.color;
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
        ctx.fill();

        // Reset shadow
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        // Draw subtle pill border
        ctx.strokeStyle = 'rgba(226, 232, 240, 0.9)'; // light border
        ctx.lineWidth = 1.5;
        // Check dark mode
        if (document.documentElement.classList.contains('dark')) {
          ctx.strokeStyle = 'rgba(30, 41, 59, 0.8)';
          ctx.fillStyle = '#0f172a'; // Force dark container fill
        }
        ctx.beginPath();
        ctx.arc(body.x, body.y, body.radius, 0, Math.PI * 2);
        ctx.stroke();

        // Render skill text
        ctx.fillStyle = body.textColor;
        if (document.documentElement.classList.contains('dark')) {
          ctx.fillStyle = '#f8fafc'; // White label in dark mode
        }
        ctx.font = 'bold 11px var(--font-mono), monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(body.label, body.x, body.y);
      });
    };

    const loop = () => {
      updatePhysics();
      draw();

      // Record previous mouse coordinates
      mouseRef.current.px = mouseRef.current.x;
      mouseRef.current.py = mouseRef.current.y;

      animationFrameId = requestAnimationFrame(loop);
    };

    loop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  // Mouse / Touch event handlers
  const getMouseCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    
    // Check if TouchEvent or MouseEvent
    if ('touches' in e) {
      if (e.touches.length === 0) return { x: 0, y: 0 };
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    } else {
      return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    }
  };

  const handleStart = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getMouseCoords(e);
    mouseRef.current.isDown = true;
    mouseRef.current.x = coords.x;
    mouseRef.current.y = coords.y;
    mouseRef.current.px = coords.x;
    mouseRef.current.py = coords.y;

    // Detect if we hit any node
    const bodies = bodiesRef.current;
    let hitIndex = -1;
    for (let i = 0; i < bodies.length; i++) {
      const b = bodies[i];
      const dx = coords.x - b.x;
      const dy = coords.y - b.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < b.radius) {
        hitIndex = i;
        break;
      }
    }

    if (hitIndex !== -1) {
      mouseRef.current.draggedIndex = hitIndex;
      bodies[hitIndex].isDragging = true;
    }
  };

  const handleMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const coords = getMouseCoords(e);
    mouseRef.current.x = coords.x;
    mouseRef.current.y = coords.y;

    const dragIdx = mouseRef.current.draggedIndex;
    if (dragIdx !== -1 && bodiesRef.current[dragIdx]) {
      bodiesRef.current[dragIdx].x = coords.x;
      bodiesRef.current[dragIdx].y = coords.y;
    }
  };

  const handleEnd = () => {
    mouseRef.current.isDown = false;
    const dragIdx = mouseRef.current.draggedIndex;
    if (dragIdx !== -1 && bodiesRef.current[dragIdx]) {
      bodiesRef.current[dragIdx].isDragging = false;
    }
    mouseRef.current.draggedIndex = -1;
  };

  const resetSandbox = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      initParticles(canvas.width, canvas.height);
    }
  };

  return (
    <div ref={containerRef} className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-205 dark:border-slate-850 p-4 shadow-sm flex flex-col relative group overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800/80 pb-3 mb-3 select-none">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            Skills Gravity Sandbox
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
          >
            {isPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
          </button>
          <button
            onClick={resetSandbox}
            className="p-1.5 rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-500 dark:text-slate-400 hover:text-slate-800 transition-colors cursor-pointer"
            aria-label="Reset simulation"
          >
            <RefreshCw className="h-3 w-3" />
          </button>
        </div>
      </div>

      <div className="w-full relative h-[360px] cursor-grab active:cursor-grabbing select-none rounded-2xl overflow-hidden bg-slate-50/40 dark:bg-slate-950/40">
        <canvas
          ref={canvasRef}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
          className="absolute inset-0 block w-full h-full"
        />
      </div>
    </div>
  );
}

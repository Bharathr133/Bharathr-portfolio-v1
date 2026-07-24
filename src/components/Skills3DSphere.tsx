'use client';

import React, { useEffect, useRef, useState } from 'react';

interface Tag3D {
  text: string;
  x: number;
  y: number;
  z: number;
  projectedX: number;
  projectedY: number;
  scale: number;
  opacity: number;
}

const skillsList = [
  'Java 21', 'Spring Boot', 'PostgreSQL', 'Docker', 'REST APIs',
  'Microservices', 'React.js', 'Next.js', 'Git', 'Jackrabbit Oak',
  'Hibernate', 'Flyway', 'JUnit 5', 'TailwindCSS', 'Spring MVC',
  'Spring Cloud', 'Spring Security', 'JWT Auth', 'WebSockets'
];

export default function Skills3DSphere() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tags, setTags] = useState<Tag3D[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const rotationSpeedRef = useRef({ x: 0.005, y: 0.005 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const count = skillsList.length;
    const radius = 135;

    // Distribute tags uniformly on a sphere using Fibonacci lattice
    const initialTags: Tag3D[] = skillsList.map((text, i) => {
      const theta = Math.acos(-1 + (2 * i) / count);
      const phi = Math.sqrt(count * Math.PI) * theta;

      return {
        text,
        x: radius * Math.sin(theta) * Math.cos(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(theta),
        projectedX: 0,
        projectedY: 0,
        scale: 1,
        opacity: 1
      };
    });

    let animationFrameId: number;

    const rotateTags = () => {
      const rx = rotationSpeedRef.current.x;
      const ry = rotationSpeedRef.current.y;
      
      const cosX = Math.cos(rx);
      const sinX = Math.sin(rx);
      const cosY = Math.cos(ry);
      const sinY = Math.sin(ry);

      initialTags.forEach((tag) => {
        // Rotate around X axis
        const y1 = tag.y * cosX - tag.z * sinX;
        const z1 = tag.y * sinX + tag.z * cosX;

        // Rotate around Y axis
        const x2 = tag.x * cosY - z1 * sinY;
        const z2 = tag.x * sinY + z1 * cosY;

        tag.x = x2;
        tag.y = y1;
        tag.z = z2;

        // Perspective projection formula
        const depth = 220; // focal length
        const scale = depth / (depth + z2);
        tag.scale = scale;
        tag.opacity = (z2 + radius) / (2 * radius) * 0.75 + 0.25;

        // Projected 2D coordinates on our 320x320 viewport
        tag.projectedX = x2 * scale + 160;
        tag.projectedY = y1 * scale + 160;
      });

      // Depth sort to render front tags on top of back tags
      const sorted = [...initialTags].sort((a, b) => b.z - a.z);
      setTags(sorted);

      animationFrameId = requestAnimationFrame(rotateTags);
    };

    rotateTags();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Update speed based on mouse movement relative to the widget center
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const xDiff = e.clientX - centerX;
    const yDiff = e.clientY - centerY;

    // Direct proportional speed adjust
    rotationSpeedRef.current.y = xDiff * 0.0001;
    rotationSpeedRef.current.x = -yDiff * 0.0001;
  };

  const handleMouseLeave = () => {
    // Reset to soft default drift speed
    rotationSpeedRef.current = { x: 0.004, y: 0.004 };
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-205 dark:border-slate-850 p-4 shadow-sm flex flex-col items-center relative group overflow-hidden select-none"
    >
      <div className="w-full flex items-center justify-between border-b border-slate-105 dark:border-slate-800/80 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-indigo-650 animate-pulse" />
          <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
            Skills 3D Orbit Cloud
          </span>
        </div>
        <span className="text-[8px] font-mono bg-slate-50 dark:bg-slate-950 px-2 py-0.5 rounded-full border border-slate-200 dark:border-slate-800 text-slate-500">
          DRAG MOUSE TO ROTATE
        </span>
      </div>

      <div className="relative h-[320px] w-[320px] flex items-center justify-center">
        <svg className="w-full h-full" viewBox="0 0 320 320">
          {tags.map((tag, idx) => {
            const size = tag.scale * 13;
            const isDark = typeof document !== 'undefined' && document.documentElement.classList.contains('dark');
            
            // Front tags look sharp and solid, back tags look faded and tiny
            const color = tag.z > 0
              ? 'fill-indigo-600 dark:fill-indigo-400 font-bold'
              : 'fill-slate-450 dark:fill-slate-500 font-medium';

            return (
              <text
                key={idx}
                x={tag.projectedX}
                y={tag.projectedY}
                textAnchor="middle"
                alignmentBaseline="middle"
                className={`font-mono transition-all duration-75 uppercase tracking-wide ${color}`}
                style={{
                  fontSize: `${size}px`,
                  opacity: tag.opacity,
                  filter: tag.z < -40 ? 'blur(0.5px)' : 'none',
                }}
              >
                {tag.text}
              </text>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

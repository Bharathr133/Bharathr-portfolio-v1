'use client';

import React from 'react';
import Image from 'next/image';

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  iconKey: string;
}

export default function TechIcon({ iconKey, className, ...props }: TechIconProps) {
  const commonProps = {
    className,
    ...props
  };

  const key = iconKey.toLowerCase();

  // Slugs supported by skillicons.dev
  const skillIconsSlugs: Record<string, string> = {
    'java': 'java',
    'springboot': 'spring',
    'springcloud': 'spring',
    'react': 'react',
    'tailwind': 'tailwind',
    'javascript': 'js',
    'html5': 'html',
    'css3': 'css',
    'nextjs': 'nextjs',
    'postgresql': 'postgres',
    'postgres': 'postgres',
    'mysql': 'mysql',
    'docker': 'docker',
    'git': 'git',
    'github': 'github',
    'postman': 'postman',
    'vercel': 'vercel',
    'railway': 'railway',
    'hibernate': 'hibernate',
    'flyway': 'flyway',
    'axios': 'axios',
    'prompt': 'bots'
  };

  if (skillIconsSlugs[key]) {
    const slug = skillIconsSlugs[key];
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${className || ''}`}>
        <Image
          src={`https://skillicons.dev/icons?i=${slug}`}
          alt={iconKey}
          fill
          sizes="32px"
          unoptimized
          className="object-contain"
        />
      </div>
    );
  }

  // Fallbacks for custom elements not supported by skillicons
  switch (key) {
    case 'microservices':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <rect x="3" y="3" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc" />
          <rect x="15" y="3" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc" />
          <rect x="9" y="15" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc" />
          <path d="M9 6h6M6 9v6M18 9v6" stroke="#0052cc" strokeWidth="2" />
        </svg>
      );
    case 'jackrabbit':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#e36209" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <path d="M12 22a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
          <path d="M12 6V2m0 4c-1 0-2-1-2-2m2 2c1 0 2-1 2-2" />
          <path d="M9 14h6m-3-3v6" />
        </svg>
      );
    case 'openpdf':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#f25f22" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M9 15h3a1.5 1.5 0 0 0 0-3H9v6M15 12h-3v6h3" />
        </svg>
      );
    case 'resilience4j':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      );
    case 'recharts':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="#24b6e5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00758F" />
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#00758F" />
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" stroke="#00758F" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <circle cx="12" cy="12" r="10" />
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
          <line x1="12" y1="17" x2="12.01" y2="17" />
        </svg>
      );
  }
}

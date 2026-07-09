import React from 'react';

interface TechIconProps extends React.SVGProps<SVGSVGElement> {
  iconKey: string;
}

export default function TechIcon({ iconKey, className, ...props }: TechIconProps) {
  const commonProps = {
    className,
    ...props
  };

  switch (iconKey.toLowerCase()) {
    case 'java':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M19.78 12.87c.07.3-.01.59-.22.8-.2.21-.49.31-.79.27-1.39-.18-2.61-.71-3.66-1.58-.29-.24-.46-.57-.46-.94 0-.32.12-.62.33-.86.21-.24.51-.38.83-.39 1.48-.03 2.87.5 3.97 1.7.2.22.25.53.22.8c-.03.27-.19.5-.43.63-.25.13-.56.12-.8-.03a4.02 4.02 0 0 0-3.32-.9c-.19.04-.37.15-.49.32-.12.17-.16.38-.11.58.05.2.18.37.36.47.88.5 1.88.75 2.9.75.64 0 1.28-.1 1.9-.3.26-.08.55-.04.77.11.23.16.36.42.36.7 0 .28-.13.54-.36.7zm-4.9-5.18c0 .28-.13.54-.36.7-.22.16-.51.2-.77.12-1.02-.3-2.02-.55-3.04-.75-.2-.05-.37-.18-.47-.36-.1-.18-.12-.39-.05-.59.07-.2.22-.35.42-.4.76-.2 1.54-.33 2.33-.4.21-.02.42.04.59.17.17.13.27.32.27.54v1.97zm-5.07 9.4c0 .28-.13.54-.36.7-.22.16-.51.2-.77.12-1.63-.48-3.15-1.25-4.48-2.27-.2-.16-.31-.4-.31-.66 0-.26.11-.5.31-.66 1.33-1.02 2.85-1.79 4.48-2.27.26-.08.55-.04.77.12.23.16.36.42.36.7v4.32z" fill="#007396"/>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.35 15.54c-.75.76-1.74 1.29-2.82 1.51-1.08.22-2.2.09-3.2-.37-.88-.41-1.63-1.06-2.18-1.89-.55-.83-.84-1.8-.84-2.79 0-.99.29-1.96.84-2.79.55-.83 1.3-1.48 2.18-1.89 1-.46 2.12-.59 3.2-.37 1.08.22 2.07.75 2.82 1.51.68.68 1.14 1.56 1.32 2.51.18.95.07 1.93-.32 2.82-.39.89-1.06 1.62-1.89 2.12-.83.5-1.8.72-2.79.62z" fill="#F89820"/>
        </svg>
      );
    case 'springboot':
    case 'springcloud':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.72 13.9c-.31.39-.77.62-1.27.65-1.5.09-2.94-.48-3.95-1.5-.24-.24-.46-.57-.46-.94 0-.32.12-.62.33-.86.21-.24.51-.38.83-.39 1.48-.03 2.87.5 3.97 1.7.2.22.25.53.22.8-.03.27-.19.5-.43.63-.25.13-.56.12-.8-.03a4.02 4.02 0 0 0-3.32-.9c-.19.04-.37.15-.49.32-.12.17-.16.38-.11.58.05.2.18.37.36.47 1.25.7 2.7 1 4.12.87.51-.05.99-.28 1.33-.65.34-.37.51-.87.48-1.38-.03-.51-.25-.99-.62-1.33s-.87-.51-1.38-.48c-.51.03-.99.25-1.33.62L12.44 13c-.22.22-.51.34-.82.34s-.6-.12-.82-.34c-.22-.22-.34-.51-.34-.82s.12-.6.34-.82l2.67-2.67c.36-.36.56-.86.53-1.37a1.95 1.95 0 0 0-1.95-1.92c-.51-.01-1 .18-1.37.53L8.98 8.44C8.76 8.66 8.47 8.78 8.16 8.78s-.6-.12-.82-.34c-.22-.22-.34-.51-.34-.82s.12-.6.34-.82l2.49-2.49c.75-.75 1.77-1.15 2.82-1.12a3.95 3.95 0 0 1 3.84 3.95c.02 1.05-.36 2.07-1.07 2.82L12.94 12c.51.51 1.2.78 1.92.75.72-.03 1.39-.36 1.86-.92.47-.56.7-1.28.65-2-.05-.72-.41-1.37-1-1.8a4.95 4.95 0 0 0-5.88 0c-.59.43-.95 1.08-1 1.8-.05.72.18 1.44.65 2 .47.56 1.14.89 1.86.92.72.03 1.41-.24 1.92-.75l1.9-1.9c.22-.22.51-.34.82-.34s.6.12.82.34c.22.22.34.51.34.82s-.12.6-.34.82l-1.9 1.9c-.31.39-.77.62-1.27.65-1.5.09-2.94-.48-3.95-1.5z" fill="#6DB33F"/>
        </svg>
      );
    case 'react':
      return (
        <svg viewBox="-11.5 -10.23174 23 20.46348" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <circle cx="0" cy="0" r="2.05" fill="#61dafb"/>
          <g stroke="#61dafb" strokeWidth="1" fill="none">
            <ellipse rx="11" ry="4.2"/>
            <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
            <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
          </g>
        </svg>
      );
    case 'tailwind':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.63 1.17 1.18 2.53 2.57 5.51 2.57 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.63-1.17-1.18-2.53-2.57-5.51-2.57zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.91.23 1.57.9 2.29 1.63 1.17 1.18 2.53 2.57 5.51 2.57 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.91-.23-1.57-.9-2.29-1.63-1.17-1.18-2.53-2.57-5.51-2.57z" fill="#38BDF8"/>
        </svg>
      );
    case 'javascript':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M0 0h24v24H0V0z" fill="#f7df1e"/>
          <path d="M22 17.524c0 1.21-.496 2.443-1.78 3.226-1.112.702-2.903 1.09-4.28 1.09a7.35 7.35 0 0 1-5.15-1.737c-.322-.29-.168-.838.258-.838.226 0 .445.097.6.27.91.954 2.6 1.458 4.237 1.458 1.82 0 3.322-.729 3.322-2.21 0-1.403-.98-1.922-3.142-2.858-2.677-1.148-4.47-2.193-4.47-5.064 0-2.316 1.748-4.206 4.703-4.206 1.568 0 2.923.477 3.73 1.09.284.213.16.664-.194.664a.59.59 0 0 1-.368-.13c-.664-.477-1.845-.884-3.155-.884-1.87 0-2.89 1.039-2.89 2.258 0 1.29.832 1.82 2.955 2.723 2.935 1.245 4.677 2.193 4.677 5.155zM10.155 6.78v11.78c0 .284-.136.55-.368.71l-2.02 1.393c-.31.213-.736-.006-.736-.387V6.78c0-.322.258-.58.58-.58h2.02c.284 0 .58.258.58.58z" fill="#000000"/>
        </svg>
      );
    case 'html5':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M1.5 0h21l-1.9 21.2-8.6 2.8-8.6-2.8L1.5 0zm10.5 3v3.3h5.2l-.2 2.2h-5V11.8h4.8l-.5 4.9-4.3 1.2v-3.2l2.2-.6.2-2.3H12V3z" fill="#E34F26"/>
        </svg>
      );
    case 'css3':
      return (
        <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M1.5 0h21l-1.9 21.2-8.6 2.8-8.6-2.8L1.5 0zm6.9 8.2l-.2-2.2H12V3H5.2l.6 6.3h6.2V6.2H8.4zm3.6 3.6H6.1l.6 6.2 5.3 1.5v-3.3l-2.7-.8-.2-2.3h2.9v-1.3z" fill="#1572B6"/>
        </svg>
      );
    case 'microservices':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <rect x="3" y="3" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc"/>
          <rect x="15" y="3" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc"/>
          <rect x="9" y="15" width="6" height="6" rx="1" fill="#0052cc" stroke="#0052cc"/>
          <path d="M9 6h6M6 9v6M18 9v6" stroke="#0052cc" strokeWidth="2"/>
        </svg>
      );
    case 'hibernate':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <path d="M12 2L2 7l10 5 10-5-10-5z" fill="#59666c" stroke="#59666c"/>
          <path d="M2 17l10 5 10-5" stroke="#59666c"/>
          <path d="M2 12l10 5 10-5" stroke="#59666c"/>
        </svg>
      );
    case 'mysql':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M4 6v4c0 2.2 3.6 4 8 4s8-1.8 8-4V6" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 10v4c0 2.2 3.6 4 8 4s8-1.8 8-4v-4" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4 14v4c0 2.2 3.6 4 8 4s8-1.8 8-4v-4" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <ellipse cx="12" cy="6" rx="8" ry="4" stroke="#00758F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case 'docker':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M3 13.5h2.25v2.25H3V13.5zm3.75-3.75H9v2.25H6.75V9.75zm3.75 0H12.75v2.25H10.5V9.75zm3.75 0H16.5v2.25H14.25V9.75zm3.75 3.75H20.25v2.25H18V13.5zm-11.25 0H9v2.25H6.75V13.5zm3.75 0H12.75v2.25H10.5V13.5zm3.75 0H16.5v2.25H14.25V13.5zm3.75-7.5H16.5v2.25H14.25V6H18V2H6v4h3.75V6H10.5z" fill="#2496ED"/>
          <path d="M2 18h20v2H2v-2z" fill="#2496ED"/>
        </svg>
      );
    case 'cicd':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <circle cx="12" cy="12" r="10" stroke="#10b981"/>
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke="#10b981"/>
          <path d="M2 12h20" stroke="#10b981"/>
        </svg>
      );
    case 'git':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M21.9 11.5L12.5 2.1c-.4-.4-1-.4-1.4 0L9.7 3.5l3.2 3.2c.3-.1.7-.1 1-.1.8 0 1.6.5 1.9 1.2.4.8.2 1.8-.4 2.4-.6.6-1.6.8-2.4.4-.7-.3-1.2-1.1-1.2-1.9 0-.3.1-.7.2-1L8.9 4.6 2.1 11.4c-.4.4-.4 1 0 1.4l9.4 9.4c.4.4 1 .4 1.4 0l9-9c.4-.4.4-1 0-1.7zm-9.3 5.4c-.5.5-1.3.5-1.8 0s-.5-1.3 0-1.8c.5-.5 1.3-.5 1.8 0s.5 1.3 0 1.8z" fill="#F05032"/>
        </svg>
      );
    case 'postman':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M21.4 10.3c-.6-.7-1.5-1-2.4-1-1 0-1.8.4-2.4 1L12 14.8l-4.6-4.6c-.6-.6-1.5-1-2.4-1-.9 0-1.8.4-2.4 1C1.3 12 1 13.5 1.8 15c.7 1.5 2.2 2.5 3.8 2.5.9 0 1.8-.4 2.4-1L12 12.8l4.6 4.6c.6.6 1.5 1 2.4 1 1.6 0 3.1-1 3.8-2.5.8-1.5.5-3-.8-4.8z" fill="#FF6C37"/>
          <circle cx="12" cy="7" r="3" fill="#FF6C37"/>
        </svg>
      );
    case 'prompt':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#8b5cf6"/>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#8b5cf6"/>
          <line x1="12" y1="22.08" x2="12" y2="12" stroke="#8b5cf6"/>
        </svg>
      );
    case 'nextjs':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 14.5h-2v-9h2v9zm3 0h-2V10h2v6.5z" />
        </svg>
      );
    case 'postgresql':
    case 'postgres':
      return (
        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm3.3 11c-1.32.78-3 1.15-4.5 1.15s-2.9-.37-4.22-1.15c-.44-.26-.44-.84 0-1.1 1.32-.78 3-1.15 4.5-1.15s2.9.37 4.22 1.15c.44.26.44.84 0 1.1z" fill="#336791"/>
          <path d="M12 5.5a6.5 6.5 0 0 0-6.5 6.5c0 1.9 1 3.5 2.5 4.4a6.5 6.5 0 0 0 8 0c1.5-.9 2.5-2.5 2.5-4.4a6.5 6.5 0 0 0-6.5-6.5z" stroke="#336791" strokeWidth="2"/>
        </svg>
      );
    case 'sql':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <ellipse cx="12" cy="5" rx="9" ry="3" stroke="#00758F"/>
          <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" stroke="#00758F"/>
          <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" stroke="#00758F"/>
        </svg>
      );
    case 'railway':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14H8v-2h5v2zm3-4H8v-2h8v2zm-3-4H8V6h5v2z" />
        </svg>
      );
    case 'vercel':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M24 22.5H0L12 1.5L24 22.5Z" />
        </svg>
      );
    case 'netlify':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 2L2 12h5v10h10V12h5L12 2z" />
        </svg>
      );
    case 'neon':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" {...commonProps}>
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#00E599" fill="#00E599"/>
        </svg>
      );
    case 'github':
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg" {...commonProps}>
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12z" />
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

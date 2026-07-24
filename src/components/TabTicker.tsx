'use client';

import { useEffect } from 'react';

// Unique away messages that cycle while tab is hidden
const awayMessages = [
  '[ IDLE ] awaiting_input...',
  '[ WAIT ] come_back.exe',
  '[ PING ] you_there?',
  '[ ... ] recruiting.bat',
  '[ RUN ] hire_bharath.sh',
  '[ DEV ] still_open_to_work',
  '[ SYS ] dont_close_me.js',
];

export default function TabTicker() {
  useEffect(() => {
    const originalTitle = document.title || 'Bharath R | Portfolio';
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let msgIndex = 0;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        // Start cycling messages every 2s
        document.title = awayMessages[0];
        msgIndex = 1;
        intervalId = setInterval(() => {
          document.title = awayMessages[msgIndex % awayMessages.length];
          msgIndex++;
        }, 2000);
      } else {
        // Clear interval and restore title
        if (intervalId) {
          clearInterval(intervalId);
          intervalId = null;
        }
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (intervalId) clearInterval(intervalId);
    };
  }, []);

  return null;
}

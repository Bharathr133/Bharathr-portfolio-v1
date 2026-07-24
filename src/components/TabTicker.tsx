'use client';

import { useEffect } from 'react';

export default function TabTicker() {
  useEffect(() => {
    const originalTitle = document.title || 'Bharath R | Portfolio';
    
    const handleVisibilityChange = () => {
      if (document.hidden) {
        document.title = '⚠️ system_paused.log';
      } else {
        document.title = originalTitle;
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return null;
}

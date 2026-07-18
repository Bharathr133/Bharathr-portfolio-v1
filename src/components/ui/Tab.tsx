// src/components/ui/Tab.tsx

'use client';

import { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
}

interface TabProps {
  items: TabItem[];
  defaultActive?: string;
  onChange?: (id: string) => void;
  className?: string;
}

export const Tab = ({ items, defaultActive, onChange, className = '' }: TabProps) => {
  const [active, setActive] = useState(defaultActive ?? items[0].id);

  const handleClick = (id: string) => {
    setActive(id);
    onChange?.(id);
  };

  return (
    <div className={`flex space-x-2 ${className}`} role="tablist">
      {items.map((item) => (
        <button
          key={item.id}
          role="tab"
          aria-selected={active === item.id}
          onClick={() => handleClick(item.id)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary ${
            active === item.id
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground hover:bg-muted/70'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

// src/components/ui/Modal.tsx

'use client';

import { ReactNode, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

export const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-3xl bg-surface rounded-xl p-6 shadow-2xl animate-ambient-glow">
        {title && <h2 className="text-2xl font-display mb-4">{title}</h2>}
        <button
          className="absolute top-4 right-4 text-muted-foreground hover:text-primary"
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

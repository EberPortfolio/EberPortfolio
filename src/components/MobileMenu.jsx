import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NAV_LINKS } from './Navbar';
import { EBER_PROFILE, fullName } from '../data/profile';
import { lockScroll } from '../lib/smoothScroll';

export const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  // Close with Escape and freeze the page while open
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const unlock = lockScroll();
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      unlock();
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-50 md:hidden flex flex-col bg-zinc-50 text-zinc-950 dark:bg-zinc-950 dark:text-white"
        >
          <div className="px-5 h-16 flex items-center justify-between">
            <span className="text-[13px] font-medium uppercase">{fullName}</span>
            <button type="button" onClick={onClose} className="text-[13px] font-medium uppercase cursor-pointer">
              Cerrar
            </button>
          </div>

          <nav aria-label="Principal" className="flex-1 px-5 flex flex-col justify-center">
            {NAV_LINKS.map((link, idx) => (
              <span key={link.id} className="block overflow-hidden border-t border-zinc-200 dark:border-zinc-800 last:border-b">
                <motion.button
                  type="button"
                  onClick={() => {
                    onClose();
                    onNavigate(link.id);
                  }}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.7, delay: 0.25 + idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="w-full flex items-baseline justify-between py-4 text-left text-5xl font-semibold uppercase tracking-[-0.04em] cursor-pointer"
                >
                  {link.label}
                  <span className="text-sm font-medium tabular-nums">0{idx + 1}</span>
                </motion.button>
              </span>
            ))}
          </nav>

          <div className="px-5 py-6">
            <a href={`mailto:${EBER_PROFILE.email}`} className="text-[13px] font-medium uppercase">
              {EBER_PROFILE.email}
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

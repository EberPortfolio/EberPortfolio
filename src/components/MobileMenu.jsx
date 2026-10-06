import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowUpRight } from 'lucide-react';
import { EBER_PROFILE } from '../data/profile';

export const MobileMenu = ({ isOpen, onClose, onNavigate }) => {
  const menuLinks = [
    { id: 'work', label: 'Work' },
    { id: 'eber-art', label: 'Eber Art', isArt: true },
    { id: 'about-me', label: 'About me' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-zinc-950/95 backdrop-blur-2xl text-zinc-100 flex flex-col justify-between p-6 md:hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
              Eber · Menú
            </span>
            <button
              onClick={onClose}
              aria-label="Cerrar menú"
              className="p-2.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="my-auto py-8 space-y-6">
            {menuLinks.map((link, idx) => (
              <motion.button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  onClose();
                }}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: idx * 0.08 }}
                className="w-full text-left group flex items-center justify-between text-2xl font-light tracking-tight text-zinc-300 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-500">0{idx + 1}</span>
                  {link.label}
                </span>
                <ArrowUpRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
              </motion.button>
            ))}
          </div>

          {/* Footer Info */}
          <div className="border-t border-zinc-800 pt-6 space-y-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>{EBER_PROFILE.availability}</span>
            </div>
            <p className="text-zinc-500">{EBER_PROFILE.email}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

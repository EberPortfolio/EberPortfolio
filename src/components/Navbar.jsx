import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { RollText } from './RollText';
import { containerClass } from './SectionHeader';
import { fullName } from '../data/profile';

export const NAV_LINKS = [
  { id: 'work', label: 'Trabajos' },
  { id: 'eber-art', label: 'Eber Art' },
  { id: 'about-me', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' }
];

const itemClass = 'group text-[13px] font-medium uppercase tracking-[0.02em] text-zinc-950 dark:text-white cursor-pointer';

export const Navbar = ({ onOpenMobileMenu, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-500 border-b ${
        scrolled
          ? 'bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-zinc-200 dark:border-zinc-900'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className={`${containerClass} h-16 flex items-center justify-between gap-6`}>
        <div className="flex items-center gap-10">
          <button type="button" onClick={() => onNavigate('home')} className={itemClass}>
            <RollText>{fullName}</RollText>
          </button>
          <span className="hidden lg:inline-flex items-center gap-2 text-[13px] font-medium uppercase tracking-[0.02em] text-zinc-950 dark:text-white">
            <span className="relative flex w-2 h-2">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60 motion-reduce:animate-none" />
              <span className="relative w-2 h-2 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </span>
        </div>

        <div className="flex items-center gap-7">
          <nav aria-label="Principal" className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <button key={link.id} type="button" onClick={() => onNavigate(link.id)} className={itemClass}>
                <RollText>{link.label}</RollText>
              </button>
            ))}
          </nav>

          <ThemeToggle />

          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden text-[13px] font-medium uppercase tracking-[0.02em] text-zinc-950 dark:text-white cursor-pointer"
          >
            Menú
          </button>
        </div>
      </div>
    </motion.header>
  );
};

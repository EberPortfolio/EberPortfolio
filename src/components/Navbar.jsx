import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ThemeToggle } from './ThemeToggle';
import { RollText } from './RollText';
import { containerClass } from './SectionHeader';
import { EBER_PROFILE } from '../data/profile';

export const NAV_LINKS = [
  { id: 'work', label: 'Trabajos' },
  { id: 'eber-art', label: 'Eber Art' },
  { id: 'about-me', label: 'Sobre mí' },
  { id: 'contact', label: 'Contacto' }
];

const itemClass = 'group text-sm font-medium text-zinc-950 dark:text-white cursor-pointer';

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
      <div className={`${containerClass} relative h-16 flex items-center justify-between`}>
        {/* Izquierda: Links de navegación (Desktop) o Estado de Disponibilidad (Mobile) */}
        <div className="flex items-center gap-6">
          <nav aria-label="Navegación izquierda" className="hidden md:flex items-center gap-6">
            {NAV_LINKS.slice(0, 3).map((link) => (
              <button key={link.id} type="button" onClick={() => onNavigate(link.id)} className={itemClass}>
                <RollText>{link.label}</RollText>
              </button>
            ))}
          </nav>
          
          <div className="flex md:hidden items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            <span className="hidden sm:inline">Disponible</span>
          </div>
        </div>

        {/* Centro exacto: Monograma / Nombre de autor centrado */}
        <button
          type="button"
          onClick={() => onNavigate('home')}
          className="absolute left-1/2 -translate-x-1/2 text-base sm:text-lg font-black tracking-[-0.04em] uppercase text-zinc-950 dark:text-white cursor-pointer hover:opacity-80 transition-opacity"
        >
          {EBER_PROFILE.name || 'EBER'}
        </button>

        {/* Derecha: Contacto, Disponibilidad y ThemeToggle */}
        <div className="flex items-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`hidden md:inline-flex ${itemClass}`}
          >
            <RollText>Contacto</RollText>
          </button>

          <span className="hidden lg:inline-flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 border-l border-zinc-200 dark:border-zinc-800 pl-4">
            <span className="relative flex w-1.5 h-1.5">
              <span className="absolute inset-0 rounded-full bg-emerald-500 animate-ping opacity-60 motion-reduce:animate-none" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </span>
            Disponible
          </span>

          <ThemeToggle />

          <button
            type="button"
            onClick={onOpenMobileMenu}
            className="md:hidden text-xs font-mono uppercase tracking-wider text-zinc-950 dark:text-white cursor-pointer px-2 py-1"
          >
            Menú
          </button>
        </div>
      </div>
    </motion.header>
  );
};

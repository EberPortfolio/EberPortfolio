import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu } from 'lucide-react';

export const Navbar = ({ onOpenMobileMenu, onNavigate, cursorHandlers }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const leftNavLinks = [
    { id: 'work', label: 'WORK' },
    { id: 'eber-art', label: 'EBER ART', isArt: true }
  ];

  const rightNavLinks = [
    { id: 'about-me', label: 'ABOUT ME' },
    { id: 'contact', label: 'CONTACT' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'py-4 glass-header navbar-scrolled-bg border-b border-zinc-300/60 dark:border-zinc-800/60 shadow-xs' 
        : 'py-8 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 flex items-center justify-between relative">
        
        {/* Mobile Left Trigger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={onOpenMobileMenu}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className="p-1 text-zinc-950 dark:text-white"
            aria-label="Abrir Menú"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Left Desktop Nav Links (WORK, EBER ART) */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest font-medium w-1/3">
          {leftNavLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              onMouseEnter={cursorHandlers?.onButtonHover}
              onMouseLeave={cursorHandlers?.onHoverLeave}
              className="relative py-1 hover:text-zinc-500 transition-colors group flex items-center gap-1.5 cursor-pointer text-left font-semibold"
            >
              <span>{link.label}</span>
              {link.isArt && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" title="Proyectos de Autor" />
              )}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-950 dark:bg-white transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Center Prominent Brand Statement: EBER */}
        <div className="flex-1 md:w-1/3 text-center">
          <button
            onClick={() => onNavigate('home')}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className="inline-block group cursor-pointer"
          >
            <span className="font-sans font-light text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] uppercase text-zinc-950 dark:text-white transition-transform group-hover:scale-105 inline-block">
              EBER
            </span>
          </button>
        </div>

        {/* Right Desktop Nav Links (ABOUT ME, CONTACT) + Theme Toggle */}
        <div className="flex items-center justify-end gap-8 w-auto md:w-1/3">
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono uppercase tracking-widest font-medium">
            {rightNavLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className="relative py-1 hover:text-zinc-500 transition-colors group cursor-pointer text-left font-semibold"
              >
                <span>{link.label}</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-zinc-950 dark:bg-white transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <ThemeToggle />
        </div>

      </div>
    </header>
  );
};

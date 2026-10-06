import React, { useState, useEffect } from 'react';
import { EBER_PROFILE } from '../data/profile';
import { ArrowUp } from 'lucide-react';

export const Footer = ({ onNavigate, cursorHandlers }) => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const options = {
        timeZone: 'America/Argentina/Buenos_Aires',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };
      setTime(new Date().toLocaleTimeString('es-AR', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-500">
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Brand & Time */}
        <div className="flex flex-wrap items-center gap-6 text-center md:text-left">
          <span className="font-semibold text-zinc-950 dark:text-white uppercase tracking-wider">
            EBER © 2026
          </span>
          <div className="flex items-center gap-2 text-zinc-500 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span>BUENOS AIRES {time} (UTC-3)</span>
          </div>
        </div>

        {/* Center: Social Links */}
        <div className="flex items-center gap-6">
          {EBER_PROFILE.social.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={cursorHandlers?.onButtonHover}
              onMouseLeave={cursorHandlers?.onHoverLeave}
              className="hover:text-zinc-950 dark:hover:text-white transition-colors uppercase tracking-wider font-medium"
            >
              {s.name}
            </a>
          ))}
        </div>

        {/* Right: Back to Top */}
        <button
          onClick={() => onNavigate('home')}
          onMouseEnter={cursorHandlers?.onButtonHover}
          onMouseLeave={cursorHandlers?.onHoverLeave}
          className="flex items-center gap-2 p-2 px-3 rounded-full border border-zinc-300 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-500 transition-all font-medium cursor-pointer"
        >
          <span>VOLVER ARRIBA</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>

      </div>

    </footer>
  );
};

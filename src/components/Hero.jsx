import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { EBER_PROFILE } from '../data/profile';
import { ArrowDownRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const Hero = ({ onNavigate, cursorHandlers }) => {
  const { currentAccentObj } = useTheme();
  const [heroFont, setHeroFont] = useState('sans');

  return (
    <section id="home" className="relative min-h-[88vh] flex flex-col justify-between pt-32 pb-16 px-6 sm:px-8 lg:px-12 max-w-7xl mx-auto overflow-hidden">
      
      {/* Top Bar: Location & Clean Single-Line Font Specimen Switcher */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-300 dark:border-zinc-800 pb-6"
      >
        <div className="flex items-center gap-2 font-mono text-xs text-zinc-700 dark:text-zinc-300 uppercase tracking-widest font-medium">
          <span 
            className="w-2 h-2"
            style={{ backgroundColor: currentAccentObj.hex }} 
          />
          <span>{EBER_PROFILE.location}</span>
        </div>

        {/* Clean Single-Row Font Style Selector */}
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-zinc-500 uppercase tracking-widest font-medium hidden sm:inline">
            ESTILO TIPOGRÁFICO:
          </span>
          <div className="flex items-center gap-2 font-mono text-xs uppercase">
            {[
              { id: 'sans', label: 'Suiza' },
              { id: 'serif', label: 'Editorial' },
              { id: 'mono', label: 'Mono' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setHeroFont(f.id)}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className={`py-0.5 px-2.5 transition-colors cursor-pointer border ${
                  heroFont === f.id
                    ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold'
                    : 'border-transparent text-zinc-500 hover:text-zinc-950 dark:hover:text-white'
                }`}
                style={{ borderRadius: '0px' }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Hero Core Statement: Dynamic Typography & High Impact */}
      <div className="my-auto py-12 space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="space-y-4"
        >
          <div className="flex flex-wrap items-center [&>span]:whitespace-nowrap gap-x-2 gap-y-1 font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
            <span>PORTFOLIO // EBER</span>
            <span className="hidden sm:inline" aria-hidden="true">—</span>
            <span className="text-zinc-800 dark:text-zinc-200">DISEÑO · ILUSTRACIÓN · TIPOGRAFÍA</span>
          </div>

          <h1 className={`text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter leading-[0.95] text-zinc-950 dark:text-white transition-all duration-300 ${
            heroFont === 'sans' ? 'font-sans font-light' :
            heroFont === 'serif' ? 'font-serif italic font-normal' :
            'font-mono font-bold uppercase'
          }`}>
            Diseño visual <br />
            <span className={heroFont === 'serif' ? 'font-sans font-light text-zinc-600 dark:text-zinc-400' : 'font-serif italic font-normal text-zinc-700 dark:text-zinc-300'}>
              con carácter.
            </span>
          </h1>
        </motion.div>

        {/* Short Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-base sm:text-xl text-zinc-700 dark:text-zinc-300 font-light leading-relaxed"
        >
          Diseñador gráfico, ilustrador y tipógrafo. Creo identidades visuales y universos de marca, y dirijo arte para la industria textil, el entretenimiento y los contenidos infantiles.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap items-center gap-4 pt-4"
        >
          <button
            onClick={() => onNavigate('work')}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className="group flex items-center gap-4 px-9 py-4 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-mono text-xs uppercase tracking-wider font-semibold transition-all hover:opacity-90 shadow-xs cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            <span>Ver trabajos</span>
            <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
          </button>

          <button
            onClick={() => onNavigate('contact')}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className="px-8 py-4 border border-zinc-400 dark:border-zinc-700 text-zinc-950 dark:text-white font-mono text-xs uppercase tracking-wider font-semibold hover:border-zinc-950 dark:hover:border-white transition-colors cursor-pointer"
            style={{ borderRadius: '0px' }}
          >
            Contacto
          </button>
        </motion.div>
      </div>

      {/* Footer Metrics Row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-10 border-t border-zinc-300 dark:border-zinc-800 pt-8"
      >
        {EBER_PROFILE.stats.map((stat, idx) => (
          <div key={idx} className="space-y-1.5">
            <p className="text-3xl sm:text-4xl font-light font-mono text-zinc-950 dark:text-white">
              {stat.value}
            </p>
            <p className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider font-medium max-w-[16rem] leading-relaxed">
              {stat.label}
            </p>
          </div>
        ))}
      </motion.div>

    </section>
  );
};

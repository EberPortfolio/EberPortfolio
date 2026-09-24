import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EBER_ART_SECTIONS, EBER_ART_ITEMS } from '../data/projects';
import { useTheme } from '../context/ThemeContext';
import { Sparkles, Palette, BookOpen, PenTool } from 'lucide-react';

export const EberArtSection = ({ cursorHandlers }) => {
  const [activeTab, setActiveTab] = useState('all');
  const { currentAccentObj } = useTheme();

  const filteredItems = activeTab === 'all'
    ? EBER_ART_ITEMS
    : EBER_ART_ITEMS.filter(item => item.category === activeTab);

  return (
    <section id="eber-art" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">
      
      {/* Header */}
      <div className="space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
          <Sparkles className="w-3.5 h-3.5" style={{ color: currentAccentObj.hex }} />
          <span>OBRA DE AUTOR & PROYECTOS INDEPENDIENTES</span>
        </div>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
          EBER ART
        </h2>
        <p className="text-base text-zinc-700 dark:text-zinc-300 max-w-2xl font-light leading-relaxed">
          Exploración creativa personal independiente de encargos comerciales. Un espacio dedicado al arte vectorial, la construcción de letras de autor y la formación académica.
        </p>
      </div>

      {/* Sub-category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 mb-12 border-b border-zinc-200 dark:border-zinc-800 pb-4">
        <button
          onClick={() => setActiveTab('all')}
          onMouseEnter={cursorHandlers?.onButtonHover}
          onMouseLeave={cursorHandlers?.onHoverLeave}
          className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
            activeTab === 'all'
              ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
              : 'border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-500'
          }`}
          style={{ borderRadius: '0px' }}
        >
          Todos los Trabajos (6)
        </button>

        {EBER_ART_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            onClick={() => setActiveTab(sec.id)}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className={`px-4 py-2 text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer border ${
              activeTab === sec.id
                ? 'border-zinc-950 bg-zinc-950 text-white dark:border-white dark:bg-white dark:text-zinc-950 font-semibold shadow-xs'
                : 'border-zinc-300 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-500'
            }`}
            style={{ borderRadius: '0px' }}
          >
            {sec.name}
          </button>
        ))}
      </div>

      {/* Grid of Art Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.3 }}
              className="group border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 space-y-4 hover:border-zinc-950 dark:hover:border-white transition-all shadow-xs"
              style={{ borderRadius: '0px' }}
            >
              {/* Image Frame */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 px-3 py-1 bg-zinc-950/90 text-white text-[10px] font-mono uppercase tracking-widest border border-zinc-700 rounded-full font-medium">
                  {item.categoryLabel}
                </div>
              </div>

              {/* Text Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-500 font-medium">
                  <span className="uppercase tracking-wider">{item.category}</span>
                  <span>{item.year}</span>
                </div>
                <h3 className="text-xl font-normal text-zinc-950 dark:text-white tracking-tight group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 pt-2 border-t border-zinc-200 dark:border-zinc-800">
                {item.tags.map((t, idx) => (
                  <span key={idx} className="px-2.5 py-0.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-300 text-[10px] font-mono border border-zinc-200 dark:border-zinc-800">
                    {t}
                  </span>
                ))}
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </section>
  );
};

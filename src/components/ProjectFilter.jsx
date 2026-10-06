import React from 'react';
import { motion } from 'framer-motion';

export const ProjectFilter = ({ categories, activeCategory, onSelectCategory, cursorHandlers }) => {

  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar scroll-smooth">
      {categories.map((category) => {
        const isActive = activeCategory === category.id;
        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            onMouseEnter={cursorHandlers?.onButtonHover}
            onMouseLeave={cursorHandlers?.onHoverLeave}
            className={`relative isolate px-4 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors whitespace-nowrap font-medium ${
              isActive 
                ? 'text-white dark:text-zinc-950 font-semibold shadow-xs' 
                : 'text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white border border-zinc-300 dark:border-zinc-800'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId="activeFilterPill"
                className="absolute inset-0 bg-zinc-950 dark:bg-white rounded-full -z-10"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
};

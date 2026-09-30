import React from 'react';
import { cloudinaryImage } from '../lib/cloudinary';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectCard = ({ project, onClick, cursorHandlers }) => {
  const { currentAccentObj } = useTheme();

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3 }}
      onClick={() => onClick(project)}
      onMouseEnter={() => cursorHandlers?.onProjectHover('VER CASO')}
      onMouseLeave={cursorHandlers?.onHoverLeave}
      className="group cursor-pointer flex flex-col space-y-4 border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 transition-all hover:border-zinc-950 dark:hover:border-white shadow-xs"
      style={{ borderRadius: '0px' }}
    >
      {/* Thumbnail Container (Sharp 0px Borders) */}
      <div 
        className="relative w-full aspect-[4/3] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
        style={{ borderRadius: '0px' }}
      >
        <img
          {...cloudinaryImage(project.thumbnail, { sizes: '(min-width: 768px) 45vw, 100vw' })}
          decoding="async"
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Hover Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
          <span className="text-white text-xs font-mono tracking-widest uppercase font-medium">
            {project.categoryLabel}
          </span>
          <div 
            className="w-9 h-9 bg-white text-zinc-950 flex items-center justify-center shadow-md transition-transform group-hover:scale-110"
            style={{ borderRadius: '0px' }}
          >
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>

        {/* Featured Tag (Rounded Pill) */}
        {project.featured && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-zinc-950/90 text-white text-[10px] font-mono uppercase tracking-widest border border-zinc-700 rounded-full">
            Destacado
          </div>
        )}
      </div>

      {/* Card Info */}
      <div className="flex items-start justify-between gap-4 pt-1">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span 
              className="w-2.5 h-2.5 inline-block" 
              style={{ backgroundColor: project.accentColor || currentAccentObj.hex }} 
            />
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-medium">
              {project.client} · {project.year}
            </span>
          </div>
          
          <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
            {project.title}
          </h3>
          
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 font-light leading-relaxed">
            {project.tagline}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

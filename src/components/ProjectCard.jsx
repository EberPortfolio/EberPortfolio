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
      role="link"
      tabIndex={0}
      aria-label={`Ver caso: ${project.title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(project);
        }
      }}
      className="group cursor-pointer flex flex-col space-y-4 border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 transition-all hover:border-zinc-950 dark:hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 shadow-xs"
    >
      {/* Thumbnail */}
      <div className="relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <img
          {...cloudinaryImage(project.thumbnail, {
            sizes: '(min-width: 1280px) 600px, (min-width: 768px) 45vw, 100vw',
            crop: 'fill',
            aspectRatio: '16:10',
            gravity: project.thumbnailGravity || 'auto'
          })}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-between p-5">
          <span className="text-white text-xs font-mono tracking-widest uppercase font-medium">
            {project.categoryLabel}
          </span>
          <span className="w-9 h-9 bg-white text-zinc-950 flex items-center justify-center shadow-md transition-transform group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-1.5 pt-1">
        <div className="flex items-center gap-2">
          <span
            className="w-2.5 h-2.5 inline-block"
            style={{ backgroundColor: project.accentColor || currentAccentObj.hex }}
          />
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-medium">
            {[project.client, project.year].filter(Boolean).join(' · ')}
          </span>
        </div>
        <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-zinc-950 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
          {project.title}
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 font-light leading-relaxed">
          {project.tagline}
        </p>
      </div>
    </motion.div>
  );
};

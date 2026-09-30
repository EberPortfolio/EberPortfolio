import React from 'react';
import { cloudinaryImage } from '../lib/cloudinary';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const ProjectCard = ({ project, onClick, cursorHandlers, wide = false }) => {
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
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(project); } }}
      className={`group cursor-pointer border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 p-4 transition-all hover:border-zinc-950 dark:hover:border-white focus-visible:outline-2 focus-visible:outline-offset-4 shadow-xs ${wide ? 'md:col-span-2 flex flex-col gap-6 md:grid md:grid-cols-12 md:gap-10' : 'flex flex-col space-y-4'}`}
      style={{ borderRadius: '0px' }}
    >
      {/* Thumbnail Container (Sharp 0px Borders) */}
      <div 
        className={`${wide ? 'md:col-span-8 ' : ''}relative w-full aspect-[16/10] overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800`}
        style={{ borderRadius: '0px' }}
      >
        <img
          {...cloudinaryImage(project.thumbnail, { sizes: wide ? '(min-width: 1280px) 800px, (min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 45vw, 100vw', crop: 'fill', aspectRatio: '16:10', gravity: 'auto' })}
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
      {wide ? (
        <div className="md:col-span-4 flex flex-col justify-between gap-8 pt-1 md:py-2">
          <div className="space-y-4">
            <span className="text-xs font-mono text-zinc-500 uppercase tracking-wider font-medium block">
              {[project.client, project.year].filter(Boolean).join(' · ')}
            </span>
            <h3 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
              {project.title}
            </h3>
            <p className="text-sm sm:text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
              {project.tagline}
            </p>
            {project.deliverables?.length > 0 && (
              <ul className="flex flex-wrap gap-1.5 pt-2">
                {project.deliverables.map((item) => (
                  <li key={item} className="px-2.5 py-1 border border-zinc-300 dark:border-zinc-700 font-mono text-[10px] uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <span className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold text-zinc-950 dark:text-white">
            Ver caso de estudio
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      ) : (
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
      )}
    </motion.div>
  );
};

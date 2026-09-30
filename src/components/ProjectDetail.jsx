import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import { useTheme } from '../context/ThemeContext';

export const ProjectDetail = ({ project, onClose, onSelectProject, cursorHandlers }) => {
  const [copiedColor, setCopiedColor] = useState(null);
  const { currentAccentObj } = useTheme();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [project.id]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const currentIndex = PROJECTS.findIndex(p => p.id === project.id);
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-transparent text-zinc-950 dark:text-white pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16"
    >
      {/* Top Back Navigation Bar */}
      <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-6">
        <button
          onClick={onClose}
          onMouseEnter={cursorHandlers?.onButtonHover}
          onMouseLeave={cursorHandlers?.onHoverLeave}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold hover:text-zinc-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver a la Galería de Proyectos</span>
        </button>

        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-zinc-500 font-medium">
          <span 
            className="w-2.5 h-2.5 rounded-full" 
            style={{ backgroundColor: project.accentColor || currentAccentObj.hex }} 
          />
          <span>{project.categoryLabel} · {project.year}</span>
        </div>
      </div>

      {/* Hero Title & Client Specs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        <div className="lg:col-span-8 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
            CASO DE ESTUDIO // {project.year}
          </span>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-light tracking-tighter text-zinc-950 dark:text-white leading-[1.05]">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-light leading-relaxed">
            {project.tagline}
          </p>
          <p className="text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-3xl">
            {project.summary}
          </p>
        </div>

        {/* Sidebar Project Metadata Spec Sheet */}
        <div className="lg:col-span-4 p-6 border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 space-y-6 font-mono text-xs">
          <div className="space-y-1">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-medium">Cliente</span>
            <p className="text-base font-semibold text-zinc-950 dark:text-white">{project.client}</p>
          </div>

          <div className="space-y-1">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-medium">Ubicación</span>
            <p className="text-sm text-zinc-800 dark:text-zinc-200">{project.location}</p>
          </div>

          <div className="space-y-2">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest block font-medium">Entregables del Sistema</span>
            <div className="flex flex-wrap gap-1.5">
              {project.deliverables?.map((item, idx) => (
                <span 
                  key={idx} 
                  className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-200 text-[11px] font-mono rounded-full font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Main Full-Width Hero Cover Image */}
      <div className="border border-zinc-300 dark:border-zinc-800 overflow-hidden shadow-xs">
        <img
          src={project.coverImage || project.thumbnail}
          alt={project.title}
          className="w-full h-auto max-h-[75vh] object-cover"
        />
      </div>

      {/* Interactive Color Palette Swatch Chiche */}
      {project.colorPalette && (
        <div className="p-8 border border-zinc-300 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/40 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-600 dark:text-zinc-400 font-semibold">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Sistema Cromático del Proyecto (Click para copiar HEX)</span>
            </div>
            {copiedColor && (
              <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                <Check className="w-4 h-4" /> ¡Código {copiedColor} copiado!
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.colorPalette.map((color, i) => (
              <button
                key={i}
                onClick={() => handleCopyColor(color)}
                onMouseEnter={cursorHandlers?.onButtonHover}
                onMouseLeave={cursorHandlers?.onHoverLeave}
                className="group flex flex-col p-4 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-zinc-950 dark:hover:border-white text-left cursor-pointer"
              >
                <div 
                  className="w-full h-16 mb-3 border border-black/10 transition-transform group-hover:scale-95" 
                  style={{ backgroundColor: color }} 
                />
                <span className="font-mono text-xs uppercase font-semibold flex items-center justify-between text-zinc-950 dark:text-white">
                  <span>{color}</span>
                  <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Typography Spec Pairings */}
      {project.typography && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950">
          <div className="space-y-2 font-mono text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold block">Jerarquía Tipográfica Principal</span>
            <p className="text-3xl font-semibold tracking-tight font-sans text-zinc-950 dark:text-white">
              {project.typography.primary}
            </p>
            <p className="text-zinc-500 text-xs pt-1">ABCDEFGHIJKLMNOPQRSTUVWXYZ / 0123456789</p>
          </div>
          <div className="space-y-2 font-mono text-xs">
            <span className="text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold block">Jerarquía Tipográfica Secundaria</span>
            <p className="text-3xl font-normal font-serif italic text-zinc-950 dark:text-white">
              {project.typography.secondary}
            </p>
            <p className="text-zinc-500 text-xs pt-1">abcdefghijklmnopqrstuvwxyz / 0123456789</p>
          </div>
        </div>
      )}

      {/* Full High-Resolution Gallery Grid */}
      <div className="space-y-8">
        <div className="flex items-center justify-between border-b border-zinc-300 dark:border-zinc-800 pb-4">
          <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-semibold">
            Galería de Aplicaciones & Piezas Gráficas
          </h3>
          <span className="font-mono text-xs text-zinc-500">{project.images?.length || 0} Piezas</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {project.images?.map((imgUrl, idx) => (
            <div key={idx} className="border border-zinc-300 dark:border-zinc-800 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
              <img
                src={imgUrl}
                alt={`${project.title} pieza ${idx + 1}`}
                className="w-full h-80 sm:h-[450px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Next Project Pagination Footer */}
      <div className="border-t border-zinc-300 dark:border-zinc-800 pt-12">
        <button
          onClick={() => onSelectProject(nextProject)}
          onMouseEnter={cursorHandlers?.onButtonHover}
          onMouseLeave={cursorHandlers?.onHoverLeave}
          className="group w-full p-8 border border-zinc-300 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/30 hover:border-zinc-950 dark:hover:border-white transition-all flex items-center justify-between text-left cursor-pointer"
        >
          <div className="space-y-1">
            <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 uppercase tracking-widest font-semibold block">
              Siguiente Caso de Estudio →
            </span>
            <p className="text-2xl sm:text-4xl font-light text-zinc-950 dark:text-white group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors">
              {nextProject.title}
            </p>
          </div>

          <div className="w-12 h-12 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center transition-transform group-hover:translate-x-2">
            <ArrowRight className="w-6 h-6" />
          </div>
        </button>
      </div>

    </motion.div>
  );
};

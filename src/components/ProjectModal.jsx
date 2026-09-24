import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Check, Sparkles } from 'lucide-react';

export const ProjectModal = ({ project, onClose, cursorHandlers }) => {
  const [copiedColor, setCopiedColor] = useState(null);

  if (!project) return null;

  const handleCopyColor = (color) => {
    navigator.clipboard.writeText(color);
    setCopiedColor(color);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-zinc-950/80 backdrop-blur-md flex justify-center p-3 sm:p-6 md:p-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-5xl bg-white dark:bg-zinc-950 overflow-hidden shadow-2xl border border-zinc-300 dark:border-zinc-800 text-zinc-950 dark:text-white my-auto max-h-[90vh] flex flex-col"
          style={{ borderRadius: '0px' }}
        >
          {/* Top Bar Navigation */}
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
              <span 
                className="w-3 h-3"
                style={{ backgroundColor: project.accentColor }} 
              />
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                {project.categoryLabel} · {project.year}
              </span>
            </div>

            <button
              onClick={onClose}
              onMouseEnter={cursorHandlers?.onButtonHover}
              onMouseLeave={cursorHandlers?.onHoverLeave}
              className="p-2 border border-zinc-300 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors"
              style={{ borderRadius: '0px' }}
              aria-label="Cerrar"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Scroll Body */}
          <div className="overflow-y-auto p-6 sm:p-10 space-y-12">
            
            {/* Header Title & Specs */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8 border-b border-zinc-200 dark:border-zinc-800">
              <div className="lg:col-span-2 space-y-4">
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight">
                  {project.title}
                </h2>
                <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                  {project.summary}
                </p>
              </div>

              {/* Sidebar Metadata */}
              <div className="space-y-4 font-mono text-xs border-t lg:border-t-0 lg:border-l border-zinc-200 dark:border-zinc-800 pt-4 lg:pt-0 lg:pl-8">
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-medium">Cliente</span>
                  <span className="text-sm font-semibold">{project.client}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider font-medium">Ubicación</span>
                  <span className="text-sm">{project.location}</span>
                </div>
                <div>
                  <span className="text-zinc-500 block uppercase tracking-wider mb-2 font-medium">Entregables</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.deliverables?.map((item, i) => (
                      <span key={i} className="px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-[11px] font-mono border border-zinc-200 dark:border-zinc-700">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Color Palette Swatch */}
            {project.colorPalette && (
              <div 
                className="p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4"
                style={{ borderRadius: '0px' }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-zinc-500 font-semibold">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    <span>Paleta Cromática del Proyecto (Click para copiar HEX)</span>
                  </div>
                  {copiedColor && (
                    <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                      <Check className="w-3.5 h-3.5" /> ¡Copiado {copiedColor}!
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {project.colorPalette.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => handleCopyColor(color)}
                      onMouseEnter={cursorHandlers?.onButtonHover}
                      onMouseLeave={cursorHandlers?.onHoverLeave}
                      className="group flex flex-col p-3 border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 transition-all hover:border-zinc-950 dark:hover:border-white text-left"
                      style={{ borderRadius: '0px' }}
                    >
                      <div 
                        className="w-full h-12 mb-2 border border-black/10 transition-transform group-hover:scale-95" 
                        style={{ backgroundColor: color, borderRadius: '0px' }} 
                      />
                      <span className="font-mono text-xs uppercase font-semibold flex items-center justify-between">
                        <span>{color}</span>
                        <Copy className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Cover Image */}
            <div className="border border-zinc-200 dark:border-zinc-800" style={{ borderRadius: '0px' }}>
              <img
                src={project.coverImage || project.thumbnail}
                alt={project.title}
                className="w-full h-auto object-cover"
              />
            </div>

            {/* Typography Spec Showcase */}
            {project.typography && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-6 border border-zinc-200 dark:border-zinc-800" style={{ borderRadius: '0px' }}>
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest font-medium">Tipografía Principal</span>
                  <p className="text-2xl font-semibold tracking-tight font-sans">
                    {project.typography.primary}
                  </p>
                  <p className="text-zinc-500 text-[11px]">Aa Bb Cc Dd Ee Ff Gg Hh 0123456789</p>
                </div>
                <div className="space-y-1 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest font-medium">Tipografía Secundaria</span>
                  <p className="text-2xl font-normal font-serif italic">
                    {project.typography.secondary}
                  </p>
                  <p className="text-zinc-500 text-[11px]">Aa Bb Cc Dd Ee Ff Gg Hh 0123456789</p>
                </div>
              </div>
            )}

            {/* Project Image Gallery Grid */}
            <div className="space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                Galería de piezas & Mocks
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.images?.map((imgUrl, idx) => (
                  <div key={idx} className="border border-zinc-200 dark:border-zinc-800" style={{ borderRadius: '0px' }}>
                    <img
                      src={imgUrl}
                      alt={`${project.title} vista ${idx + 1}`}
                      className="w-full h-64 sm:h-80 object-cover hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

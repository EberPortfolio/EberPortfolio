import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Copy, Check, ArrowRight, Maximize2 } from 'lucide-react';
import { cloudinaryImage, cloudinaryVideo } from '../lib/cloudinary';
import { PROJECTS } from '../data/projects';
import { fullName } from '../data/profile';
import { Lightbox } from './Lightbox';

const FULL_WIDTH_SIZES = '(min-width: 1280px) 1216px, 100vw';
const HALF_WIDTH_SIZES = '(min-width: 1280px) 600px, (min-width: 768px) 48vw, 100vw';
const BOARD_WIDTHS = [600, 900, 1200, 1600, 2200];

// Presentation boards are shown whole (never cropped) and open in the lightbox
const Board = ({ publicId, alt, size, eager = false, onOpen, sizes = HALF_WIDTH_SIZES, className = '', hover }) => (
  <button
    type="button"
    onClick={onOpen}
    {...hover}
    aria-label={`Ampliar: ${alt}`}
    className={`group relative block w-full border border-zinc-300 dark:border-zinc-800 cursor-zoom-in ${className}`}
  >
    <img
      {...cloudinaryImage(publicId, { sizes, widths: BOARD_WIDTHS })}
      alt={alt}
      width={size?.width}
      height={size?.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="w-full h-auto block bg-zinc-100 dark:bg-zinc-900"
    />
    <span className="absolute top-3 right-3 p-2 bg-zinc-950/70 text-white opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity">
      <Maximize2 className="w-4 h-4" />
    </span>
  </button>
);

// Case videos stream from Cloudinary: automatic quality/codec, poster from an early frame
const CaseVideo = ({ publicId, title }) => {
  const { src, poster } = cloudinaryVideo(publicId);
  return (
    <div className="border border-zinc-300 dark:border-zinc-800">
      <video
        controls
        playsInline
        preload="none"
        poster={poster}
        aria-label={title}
        className="w-full h-auto block bg-zinc-900"
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
};

const MetaItem = ({ label, children }) => (
  <div className="space-y-1.5">
    <dt className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">{label}</dt>
    <dd className="text-sm text-zinc-900 dark:text-zinc-100">{children}</dd>
  </div>
);

export const ProjectDetail = ({ project, onClose, onSelectProject, cursorHandlers }) => {
  const [copiedColor, setCopiedColor] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const hover = {
    onMouseEnter: cursorHandlers?.onButtonHover,
    onMouseLeave: cursorHandlers?.onHoverLeave
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const previousTitle = document.title;
    document.title = `${project.title} · ${fullName}`;
    return () => {
      document.title = previousTitle;
    };
  }, [project.id, project.title]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      // The lightbox handles Escape itself while it is open
      if (e.key === 'Escape' && lightboxIndex === null) onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, lightboxIndex]);

  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const nextProject = PROJECTS.length > 1 ? PROJECTS[(currentIndex + 1) % PROJECTS.length] : null;

  // Legacy projects list a flat `images` array; new ones are organised in sections
  const sections = project.sections || (project.images?.length ? [{ title: 'Galería', images: project.images }] : []);
  const cover = project.coverImage || project.thumbnail;
  // Every board in reading order, so the lightbox can move across chapters
  const allBoards = [cover, ...sections.flatMap((s) => s.images || [])];
  const pieceCount = allBoards.length - 1;
  let boardCursor = 1;

  const handleCopyColor = async (color) => {
    try {
      await navigator.clipboard.writeText(color);
      setCopiedColor(color);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch {
      // Clipboard unavailable; the hex is visible anyway
    }
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen text-zinc-950 dark:text-white pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
    >
      {/* Back bar */}
      <div className="flex items-center justify-between gap-4 border-b border-zinc-300 dark:border-zinc-800 pb-6">
        <button
          onClick={onClose}
          {...hover}
          className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold hover:text-zinc-500 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>Volver a trabajos</span>
        </button>
        <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest text-zinc-500">
          {project.categoryLabel}
        </span>
      </div>

      {/* Title + metadata */}
      <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 py-12 sm:py-16">
        <div className="lg:col-span-8 space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
            Caso de estudio
          </span>
          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-light tracking-tighter leading-[0.95]">
            {project.title}
          </h1>
          <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 font-light leading-snug text-balance max-w-3xl">
            {project.tagline}
          </p>
          <p className="text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-2xl">
            {project.summary}
          </p>
        </div>

        <dl className="lg:col-span-4 lg:pt-10 grid grid-cols-2 lg:grid-cols-1 gap-6 content-start border-t lg:border-t-0 lg:border-l border-zinc-300 dark:border-zinc-800 pt-8 lg:pt-10 lg:pl-10">
          <MetaItem label="Cliente">{project.client}</MetaItem>
          {project.subtitle && <MetaItem label="Proyecto">{project.subtitle}</MetaItem>}
          {project.year && <MetaItem label="Año">{project.year}</MetaItem>}
          {project.role && <MetaItem label="Rol">{project.role}</MetaItem>}
          {project.location && <MetaItem label="Ubicación">{project.location}</MetaItem>}
          {project.deliverables?.length > 0 && (
            <div className="col-span-2 lg:col-span-1">
              <MetaItem label="Alcance">
                <ul className="flex flex-wrap gap-1.5 pt-1">
                  {project.deliverables.map((item) => (
                    <li
                      key={item}
                      className="px-3 py-1 border border-zinc-300 dark:border-zinc-700 font-mono text-[11px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </MetaItem>
            </div>
          )}
        </dl>
      </header>

      {/* Cover */}
      <Board
        publicId={cover}
        alt={`${project.title}, portada`}
        size={project.imageSize}
        sizes={FULL_WIDTH_SIZES}
        eager
        hover={hover}
        onOpen={() => setLightboxIndex(0)}
      />

      {/* Optional brand specs */}
      {project.colorPalette && (
        <section className="mt-16 space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">Paleta</h2>
            {copiedColor && (
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold" aria-live="polite">
                <Check className="w-4 h-4" /> {copiedColor} copiado
              </span>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {project.colorPalette.map((color) => (
              <button
                key={color}
                onClick={() => handleCopyColor(color)}
                {...hover}
                className="group flex flex-col p-3 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-white text-left cursor-pointer transition-colors"
              >
                <span className="w-full h-16 mb-3 border border-black/10" style={{ backgroundColor: color }} />
                <span className="font-mono text-xs uppercase font-semibold flex items-center justify-between">
                  {color}
                  <Copy className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-zinc-400" />
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {project.typography && (
        <section className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8 p-8 border border-zinc-300 dark:border-zinc-800">
          <div className="space-y-2">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Tipografía principal</h2>
            <p className="text-3xl font-semibold tracking-tight">{project.typography.primary}</p>
          </div>
          <div className="space-y-2">
            <h2 className="font-mono text-[11px] uppercase tracking-widest text-zinc-500">Tipografía secundaria</h2>
            <p className="text-3xl font-serif italic">{project.typography.secondary}</p>
          </div>
        </section>
      )}

      {/* Chapters */}
      {sections.map((section, sectionIdx) => (
        <section key={section.title} className="mt-24 sm:mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-16 pb-8 mb-8 border-b border-zinc-300 dark:border-zinc-800">
            <div className="lg:col-span-5 flex items-baseline gap-5">
              <span className="font-mono text-xs text-zinc-500">
                {String(sectionIdx + 1).padStart(2, '0')}
              </span>
              <h2 className="text-3xl sm:text-4xl font-light tracking-tight">{section.title}</h2>
            </div>
            {section.text && (
              <p className="lg:col-span-7 text-base text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-2xl">
                {section.text}
              </p>
            )}
          </div>

          {section.video && (
            <CaseVideo publicId={section.video} title={`${project.title}, ${section.title}`} />
          )}

          {section.images?.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {section.images.map((publicId, idx, images) => {
                const boardIndex = boardCursor++;
                // An odd board out spans both columns instead of sitting alone
                const spansRow = images.length % 2 === 1 && idx === images.length - 1;
                return (
                  <Board
                    key={publicId}
                    publicId={publicId}
                    alt={`${project.title}, ${section.title}, lámina ${idx + 1}`}
                    size={project.imageSize}
                    hover={hover}
                    onOpen={() => setLightboxIndex(boardIndex)}
                    className={spansRow ? 'md:col-span-2' : ''}
                    sizes={spansRow ? FULL_WIDTH_SIZES : HALF_WIDTH_SIZES}
                  />
                );
              })}
            </div>
          )}
        </section>
      ))}

      {/* Footer navigation */}
      <div className="mt-24 sm:mt-32 border-t border-zinc-300 dark:border-zinc-800 pt-10">
        {nextProject ? (
          <button
            onClick={() => onSelectProject(nextProject)}
            {...hover}
            className="group w-full p-8 border border-zinc-300 dark:border-zinc-800 hover:border-zinc-950 dark:hover:border-white transition-colors flex items-center justify-between gap-6 text-left cursor-pointer"
          >
            <span className="space-y-1">
              <span className="font-mono text-xs text-zinc-500 uppercase tracking-widest font-semibold block">
                Siguiente caso
              </span>
              <span className="text-2xl sm:text-4xl font-light block">{nextProject.title}</span>
            </span>
            <span className="w-12 h-12 shrink-0 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center transition-transform group-hover:translate-x-2">
              <ArrowRight className="w-6 h-6" />
            </span>
          </button>
        ) : (
          <div className="flex flex-wrap items-center justify-between gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
              {pieceCount} láminas · {project.client}
            </span>
            <button
              onClick={onClose}
              {...hover}
              className="group flex items-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold hover:text-zinc-500 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              <span>Volver a trabajos</span>
            </button>
          </div>
        )}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={allBoards}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
          alt={project.title}
        />
      )}
    </motion.article>
  );
};

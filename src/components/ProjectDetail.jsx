import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Maximize2 } from 'lucide-react';
import { cloudinaryImage, cloudinaryVideo } from '../lib/cloudinary';
import { PROJECTS } from '../data/projects';
import { fullName } from '../data/profile';
import { Lightbox } from './Lightbox';
import { containerClass } from './SectionHeader';
import { scrollToTarget } from '../lib/smoothScroll';

const COVER_SIZES = '(min-width: 1280px) 1152px, 100vw';
const GRID_SIZES = '(min-width: 1280px) 570px, (min-width: 768px) 48vw, 100vw';
const BOARD_WIDTHS = [600, 900, 1200, 1600, 2200];
// The whole case sits in one centered reading column; full detail lives in the lightbox
const MEDIA_MAX = '';

// Presentation boards are shown whole (never cropped) and open in the lightbox
const Board = ({ publicId, alt, size, eager = false, onOpen, sizes = GRID_SIZES, className = '' }) => (
  <button
    type="button"
    onClick={onOpen}
    aria-label={`Ampliar: ${alt}`}
    className={`group relative block w-full cursor-zoom-in ${className}`}
  >
    <img
      {...cloudinaryImage(publicId, { sizes, widths: BOARD_WIDTHS })}
      alt={alt}
      width={size?.width}
      height={size?.height}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      className="w-full h-auto block bg-zinc-200 dark:bg-zinc-900"
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
  );
};

const MetaItem = ({ label, children }) => (
  <div className="space-y-1">
    <dt className="label">{label}</dt>
    <dd className="text-base text-zinc-950 dark:text-white">{children}</dd>
  </div>
);

// Optional narrative blocks, shown only when the project provides them
const STORY_FIELDS = [
  { key: 'context', label: 'Contexto' },
  { key: 'challenge', label: 'Desafío' },
  { key: 'result', label: 'Resultado' }
];

export const ProjectDetail = ({ project, onClose, onSelectProject }) => {
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    scrollToTarget('top', { immediate: true });
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
  let boardCursor = 1;

  const story = STORY_FIELDS.filter((f) => project[f.key]);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className={`${containerClass} pt-24 pb-20`}
    >
      <div className="max-w-6xl mx-auto">
        <button
          type="button"
          onClick={onClose}
          className="group inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Trabajos
        </button>

        {/* Title + metadata */}
        <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-10 pb-14 sm:pt-14 sm:pb-20">
          <div className="lg:col-span-8 space-y-6">
            <p className="label">{project.categoryLabel}</p>
            <h1 className="text-5xl sm:text-8xl font-semibold uppercase tracking-[-0.045em] leading-[0.92] text-zinc-950 dark:text-white">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-zinc-800 dark:text-zinc-200 leading-snug text-balance max-w-3xl">
              {project.tagline}
            </p>
            <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          </div>

          <dl className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-6 content-start lg:pt-14">
            <MetaItem label="Cliente">{project.client}</MetaItem>
            {project.subtitle && <MetaItem label="Proyecto">{project.subtitle}</MetaItem>}
            {project.year && <MetaItem label="Año">{project.year}</MetaItem>}
            {project.role && <MetaItem label="Rol">{project.role}</MetaItem>}
            {project.deliverables?.length > 0 && (
              <div className="col-span-2 lg:col-span-1">
                <MetaItem label="Alcance">{project.deliverables.join(', ')}</MetaItem>
              </div>
            )}
          </dl>
        </header>

        <div className={MEDIA_MAX}>
          <Board
            publicId={cover}
            alt={`${project.title}, portada`}
            size={project.imageSize}
            sizes={COVER_SIZES}
            eager
            onOpen={() => setLightboxIndex(0)}
          />
        </div>

        {story.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-20">
            {story.map((field) => (
              <div key={field.key} className="space-y-3">
                <h2 className="label">{field.label}</h2>
                <p className="text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">{project[field.key]}</p>
              </div>
            ))}
          </div>
        )}

        {/* Chapters */}
        {sections.map((section, sectionIdx) => (
          <section key={section.title} className="mt-24 sm:mt-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 lg:gap-16 mb-8 sm:mb-10">
              <h2 className="lg:col-span-4 text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-zinc-950 dark:text-white">
                <span className="text-zinc-400 dark:text-zinc-600 tabular-nums mr-3">
                  {String(sectionIdx + 1).padStart(2, '0')}
                </span>
                {section.title}
              </h2>
              {section.text && (
                <p className="lg:col-span-7 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
                  {section.text}
                </p>
              )}
            </div>

            {section.video && (
              <div className={MEDIA_MAX}>
                <CaseVideo publicId={section.video} title={`${project.title}, ${section.title}`} />
              </div>
            )}

            <div className={`${MEDIA_MAX} grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4`}>
              {(section.images || []).map((publicId, idx, images) => {
                const boardIndex = boardCursor++;
                // An odd board out spans both columns instead of sitting alone
                const spansRow = images.length % 2 === 1 && idx === images.length - 1;
                return (
                  <Board
                    key={publicId}
                    publicId={publicId}
                    alt={`${project.title}, ${section.title}, lámina ${idx + 1}`}
                    size={project.imageSize}
                    onOpen={() => setLightboxIndex(boardIndex)}
                    className={spansRow ? 'md:col-span-2' : ''}
                    sizes={spansRow ? COVER_SIZES : GRID_SIZES}
                  />
                );
              })}
            </div>
          </section>
        ))}

        {/* Footer navigation */}
        <nav aria-label="Casos" className="mt-24 sm:mt-32 pt-10 border-t border-zinc-200 dark:border-zinc-800">
          {nextProject ? (
            <button
              type="button"
              onClick={() => onSelectProject(nextProject)}
              className="group w-full flex items-end justify-between gap-6 text-left cursor-pointer"
            >
              <span>
                <span className="label block mb-2">Siguiente caso</span>
                <span className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] text-zinc-950 dark:text-white">
                  {nextProject.title}
                </span>
              </span>
              <ArrowRight className="w-8 h-8 shrink-0 transition-transform group-hover:translate-x-1" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="group inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Volver a trabajos
            </button>
          )}
        </nav>

        {lightboxIndex !== null && (
          <Lightbox
            images={allBoards}
            index={lightboxIndex}
            onChange={setLightboxIndex}
            onClose={() => setLightboxIndex(null)}
            alt={project.title}
          />
        )}
      </div>
    </motion.article>
  );
};

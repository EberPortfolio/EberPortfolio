import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDownRight } from 'lucide-react';
import { EBER_PROFILE, ABOUT } from '../data/services';
import { cloudinaryImage } from '../lib/cloudinary';

const reveal = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.6, ease: 'easeOut' }
};

// Captions sit on the photo so image and text columns end on the same line
const captionClass =
  'absolute bottom-3 px-3 py-2 bg-zinc-950/75 backdrop-blur-sm text-white font-mono text-[10px] sm:text-[11px] uppercase tracking-widest';

const Photo = ({ photo, sizes, className = '' }) => (
  <img
    {...cloudinaryImage(photo.publicId, { sizes })}
    alt={photo.alt}
    width={photo.width}
    height={photo.height}
    loading="lazy"
    decoding="async"
    className={`w-full h-full object-cover ${className}`}
  />
);

export const AboutSection = ({ onNavigate, cursorHandlers }) => {
  const { portrait, outdoors } = ABOUT.photos;

  return (
    <section id="sobre-mi" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">

      {/* Intro: portrait + headline, both ending on the same baseline */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">

        <motion.figure {...reveal} className="lg:col-span-5 relative aspect-[4/5] overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
          <Photo photo={portrait} sizes="(min-width: 1024px) 40vw, 100vw" />
          <figcaption className={`${captionClass} inset-x-3 flex items-center justify-between gap-4`}>
            <span>Eber · Diseño &amp; ilustración</span>
            <span className="flex items-center gap-1.5 shrink-0 text-emerald-300 font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Disponible
            </span>
          </figcaption>
        </motion.figure>

        <motion.div {...reveal} className="lg:col-span-7 space-y-8">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
            Sobre mí
          </span>
          <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white leading-[1.1] text-balance">
            {ABOUT.headline}
          </h2>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 font-light leading-relaxed max-w-2xl">
            {ABOUT.lead}
          </p>
          <ul className="flex flex-wrap gap-2" aria-label="Industrias">
            {EBER_PROFILE.industries.map((industry) => (
              <li
                key={industry}
                className="px-3.5 py-1.5 border border-zinc-300 dark:border-zinc-700 font-mono text-[11px] uppercase tracking-wider text-zinc-800 dark:text-zinc-200"
              >
                {industry}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Pillars + second photo: the photo stretches so both columns share top and bottom edges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-20 lg:mt-28 lg:items-stretch">

        <motion.div {...reveal} className="lg:col-span-7 lg:order-2 flex flex-col">
          <ol className="divide-y divide-zinc-300 dark:divide-zinc-800 border-y border-zinc-300 dark:border-zinc-800">
            {ABOUT.pillars.map((pillar, idx) => (
              <li key={pillar.title} className="grid grid-cols-[2.5rem_1fr] sm:grid-cols-[3rem_13rem_1fr] gap-x-4 gap-y-2 py-7">
                <span className="font-mono text-xs text-zinc-500 pt-1">0{idx + 1}</span>
                <h3 className="text-lg font-normal text-zinc-950 dark:text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="col-start-2 sm:col-start-3 text-sm text-zinc-700 dark:text-zinc-300 font-light leading-relaxed">
                  {pillar.text}
                </p>
              </li>
            ))}
          </ol>

          {/* What Eber is looking for now */}
          <div className="mt-10 p-8 sm:p-10 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 space-y-6">
            <span className="font-mono text-[11px] uppercase tracking-widest opacity-60 block">
              Próximo paso
            </span>
            <p className="text-xl sm:text-2xl font-light leading-snug text-balance">
              {ABOUT.lookingFor}
            </p>
            <button
              onClick={() => onNavigate?.('contact')}
              onMouseEnter={cursorHandlers?.onButtonHover}
              onMouseLeave={cursorHandlers?.onHoverLeave}
              className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-wider font-semibold border-b border-current pb-1 cursor-pointer"
            >
              <span>Hablemos</span>
              <ArrowDownRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </button>
          </div>
        </motion.div>

        <motion.figure {...reveal} className="lg:col-span-5 lg:order-1 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-zinc-200 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-800">
          <Photo
            photo={outdoors}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-[center_80%] lg:absolute lg:inset-0"
          />
        </motion.figure>
      </div>

    </section>
  );
};

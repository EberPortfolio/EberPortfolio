import React from 'react';
import { ArrowDown } from 'lucide-react';
import { ABOUT, EBER_PROFILE } from '../data/profile';
import { cloudinaryImage } from '../lib/cloudinary';
import { SectionHeader, sectionClass } from './SectionHeader';

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

export const AboutSection = ({ onNavigate, index }) => {
  const { portrait, outdoors } = ABOUT.photos;

  return (
    <section id="about-me" className={sectionClass}>
      <SectionHeader index={index} title="Sobre mí" />

      {/* Intro: text first, the two photos as a small diptych beside it */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.16em] text-zinc-400 dark:text-zinc-500 font-medium">
            <span>PERFIL & VISIÓN</span>
            <span>—</span>
            <span>HOLA, SOY EBER</span>
          </div>
          <p className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-zinc-950 dark:text-white text-balance">
            {ABOUT.headline}
          </p>
          <p className="text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {ABOUT.lead}
          </p>
        </div>

        <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
          <figure className="reveal-clip aspect-[4/5] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
            <Photo photo={portrait} sizes="(min-width: 1024px) 20vw, 50vw" />
          </figure>
          <figure className="reveal-clip aspect-[4/5] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
            <Photo photo={outdoors} sizes="(min-width: 1024px) 20vw, 50vw" className="object-[20%_75%]" />
          </figure>
        </div>
      </div>

      {/* Pillars + next step: both columns share top and bottom edges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-20 lg:mt-28 lg:items-stretch">
        <ol className="reveal-up lg:col-span-7 divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
          {ABOUT.pillars.map((pillar, idx) => (
            <li key={pillar.title} className="grid grid-cols-[2rem_1fr] sm:grid-cols-[2.5rem_12rem_1fr] gap-x-4 gap-y-2 py-7">
              <span className="text-sm text-zinc-500 tabular-nums">0{idx + 1}</span>
              <h3 className="text-base font-medium text-zinc-950 dark:text-white">{pillar.title}</h3>
              <p className="col-start-2 sm:col-start-3 text-base text-zinc-700 dark:text-zinc-300 leading-relaxed">
                {pillar.text}
              </p>
            </li>
          ))}
        </ol>

        {/* What Eber is looking for now */}
        <div className="reveal-up lg:col-span-5 p-8 sm:p-10 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex flex-col justify-between gap-6">
          <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-60">Próximo paso</p>
          <p className="text-xl sm:text-2xl leading-snug text-balance">{ABOUT.lookingFor}</p>
          <button
            type="button"
            onClick={() => onNavigate?.('contact')}
            className="group self-start inline-flex items-center gap-2 text-sm font-medium border-b border-current pb-1 cursor-pointer"
          >
            Hablemos
            <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Editorial Meta Bar al pie de Sobre mí (inspirada en la imagen 1 y 2) */}
      <div className="mt-16 pt-5 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        <span>EBER // DISEÑO GRÁFICO, ILUSTRACIÓN & TIPOGRAFÍA</span>
        <span className="hidden sm:inline">DIRECCIÓN DE ARTE · DOCENCIA UNIVERSITARIA</span>
        <span>{EBER_PROFILE.location}</span>
      </div>
    </section>
  );
};

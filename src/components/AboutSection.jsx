import React from 'react';
import { ArrowDown } from 'lucide-react';
import { ABOUT } from '../data/profile';
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

export const AboutSection = ({ onNavigate }) => {
  const { portrait, outdoors } = ABOUT.photos;

  return (
    <section id="about-me" className={sectionClass}>
      <SectionHeader title="Sobre mí" />

      {/* Intro: portrait + headline, both ending on the same line */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end">
        <figure className="reveal-clip lg:col-span-5 aspect-[4/5] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
          <Photo photo={portrait} sizes="(min-width: 1024px) 40vw, 100vw" />
        </figure>

        <div className="reveal-up lg:col-span-7 space-y-6">
          <p className="text-3xl sm:text-5xl font-medium tracking-[-0.03em] leading-[1.08] text-zinc-950 dark:text-white text-balance">
            {ABOUT.headline}
          </p>
          <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-2xl">
            {ABOUT.lead}
          </p>
        </div>
      </div>

      {/* Pillars + second photo: the photo stretches so both columns share top and bottom edges */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 mt-20 lg:mt-28 lg:items-stretch">
        <div className="reveal-up lg:col-span-7 lg:order-2 flex flex-col">
          <ol className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
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
          <div className="mt-10 p-8 sm:p-10 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 space-y-6">
            <p className="text-xs font-medium uppercase tracking-[0.12em] opacity-60">Próximo paso</p>
            <p className="text-xl sm:text-2xl leading-snug text-balance">{ABOUT.lookingFor}</p>
            <button
              type="button"
              onClick={() => onNavigate?.('contact')}
              className="group inline-flex items-center gap-2 text-sm font-medium border-b border-current pb-1 cursor-pointer"
            >
              Hablemos
              <ArrowDown className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
        </div>

        <figure className="reveal-clip lg:col-span-5 lg:order-1 relative aspect-[4/3] lg:aspect-auto overflow-hidden bg-zinc-200 dark:bg-zinc-900">
          <Photo
            photo={outdoors}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-[center_80%] lg:absolute lg:inset-0"
          />
        </figure>
      </div>
    </section>
  );
};

import React from 'react';
import { EXPERIENCE, TEACHING } from '../data/profile';

const Timeline = ({ title, items, placeKey }) => (
  <div>
    <h3 className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-4">{title}</h3>
    <ol className="divide-y divide-zinc-300 dark:divide-zinc-800 border-y border-zinc-300 dark:border-zinc-800">
      {items.map((item) => (
        <li
          key={`${item.period}-${item[placeKey]}`}
          className="grid grid-cols-1 sm:grid-cols-[10rem_1fr_1fr] gap-x-6 gap-y-1 py-5"
        >
          <span className="font-mono text-xs text-zinc-500 pt-1">{item.period}</span>
          <span className="text-lg font-normal tracking-tight text-zinc-950 dark:text-white">{item.role}</span>
          <span className="text-sm font-light text-zinc-700 dark:text-zinc-300 pt-1">{item[placeKey]}</span>
        </li>
      ))}
    </ol>
  </div>
);

// Hidden until Eber's experience is filled in src/data/profile.js
export const ExperienceSection = () => {
  if (EXPERIENCE.length === 0 && TEACHING.length === 0) return null;

  return (
    <section id="trayectoria" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-300 dark:border-zinc-800">
      <div className="space-y-4 mb-12">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold block">
          Trayectoria
        </span>
        <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
          Experiencia y docencia
        </h2>
      </div>
      <div className="space-y-14">
        {EXPERIENCE.length > 0 && <Timeline title="Experiencia" items={EXPERIENCE} placeKey="company" />}
        {TEACHING.length > 0 && <Timeline title="Docencia" items={TEACHING} placeKey="institution" />}
      </div>
    </section>
  );
};

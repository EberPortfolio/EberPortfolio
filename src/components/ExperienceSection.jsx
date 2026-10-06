import React from 'react';
import { EXPERIENCE, TEACHING } from '../data/profile';
import { SectionHeader, sectionClass } from './SectionHeader';

const Timeline = ({ title, items, placeKey }) => (
  <div>
    <h3 className="label mb-4">{title}</h3>
    <ol className="divide-y divide-zinc-200 dark:divide-zinc-800 border-y border-zinc-200 dark:border-zinc-800">
      {items.map((item) => (
        <li
          key={`${item.period}-${item[placeKey]}`}
          className="grid grid-cols-1 sm:grid-cols-[10rem_1fr_1fr] gap-x-6 gap-y-1 py-5"
        >
          <span className="text-sm text-zinc-500 tabular-nums">{item.period}</span>
          <span className="text-base font-medium text-zinc-950 dark:text-white">{item.role}</span>
          <span className="text-base text-zinc-700 dark:text-zinc-300">{item[placeKey]}</span>
        </li>
      ))}
    </ol>
  </div>
);

// Hidden until Eber's experience is filled in src/data/profile.js
export const ExperienceSection = ({ index }) => {
  if (EXPERIENCE.length === 0 && TEACHING.length === 0) return null;

  return (
    <section id="trayectoria" className={sectionClass}>
      <SectionHeader index={index} title="Trayectoria" />
      <div className="space-y-14">
        {EXPERIENCE.length > 0 && <Timeline title="Experiencia" items={EXPERIENCE} placeKey="company" />}
        {TEACHING.length > 0 && <Timeline title="Docencia" items={TEACHING} placeKey="institution" />}
      </div>
    </section>
  );
};

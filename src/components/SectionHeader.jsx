import React from 'react';

// Full-bleed layout with tight gutters, capped for very wide screens
export const containerClass = 'mx-auto w-full max-w-[1760px] px-5 sm:px-8 lg:px-10';

export const sectionClass = `${containerClass} py-24 sm:py-32 scroll-mt-16`;

// One heading pattern for every section: a rule, an uppercase title, an optional
// count on the right and optional controls (filters) below.
export const SectionHeader = ({ title, count, description, children }) => (
  <div className="mb-10 sm:mb-14">
    <div className="flex items-baseline justify-between gap-6 border-t border-zinc-300 dark:border-zinc-800 pt-5">
      <h2 className="text-3xl sm:text-5xl font-semibold uppercase tracking-[-0.035em] text-zinc-950 dark:text-white">
        {title}
      </h2>
      {count !== undefined && (
        <span className="text-3xl sm:text-5xl font-semibold tracking-[-0.035em] tabular-nums text-zinc-950 dark:text-white">
          ({count})
        </span>
      )}
    </div>
    {(description || children) && (
      <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {description && <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl">{description}</p>}
        {children}
      </div>
    )}
  </div>
);

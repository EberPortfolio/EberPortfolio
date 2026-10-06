import React from 'react';

// Full-bleed layout with tight gutters, capped for very wide screens
export const containerClass = 'mx-auto w-full max-w-[1760px] px-5 sm:px-8 lg:px-10';

export const sectionClass = `${containerClass} py-24 sm:py-32 scroll-mt-16`;

// Chapter-style heading, flush left: a numbered marker over a sentence-case
// title, with the item count set as a typographic superscript.
export const SectionHeader = ({ index, title, count, description, children }) => (
  <div className="mb-10 sm:mb-14">
    <div className="border-t border-zinc-300 dark:border-zinc-800 pt-5 space-y-3">
      <span className="block text-sm font-mono font-medium tabular-nums text-zinc-400 dark:text-zinc-500">
        {index}
      </span>
      <h2 className="text-4xl sm:text-6xl font-medium tracking-[-0.04em] leading-none text-zinc-950 dark:text-white">
        {title}
        {count !== undefined && (
          <sup className="ml-2 text-base sm:text-lg font-medium tracking-normal tabular-nums text-zinc-500 align-super">
            {count}
          </sup>
        )}
      </h2>
    </div>
    {(description || children) && (
      <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {description && <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-xl">{description}</p>}
        {children}
      </div>
    )}
  </div>
);

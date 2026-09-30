import React from 'react';

// Text tabs shared by Work and Eber Art; `categories` is [{ id, name, count? }]
export const ProjectFilter = ({ categories, activeCategory, onSelectCategory, label = 'Filtrar' }) => (
  <div role="group" aria-label={label} className="flex items-center gap-6 overflow-x-auto no-scrollbar">
    {categories.map((category) => {
      const isActive = activeCategory === category.id;
      return (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelectCategory(category.id)}
          aria-pressed={isActive}
          className={`shrink-0 text-[13px] font-medium uppercase tracking-[0.02em] pb-1 border-b transition-colors cursor-pointer ${
            isActive
              ? 'text-zinc-950 border-zinc-950 dark:text-white dark:border-white'
              : 'text-zinc-600 border-transparent hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white'
          }`}
        >
          {category.name}
          {category.count !== undefined && (
            <span className="ml-1.5 text-zinc-400 dark:text-zinc-500 tabular-nums">{category.count}</span>
          )}
        </button>
      );
    })}
  </div>
);

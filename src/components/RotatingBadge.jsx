import React, { useId } from 'react';
import { ArrowDown } from 'lucide-react';

// Circular type set on a path, turning slowly
export const RotatingBadge = ({ text, onClick, label }) => {
  const pathId = useId();

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className="group relative w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-full text-zinc-950 dark:text-white cursor-pointer"
    >
      <svg
        viewBox="0 0 120 120"
        className="absolute inset-0 w-full h-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path id={pathId} d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-current text-[10.5px] font-semibold uppercase" style={{ letterSpacing: '0.2em' }}>
          <textPath href={`#${pathId}`}>{text}</textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto w-11 h-11 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110">
        <ArrowDown className="w-4 h-4 transition-transform duration-500 group-hover:translate-y-0.5" />
      </span>
    </button>
  );
};

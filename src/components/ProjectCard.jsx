import React from 'react';
import { motion } from 'framer-motion';
import { cloudinaryImage } from '../lib/cloudinary';

const GRID_SIZES = '(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 100vw';
const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';

// Shared by Work and Eber Art. Without onClick the card is static.
export const ProjectCard = ({ image, gravity = 'auto', title, meta, onClick }) => {
  const isInteractive = Boolean(onClick);
  const Wrapper = isInteractive ? motion.button : motion.div;

  return (
    <Wrapper
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      {...(isInteractive && { type: 'button', onClick })}
      className={`group block w-full text-left ${isInteractive ? 'cursor-pointer' : ''}`}
    >
      <span className="reveal-clip relative block aspect-[4/5] overflow-hidden bg-zinc-200 dark:bg-zinc-900">
        <img
          {...cloudinaryImage(image, { sizes: GRID_SIZES, crop: 'fill', aspectRatio: '4:5', gravity })}
          alt=""
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover ${
            isInteractive ? `transition-transform duration-[1.2s] ${EASE} group-hover:scale-[1.045]` : ''
          }`}
        />
        {isInteractive && (
          <span
            className={`absolute left-4 bottom-4 px-3 py-1.5 bg-zinc-50 text-zinc-950 text-[12px] font-medium uppercase tracking-[0.02em] opacity-0 translate-y-2 transition-all duration-500 ${EASE} group-hover:opacity-100 group-hover:translate-y-0 group-focus-visible:opacity-100 group-focus-visible:translate-y-0`}
          >
            Ver caso
          </span>
        )}
      </span>
      <span className="mt-3 flex items-baseline justify-between gap-4 text-[13px] font-medium uppercase tracking-[0.02em]">
        <span className="text-zinc-950 dark:text-white">{title}</span>
        {meta && <span className="shrink-0 whitespace-nowrap text-right text-zinc-500 dark:text-zinc-400">{meta}</span>}
      </span>
    </Wrapper>
  );
};

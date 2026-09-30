import React from 'react';
import { fullName } from '../data/profile';
import { containerClass } from './SectionHeader';
import { RollText } from './RollText';
import { KineticHeadline } from './KineticHeadline';

// Closing signature: the name set huge, carved by the cursor like the hero
export const Footer = ({ onNavigate }) => (
  <footer className={`${containerClass} pt-20 sm:pt-28 pb-6 border-t border-zinc-300 dark:border-zinc-800 overflow-hidden`}>
    <KineticHeadline
      as="p"
      lines={[[{ text: fullName }]]}
      className="text-[31vw] leading-[0.78] tracking-[-0.07em] text-zinc-950 dark:text-white select-none -ml-[0.04em]"
    />
    <div className="mt-8 flex items-center justify-between gap-4 text-sm text-zinc-500 dark:text-zinc-400">
      <span>© {new Date().getFullYear()}</span>
      <button
        type="button"
        onClick={() => onNavigate('home')}
        className="group text-zinc-950 dark:text-white font-medium cursor-pointer"
      >
        <RollText>Volver arriba ↑</RollText>
      </button>
    </div>
  </footer>
);

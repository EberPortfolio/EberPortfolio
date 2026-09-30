import React from 'react';
import { fullName } from '../data/profile';
import { containerClass } from './SectionHeader';
import { RollText } from './RollText';

export const Footer = ({ onNavigate }) => (
  <footer className={`${containerClass} py-6 border-t border-zinc-300 dark:border-zinc-800`}>
    <div className="flex items-center justify-between gap-4 text-[13px] font-medium uppercase tracking-[0.02em] text-zinc-950 dark:text-white">
      <span>
        {fullName} © {new Date().getFullYear()}
      </span>
      <button type="button" onClick={() => onNavigate('home')} className="group cursor-pointer">
        <RollText>Volver arriba ↑</RollText>
      </button>
    </div>
  </footer>
);

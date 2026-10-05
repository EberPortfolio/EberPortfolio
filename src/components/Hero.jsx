import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { KineticHeadline } from './KineticHeadline';
import { containerClass } from './SectionHeader';

// Set like Eber's own posters: condensed type filling the frame, one colour per letter.
// On phones the words stack by syllable, as in his "BRAN / DING" post.
const HEADLINE = ['DISEÑO &', 'DIRECCIÓN'];
const HEADLINE_MOBILE = ['DISE', 'ÑO &', 'DIREC', 'CIÓN'];

// His disciplines, coloured as in the label stack of his posts
const DISCIPLINES = [
  { label: 'Diseño', color: 'var(--eber-yellow)' },
  { label: 'Tipografía', color: 'var(--eber-red)' },
  { label: 'Ilustración', color: 'var(--eber-blue)' }
];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }
});

export const Hero = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%']);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`${containerClass} min-h-svh flex flex-col pt-24 sm:pt-28 pb-8 sm:pb-10`}
    >
      <motion.ul
        {...fadeUp(0.6)}
        className="self-end text-right font-display font-extrabold text-lg sm:text-2xl leading-[1.05] tracking-[0.01em]"
        aria-label="Disciplinas"
      >
        {DISCIPLINES.map((d) => (
          <li key={d.label} style={{ color: d.color }}>
            {d.label}
          </li>
        ))}
      </motion.ul>

      <motion.div style={{ y: headlineY }} className="my-auto py-6 select-none">
        <KineticHeadline
          lines={HEADLINE}
          mobileLines={HEADLINE_MOBILE}
          cycle
          baseWeight={900}
          className="font-display uppercase text-[min(37vw,24svh)] sm:text-[min(24.5vw,33svh)] leading-[0.86] sm:leading-[0.8] tracking-[-0.01em] text-zinc-950 dark:text-white -ml-[0.03em]"
        />
      </motion.div>

      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
        <motion.p
          {...fadeUp(0.35)}
          className="max-w-md text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-snug text-pretty"
        >
          Identidades visuales, conceptos de marca y dirección de arte para la industria textil, el entretenimiento y los contenidos infantiles.
        </motion.p>

        <motion.div {...fadeUp(0.5)} className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => onNavigate('work')}
            className="group px-7 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-black text-xs font-mono uppercase tracking-wider font-semibold hover:bg-eber-blue hover:text-white dark:hover:bg-eber-blue dark:hover:text-white transition-colors cursor-pointer inline-flex items-center gap-2.5"
          >
            <span>Ver trabajos</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white text-xs font-mono uppercase tracking-wider font-semibold hover:border-eber-red hover:text-eber-red transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </motion.div>
      </div>
    </section>
  );
};

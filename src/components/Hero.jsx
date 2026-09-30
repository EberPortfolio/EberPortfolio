import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { KineticHeadline } from './KineticHeadline';
import { containerClass } from './SectionHeader';

const HEADLINE = ['DISEÑO &', 'DIRECCIÓN'];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] }
});

export const Hero = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-15%']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`${containerClass} min-h-[90svh] flex flex-col justify-center pt-28 sm:pt-36 pb-16 sm:pb-24`}
    >
      {/* Titular Principal & Bajada */}
      <div className="my-auto py-8 sm:py-14 text-center select-none">
        <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
          <KineticHeadline
            lines={HEADLINE}
            baseWeight={900}
            className="uppercase font-black text-[clamp(2.6rem,14.5vw,13.8rem)] leading-[0.82] tracking-[-0.055em] text-zinc-950 dark:text-white"
          />
        </motion.div>

        {/* Bajada Descriptiva */}
        <motion.p
          {...fadeUp(0.35)}
          className="mt-8 sm:mt-10 max-w-2xl mx-auto text-xs sm:text-sm font-mono uppercase tracking-[0.09em] text-zinc-600 dark:text-zinc-400 leading-relaxed text-balance"
        >
          Identidades visuales, conceptos de marca y dirección de arte para la industria textil, el entretenimiento y los contenidos infantiles.
        </motion.p>

        {/* Únicamente dos CTAs */}
        <motion.div
          {...fadeUp(0.5)}
          className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <button
            type="button"
            onClick={() => onNavigate('work')}
            className="group px-7 py-3.5 bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 text-xs font-mono uppercase tracking-wider font-semibold hover:opacity-90 transition-all cursor-pointer inline-flex items-center gap-2.5 shadow-xs"
          >
            <span>Ver trabajos</span>
            <ArrowDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 border border-zinc-300 dark:border-zinc-700 text-zinc-950 dark:text-white text-xs font-mono uppercase tracking-wider font-semibold hover:border-zinc-950 dark:hover:border-white transition-colors cursor-pointer"
          >
            Contacto
          </button>
        </motion.div>
      </div>
    </section>
  );
};

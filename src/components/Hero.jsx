import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { KineticHeadline } from './KineticHeadline';
import { RotatingBadge } from './RotatingBadge';
import { containerClass } from './SectionHeader';

const HEADLINE = ['Diseñador gráfico,', 'ilustrador', '& tipógrafo'];

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }
});

export const Hero = ({ onNavigate }) => {
  const sectionRef = useRef(null);
  // As the hero leaves, the headline drifts up and fades: a quiet parallax
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-18%']);
  const headlineOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.15]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={`${containerClass} min-h-[100svh] flex flex-col justify-between pt-28 sm:pt-32 pb-8 sm:pb-10`}
    >
      <motion.div style={{ y: headlineY, opacity: headlineOpacity }}>
        <KineticHeadline
          lines={HEADLINE}
          className="uppercase text-[10.8vw] sm:text-[9.2vw] lg:text-[8.2vw] leading-[0.9] tracking-[-0.045em] text-zinc-950 dark:text-white select-none"
        />
      </motion.div>

      <div className="grid grid-cols-12 gap-x-5 gap-y-5 items-start border-t border-zinc-300 dark:border-zinc-800 pt-6">
        <motion.p {...fadeUp(0.6)} className="col-span-6 sm:col-span-3 label pt-1">
          Qué hago
        </motion.p>
        <motion.p
          {...fadeUp(0.7)}
          className="order-3 sm:order-2 col-span-12 sm:col-span-6 lg:col-span-5 text-base sm:text-xl leading-snug text-zinc-800 dark:text-zinc-200 text-pretty"
        >
          Creo identidades visuales, conceptos y universos de marca, y dirijo arte para la industria textil, el entretenimiento y los contenidos infantiles.
        </motion.p>
        <motion.div {...fadeUp(0.85)} className="order-2 sm:order-3 col-span-6 sm:col-span-3 lg:col-span-4 flex justify-end sm:self-end">
          <RotatingBadge
            text="Ver trabajos · Ver trabajos · "
            label="Ver trabajos"
            onClick={() => onNavigate('work')}
          />
        </motion.div>
      </div>
    </section>
  );
};

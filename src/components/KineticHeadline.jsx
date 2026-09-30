import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../lib/smoothScroll';

// Inter Variable weight axis: letters rest heavy and thin out near the pointer,
// as if the cursor carved the type. Only on devices with a fine pointer.
const BASE_WEIGHT = 720;
const MIN_WEIGHT = 180;
const RADIUS = 260;

export const KineticHeadline = ({ lines, className = '' }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

    const chars = Array.from(container.querySelectorAll('[data-char]'));
    let centers = [];
    let pointer = null;
    let frame = null;

    const measure = () => {
      centers = chars.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
    };

    const paint = () => {
      frame = null;
      chars.forEach((el, i) => {
        let weight = BASE_WEIGHT;
        if (pointer) {
          const dx = centers[i].x - pointer.x;
          const dy = centers[i].y - pointer.y;
          const falloff = Math.max(0, 1 - Math.hypot(dx, dy) / RADIUS);
          weight = BASE_WEIGHT - (BASE_WEIGHT - MIN_WEIGHT) * falloff * falloff;
        }
        el.style.fontVariationSettings = `'wght' ${Math.round(weight)}`;
      });
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const handleMove = (e) => {
      // Re-measure lazily: positions change with scroll and with the weight itself
      if (!pointer) measure();
      pointer = { x: e.clientX, y: e.clientY };
      schedule();
    };
    const handleLeave = () => {
      pointer = null;
      schedule();
    };
    const handleResize = () => {
      measure();
      schedule();
    };

    container.addEventListener('pointermove', handleMove);
    container.addEventListener('pointerleave', handleLeave);
    window.addEventListener('scroll', handleLeave, { passive: true });
    window.addEventListener('resize', handleResize);
    return () => {
      container.removeEventListener('pointermove', handleMove);
      container.removeEventListener('pointerleave', handleLeave);
      window.removeEventListener('scroll', handleLeave);
      window.removeEventListener('resize', handleResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <h1 ref={containerRef} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, lineIdx) => (
        // Each line slides up from behind its own mask on load
        <span key={line} className="block overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.06em] -mb-[0.06em]" aria-hidden="true">
          <motion.span
            className="block"
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.15 + lineIdx * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            {line.split(' ').map((word, wordIdx) => (
              <React.Fragment key={wordIdx}>
                {wordIdx > 0 && ' '}
                <span className="inline-block whitespace-nowrap">
                  {Array.from(word).map((char, charIdx) => (
                    <span
                      key={charIdx}
                      data-char
                      className="inline-block transition-[font-variation-settings] duration-500 ease-out"
                      style={{ fontVariationSettings: `'wght' ${BASE_WEIGHT}` }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </React.Fragment>
            ))}
          </motion.span>
        </span>
      ))}
    </h1>
  );
};

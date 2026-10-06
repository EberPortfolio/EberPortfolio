import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../lib/smoothScroll';

// Inter Variable weight axis: letters rest heavy and thin out near the pointer,
// as if the cursor carved the type. Only on devices with a fine pointer.
export const BASE_WEIGHT = 720;
const MIN_WEIGHT = 180;
const RADIUS = 260;
const EASE = [0.16, 1, 0.3, 1];


const Chars = ({ text, weight = BASE_WEIGHT }) =>
  text.split(' ').map((word, wordIdx) => (
    <React.Fragment key={wordIdx}>
      {wordIdx > 0 && ' '}
      <span className="inline-block whitespace-nowrap">
        {Array.from(word).map((char, charIdx) => (
          <span
            key={charIdx}
            data-char
            className="inline-block transition-[font-variation-settings] duration-500 ease-out"
            style={{ fontVariationSettings: `'wght' ${weight}` }}
          >
            {char}
          </span>
        ))}
      </span>
    </React.Fragment>
  ));

// lines can be a simple array of strings: ['line 1', 'line 2'] or formatted segments: [[{ text }]]
export const KineticHeadline = ({ lines, className = '', readoutRef, as: Tag = 'h1', delay = 0, baseWeight = 850 }) => {
  const containerRef = useRef(null);
  const normalizedLines = lines.map((line) => {
    if (typeof line === 'string') return [{ text: line }];
    if (Array.isArray(line)) return line.map((item) => (typeof item === 'string' ? { text: item } : item));
    return [{ text: String(line) }];
  });
  const plainText = normalizedLines.map((line) => line.map((s) => s.text).join('')).join(' ');

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
      let lightest = baseWeight;
      chars.forEach((el, i) => {
        let weight = baseWeight;
        if (pointer) {
          const falloff = Math.max(0, 1 - Math.hypot(centers[i].x - pointer.x, centers[i].y - pointer.y) / RADIUS);
          weight = Math.round(baseWeight - (baseWeight - MIN_WEIGHT) * falloff * falloff);
        }
        lightest = Math.min(lightest, weight);
        el.style.fontVariationSettings = `'wght' ${weight}`;
      });
      if (readoutRef?.current) {
        readoutRef.current.textContent = lightest < baseWeight ? `${lightest} → ${baseWeight}` : String(baseWeight);
      }
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
  }, [readoutRef, baseWeight]);

  return (
    <Tag ref={containerRef} className={className} aria-label={plainText}>
      {normalizedLines.map((line, lineIdx) => (
        // Each line slides up from behind its own mask on load
        <span
          key={lineIdx}
          className="block overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.2em] -mb-[0.2em]"
          aria-hidden="true"
        >
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: delay + 0.15 + lineIdx * 0.12, ease: EASE }}
          >
            {line.map((segment, segIdx) =>
              segment.em ? (
                <span key={segIdx} className="relative inline-block italic">
                  <Chars text={segment.text} weight={baseWeight} />
                </span>
              ) : (
                <Chars key={segIdx} text={segment.text} weight={baseWeight} />
              )
            )}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
};

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { prefersReducedMotion } from '../lib/smoothScroll';
import { cycleColor, countLetters } from '../lib/cycle';

// Variable weight axis: letters rest heavy and thin out near the pointer,
// as if the cursor carved the type. Only on devices with a fine pointer.
export const BASE_WEIGHT = 720;
const MIN_WEIGHT = 180;
const RADIUS = 260;
const EASE = [0.16, 1, 0.3, 1];

// `colorFrom` (a number) paints each letter with Eber's colour cycle, starting there
const Chars = ({ text, weight = BASE_WEIGHT, colorFrom }) => {
  let n = colorFrom ?? 0;
  return text.split(' ').map((word, wordIdx) => (
    <React.Fragment key={wordIdx}>
      {wordIdx > 0 && ' '}
      <span className="inline-block whitespace-nowrap">
        {Array.from(word).map((char, charIdx) => {
          const color = colorFrom !== undefined && countLetters(char) ? cycleColor(n++) : undefined;
          return (
            <span
              key={charIdx}
              data-char
              className="inline-block transition-[font-variation-settings] duration-500 ease-out"
              style={{ fontVariationSettings: `'wght' ${weight}`, color }}
            >
              {char}
            </span>
          );
        })}
      </span>
    </React.Fragment>
  ));
};

const normalize = (lines) =>
  lines.map((line) => {
    if (typeof line === 'string') return [{ text: line }];
    if (Array.isArray(line)) return line.map((item) => (typeof item === 'string' ? { text: item } : item));
    return [{ text: String(line) }];
  });

// One stack of lines, each sliding up from behind its own mask on load
const LineStack = ({ lines, baseWeight, delay, cycle, className = '' }) => {
  // Where each segment starts in the colour cycle, so it runs on across lines
  const starts = lines.map(() => []);
  let total = 0;
  lines.forEach((line, lineIdx) =>
    line.forEach((segment) => {
      starts[lineIdx].push(total);
      total += countLetters(segment.text);
    })
  );
  return (
    <span className={className} aria-hidden="true">
      {lines.map((line, lineIdx) => (
        <span key={lineIdx} className="block overflow-hidden pt-[0.14em] -mt-[0.14em] pb-[0.2em] -mb-[0.2em]">
          <motion.span
            className="block"
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: delay + 0.15 + lineIdx * 0.12, ease: EASE }}
          >
            {line.map((segment, segIdx) => {
              const colorFrom = cycle ? starts[lineIdx][segIdx] : undefined;
              return (
                <span
                  key={segIdx}
                  className={segment.em ? 'relative inline-block italic' : 'inline'}
                  style={segment.color ? { color: segment.color } : undefined}
                >
                  <Chars text={segment.text} weight={baseWeight} colorFrom={colorFrom} />
                </span>
              );
            })}
          </motion.span>
        </span>
      ))}
    </span>
  );
};

// lines: ['line 1', 'line 2'] or formatted segments [[{ text, em, color }]].
// mobileLines: optional alternative line breaks below the sm breakpoint.
// cycle: paint the letters with Eber's colour sequence (continuous across lines).
export const KineticHeadline = ({
  lines,
  mobileLines,
  cycle = false,
  className = '',
  readoutRef,
  as: Tag = 'h1',
  delay = 0,
  baseWeight = 850
}) => {
  const containerRef = useRef(null);
  const normalizedLines = normalize(lines);
  const plainText = normalizedLines.map((line) => line.map((s) => s.text).join('')).join(' ');

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return;

    // Only the letters actually on screen (the other breakpoint's stack is display:none)
    const chars = Array.from(container.querySelectorAll('[data-char]'));
    let centers = [];
    let pointer = null;
    let frame = null;

    const measure = () => {
      centers = chars.map((el) => {
        const r = el.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, visible: r.width > 0 };
      });
    };

    const paint = () => {
      frame = null;
      let lightest = baseWeight;
      chars.forEach((el, i) => {
        if (!centers[i]?.visible) return;
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

  const props = { baseWeight, delay, cycle };
  return (
    <Tag ref={containerRef} className={className} aria-label={plainText}>
      {mobileLines ? (
        <>
          <LineStack {...props} lines={normalize(mobileLines)} className="block sm:hidden" />
          <LineStack {...props} lines={normalizedLines} className="hidden sm:block" />
        </>
      ) : (
        <LineStack {...props} lines={normalizedLines} className="block" />
      )}
    </Tag>
  );
};

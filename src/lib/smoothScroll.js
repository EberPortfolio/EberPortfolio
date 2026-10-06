import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Inertial scrolling for the whole page. Skipped when the visitor asks for reduced motion.
let lenis = null;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const initSmoothScroll = () => {
  if (lenis || prefersReducedMotion()) return () => {};
  lenis = new Lenis({ autoRaf: true, lerp: 0.09 });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
};

// Freeze page scroll behind overlays (menu, lightbox); returns the unlock function
export const lockScroll = () => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  lenis?.stop();
  return () => {
    document.body.style.overflow = previousOverflow;
    lenis?.start();
  };
};

// target: 'top', a pixel offset or an element id
export const scrollToTarget = (target, { immediate = false } = {}) => {
  const element = typeof target === 'string' && target !== 'top' ? document.getElementById(target) : null;
  const destination = target === 'top' ? 0 : element ?? target;
  if (destination === null || destination === undefined) return;

  if (lenis) {
    // The page may have just changed height (gallery <-> case study): re-measure first
    lenis.resize();
    lenis.scrollTo(destination, { immediate, force: true, duration: 1.2 });
    return;
  }
  const top = typeof destination === 'number' ? destination : destination.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top, behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth' });
};

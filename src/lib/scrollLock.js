// Freeze page scroll behind overlays (lightbox); returns the unlock function
export const lockScroll = () => {
  const previousOverflow = document.body.style.overflow;
  document.body.style.overflow = 'hidden';
  return () => {
    document.body.style.overflow = previousOverflow;
  };
};

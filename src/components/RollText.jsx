import React from 'react';

// Hover micro-interaction: the label rolls up and an identical copy takes its place.
// The parent needs the `group` class.
export const RollText = ({ children }) => (
  <span className="relative inline-flex overflow-hidden align-bottom">
    <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full group-focus-visible:-translate-y-full">
      {children}
    </span>
    <span
      aria-hidden="true"
      className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0"
    >
      {children}
    </span>
  </span>
);

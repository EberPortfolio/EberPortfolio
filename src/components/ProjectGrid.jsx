import React from 'react';
import { AnimatePresence } from 'framer-motion';

// Same three-column rhythm for Work and Eber Art
export const ProjectGrid = ({ children }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-12">
    <AnimatePresence mode="popLayout">{children}</AnimatePresence>
  </div>
);

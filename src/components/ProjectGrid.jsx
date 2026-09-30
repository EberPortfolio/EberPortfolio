import React from 'react';
import { ProjectCard } from './ProjectCard';
import { AnimatePresence } from 'framer-motion';

export const ProjectGrid = ({ projects, onSelectProject, cursorHandlers }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12">
      <AnimatePresence mode="popLayout">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onClick={onSelectProject}
            cursorHandlers={cursorHandlers}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

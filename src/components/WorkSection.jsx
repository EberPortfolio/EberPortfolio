import React, { useState } from 'react';
import { WORK_PROJECTS, CATEGORIES } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { ProjectGrid } from './ProjectGrid';
import { SectionHeader, sectionClass } from './SectionHeader';

export const WorkSection = ({ onOpenProject, index }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = CATEGORIES
    .map((c) => ({
      ...c,
      count: c.id === 'all' ? WORK_PROJECTS.length : WORK_PROJECTS.filter((p) => p.category === c.id).length
    }))
    .filter((c) => c.count > 0);

  const projects = activeCategory === 'all'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section id="work" className={sectionClass}>
      <SectionHeader index={index} title="Trabajos seleccionados" count={WORK_PROJECTS.length}>
        {/* Filtering only makes sense once there are two or more categories */}
        {categories.length > 2 && (
          <ProjectFilter
            label="Filtrar trabajos"
            categories={categories}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
          />
        )}
      </SectionHeader>

      <ProjectGrid>
        {projects.map((project, idx) => (
          <ProjectCard
            key={project.id}
            image={project.thumbnail}
            gravity={project.thumbnailGravity}
            index={String(idx + 1).padStart(2, '0')}
            title={project.title}
            meta={project.categoryLabel}
            onClick={() => onOpenProject(project)}
          />
        ))}
      </ProjectGrid>
    </section>
  );
};

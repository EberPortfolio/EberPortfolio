import React, { useState } from 'react';
import { EBER_ART_SECTIONS, EBER_ART_ITEMS } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { ProjectFilter } from './ProjectFilter';
import { ProjectGrid } from './ProjectGrid';
import { SectionHeader, sectionClass } from './SectionHeader';

const sectionName = (id) => EBER_ART_SECTIONS.find((s) => s.id === id)?.name;

export const EberArtSection = ({ index }) => {
  const [activeTab, setActiveTab] = useState('all');

  const tabs = [
    { id: 'all', name: 'Todo', count: EBER_ART_ITEMS.length },
    ...EBER_ART_SECTIONS.map((s) => ({
      ...s,
      count: EBER_ART_ITEMS.filter((item) => item.category === s.id).length
    }))
  ].filter((tab) => tab.count > 0);

  const items = activeTab === 'all'
    ? EBER_ART_ITEMS
    : EBER_ART_ITEMS.filter((item) => item.category === activeTab);

  return (
    <section id="eber-art" className={sectionClass}>
      <SectionHeader index={index} title="Eber Art" count={EBER_ART_ITEMS.length} description="Obra personal: ilustración, letras y docencia.">
        {tabs.length > 2 && (
          <ProjectFilter
            label="Filtrar obra personal"
            categories={tabs}
            activeCategory={activeTab}
            onSelectCategory={setActiveTab}
          />
        )}
      </SectionHeader>

      <ProjectGrid>
        {items.map((item, idx) => (
          <ProjectCard
            key={item.id}
            image={item.image}
            index={String(idx + 1).padStart(2, '0')}
            title={item.title}
            meta={[sectionName(item.category), item.year].filter(Boolean).join(' · ')}
          />
        ))}
      </ProjectGrid>
    </section>
  );
};

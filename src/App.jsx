import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useCustomCursor } from './hooks/useCustomCursor';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { ProjectFilter } from './components/ProjectFilter';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectDetail } from './components/ProjectDetail';
import { EberArtSection } from './components/EberArtSection';
import { ServicesSection } from './components/ServicesSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WORK_PROJECTS, CATEGORIES } from './data/projects';
import { AnimatePresence } from 'framer-motion';

function PortfolioApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const cursorState = useCustomCursor();

  const filteredProjects = activeCategory === 'all'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((p) => p.category === activeCategory);

  const handleNavigate = (sectionId) => {
    const wasInDetail = Boolean(selectedProject);
    if (wasInDetail) {
      setSelectedProject(null);
    }

    setTimeout(() => {
      if (sectionId === 'home' || sectionId === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, wasInDetail ? 150 : 10);
  };

  return (
    <div className="min-h-screen bg-grid-pattern selection:bg-zinc-950 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 transition-colors duration-300" style={{ backgroundColor: 'inherit', color: 'inherit' }}>
      
      {/* Custom Pointer Cursor */}
      <CustomCursor cursorState={cursorState} />

      {/* Navbar with Clean Navigation (WORK, EBER ART, ABOUT ME, CONTACT) */}
      <Navbar
        onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
        onNavigate={handleNavigate}
        cursorHandlers={{
          onButtonHover: cursorState.onButtonHover,
          onHoverLeave: cursorState.onHoverLeave
        }}
      />

      {/* Full-Screen Mobile Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      {/* View Switch: Dedicated Project Detail View vs Main Portfolio View */}
      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="project-detail"
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onSelectProject={setSelectedProject}
            cursorHandlers={{
              onButtonHover: cursorState.onButtonHover,
              onHoverLeave: cursorState.onHoverLeave
            }}
          />
        ) : (
          <main key="main-gallery">
            {/* Hero Section */}
            <Hero
              onNavigate={handleNavigate}
              cursorHandlers={{
                onButtonHover: cursorState.onButtonHover,
                onHoverLeave: cursorState.onHoverLeave
              }}
            />

            {/* SECTION 1: WORK (Commercial Client Projects) */}
            <section id="work" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-200 dark:border-zinc-800">
              
              <div className="space-y-4 mb-10">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500 font-semibold">
                  COMERCIAL & CLIENTES // WORK (10 PROYECTOS)
                </span>
                <h2 className="text-3xl sm:text-5xl font-light tracking-tight text-zinc-950 dark:text-white">
                  Casos de estudio & proyectos de cliente
                </h2>
              </div>

              {/* Animated Category Filter */}
              <div className="mb-12">
                <ProjectFilter
                  activeCategory={activeCategory}
                  onSelectCategory={setActiveCategory}
                  cursorHandlers={{
                    onButtonHover: cursorState.onButtonHover,
                    onHoverLeave: cursorState.onHoverLeave
                  }}
                />
              </div>

              {/* Responsive Projects Grid */}
              <ProjectGrid
                projects={filteredProjects}
                onSelectProject={setSelectedProject}
                cursorHandlers={{
                  onProjectHover: cursorState.onProjectHover,
                  onButtonHover: cursorState.onButtonHover,
                  onHoverLeave: cursorState.onHoverLeave
                }}
              />

            </section>

            {/* SECTION 2: EBER ART (Obra independiente: Ilustración, Letras, Docencia) */}
            <div id="eber-art">
              <EberArtSection
                cursorHandlers={{
                  onButtonHover: cursorState.onButtonHover,
                  onHoverLeave: cursorState.onHoverLeave
                }}
              />
            </div>

            {/* Services & Process Section */}
            <ServicesSection
              cursorHandlers={{
                onButtonHover: cursorState.onButtonHover,
                onHoverLeave: cursorState.onHoverLeave
              }}
            />

            {/* SECTION 3: ABOUT ME */}
            <div id="about-me">
              <AboutSection
                cursorHandlers={{
                  onButtonHover: cursorState.onButtonHover,
                  onHoverLeave: cursorState.onHoverLeave
                }}
              />
            </div>

            {/* SECTION 4: CONTACT */}
            <div id="contact">
              <ContactSection
                cursorHandlers={{
                  onButtonHover: cursorState.onButtonHover,
                  onHoverLeave: cursorState.onHoverLeave
                }}
              />
            </div>
          </main>
        )}
      </AnimatePresence>

      {/* Footer */}
      <Footer
        onNavigate={handleNavigate}
        cursorHandlers={{
          onButtonHover: cursorState.onButtonHover,
          onHoverLeave: cursorState.onHoverLeave
        }}
      />

    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <PortfolioApp />
    </ThemeProvider>
  );
}

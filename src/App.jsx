import React, { useState, useEffect, useRef, useCallback } from 'react';
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
import { WORK_PROJECTS } from './data/projects';
import { AnimatePresence } from 'framer-motion';

// Case studies are addressable as #caso/<id> so they can be shared and the
// browser back button returns to the gallery
const CASE_HASH_PREFIX = '#caso/';

const projectFromHash = () => {
  if (!window.location.hash.startsWith(CASE_HASH_PREFIX)) return null;
  const id = decodeURIComponent(window.location.hash.slice(CASE_HASH_PREFIX.length));
  return WORK_PROJECTS.find((p) => p.id === id) || null;
};

const clearHash = () => {
  window.history.replaceState(null, '', window.location.pathname + window.location.search);
};

const scrollToSection = (sectionId, behavior = 'smooth') => {
  if (sectionId === 'home' || sectionId === 'top') {
    window.scrollTo({ top: 0, behavior });
    return;
  }
  document.getElementById(sectionId)?.scrollIntoView({ behavior });
};

function PortfolioApp() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(projectFromHash);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const galleryScrollRef = useRef(null);
  const pushedHistoryRef = useRef(false);
  // Scroll to run once the detail view has finished leaving and the gallery is mounted
  const afterDetailExitRef = useRef(null);

  const cursorState = useCustomCursor();

  const filteredProjects = activeCategory === 'all'
    ? WORK_PROJECTS
    : WORK_PROJECTS.filter((p) => p.category === activeCategory);

  const leaveDetail = (afterExit) => {
    afterDetailExitRef.current = afterExit;
    setSelectedProject(null);
  };

  const restoreGalleryScroll = () => {
    const top = galleryScrollRef.current;
    if (top === null) {
      scrollToSection('work', 'auto');
    } else {
      window.scrollTo({ top });
    }
  };

  // Runs when the gallery <main> is attached, i.e. after the detail finished its
  // exit animation. Scrolling earlier hits a short page and scroll anchoring then
  // pins the viewport to the footer.
  const handleGalleryMount = useCallback((node) => {
    if (!node || !afterDetailExitRef.current) return;
    const afterExit = afterDetailExitRef.current;
    afterDetailExitRef.current = null;
    afterExit();
  }, []);

  const selectedProjectRef = useRef(selectedProject);
  useEffect(() => {
    selectedProjectRef.current = selectedProject;
  }, [selectedProject]);

  useEffect(() => {
    // Back/forward and pasted #caso links (a hash-only change may fire just hashchange)
    const syncWithUrl = () => {
      const project = projectFromHash();
      if (project) {
        if (project !== selectedProjectRef.current) setSelectedProject(project);
      } else if (selectedProjectRef.current) {
        pushedHistoryRef.current = false;
        leaveDetail(restoreGalleryScroll);
      }
    };
    window.addEventListener('popstate', syncWithUrl);
    window.addEventListener('hashchange', syncWithUrl);
    return () => {
      window.removeEventListener('popstate', syncWithUrl);
      window.removeEventListener('hashchange', syncWithUrl);
    };
  }, []);

  const openProject = (project) => {
    const hash = `${CASE_HASH_PREFIX}${project.id}`;
    if (selectedProject) {
      // Moving between cases keeps a single history entry, so "back" returns to the gallery
      window.history.replaceState(null, '', hash);
    } else {
      galleryScrollRef.current = window.scrollY;
      window.history.pushState(null, '', hash);
      pushedHistoryRef.current = true;
    }
    setSelectedProject(project);
  };

  const closeProject = () => {
    if (pushedHistoryRef.current) {
      window.history.back(); // popstate closes the detail and restores the scroll
      return;
    }
    // Opened from a shared link: there is no gallery entry to go back to
    clearHash();
    leaveDetail(restoreGalleryScroll);
  };

  const handleNavigate = (sectionId) => {
    if (selectedProject) {
      clearHash();
      pushedHistoryRef.current = false;
      leaveDetail(() => scrollToSection(sectionId));
      return;
    }
    scrollToSection(sectionId);
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
            onClose={closeProject}
            onSelectProject={openProject}
            cursorHandlers={{
              onButtonHover: cursorState.onButtonHover,
              onHoverLeave: cursorState.onHoverLeave
            }}
          />
        ) : (
          <main key="main-gallery" ref={handleGalleryMount}>
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
                  COMERCIAL & CLIENTES // WORK ({WORK_PROJECTS.length} PROYECTOS)
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
                onSelectProject={openProject}
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
                onNavigate={handleNavigate}
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

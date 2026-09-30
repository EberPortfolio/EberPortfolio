import React, { useState, useEffect, useRef, useCallback } from 'react';
import { AnimatePresence, MotionConfig } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import { Hero } from './components/Hero';
import { WorkSection } from './components/WorkSection';
import { ProjectDetail } from './components/ProjectDetail';
import { EberArtSection } from './components/EberArtSection';
import { AboutSection } from './components/AboutSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { WORK_PROJECTS } from './data/projects';
import { initSmoothScroll, scrollToTarget } from './lib/smoothScroll';

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

const scrollToSection = (sectionId, options) => {
  scrollToTarget(sectionId === 'home' ? 'top' : sectionId, options);
};

function PortfolioApp() {
  const [selectedProject, setSelectedProject] = useState(projectFromHash);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => initSmoothScroll(), []);
  const galleryScrollRef = useRef(null);
  const pushedHistoryRef = useRef(false);
  // Scroll to run once the detail view has finished leaving and the gallery is mounted
  const afterDetailExitRef = useRef(null);

  const leaveDetail = (afterExit) => {
    afterDetailExitRef.current = afterExit;
    setSelectedProject(null);
  };

  const restoreGalleryScroll = () => {
    const top = galleryScrollRef.current;
    if (top === null) {
      scrollToSection('work', { immediate: true });
    } else {
      scrollToTarget(top, { immediate: true });
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
      leaveDetail(() => scrollToSection(sectionId, { immediate: true }));
      return;
    }
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen">
      <Navbar onOpenMobileMenu={() => setIsMobileMenuOpen(true)} onNavigate={handleNavigate} />

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <AnimatePresence mode="wait">
        {selectedProject ? (
          <ProjectDetail
            key="project-detail"
            project={selectedProject}
            onClose={closeProject}
            onSelectProject={openProject}
          />
        ) : (
          <main key="main-gallery" ref={handleGalleryMount}>
            <Hero onNavigate={handleNavigate} />
            <WorkSection onOpenProject={openProject} />
            <EberArtSection />
            <AboutSection onNavigate={handleNavigate} />
            <ExperienceSection />
            <ContactSection />
          </main>
        )}
      </AnimatePresence>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      {/* Animations are skipped when the visitor asks the OS for reduced motion */}
      <MotionConfig reducedMotion="user">
        <PortfolioApp />
      </MotionConfig>
    </ThemeProvider>
  );
}

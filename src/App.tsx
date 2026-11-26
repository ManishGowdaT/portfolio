import { useCallback, useEffect, useRef, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import SkillsSection from './components/SkillsSection';
import ExperienceSection from './components/ExperienceSection';
import ProjectsSection from './components/ProjectsSection';
import AchievementsSection from './components/AchievementsSection';
import EducationSection from './components/EducationSection';
import ContactSection from './components/ContactSection';
import { usePrefersReducedMotion } from './hooks/usePrefersReducedMotion';
import { resolvePortfolioRoute } from './routing/portfolioRoutes';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = [
  'hero', 'about', 'skills', 'experience',
  'projects', 'achievements', 'education', 'contact',
];

export default function App() {
  const reducedMotion = usePrefersReducedMotion();
  const lenisRef = useRef<Lenis | null>(null);
  const [activeSection, setActiveSection] = useState('hero');  /* ── Lenis smooth scroll ── */
  const [currentRoute, setCurrentRoute] = useState(() =>
    resolvePortfolioRoute(window.location.pathname, window.location.hash),
  );
  useEffect(() => {
    if (reducedMotion) return;

    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    if (isTouchDevice) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });
    lenisRef.current = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    document.fonts?.ready.then(() => {
      ScrollTrigger.refresh();
    });

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  /* ── Active section tracking ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    for (const id of SECTION_IDS) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  /* ── Direct routes and browser history ── */
  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = resolvePortfolioRoute(window.location.pathname, window.location.hash);
      setCurrentRoute(nextRoute);
      if (nextRoute.sectionId) {
        requestAnimationFrame(() => {
          document.getElementById(nextRoute.sectionId!)?.scrollIntoView({ behavior: 'auto' });
        });
      }
    };
    window.addEventListener('popstate', syncRoute);
    window.addEventListener('hashchange', syncRoute);
    if (currentRoute.sectionId) {
      requestAnimationFrame(() => {
        document.getElementById(currentRoute.sectionId!)?.scrollIntoView({ behavior: 'auto' });
      });
    }
    return () => {
      window.removeEventListener('popstate', syncRoute);
      window.removeEventListener('hashchange', syncRoute);
    };
  }, []);

  /* ── Programmatic scroll ── */
  const scrollToSection = useCallback((id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: -72 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  /* ── Lock scroll when modal is open ── */
  const handleModalStateChange = useCallback((open: boolean) => {
    if (lenisRef.current) {
      open ? lenisRef.current.stop() : lenisRef.current.start();
    }
    document.body.style.overflow = open ? 'hidden' : '';
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="site-shell overflow-x-clip">
        <a
          href="#main-content"
          className="sr-only fixed top-3 left-3 z-[60] rounded bg-[var(--accent-primary)] px-4 py-2 text-sm font-medium text-white focus:not-sr-only"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          Skip to main content
        </a>

        <Navbar activeSection={activeSection} onNavigate={scrollToSection} />

        <main id="main-content" tabIndex={-1}>
          {currentRoute.notFound ? (
            <section className="route-message">
              <p className="route-code">404</p>
              <h1>Page not found</h1>
              <p>This address doesn’t match a page in Manish’s portfolio.</p>
              <a href="/">Return to home <span aria-hidden="true">↗</span></a>
            </section>
          ) : (
            <>
              <HeroSection reducedMotion={reducedMotion} onNavigate={scrollToSection} />
              <AboutSection reducedMotion={reducedMotion} />
              <SkillsSection reducedMotion={reducedMotion} />
              <ExperienceSection reducedMotion={reducedMotion} />
              <ProjectsSection
                reducedMotion={reducedMotion}
                onModalStateChange={handleModalStateChange}
                routeProjectId={currentRoute.projectId}
                onRouteModalClose={() => {
                  if (currentRoute.projectId) {
                    window.history.replaceState(null, '', '/CaseStudies');
                    setCurrentRoute(resolvePortfolioRoute('/CaseStudies'));
                  }
                }}
              />
              <AchievementsSection reducedMotion={reducedMotion} />
              <EducationSection reducedMotion={reducedMotion} />
              <ContactSection reducedMotion={reducedMotion} />
            </>
          )}
        </main>

        <footer
          className="site-footer"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          <div className="site-footer-inner">
            <span>© {new Date().getFullYear()} Manish Gowda T</span>
            <span>Bengaluru, India</span>
          </div>
        </footer>
      </div>
    </MotionConfig>
  );
}

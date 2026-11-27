import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, BriefcaseBusiness, House, Mail, Menu, UserRound, X } from 'lucide-react';
import { getActiveNavigationId, NAV_ITEMS } from '../routing/navigation';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

const NAV_ICONS = {
  home: House,
  projects: BriefcaseBusiness,
  about: UserRound,
  contact: Mail,
} as const;

function followRoute(
  event: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  onNavigate: (path: string) => void,
) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function Navbar({ currentPath, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const menuDialogRef = useRef<HTMLDivElement>(null);
  const activeId = getActiveNavigationId(currentPath);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => firstLinkRef.current?.focus());

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setMobileOpen(false);
        return;
      }
      if (event.key !== 'Tab' || !menuDialogRef.current) return;

      const focusable = Array.from(
        menuDialogRef.current.querySelectorAll<HTMLElement>('a[href], button:not([disabled])'),
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    const handleBreakpoint = (event: MediaQueryListEvent) => {
      if (event.matches) setMobileOpen(false);
    };

    const desktopBreakpoint = window.matchMedia('(min-width: 1024px)');
    document.addEventListener('keydown', handleKeyDown);
    desktopBreakpoint.addEventListener('change', handleBreakpoint);

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', handleKeyDown);
      desktopBreakpoint.removeEventListener('change', handleBreakpoint);
      if (!window.matchMedia('(min-width: 1024px)').matches) {
        menuButtonRef.current?.focus();
      }
    };
  }, [mobileOpen]);

  const closeMobileMenu = () => setMobileOpen(false);

  return (
    <>
      <header
        className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}
      >
        <div className="site-header-inner">
          <a
            href="/"
            onClick={(event) => followRoute(event, '/', onNavigate)}
            className="brand-pill"
            aria-label="Manish Gowda T — home"
          >
            <span className="brand-dot" aria-hidden="true" />
            <span>Manish Gowda T</span>
          </a>

          <nav className="desktop-nav" aria-label="Primary navigation">
            <div className="desktop-nav-pill">
              {NAV_ITEMS.slice(0, 4).map((item) => {
                const Icon = NAV_ICONS[item.id];
                const active = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.path}
                    onClick={(event) => followRoute(event, item.path, onNavigate)}
                    aria-current={active ? 'page' : undefined}
                    className={`desktop-nav-link ${active ? 'is-active' : ''}`}
                  >
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                );
              })}
            </div>
          </nav>

          <a
            href="/ContactMe"
            onClick={(event) => followRoute(event, '/ContactMe', onNavigate)}
            aria-current={activeId === 'contact' ? 'page' : undefined}
            className={`contact-pill ${activeId === 'contact' ? 'is-active' : ''}`}
          >
            <Mail aria-hidden="true" />
            <span>Contact Me</span>
            <ArrowUpRight className="contact-pill-arrow" aria-hidden="true" />
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="mobile-menu-toggle"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu-dialog"
            onClick={() => setMobileOpen((open) => !open)}
          >
            {mobileOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          </button>
        </div>
      </header>

      <div
        className="mobile-menu-backdrop"
        hidden={!mobileOpen}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeMobileMenu();
        }}
      >
        <div
          ref={menuDialogRef}
          id="mobile-menu-dialog"
          className="mobile-menu-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-menu-title"
        >
          <div className="mobile-menu-heading">
            <h2 id="mobile-menu-title">Explore</h2>
            <button
              type="button"
              className="mobile-menu-close"
              aria-label="Close menu"
              onClick={closeMobileMenu}
            >
              <X aria-hidden="true" />
            </button>
          </div>
          <nav className="mobile-menu-links" aria-label="Mobile navigation">
            {NAV_ITEMS.map((item, index) => {
              const Icon = NAV_ICONS[item.id];
              const active = activeId === item.id;
              return (
                <a
                  key={item.id}
                  ref={index === 0 ? firstLinkRef : undefined}
                  href={item.path}
                  onClick={(event) => {
                    closeMobileMenu();
                    followRoute(event, item.path, onNavigate);
                  }}
                  aria-current={active ? 'page' : undefined}
                  className={`mobile-menu-link ${active ? 'is-active' : ''}`}
                >
                  <span className="mobile-menu-link-label">
                    <Icon aria-hidden="true" />
                    <span>{item.label}</span>
                  </span>
                  <ArrowUpRight aria-hidden="true" />
                </a>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

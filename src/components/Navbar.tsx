import { useEffect, useState } from 'react';

const NAME = 'Manish Gowda T';
const NAV_LINKS = ['projects', 'contact'] as const;
const MOBILE_LINKS = ['about', 'skills', 'experience', 'projects', 'achievements', 'education', 'contact'] as const;

interface NavbarProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const go = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-500 ${
        scrolled
          ? 'border-b border-[var(--border-subtle)] bg-[var(--page-background)]/[0.97] backdrop-blur-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
        {/* Name — left */}
        <a
          href="#hero"
          onClick={(e) => go(e, 'hero')}
          className="text-sm font-medium uppercase tracking-widest text-[var(--text-primary)] transition-colors duration-200 hover:text-[var(--accent-primary)]"
          style={{ fontFamily: 'var(--font-sans)' }}
        >
          {NAME}
        </a>

        {/* Desktop nav — right */}
        <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
          {NAV_LINKS.map((id) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => go(e, id)}
              aria-current={activeSection === id ? 'location' : undefined}
              className="nav-link text-sm font-medium capitalize text-[var(--text-primary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {id}
            </a>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((p) => !p)}
          className="flex flex-col gap-[5px] p-2 md:hidden"
        >
          {[
            mobileOpen ? 'translate-y-[7px] rotate-45' : '',
            mobileOpen ? 'opacity-0' : '',
            mobileOpen ? '-translate-y-[7px] -rotate-45' : '',
          ].map((cls, i) => (
            <span
              key={i}
              className={`block h-px w-5 bg-[var(--text-primary)] origin-center transition-all duration-300 ${cls}`}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          aria-label="Mobile navigation"
          className="border-t border-[var(--border-subtle)] bg-[var(--page-background)] px-5 pb-6 pt-4 md:hidden"
        >
          <div className="flex flex-col gap-4">
            {MOBILE_LINKS.map((id) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => go(e, id)}
                aria-current={activeSection === id ? 'location' : undefined}
                className={`text-sm font-medium capitalize transition-colors hover:text-[var(--accent-primary)] ${
                  activeSection === id ? 'text-[var(--accent-yellow)]' : 'text-[var(--text-primary)]'
                }`}
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                {id}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (id: string) => void;
}

export default function HeroSection({ reducedMotion, onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Name block: clip-path wipe from bottom → top (editorial reveal)
      gsap.fromTo(
        '.hero-name-wrap',
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 1.1,
          ease: 'power4.out',
          delay: 0.05,
          clearProps: 'clipPath',
        },
      );
      // Remaining hero lines stagger-fade
      gsap.fromTo(
        '.hero-line',
        { y: 28, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.85,
          ease: 'power3.out',
          stagger: 0.1,
          delay: 0.3,
          clearProps: 'transform',
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const goTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-label="Introduction"
      className="relative flex min-h-[100svh] flex-col justify-between bg-[#F3EFE7]"
    >
      {/* Top content block — pushed below fixed nav */}
      <div className="mx-auto w-full max-w-7xl px-5 pt-32 sm:px-8 sm:pt-40 lg:px-12">
        {/* Meta line */}
        <p
          className="hero-line text-sm text-[#6B665B]"
          style={{ fontFamily: 'var(--font-sans)', opacity: reducedMotion ? 1 : 0 }}
        >
          Bengaluru, India — Developer Intern at Ellipsonic
        </p>

        {/* Name — full-width display, Fraunces 300 roman */}
        <div
          className="hero-name-wrap mt-8 overflow-hidden"
          style={{ opacity: reducedMotion ? 1 : undefined }}
        >
          <h1
            className="font-serif leading-[0.93] font-light text-[#16140F] tracking-[-0.03em]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(4.5rem, 13vw, 11rem)',
              fontWeight: 300,
            }}
          >
            Manish<br />
            Gowda{' '}
            <em
              className="italic"
              style={{ letterSpacing: '-0.02em' }}
            >
              T
            </em>
          </h1>
        </div>

        {/* Thin rule */}
        <hr
          className="hero-line mt-8 border-none border-t border-[#D9D3C4]"
          style={{
            borderTop: '1px solid #D9D3C4',
            opacity: reducedMotion ? 1 : 0,
          }}
        />

        {/* Subtitle + right-aligned index */}
        <div
          className="hero-line mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between"
          style={{ opacity: reducedMotion ? 1 : 0 }}
        >
          <p
            className="max-w-xl text-base leading-relaxed text-[#6B665B] sm:text-lg"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            Full Stack Developer building reliable backend systems and AI-powered workflows.
          </p>
          <span
            className="shrink-0 text-sm text-[#6B665B] sm:text-right"
            style={{ fontFamily: 'var(--font-sans)', fontSize: '0.75rem', letterSpacing: '0.08em' }}
            aria-hidden="true"
          >
            2026
          </span>
        </div>
      </div>

      {/* Bottom links — pinned to bottom of viewport */}
      <div
        className="hero-line mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8 lg:px-12"
        style={{ opacity: reducedMotion ? 1 : 0 }}
      >
        <div className="flex items-center gap-8">
          <a
            href="#projects"
            onClick={(e) => goTo(e, 'projects')}
            className="hero-link"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="arrow" aria-hidden="true">↓</span>
            <span>Projects</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => goTo(e, 'contact')}
            className="hero-link"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <span className="arrow" aria-hidden="true">↓</span>
            <span>Contact</span>
          </a>
        </div>
      </div>
    </section>
  );
}

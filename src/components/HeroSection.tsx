import { useEffect, useRef } from 'react';
import { ArrowDown, ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react';
import gsap from 'gsap';
import { PROFILE } from '../data/portfolioData';

interface HeroSectionProps {
  reducedMotion: boolean;
  onNavigate: (id: string) => void;
}

export default function HeroSection({ reducedMotion, onNavigate }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
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
      gsap.fromTo(
        '.hero-line',
        { y: 24 },
        {
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.08,
          delay: 0.25,
          clearProps: 'transform',
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const goTo = (event: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    event.preventDefault();
    onNavigate(id);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      aria-labelledby="hero-title"
      className="home-hero"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-intro-line hero-line">
          <span className="hero-avatar" aria-hidden="true">MG</span>
          <span>{PROFILE.name}</span>
          <span className="hero-intro-separator" aria-hidden="true">/</span>
          <span>{PROFILE.location}</span>
        </div>

        <div className="hero-name-wrap">
          <h1 id="hero-title" className="hero-title">
            <span className="hero-title-first">Software</span>
            <span className="hero-title-second">Developer<span className="hero-title-period">.</span></span>
          </h1>
        </div>

        <div
          className="hero-description-row hero-line"
        >
          <p className="hero-description">{PROFILE.heroLead}</p>
          <a
            href="#contact"
            onClick={(event) => goTo(event, 'contact')}
            className="hero-contact-link"
          >
            <span>Let’s connect</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
      </div>

      <div
        className="hero-bottom hero-line"
      >
        <a
          href="#projects"
          onClick={(event) => goTo(event, 'projects')}
          className="hero-explore-link"
        >
          <ArrowDown aria-hidden="true" />
          <span>Explore projects</span>
        </a>
        <div className="hero-social-links" aria-label="Social and email links">
          <a href={PROFILE.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <Github aria-hidden="true" />
          </a>
          <a href={PROFILE.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <Linkedin aria-hidden="true" />
          </a>
          <a href={`mailto:${PROFILE.email}`} aria-label="Email">
            <Mail aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

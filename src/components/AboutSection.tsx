import { useRef } from 'react';
import { PROFILE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function AboutSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="about" className="bg-[var(--page-background)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left — index + heading */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              02
            </span>
            <h2
              id="what-i-do"
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              What I do
            </h2>
          </div>

          {/* Right — focus areas */}
          <div className="lg:col-span-8">
            <div className="reveal-item grid grid-cols-1 border-t border-[var(--border-subtle)] sm:grid-cols-3">
              {PROFILE.aboutPillars.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border-b border-r border-[var(--border-subtle)] py-4 pr-4 text-xs text-[var(--text-secondary)] last:border-r-0 sm:px-4 sm:first:pl-0 sm:last:pr-0 sm:text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <h3 className="font-medium text-[var(--text-primary)]">{pillar.title}</h3>
                  <p className="mt-2 leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

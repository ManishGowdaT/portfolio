import { useRef } from 'react';
import { SKILLS } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; sectionIndex?: string; }

export default function SkillsSection({ reducedMotion, sectionIndex = '03' }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="skills" className="bg-[var(--page-background)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left — index + heading */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              {sectionIndex}
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              Skills
            </h2>
          </div>

          {/* Right — grouped list */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
              {SKILLS.map((group, index) => (
                <div
                  key={group.id}
                  className="reveal-item grid gap-2 py-5 sm:grid-cols-12 sm:gap-6 sm:items-baseline"
                >
                  <div className="flex items-center gap-3 sm:col-span-4">
                    <span className="skill-group-index" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className="text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {group.category}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-[var(--text-primary)] sm:col-span-8"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {group.items.join(', ')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

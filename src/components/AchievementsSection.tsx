import { useRef } from 'react';
import { ACHIEVEMENTS } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function AchievementsSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="achievements" className="bg-[var(--page-background)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              07
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              Achievements
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            <div className="divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
              {ACHIEVEMENTS.map((item) => (
                <div
                  key={item.title}
                  className="reveal-item grid gap-3 py-6 sm:grid-cols-12 sm:items-baseline"
                >
                  <div className="sm:col-span-8">
                    <p
                      className="text-base text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.title}
                    </p>
                    <p
                      className="mt-1 text-sm text-[var(--text-secondary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.organization}
                    </p>
                  </div>
                  <div className="sm:col-span-4 sm:text-right">
                    <span
                      className="text-sm text-[var(--accent-yellow)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.tag}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

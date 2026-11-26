import { useRef } from 'react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function EducationSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="education" className="bg-[var(--page-background)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              08
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              Education
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            {/* Degree rows */}
            <div className="divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
              {EDUCATION.map((edu) => (
                <div
                  key={edu.degree}
                  className="reveal-item grid gap-2 py-6 sm:grid-cols-12 sm:items-baseline sm:gap-4"
                >
                  <div className="sm:col-span-6">
                    <p
                      className="text-base text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {edu.degree}
                    </p>
                    <p
                      className="mt-1 text-sm text-[var(--text-secondary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {edu.institution}
                    </p>
                  </div>
                  <div className="sm:col-span-3 sm:text-right">
                    <span
                      className="text-sm text-[var(--text-secondary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <div className="sm:col-span-3 sm:text-right">
                    <span
                      className="text-sm text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {edu.metric}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-10">
              <p
                className="reveal-item text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Certifications
              </p>
              <div className="mt-4 divide-y divide-[var(--border-subtle)] border-t border-[var(--border-subtle)]">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="reveal-item flex items-baseline justify-between py-4"
                  >
                    <span
                      className="text-sm text-[var(--text-primary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {cert.name}
                    </span>
                    <span
                      className="text-sm text-[var(--text-secondary)]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {cert.issuer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

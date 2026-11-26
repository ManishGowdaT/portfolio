import { useRef } from 'react';
import { EXPERIENCE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function ExperienceSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="experience" className="bg-[#F3EFE7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[#6B665B]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              04
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[#16140F]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              Experience
            </h2>
          </div>

          {/* Right */}
          <div className="lg:col-span-8">
            {EXPERIENCE.map((item) => (
              <article key={`${item.company}-${item.role}`} className="reveal-item">
                {/* Role row */}
                <div
                  className="flex flex-col gap-1 border-t border-[#D9D3C4] pt-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <div>
                    <h3
                      className="text-xl font-light tracking-tight text-[#16140F] sm:text-2xl"
                      style={{ fontFamily: 'var(--font-serif)', fontWeight: 300 }}
                    >
                      {item.role}
                    </h3>
                    <p
                      className="mt-1 text-sm text-[#6B665B]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {item.company} · {item.location}
                    </p>
                  </div>
                  <span
                    className="shrink-0 text-sm text-[#C8431D]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Summary */}
                <p
                  className="mt-5 max-w-[60ch] text-sm leading-relaxed text-[#6B665B]"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {item.summary}
                </p>

                {/* Responsibilities */}
                <ul className="mt-6 space-y-4 pb-10">
                  {item.responsibilities.map((r) => (
                    <li
                      key={r.title}
                      className="grid gap-1 sm:grid-cols-12 sm:gap-4"
                    >
                      <span
                        className="text-xs font-medium uppercase tracking-widest text-[#6B665B] sm:col-span-4"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {r.title}
                      </span>
                      <p
                        className="text-sm leading-relaxed text-[#16140F] sm:col-span-8"
                        style={{ fontFamily: 'var(--font-sans)' }}
                      >
                        {r.detail}
                      </p>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

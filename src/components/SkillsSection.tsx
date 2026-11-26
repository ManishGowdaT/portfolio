import { useRef } from 'react';
import { SKILLS } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function SkillsSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="skills" className="bg-[#F3EFE7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left — index + heading */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[#6B665B]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              02
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[#16140F]"
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
            <div className="divide-y divide-[#D9D3C4] border-t border-[#D9D3C4]">
              {SKILLS.map((group) => (
                <div
                  key={group.id}
                  className="reveal-item grid gap-2 py-5 sm:grid-cols-12 sm:gap-6 sm:items-baseline"
                >
                  <div className="sm:col-span-4">
                    <span
                      className="text-xs uppercase tracking-widest text-[#6B665B]"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {group.category}
                    </span>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-[#16140F] sm:col-span-8"
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

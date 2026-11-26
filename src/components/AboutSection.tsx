import { useRef } from 'react';
import { PROFILE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function AboutSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="about" className="bg-[#F3EFE7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="grid gap-12 py-24 sm:py-32 lg:grid-cols-12">
          {/* Left — index + heading */}
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[#6B665B]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              01
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[#16140F]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              About
            </h2>
          </div>

          {/* Right — text + focus list */}
          <div className="lg:col-span-8">
            <p
              className="reveal-item max-w-[60ch] text-base leading-[1.75] text-[#16140F] sm:text-lg"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {PROFILE.summary}
            </p>

            <div className="reveal-item mt-10 grid grid-cols-1 border-t border-[#D9D3C4] sm:grid-cols-3">
              {PROFILE.aboutPillars.map((pillar) => (
                <div
                  key={pillar.code}
                  className="border-b border-r border-[#D9D3C4] py-4 pr-4 text-xs text-[#6B665B] last:border-r-0 sm:px-4 sm:first:pl-0 sm:last:pr-0 sm:text-sm"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  <h3 className="font-medium text-[#16140F]">{pillar.title}</h3>
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

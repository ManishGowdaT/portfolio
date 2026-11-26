import { useRef, useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; }

export default function ContactSection({ reducedMotion }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);
  useSectionReveal(ref, { reducedMotion });

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  };

  return (
    <section ref={ref} id="contact" className="bg-[#F3EFE7]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <hr className="rule" />

        <div className="py-24 sm:py-32">
          {/* Index */}
          <span
            className="reveal-item block text-xs text-[#6B665B]"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
          >
            08
          </span>

          {/* Headline */}
          <h2
            className="reveal-item mt-3 max-w-3xl font-light leading-[1.05] tracking-[-0.03em] text-[#16140F]"
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(2.75rem, 6vw, 5.5rem)',
              fontWeight: 300,
            }}
          >
            Let's build something together.
          </h2>

          {/* Email — big underlined link */}
          <div className="reveal-item mt-10">
            <a
              href={`mailto:${PROFILE.email}`}
              className="group inline-block font-light leading-tight tracking-tight text-[#E4572E] underline underline-offset-4 decoration-[#E4572E]/40 transition-all duration-200 hover:decoration-[#E4572E]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.25rem, 3vw, 2.25rem)',
                fontWeight: 300,
              }}
            >
              {PROFILE.email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              aria-label="Copy email address"
              className="ml-4 inline-flex items-center gap-1.5 align-middle text-xs text-[#6B665B] transition-colors hover:text-[#16140F]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {copied ? (
                <><Check className="h-3.5 w-3.5 text-[#C8431D]" /><span>Copied</span></>
              ) : (
                <><Copy className="h-3.5 w-3.5" /><span>Copy</span></>
              )}
            </button>
          </div>

          {/* External links */}
          <div
            className="reveal-item mt-8 flex flex-wrap gap-6"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="nav-link text-sm text-[#6B665B] transition-colors hover:text-[#16140F]"
            >
              GitHub
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="nav-link text-sm text-[#6B665B] transition-colors hover:text-[#16140F]"
            >
              LinkedIn
            </a>
            <a
              href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              className="text-sm text-[#6B665B] transition-colors hover:text-[#16140F]"
            >
              {PROFILE.phone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

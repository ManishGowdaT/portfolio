import { useRef } from 'react';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props {
  reducedMotion: boolean;
  onNavigate: (path: string) => void;
}

function followRoute(event: React.MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function HomeIntroSection({ reducedMotion, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="intro" className="home-intro-section">
      <div className="home-intro-inner">
        <div className="home-intro-label reveal-item">
          <span className="section-index">01</span>
          <span className="section-eyebrow">A little about my work</span>
        </div>
        <div className="home-intro-copy">
          <p className="reveal-item">{PROFILE.summary}</p>
          <a
            className="reveal-item text-link"
            href="/AboutMe"
            onClick={(event) => followRoute(event, '/AboutMe', onNavigate)}
          >
            More about me <ArrowUpRight aria-hidden="true" />
          </a>
        </div>
        <a className="home-intro-scroll" href="#what-i-do" aria-label="Scroll to What I do">
          <ArrowDownRight aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

import { useRef } from 'react';
import { BriefcaseBusiness } from 'lucide-react';
import { EXPERIENCE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; sectionIndex?: string; }

export default function ExperienceSection({ reducedMotion, sectionIndex = '04' }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="experience" className="experience-section">
      <div className="experience-section-inner">
        <header className="experience-section-heading reveal-item">
          <div><span>{sectionIndex} / EXPERIENCE</span><h2>Professional Experience</h2></div>
          <p>Hands-on work across frontend development, API engineering, and applied AI/ML services.</p>
        </header>

        {EXPERIENCE.map((item) => (
          <article className="experience-card reveal-item" key={`${item.company}-${item.role}`}>
            <div className="experience-card-top">
              <div className="experience-company-mark" aria-hidden="true"><BriefcaseBusiness /></div>
              <div className="experience-role-block">
                <p className="experience-company">{item.company}<span>·</span>{item.location}</p>
                <h3>{item.role}</h3>
              </div>
              <span className="experience-period"><i aria-hidden="true" />{item.period}</span>
            </div>
            <p className="experience-summary">{item.summary}</p>
            <div className="experience-responsibilities">
              {item.responsibilities.map((responsibility, index) => (
                <div className="experience-responsibility" key={responsibility.title}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h4>{responsibility.title}</h4><p>{responsibility.detail}</p></div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

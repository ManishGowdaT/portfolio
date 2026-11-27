import { useRef } from 'react';
import { SKILLS } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; sectionIndex?: string; }

export default function SkillsSection({ reducedMotion, sectionIndex = '03' }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="skills" className="skills-section">
      <div className="skills-section-inner">
        <header className="skills-section-heading reveal-item">
          <div><span>{sectionIndex} / TOOLKIT</span><h2>Technical Skills</h2></div>
          <p>Tools and technologies I use to build and support full-stack applications, APIs, and data workflows.</p>
        </header>
        <div className="skills-grid">
          {SKILLS.map((group, index) => (
            <article className="skill-card reveal-item" key={group.id}>
              <div className="skill-card-heading"><span>{String(index + 1).padStart(2, '0')}</span><h3>{group.category}</h3></div>
              <ul>{group.items.map((skill) => <li key={skill}>{skill}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

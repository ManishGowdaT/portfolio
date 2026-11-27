import { useRef } from 'react';
import { CERTIFICATIONS, EDUCATION } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';

interface Props { reducedMotion: boolean; sectionIndex?: string; }

export default function EducationSection({ reducedMotion, sectionIndex = '07' }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="education" className="education-section">
      <div className="education-section-inner">
        <header className="education-section-heading reveal-item">
          <div><span>{sectionIndex} / EDUCATION</span><h2>Education &amp; Training</h2></div>
          <p>Academic background and completed certifications.</p>
        </header>
        <div className="education-list">
          {EDUCATION.map((edu, index) => (
            <article className="education-item reveal-item" key={edu.degree}>
              <span className="education-item-index">0{index + 1}</span>
              <div className="education-item-main"><h3>{edu.degree}</h3><p>{edu.institution}</p></div>
              <span className="education-item-period">{edu.period}</span>
              <span className="education-item-metric">{edu.metric}</span>
            </article>
          ))}
        </div>
        <div className="certifications-block reveal-item">
          <h3>Certifications</h3>
          <div className="certification-list">
            {CERTIFICATIONS.map((cert) => <div className="certification-item" key={cert.name}><span>{cert.name}</span><span>{cert.issuer}</span></div>)}
          </div>
        </div>
      </div>
    </section>
  );
}

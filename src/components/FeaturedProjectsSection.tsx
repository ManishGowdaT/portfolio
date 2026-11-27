import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { getProjectPath } from '../routing/portfolioRoutes';
import ProjectArtwork from './ProjectArtwork';

interface Props { reducedMotion: boolean; onNavigate: (path: string) => void; }

function followRoute(event: React.MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function FeaturedProjectsSection({ reducedMotion, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null);
  useSectionReveal(ref, { reducedMotion });

  return (
    <section ref={ref} id="projects" className="featured-studies-section">
      <div className="featured-studies-inner">
        <div className="featured-studies-heading">
          <div className="reveal-item">
            <span className="section-index">05</span>
            <h2>Selected Projects</h2>
          </div>
          <div className="featured-projects-intro reveal-item">
            <p>A selection of software and data projects, with a concise overview of the problem and the system behind each one.</p>
            <a href="/Projects" onClick={(event) => followRoute(event, '/Projects', onNavigate)}>View all projects <ArrowUpRight aria-hidden="true" /></a>
          </div>
        </div>

        <div className="featured-studies-grid">
          {PROJECTS.map((project) => {
            const path = getProjectPath(project.id);
            return (
              <a key={project.id} href={path} onClick={(event) => followRoute(event, path, onNavigate)} className="featured-study-card reveal-item" aria-label={`View ${project.title} project details`}>
                <ProjectArtwork project={project} compact />
                <div className="featured-study-content">
                  <p className="featured-study-domain">{project.domain}</p>
                  <h3>{project.title}</h3>
                  <p className="featured-study-subtitle">{project.subtitle}</p>
                  <p className="featured-study-summary">{project.summary}</p>
                  <div className="featured-study-footer">
                    <span>{project.stack.slice(0, 3).join(' · ')}</span>
                    <span className="featured-study-read">Project details <ArrowUpRight aria-hidden="true" /></span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

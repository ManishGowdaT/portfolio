import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { getCaseStudyPath } from '../routing/portfolioRoutes';

interface Props { onNavigate: (path: string) => void; }

function followRoute(event: React.MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function CaseStudiesPage({ onNavigate }: Props) {
  return (
    <div id="case-studies" className="case-studies-page">
      <header className="case-studies-page-heading">
        <p>Engineering case studies <span>01—{String(PROJECTS.length).padStart(2, '0')}</span></p>
        <h1>Case Studies</h1>
        <div>
          <p>Systems, decisions, and implementation details from selected full-stack and data projects.</p>
          <p>Each study is based on the project details available in this portfolio.</p>
        </div>
      </header>

      <div className="case-study-list">
        {PROJECTS.map((project) => {
          const path = getCaseStudyPath(project.id);
          return (
            <article key={project.id} className={`case-study-list-card case-study-${project.visualType}`}>
              <div className="case-study-list-meta">
                <span>{project.index}</span>
                <span>{project.domain}</span>
              </div>
              <div className="case-study-list-main">
                <h2>{project.title}</h2>
                <p className="case-study-list-subtitle">{project.subtitle}</p>
                <p className="case-study-list-summary">{project.summary}</p>
                <div className="case-study-list-tags" aria-label="Technology stack">
                  {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
                </div>
              </div>
              <a href={path} onClick={(event) => followRoute(event, path, onNavigate)}>
                Read case study <ArrowUpRight aria-hidden="true" />
              </a>
            </article>
          );
        })}
      </div>
    </div>
  );
}

import { ArrowLeft, ArrowUpRight, CheckCircle2, Layers, Shield } from 'lucide-react';
import { PROJECTS, PROFILE } from '../data/portfolioData';
import { getProjectPath } from '../routing/portfolioRoutes';

interface Props {
  projectId: string;
  onNavigate: (path: string) => void;
}

function followRoute(event: React.MouseEvent<HTMLAnchorElement>, path: string, onNavigate: (path: string) => void) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function CaseStudyDetailPage({ projectId, onNavigate }: Props) {
  const project = PROJECTS.find((item) => item.id === projectId);
  if (!project) return null;

  const index = PROJECTS.findIndex((item) => item.id === projectId);
  const relatedProjects = PROJECTS.filter((item) => item.id !== project.id);

  return (
    <div id="case-study-detail" className="case-study-detail-page">
      <header className="case-study-detail-hero">
        <a className="case-study-back" href="/Projects" onClick={(event) => followRoute(event, '/Projects', onNavigate)}>
          <ArrowLeft aria-hidden="true" /> All projects
        </a>
        <div className="case-study-detail-meta">
          <span>{project.index} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <span>{project.domain}</span>
        </div>
        <h1>{project.title}</h1>
        <p className="case-study-detail-subtitle">{project.subtitle}</p>
        <p className="case-study-detail-overview">{project.summary}</p>
        <div className="case-study-detail-stack" aria-label="Technology stack">
          {project.stack.map((technology) => <span key={technology}>{technology}</span>)}
        </div>
      </header>

      <section className="case-study-detail-section" aria-labelledby="case-study-architecture">
        <div className="case-study-section-heading">
          <span>01</span><h2 id="case-study-architecture"><Layers aria-hidden="true" /> System architecture</h2>
        </div>
        <div className="case-study-architecture-list">
          {project.architecture.map((item, itemIndex) => (
            <article key={item.layer}>
              <span>{String(itemIndex + 1).padStart(2, '0')}</span>
              <div><h3>{item.layer}</h3><p>{item.detail}</p></div>
            </article>
          ))}
        </div>
      </section>

      <section className="case-study-detail-section" aria-labelledby="case-study-implementation">
        <div className="case-study-section-heading">
          <span>02</span><h2 id="case-study-implementation">Implementation highlights</h2>
        </div>
        <ul className="case-study-highlight-list">
          {project.highlights.map((highlight) => (
            <li key={highlight}><CheckCircle2 aria-hidden="true" /><span>{highlight}</span></li>
          ))}
        </ul>
      </section>

      <section className="case-study-detail-section" aria-labelledby="case-study-reliability">
        <div className="case-study-section-heading">
          <span>03</span><h2 id="case-study-reliability"><Shield aria-hidden="true" /> Security &amp; reliability</h2>
        </div>
        <ul className="case-study-reliability-list">
          {project.securityAndReliability.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="case-study-detail-cta">
        <div>
          <p>Project {String(index + 1).padStart(2, '0')}</p>
          <h2>Want to discuss this work?</h2>
        </div>
        <a href={`mailto:${PROFILE.email}`}>Contact me <ArrowUpRight aria-hidden="true" /></a>
      </section>

      <nav className="case-study-related" aria-label="Related projects">
        <p>More projects</p>
        <div>
          {relatedProjects.map((item) => {
            const path = getProjectPath(item.id);
            return <a key={item.id} href={path} onClick={(event) => followRoute(event, path, onNavigate)}>{item.title}<ArrowUpRight aria-hidden="true" /></a>;
          })}
        </div>
        <a className="case-study-back-bottom" href="/Projects" onClick={(event) => followRoute(event, '/Projects', onNavigate)}>
          <ArrowLeft aria-hidden="true" /> Back to all projects
        </a>
      </nav>
    </div>
  );
}

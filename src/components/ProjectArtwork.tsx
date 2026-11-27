import type { ProjectItem } from '../data/portfolioData';

const labels: Record<ProjectItem['visualType'], string[]> = {
  trading: ['MARKET DATA', 'SPREAD SCAN', 'RANKED IDEAS'],
  legal: ['MATTER INTAKE', 'REVIEW + APPROVAL', 'SIGNED DELIVERY'],
  forecasting: ['43 STATES', 'MODEL BENCHMARK', '8-WEEK OUTLOOK'],
};

export default function ProjectArtwork({ project, compact = false }: { project: ProjectItem; compact?: boolean }) {
  const stages = labels[project.visualType];
  return (
    <div className={`project-artwork project-artwork-${project.visualType}${compact ? ' project-artwork-compact' : ''}`} role="img" aria-label={`${project.title} workflow illustration: ${stages.join(', ')}`}>
      <div className="project-artwork-heading"><span>{project.index} / SYSTEM MAP</span><span>{project.domain.split(' · ')[0]}</span></div>
      <div className="project-artwork-flow">
        {stages.map((stage, index) => <div className="project-artwork-stage" key={stage}>
          <span className="project-artwork-step">0{index + 1}</span>
          <span className="project-artwork-label">{stage}</span>
          {index < stages.length - 1 && <span className="project-artwork-connector" aria-hidden="true" />}
        </div>)}
      </div>
      <div className="project-artwork-foot"><span>{project.stack.slice(0, 3).join(' / ')}</span><span>WORKFLOW OVERVIEW</span></div>
    </div>
  );
}

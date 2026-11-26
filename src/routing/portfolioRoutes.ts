import { PROJECTS } from '../data/portfolioData';

export interface PortfolioRoute {
  sectionId: string | null;
  projectId: string | null;
  notFound: boolean;
}

const SECTION_ROUTES: Record<string, string> = {
  '/AboutMe': 'about',
  '/Projects': 'projects',
  '/CaseStudies': 'projects',
  '/ContactMe': 'contact',
};

const PROJECT_SLUGS: Record<string, string> = {
  optionalgo: 'optionalgo',
  lexdraft: 'lexdraft',
  'sales-forecasting-system': 'sales-forecasting',
};

const SECTION_IDS = new Set([
  'hero', 'about', 'skills', 'experience', 'projects', 'achievements', 'education', 'contact',
]);

export function resolvePortfolioRoute(pathname: string, hash = ''): PortfolioRoute {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalizedPath === '/') {
    const hashId = hash.replace(/^#/, '');
    return {
      sectionId: SECTION_IDS.has(hashId) ? hashId : null,
      projectId: null,
      notFound: false,
    };
  }

  if (SECTION_ROUTES[normalizedPath]) {
    return { sectionId: SECTION_ROUTES[normalizedPath], projectId: null, notFound: false };
  }

  const projectMatch = normalizedPath.match(/^\/CaseStudies\/([^/]+)$/);
  if (projectMatch) {
    const projectId = PROJECT_SLUGS[projectMatch[1]];
    const exists = projectId && PROJECTS.some((project) => project.id === projectId);
    return exists
      ? { sectionId: 'projects', projectId, notFound: false }
      : { sectionId: null, projectId: null, notFound: true };
  }

  return { sectionId: null, projectId: null, notFound: true };
}

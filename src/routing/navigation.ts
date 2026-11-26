export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'caseStudies', label: 'Case Studies', path: '/CaseStudies' },
  { id: 'projects', label: 'My Projects', path: '/Projects' },
  { id: 'about', label: 'About Me', path: '/AboutMe' },
  { id: 'contact', label: 'Contact Me', path: '/ContactMe' },
] as const;

export type NavigationId = (typeof NAV_ITEMS)[number]['id'];

export function getActiveNavigationId(pathname: string): NavigationId {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalizedPath === '/CaseStudies' || normalizedPath.startsWith('/CaseStudies/')) {
    return 'caseStudies';
  }
  return NAV_ITEMS.find((item) => item.path === normalizedPath)?.id ?? 'home';
}

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'projects', label: 'Projects', path: '/Projects' },
  { id: 'about', label: 'About Me', path: '/AboutMe' },
  { id: 'contact', label: 'Contact Me', path: '/ContactMe' },
] as const;

export type NavigationId = (typeof NAV_ITEMS)[number]['id'];

export function getActiveNavigationId(pathname: string): NavigationId {
  const normalizedPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  if (normalizedPath === '/CaseStudies' || normalizedPath.startsWith('/CaseStudies/') || normalizedPath === '/Projects' || normalizedPath.startsWith('/Projects/')) {
    return 'projects';
  }
  return NAV_ITEMS.find((item) => item.path === normalizedPath)?.id ?? 'home';
}

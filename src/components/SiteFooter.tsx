import { ArrowUpRight, Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { NAV_ITEMS } from '../routing/navigation';

interface SiteFooterProps {
  onNavigate: (path: string) => void;
}

function followRoute(
  event: React.MouseEvent<HTMLAnchorElement>,
  path: string,
  onNavigate: (path: string) => void,
) {
  if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  onNavigate(path);
}

export default function SiteFooter({ onNavigate }: SiteFooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-shell">
        <div className="footer-feature">
          <div>
            <p className="footer-eyebrow">Manish Gowda T · Software Developer</p>
            <h2>Let’s build something together.</h2>
            <a
              href="/ContactMe"
              onClick={(event) => followRoute(event, '/ContactMe', onNavigate)}
              className="footer-primary-link"
            >
              Get in touch <ArrowUpRight aria-hidden="true" />
            </a>
          </div>
          <a
            href="/Projects"
            onClick={(event) => followRoute(event, '/Projects', onNavigate)}
            className="footer-study-link"
          >
            <span>Explore selected projects</span>
            <ArrowUpRight aria-hidden="true" />
          </a>
        </div>

        <div className="footer-link-columns">
          <div className="footer-column">
            <h3>Explore</h3>
            {NAV_ITEMS.map((item) => (
              <a
                key={item.id}
                href={item.path}
                onClick={(event) => followRoute(event, item.path, onNavigate)}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="footer-column">
            <h3>Connect</h3>
            <a href={`mailto:${PROFILE.email}`}>
              <Mail aria-hidden="true" /> {PROFILE.email}
            </a>
            <a href={PROFILE.github} target="_blank" rel="noreferrer">
              <Github aria-hidden="true" /> GitHub
            </a>
            <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
              <Linkedin aria-hidden="true" /> LinkedIn
            </a>
            <a href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}>
              <Phone aria-hidden="true" /> {PROFILE.phone}
            </a>
          </div>
        </div>

        <div className="footer-meta">
          <span>© {currentYear} {PROFILE.name}</span>
          <span><MapPin aria-hidden="true" /> {PROFILE.location}</span>
        </div>
      </div>
    </footer>
  );
}

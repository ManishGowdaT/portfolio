import { ArrowUpRight, Github, Linkedin, Mail, Phone } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

export default function ContactPage() {
  return (
    <div id="contact-page" className="contact-page">
      <header className="contact-page-heading">
        <p>Contact <span>01</span></p>
        <h1>Let’s connect.</h1>
        <p>For project discussions, collaboration, or questions, reach me through any of these channels.</p>
      </header>

      <section className="contact-page-options" aria-label="Contact options">
        <a href={`mailto:${PROFILE.email}`}>
          <Mail aria-hidden="true" /><span><small>Email</small><strong>{PROFILE.email}</strong></span><ArrowUpRight aria-hidden="true" />
        </a>
        <a href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}>
          <Phone aria-hidden="true" /><span><small>Phone</small><strong>{PROFILE.phone}</strong></span><ArrowUpRight aria-hidden="true" />
        </a>
        <a href={PROFILE.linkedin} target="_blank" rel="noreferrer">
          <Linkedin aria-hidden="true" /><span><small>LinkedIn</small><strong>{PROFILE.linkedinLabel}</strong></span><ArrowUpRight aria-hidden="true" />
        </a>
        <a href={PROFILE.github} target="_blank" rel="noreferrer">
          <Github aria-hidden="true" /><span><small>GitHub</small><strong>{PROFILE.githubLabel}</strong></span><ArrowUpRight aria-hidden="true" />
        </a>
      </section>

      <p className="contact-page-note">Email opens your mail application; phone opens your device’s calling app.</p>
    </div>
  );
}

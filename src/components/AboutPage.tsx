import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import AboutSection from './AboutSection';
import AchievementsSection from './AchievementsSection';
import EducationSection from './EducationSection';
import ExperienceSection from './ExperienceSection';
import SkillsSection from './SkillsSection';

interface Props {
  reducedMotion: boolean;
}

export default function AboutPage({ reducedMotion }: Props) {
  return (
    <>
      <section id="about-page" className="about-page-intro" aria-labelledby="about-page-title">
        <div className="about-page-intro-inner">
          <div className="about-page-copy">
            <p className="about-page-kicker">About me <span>01</span></p>
            <h1 id="about-page-title">
              Hello, I’m <span>{PROFILE.name}</span>
            </h1>
            <p className="about-page-role">{PROFILE.role} · {PROFILE.location}</p>
            <p className="about-page-summary">{PROFILE.summary}</p>
            <a className="about-page-down" href="#about">
              <span>What I do</span><ArrowDown aria-hidden="true" />
            </a>
          </div>
          <div className="about-page-identity">
            <span className="about-page-identity-index">PROFILE / 2026</span>
            <span className="about-page-identity-mark" aria-hidden="true">{PROFILE.initials}</span>
            <strong>{PROFILE.currentRole}</strong>
            <span>{PROFILE.location}</span>
            <span className="about-page-identity-rule" />
            <small>Full-stack engineering · AI and data workflows · Application security</small>
          </div>
        </div>
      </section>

      <AboutSection reducedMotion={reducedMotion} />
      <ExperienceSection reducedMotion={reducedMotion} sectionIndex="03" />
      <SkillsSection reducedMotion={reducedMotion} sectionIndex="04" />
      <AchievementsSection reducedMotion={reducedMotion} sectionIndex="05" />
      <EducationSection reducedMotion={reducedMotion} sectionIndex="06" />

      <section className="about-page-contact" aria-label="Contact Manish">
        <p>Interested in working together?</p>
        <a href={`mailto:${PROFILE.email}`}>Get in touch <ArrowUpRight aria-hidden="true" /></a>
      </section>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, ArrowUpRight, CheckCircle2, Shield, Layers } from 'lucide-react';
import { PROJECTS, ProjectItem, PROFILE } from '../data/portfolioData';
import { useSectionReveal } from '../hooks/useSectionReveal';
import { getCaseStudyPath } from '../routing/portfolioRoutes';

/* ── Placeholder image block ───────────────────────────────────── */
function ImagePlaceholder({ title }: { title: string }) {
  return (
    <div
      role="img"
      className="flex items-center justify-center rounded-sm bg-[var(--surface-raised)]"
      style={{ aspectRatio: '3/2' }}
      aria-label={`${title} project preview unavailable`}
    >
      <span
        className="text-xs text-[var(--text-secondary)]"
        style={{
          fontFamily: 'var(--font-sans)',
          letterSpacing: '0.08em',
        }}
      >
        Preview unavailable
      </span>
    </div>
  );
}

/* ── Detail modal ──────────────────────────────────────────────── */
function ProjectModal({
  project,
  reducedMotion,
  onClose,
}: {
  project: ProjectItem;
  reducedMotion: boolean;
  onClose: () => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const prevFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    prevFocusRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    const onFocus = (e: FocusEvent) => {
      const dialog = document.getElementById(`modal-${project.id}-title`)?.closest('[role="dialog"]');
      if (dialog && e.target instanceof Node && !dialog.contains(e.target)) {
        closeRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    document.addEventListener('focusin', onFocus);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.removeEventListener('focusin', onFocus);
      prevFocusRef.current?.focus();
    };
  }, [onClose, project.id]);

  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm sm:items-center sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby={`modal-${project.id}-title`}
      onClick={onClose}
    >
      <motion.div
        layoutId={reducedMotion ? undefined : `project-row-${project.id}`}
        transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
        data-lenis-prevent
        className="max-h-[92vh] w-full overflow-y-auto rounded-t-2xl bg-[var(--surface)] sm:max-w-3xl sm:rounded-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[rgba(244,241,229,0.1)] px-6 py-6 sm:px-8">
          <div>
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              {project.index}
            </span>
            <motion.h3
              layoutId={reducedMotion ? undefined : `project-title-${project.id}`}
              id={`modal-${project.id}-title`}
              className="mt-1 font-light leading-tight tracking-tight text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
                fontWeight: 300,
              }}
            >
              {project.title}
            </motion.h3>
            <p
              className="mt-1 text-sm text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.subtitle}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="ml-4 mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[var(--text-secondary)] transition-colors hover:bg-white/10 hover:text-[var(--text-primary)]"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-8 px-6 py-7 sm:px-8">
          {/* Screenshot placeholder */}
          <ImagePlaceholder title={project.title} />

          {/* Overview */}
          <p
            className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {project.summary}
          </p>

          {/* Architecture */}
          <div>
            <h4
              className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              <Layers className="h-3.5 w-3.5" />
              Architecture
            </h4>
            <div className="mt-4 divide-y divide-[rgba(244,241,229,0.08)]">
              {project.architecture.map((node) => (
                <div
                  key={node.layer}
                  className="grid gap-2 py-4 sm:grid-cols-12"
                >
                  <span
                    className="text-xs font-medium text-[var(--accent-primary)] sm:col-span-4"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {node.layer}
                  </span>
                  <p
                    className="text-sm text-[var(--text-secondary)] sm:col-span-8"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {node.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights + Security */}
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h4
                className="text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                Deliverables
              </h4>
              <ul className="mt-4 space-y-3">
                {project.highlights.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--accent-primary)]" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4
                className="flex items-center gap-2 text-xs uppercase tracking-widest text-[var(--text-secondary)]"
                style={{ fontFamily: 'var(--font-sans)' }}
              >
                <Shield className="h-3.5 w-3.5" />
                Security &amp; Reliability
              </h4>
              <ul className="mt-4 space-y-2">
                {project.securityAndReliability.map((ctrl) => (
                  <li
                    key={ctrl}
                    className="text-sm text-[var(--text-secondary)]"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    — {ctrl}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[rgba(244,241,229,0.1)] pt-6">
            <p
              className="text-sm text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.stack.join(', ')}
            </p>
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-sm text-[var(--accent-primary)] underline underline-offset-4 decoration-[var(--accent-primary)]/40 hover:decoration-[var(--accent-primary)] transition-all"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              GitHub Profile
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Project row ───────────────────────────────────────────────── */
function ProjectRow({
  project,
  reducedMotion,
  onOpen,
  onNavigate,
  expanded = false,
}: {
  project: ProjectItem;
  reducedMotion: boolean;
  onOpen: (p: ProjectItem) => void;
  onNavigate: (path: string) => void;
  expanded?: boolean;
}) {
  const path = getCaseStudyPath(project.id);
  const followCaseStudy = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    onNavigate(path);
  };

  return (
    <motion.div
      layoutId={reducedMotion ? undefined : `project-row-${project.id}`}
      className="group relative"
    >
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="w-full border-b border-[rgba(244,241,229,0.12)] py-8 text-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-yellow)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--page-background)]"
        aria-label={`View ${project.title} case study`}
      >
        <div className={`project-row-grid grid items-start gap-6 sm:grid-cols-12${expanded ? ' project-row-expanded' : ''}`}>
          {/* Index */}
          <span
            className="text-xs text-[var(--text-secondary)] sm:col-span-1 sm:pt-2"
            style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
          >
            {project.index}
          </span>

          {/* Content */}
          <div className="project-row-copy sm:col-span-7">
            {expanded && <p className="project-domain">{project.domain}</p>}
            <motion.h3
              layoutId={reducedMotion ? undefined : `project-title-${project.id}`}
              className="font-light leading-tight tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-primary)] project-title-link"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(1.5rem, 2.5vw, 2.25rem)',
                fontWeight: 300,
              }}
            >
              {project.title}
            </motion.h3>
            <p
              className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {project.subtitle}
            </p>
            <p
              className="mt-3 text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              {expanded
                ? project.stack.join(', ')
                : `${project.stack.slice(0, 6).join(', ')}${project.stack.length > 6 ? ` +${project.stack.length - 6}` : ''}`}
            </p>
            {expanded && (
              <>
                <p className="project-row-summary">{project.summary}</p>
                <p className="project-row-availability">Demo link not provided</p>
              </>
            )}
          </div>

          {/* Image placeholder */}
          <div className="sm:col-span-4">
            <div
              className="overflow-hidden rounded-sm transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 sm:opacity-85"
            >
              <ImagePlaceholder title={project.title} />
            </div>
          </div>
        </div>
      </button>
      {expanded && (
        <a className="project-detail-link" href={path} onClick={followCaseStudy}>
          View case study <ArrowUpRight aria-hidden="true" />
        </a>
      )}
    </motion.div>
  );
}

/* ── Section ───────────────────────────────────────────────────── */
interface Props {
  reducedMotion: boolean;
  onNavigate: (path: string) => void;
  standalone?: boolean;
  onModalStateChange?: (open: boolean) => void;
  routeProjectId?: string | null;
  onRouteModalClose?: () => void;
}

export default function ProjectsSection({
  reducedMotion,
  onNavigate,
  standalone = false,
  onModalStateChange,
  routeProjectId = null,
  onRouteModalClose,
}: Props) {
  const ref = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<ProjectItem | null>(null);
  useSectionReveal(ref, { reducedMotion });

  useEffect(() => {
    const project = routeProjectId
      ? PROJECTS.find((candidate) => candidate.id === routeProjectId) ?? null
      : null;
    setSelected(project);
    onModalStateChange?.(Boolean(project));
  }, [routeProjectId, onModalStateChange]);

  const open = (p: ProjectItem) => {
    setSelected(p);
    onModalStateChange?.(true);
  };
  const close = () => {
    setSelected(null);
    onModalStateChange?.(false);
    onRouteModalClose?.();
  };

  return (
    <section ref={ref} id="projects" className={`bg-[var(--page-background)]${standalone ? ' projects-page-section' : ''}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section header */}
        <div className="grid gap-10 py-24 sm:py-32 lg:grid-cols-12">
          <div className="reveal-item lg:col-span-4">
            <span
              className="text-xs text-[var(--text-secondary)]"
              style={{ fontFamily: 'var(--font-sans)', letterSpacing: '0.08em' }}
            >
              {standalone ? '01' : '06'}
            </span>
            <h2
              className="mt-3 font-light leading-[1.0] tracking-[-0.025em] text-[var(--text-primary)]"
              style={{
                fontFamily: 'var(--font-serif)',
                fontSize: 'clamp(2.5rem, 5vw, 4.25rem)',
                fontWeight: 300,
              }}
            >
              My Projects
            </h2>
          </div>
          <p
            className="reveal-item self-end text-sm text-[var(--text-secondary)] lg:col-span-5 lg:col-start-7"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {standalone
              ? 'Explore the systems, technology choices, and implementation details behind each project.'
              : 'Click any project to view architecture, security controls, and implementation details.'}
          </p>
        </div>

        {/* Project list */}
        <div
          className="reveal-item border-t border-[rgba(244,241,229,0.12)] pb-24 sm:pb-32"
        >
          {PROJECTS.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              reducedMotion={reducedMotion}
              onOpen={open}
              onNavigate={onNavigate}
              expanded={standalone}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selected && (
          <ProjectModal
            project={selected}
            reducedMotion={reducedMotion}
            onClose={close}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

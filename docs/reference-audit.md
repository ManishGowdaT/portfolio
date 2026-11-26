# Portfolio redesign — Phase 0 reference audit

**Owner:** Manish Gowda T  
**Audit date:** 26 November 2026 (Asia/Kolkata)  
**Reference:** [thegr8binil.me](https://www.thegr8binil.me/)  
**Scope:** Read-only baseline and live reference inspection. No application source was changed.

## Result

**Status: CONDITIONAL PASS.** The live reference rendered and its main routes, content hierarchy, and representative interactions were inspectable in a real browser. The current project inventory and production build were also checked. The audit is useful for the next phase, but the Phase 0 gate is not fully satisfied: the available browser session did not provide persistent local screenshot files, controllable viewport presets, recording, or computed-style inspection. Accept these gaps before starting Phase 1, or provide matching screenshots/recordings or browser access that supports those checks.

## Repository baseline

- App stack: React 19, TypeScript, Vite, Tailwind CSS v4, GSAP/ScrollTrigger, Lenis, Framer Motion, and Lucide React.
- Entry: `index.html` mounts `src/main.tsx`; `main.tsx` mounts `App.tsx`.
- Actual source tree: `src/App.tsx`, `src/index.css`, `src/main.tsx`; section components under `src/components/`; `src/data/portfolioData.ts`; and two hooks under `src/hooks/`.
- No `public/` directory or local image assets were present at audit time. Project modals render screenshot placeholders.
- Current app is a single-page site with anchors `hero`, `about`, `skills`, `experience`, `projects`, `achievements`, `education`, and `contact`. Project case-study details open in a modal. It does not currently implement the reference's separate `/AboutMe`, `/Projects`, `/CaseStudies`, case-study slug, or `/ContactMe` routes.
- Existing project content: Manish Gowda T's profile and contacts; Full Stack Developer role/location; Ellipsonic internship; skills; OptionAlgo, LexDraft, and Sales Forecasting System; achievements; B.E. and pre-university education; and certifications. Keep all of these source facts and links intact when reorganizing.
- `README.md` and `package.json` describe the existing local workflow. No test script is defined.
- Initial `git status --short` could not be reliably recorded because of Git's ownership/path issue in the first inspection attempt. After the build, the generated `dist/` output was restored from `HEAD`; the final `git status --short` was empty.

### Baseline validation

- `npm run build` — **PASS** (`tsc --noEmit` and Vite production build completed).
- `npm run dev -- --host 0.0.0.0` — Vite reported ready at `http://localhost:5173/`.
- Local browser preview — **BLOCKED by environment:** browser navigation timed out, and a local HTTP request reported that socket access was forbidden. Therefore no local baseline screenshot or visual comparison was captured.
- The local dev server was stopped after the preview attempt.

## Live reference inspection

The reference was inspected at its live URLs in the in-app browser on 26 November 2026. Direct navigation to the listed pages succeeded, including the individual case-study slugs. Browser screenshots were inspected during the session, but this browser interface did not provide a way to save screenshot files in the workspace. Observed captures had different apparent sizes (approximately 615×883 and 1078×898); these are displayed image dimensions, not verified CSS viewport sizes.

### Homepage `/`

Observed initial/repeat load: a full-screen dark loading state displayed a greeting (including “नमस्ते”) and progress to 100%, then revealed the home hero. The hero uses a near-black background with a fine grid, large multi-line all-caps role statement, purple/yellow/teal accents, a small illustrated avatar, a contact CTA, location text, and a bottom row of social/email links. A thin purple vertical scroll indicator appears on the right. The page then continues with:

1. Product positioning and an About Me link.
2. “What I do” capability cards.
3. Numbered Product, Design, Engineering, and AI capability/skill groups.
4. Featured case studies.
5. My Projects cards.
6. Tech stack logos.
7. Shared footer with exploration links, socials, contact/case-study calls to action, copyright, and location.

At the narrow displayed width, the header used a compact brand pill and circular menu button. At the wider displayed width, it used a centered pill-style navigation with Home, Case Studies, My Projects, About Me, plus a separate Contact Me pill at right. The loader-to-home transition and changing content were observed, but durations/easing and repeat-visit variation were not measured.

### `/AboutMe`

Dark page with shared navigation; introductory name/role and portrait; AI-native product positioning; four numbered capability cards; chronological experience entries with dates, descriptions, tags, and photos; categorized Product/Design/Engineering/AI toolkit; and shared footer. The page contains several employers and outcome claims specific to the reference owner; these are structural examples only and must never be copied into Manish's portfolio.

### `/Projects`

Dark page with the shared horizontal pill navigation, a large “My Projects” heading, and long project entries. Each entry combines imagery, title, technology labels, year, feature description, and a Visit link. The inspected first entry was Formy-AI; further listed entries included FileFlex, Next Dines, and Algo-Visualizer. These are reference-owner projects and content/assets must not be reused.

### `/CaseStudies`

Dark case-study index with shared navigation, large heading and intro, then vertically stacked bordered cards. Cards combine category, prominent headline, summary, outcome metrics, role/platform/duration metadata, and a “Read case study” link. The page exposed six entries: Karnival BI, Survey Builder Redesign, Scalable Gamification Platform, Survey Execution App, NamasteDev redesign, and Launchifi Snapshot Tool.

### Individual case-study pages

Inspected detail routes:

- `/CaseStudies/karnival-bi`: hero metadata and outcomes, then numbered sections for context/product capabilities, need, value proposition, pain points, discovery/research, design exploration/testing, product decisions/features, and learnings/future roadmap; ends with contact and index links.
- `/CaseStudies/survey-builder-redesign`: hero metadata/outcomes followed by context/problem, goals, research insights, product decisions, before/after, solution, measured impact, iteration, and learnings; ends with contact and index links. The page explicitly notes wireframes only / real UI not shown per NDA.
- `/CaseStudies/survey-execution-app`: hero metadata/outcomes followed by context, problem, research, before/after, design decisions, and iteration log; ends with contact and index links.
- `/CaseStudies/gamification-platform`: Business Context, How the Platform Works, Core Challenges, Product Objectives, Signature Insight, Platform Improvements, Strategic Product Decisions, Evolution of the Platform, Business Impact, and Learnings.
- `/CaseStudies/namastedev-redesign` and `/CaseStudies/launchifi-snapshot-tool`: About, User Problems, Solutions, Design Process, and Results.

Common pattern: long-form numbered narrative with section titles, explanatory copy, metrics, comparison/iteration blocks, image areas, and repeated navigation back to case studies or contact. The reference's design/product claims and quantitative results must not be transferred; adapt the structure to evidence available for Manish's engineering projects.

### `/ContactMe`

Dark contact page with the shared navigation, “Let's Connect!” heading and intro, a five-field form (name, email, organization, requested help, message) and Send It button, plus direct email and social links. The form was not submitted; delivery behavior and success/error handling remain unverified. Footer structure matches other routes.

## Visual and interaction inventory

| Area | Observed |
|---|---|
| Global treatment | Near-black canvas; warm light text; bright purple, yellow, and teal accents; fine grid in home hero; thin dividers and restrained rounded outlines. |
| Header | Brand in a pill; centered multi-link pill nav on wider page views; separate contact CTA; compact circular menu control on a narrow home view. Sticky behavior, active-state timing, and opened-menu layout were not measured. |
| Type hierarchy | Large clean sans-serif display headings, generally bold and high contrast; smaller neutral sans-serif body copy. Exact font family, weights, sizes, and line heights were not measured. |
| Layout | Wide page content, large section headings, framed cards, long-form case-study modules, image-led project entries, and shared footer. Exact container widths, gaps, and breakpoints were not measured. |
| Motion | Home loader/progress and hero reveal observed; scroll progress indicator observed. Scroll-trigger timing, hover transitions, route transitions, touch behavior, and reduced-motion behavior were not tested. |
| Contact behavior | Inputs and send control are present; direct social/email links are visible. No form submission was made. |
| Direct routing | Direct URL navigation rendered all reviewed routes. Browser refresh/back/forward and outgoing links were not exhaustively exercised. |

The visual descriptions above are observations from screenshots; exact design tokens are intentionally left unclaimed because computed CSS was unavailable. Do not infer precise colors/fonts/spacing from the old Manish theme or this approximate visual description. Reinspect the live page with a measurable browser before treating any token as approved.

## Content mapping for a future redesign

| Reference structure | Existing Manish source content |
|---|---|
| `/` home hero and featured work | Name, Full Stack Developer role, Bengaluru location, existing hero lead; featured OptionAlgo/LexDraft/Sales Forecasting System. |
| `/AboutMe` intro and capabilities | `PROFILE.summary`, `PROFILE.aboutPillars`, Ellipsonic internship, `SKILLS`, `EDUCATION`, `ACHIEVEMENTS`, `CERTIFICATIONS`. |
| `/Projects` | Three typed `PROJECTS` records in `src/data/portfolioData.ts`; preserve current descriptions, stacks, architecture, highlights, and security/reliability notes. No screenshots are currently supplied. |
| `/CaseStudies` and detail slugs | Derive only from the three existing projects. Current data supports summary, stack, architecture, highlights, and reliability information, but does not establish additional dates, research, metrics, user quotes, or measured results. Do not invent them. |
| `/ContactMe` | Existing email, GitHub, LinkedIn, and phone details from `PROFILE`; no configured form delivery service is present in the inspected app. |
| Shared footer | Owner's real location and current links; omit reference owner's social destinations and privacy links unless Manish has his own approved equivalents. |

## Outstanding evidence needed to complete the Phase 0 gate

- Save local reference screenshots at 1440×900, 1280×800, 768×1024, 390×844, and 320px, including full-page captures of each target page and representative case studies.
- Record a short interaction comparison for loader, scroll, menu, project navigation, contact controls, repeat visit, touch, and reduced motion.
- Inspect exact computed fonts, colors, dimensions, breakpoints, sticky/pinned elements, timing, and easing.
- Capture a local baseline screenshot after restoring browser access to `http://localhost:5173/`.
- Recheck Git baseline status at the start of the next phase; current final `git status --short` is clean.

At the time of this audit, Phase 1 had **not started**. See `phase-1-foundation.md` for the subsequent implementation and gate result.

import { RefObject, useEffect } from 'react';
import gsap from 'gsap';
import { MOTION_TOKENS } from '../data/portfolioData';

interface UseSectionRevealOptions {
  reducedMotion: boolean;
  staggerSelector?: string;
  clipSelector?: string;
  parallaxSelector?: string;
}

export function useSectionReveal(
  sectionRef: RefObject<HTMLElement | null>,
  {
    reducedMotion,
    staggerSelector = '.reveal-item',
    clipSelector,
    parallaxSelector,
  }: UseSectionRevealOptions,
) {
  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    if (reducedMotion) {
      gsap.set(root.querySelectorAll(`${staggerSelector}${clipSelector ? `, ${clipSelector}` : ''}`), {
        opacity: 1,
        y: 0,
        x: 0,
        clipPath: 'none',
      });
      return;
    }

    const isTouchDevice =
      typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

    const ctx = gsap.context(() => {
      const items = root.querySelectorAll(staggerSelector);
      if (items.length > 0) {
        gsap.fromTo(
          items,
          { y: isTouchDevice ? 14 : 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: MOTION_TOKENS.durations.reveal,
            ease: MOTION_TOKENS.easeExpoGsap,
            stagger: MOTION_TOKENS.stagger.card,
            clearProps: 'transform',
            scrollTrigger: {
              trigger: root,
              start: 'top 84%',
              once: true,
            },
          },
        );
      }

      if (clipSelector && !isTouchDevice) {
        const clips = root.querySelectorAll(clipSelector);
        if (clips.length > 0) {
          gsap.fromTo(
            clips,
            { clipPath: 'inset(0 0 14% 0)', opacity: 0, y: 18 },
            {
              clipPath: 'inset(0 0 0% 0)',
              opacity: 1,
              y: 0,
              duration: MOTION_TOKENS.durations.handoff,
              ease: MOTION_TOKENS.easeExpoGsap,
              clearProps: 'transform,clipPath',
              scrollTrigger: {
                trigger: root,
                start: 'top 80%',
                once: true,
              },
            },
          );
        }
      }

      if (parallaxSelector && !isTouchDevice) {
        const targets = root.querySelectorAll(parallaxSelector);
        if (targets.length > 0) {
          gsap.fromTo(
            targets,
            { y: 18 },
            {
              y: -14,
              ease: 'none',
              scrollTrigger: {
                trigger: root,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.6,
              },
            },
          );
        }
      }
    }, root);

    return () => ctx.revert();
  }, [sectionRef, reducedMotion, staggerSelector, clipSelector, parallaxSelector]);
}

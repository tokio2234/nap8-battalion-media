/**
 * Landing page motion (GSAP + ScrollTrigger):
 *  - hero text entrance
 *  - Identity section: images crossfade while the section is pinned by CSS sticky
 *  - Three Doors: staggered reveal
 *  - Latest: fade-up reveal
 *
 * All animations use gsap.from(), so the resting DOM state is fully visible.
 * If the visitor prefers reduced motion (or JS fails), nothing is hidden
 * and nothing moves.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // 1. Hero — title, tagline rise in on load
  gsap.from('[data-hero-text] > *', {
    y: 26,
    opacity: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.15,
  });

  // 2. Identity — crossfade the stacked images as the user scrolls
  //    through the 170vh sticky section.
  const identityImages = gsap.utils.toArray('[data-identity-img]');
  if (identityImages.length > 1) {
    const crossfade = gsap.timeline({
      scrollTrigger: {
        trigger: '#identity',
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
      },
    });
    identityImages.slice(1).forEach((img) => {
      crossfade.to(img, { opacity: 1, duration: 1, ease: 'none' });
    });
  }
  gsap.from('[data-identity-copy]', {
    opacity: 0,
    y: 24,
    duration: 1.2,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#identity', start: 'top 55%' },
  });

  // 3. Three Doors — staggered reveal
  gsap.from('[data-door]', {
    opacity: 0,
    y: 34,
    duration: 0.9,
    stagger: 0.14,
    ease: 'power2.out',
    scrollTrigger: { trigger: '[data-doors]', start: 'top 78%' },
  });

  // 4. Latest — image and text rise in together
  gsap.from('[data-latest] > *', {
    opacity: 0,
    y: 30,
    duration: 0.9,
    stagger: 0.15,
    ease: 'power2.out',
    scrollTrigger: { trigger: '[data-latest]', start: 'top 78%' },
  });
}

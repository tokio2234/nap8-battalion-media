/**
 * Scroll-triggered reveal for inner pages (cards, sections).
 * Elements with [data-reveal] fade + rise in as they enter the viewport.
 * The landing page uses GSAP instead (landing.js) — its elements don't
 * carry [data-reveal].
 *
 * Respects prefers-reduced-motion: everything appears instantly.
 */
const elements = document.querySelectorAll('[data-reveal]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  elements.forEach((el) => el.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  elements.forEach((el) => observer.observe(el));
}

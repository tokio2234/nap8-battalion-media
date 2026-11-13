/**
 * Landing page behaviour.
 *
 *  - Flip cards (Explore): choose which category card is turned over.
 *  - Framed photo (Identity): slow crossfade between the photos.
 *  - Motion (GSAP + ScrollTrigger): hero text entrance, the hero photo
 *    drifting as the page scrolls, and sections rising into view.
 *
 * Motion uses gsap.from(), so the resting page is fully visible. With
 * prefers-reduced-motion (or if this script fails) nothing is hidden and
 * nothing moves; the flip cards still work, just without the turn.
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------ flip cards */
const deck = document.querySelector('[data-deck]');
if (deck) {
  const cards = [...deck.querySelectorAll('[data-card]')];
  const dots = [...document.querySelectorAll('[data-deck-dot]')];
  let active = Math.max(0, cards.findIndex((card) => card.classList.contains('is-active')));

  const setActive = (index) => {
    active = (index + cards.length) % cards.length;
    cards.forEach((card, i) => {
      const isActive = i === active;
      card.classList.toggle('is-active', isActive);
      // Only the visible face of each card can be focused or clicked.
      card.querySelector('.flip-front').inert = isActive;
      card.querySelector('.flip-back').inert = !isActive;
    });
    dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === active)));
  };

  cards.forEach((card, i) => {
    card.querySelector('[data-card-select]').addEventListener('click', () => {
      setActive(i);
      card.querySelector('.flip-back').focus({ preventScroll: true });
    });
  });
  document.querySelector('[data-deck-prev]')?.addEventListener('click', () => setActive(active - 1));
  document.querySelector('[data-deck-next]')?.addEventListener('click', () => setActive(active + 1));

  setActive(active);
}

/* ---------------------------------------------------- framed photo fade */
const stack = document.querySelector('[data-fade-stack]');
if (stack && !reduceMotion) {
  const images = [...stack.querySelectorAll('img')];
  if (images.length > 1) {
    let shown = 0;
    setInterval(() => {
      images[shown].classList.replace('opacity-100', 'opacity-0');
      shown = (shown + 1) % images.length;
      images[shown].classList.replace('opacity-0', 'opacity-100');
    }, 4500);
  }
}

/* ---------------------------------------------------------------- motion */
if (!reduceMotion) {
  gsap.registerPlugin(ScrollTrigger);

  // Hero — eyebrow, title, tagline, button rise in on load
  gsap.from('[data-hero-text] > *', {
    y: 26,
    opacity: 0,
    duration: 1.1,
    stagger: 0.14,
    ease: 'power3.out',
    delay: 0.15,
  });

  // Hero photo — drifts down slowly as the hero scrolls away, so it seems
  // further off than the text in front of it.
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    const scrub = { trigger: hero, start: 'top top', end: 'bottom top', scrub: true };
    gsap.to('[data-hero-image]', { yPercent: 14, ease: 'none', scrollTrigger: scrub });
    gsap.to('[data-hero-text]', { yPercent: 18, autoAlpha: 0, ease: 'none', scrollTrigger: { ...scrub, end: '60% top' } });
  }

  // Sections — rise into view
  gsap.utils.toArray('[data-rise]').forEach((el) => {
    gsap.from(el.dataset.deck !== undefined ? el : el.children, {
      opacity: 0,
      y: 34,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 80%' },
    });
  });
}

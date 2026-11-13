/**
 * Minimal, dependency-free lightbox for post galleries.
 * Wires up every <a data-lightbox> on the page: click opens the full
 * image in a native <dialog> (keyboard accessible out of the box —
 * Esc closes, focus is trapped). Left/right arrows, the on-screen
 * buttons, and touch swipes move between images.
 */
const links = [...document.querySelectorAll('a[data-lightbox]')];

if (links.length > 0) {
  const dialog = document.createElement('dialog');
  dialog.className = 'lightbox';
  dialog.setAttribute('aria-label', 'Photo viewer');
  dialog.innerHTML = `
    <img alt="" />
    <p class="lb-caption"></p>
    <button type="button" class="lb-close" aria-label="Close">&times;</button>
    <button type="button" class="lb-prev" aria-label="Previous photo">&#8249;</button>
    <button type="button" class="lb-next" aria-label="Next photo">&#8250;</button>
  `;
  document.body.append(dialog);

  const img = dialog.querySelector('img');
  const caption = dialog.querySelector('.lb-caption');
  let current = 0;

  function show(index) {
    current = (index + links.length) % links.length;
    const link = links[current];
    img.src = link.href;
    img.alt = link.dataset.alt || '';
    caption.textContent = link.dataset.alt || '';
  }

  links.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      show(index);
      dialog.showModal();
    });
  });

  dialog.querySelector('.lb-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.lb-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.lb-next').addEventListener('click', () => show(current + 1));

  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') show(current - 1);
    if (event.key === 'ArrowRight') show(current + 1);
  });

  // Touch: swipe left for the next photo, right for the previous one.
  // Only clearly horizontal, single-finger swipes count, so pinch-zoom and
  // vertical drags are left alone.
  const SWIPE_MIN_PX = 45;
  let touchStart = null;

  dialog.addEventListener(
    'touchstart',
    (event) => {
      touchStart =
        event.touches.length === 1
          ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
          : null;
    },
    { passive: true }
  );
  dialog.addEventListener(
    'touchmove',
    (event) => {
      if (event.touches.length > 1) touchStart = null; // second finger = pinch, not swipe
    },
    { passive: true }
  );
  dialog.addEventListener('touchcancel', () => (touchStart = null));
  dialog.addEventListener('touchend', (event) => {
    if (!touchStart) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - touchStart.x;
    const dy = touch.clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) < SWIPE_MIN_PX || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    show(dx < 0 ? current + 1 : current - 1);
  });

  // Click on the dark backdrop (outside the image) closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

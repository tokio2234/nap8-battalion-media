/**
 * Minimal, dependency-free lightbox for post galleries.
 * Wires up every <a data-lightbox> on the page: click opens the full
 * image in a native <dialog> (keyboard accessible out of the box —
 * Esc closes, focus is trapped). Left/right arrows and the on-screen
 * buttons move between images.
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

  // Click on the dark backdrop (outside the image) closes the viewer.
  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) dialog.close();
  });
}

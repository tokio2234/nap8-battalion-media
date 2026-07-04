import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// TODO: replace with the real domain once it is decided.
// Used for canonical URLs and Open Graph tags.
export default defineConfig({
  site: 'https://nap8-naltoqa.netlify.app',
  vite: {
    plugins: [tailwindcss()],
  },
});

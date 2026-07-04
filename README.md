# 8th NAP Battalion, Naltoqa — Media Website

A content hub for the 8th NAP Battalion: events, school news, and cultural life,
with a cinematic landing page. Built with [Astro](https://astro.build),
[Tailwind CSS](https://tailwindcss.com), [GSAP](https://gsap.com) scroll animations,
and [Decap CMS](https://decapcms.org) for browser-based editing at `/admin`.

All text and images currently in the site are **placeholders** — replace them as
real content becomes available (see the checklist at the bottom).

---

## 1. Run locally

Requirements: [Node.js](https://nodejs.org) 20 or newer, and git.

```bash
npm install        # first time only
npm run dev        # → http://localhost:4321
```

To use the CMS locally (writes posts straight into your local git folder,
no login needed), open a **second terminal** and run:

```bash
npm run cms
```

then visit <http://localhost:4321/admin/>.

Other commands:

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run build`        | Production build into `dist/`                   |
| `npm run preview`      | Serve the production build locally              |
| `npm run placeholders` | Regenerate the placeholder images               |

## 2. Deploy to Netlify

1. Push this folder to a GitHub repository (private is fine):

   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
   git push -u origin main
   ```

2. In [Netlify](https://app.netlify.com): **Add new site → Import an existing
   project → GitHub**, pick the repo. Build settings are read automatically
   from `netlify.toml` — just click **Deploy**.

3. Enable CMS login (Netlify Identity + Git Gateway):
   - Site configuration → **Identity** → Enable Identity
   - Identity → Registration → set to **Invite only**
   - Identity → Services → **Enable Git Gateway**
   - Identity → **Invite users** → invite your own email, accept the invite
     from your inbox, and set a password.

   You can now log in at `https://YOUR-SITE.netlify.app/admin/`.

   > **Note:** Netlify has deprecated Identity for brand-new accounts and may
   > hide it on some plans. If the Identity tab isn't available on your site,
   > the free alternative is Decap's GitHub backend: in
   > `public/admin/config.yml` replace the `backend:` block with
   > `name: github` + `repo: YOUR-USERNAME/YOUR-REPO`, and follow
   > <https://decapcms.org/docs/github-backend/>. Everything else stays the same.

4. Every push to `main` (including posts published from `/admin`) triggers an
   automatic rebuild and deploy.

## 3. Add a new post via `/admin` (normal way)

1. Go to `https://YOUR-SITE.netlify.app/admin/` and log in
   (or `http://localhost:4321/admin/` with `npm run cms` running).
2. **Posts → New Post.**
3. Fill in the fields — every post uses the same locked model:
   - **Title**, **Date**, **Category** (events / school / culture)
   - **Location** (optional)
   - **Cover photo** (landscape) + **alt text** — required
   - **Gallery**: 5–30 images, each with alt text
   - **Story**: 2–6 short paragraphs
   - **Tags**: free-form
4. Click **Publish**. The CMS commits to git; Netlify rebuilds; the post
   appears at `/[category]/[year]/[slug]/` and automatically shows up on its
   category page, the gallery, and (if newest) the landing page.

## 4. Add a new post by editing files (backup method)

1. Put your images in `src/assets/uploads/` (e.g. `my-event-cover.jpg`).
2. Create `src/content/posts/my-event.md` — the filename becomes the URL slug:

   ```markdown
   ---
   title: My Event
   date: 2026-08-15
   category: events            # events | school | culture
   location: Naltoqa           # optional
   cover_photo: ../../assets/uploads/my-event-cover.jpg
   cover_alt: Jawans marching on the parade ground
   gallery:                    # 5 to 30 images
     - image: ../../assets/uploads/my-event-01.jpg
       alt: Description of this photo
     - image: ../../assets/uploads/my-event-02.jpg
       alt: Description of this photo
     # ...at least 5 total
   tags:
     - parade
   ---

   First paragraph of the story.

   Second paragraph of the story.
   ```

3. Check it locally with `npm run dev`, then commit and push:

   ```bash
   git add .
   git commit -m "Add post: My Event"
   git push
   ```

Image paths start with `../../assets/uploads/` because they are relative to
the post file — this is what lets Astro optimize them (WebP, responsive sizes)
at build time.

## 5. Change the site title, tagline, and colors

- **Title, tagline, identity line, contact email, location, map pin, social
  links, category descriptions** → [`src/config/site.ts`](src/config/site.ts).
  Everything is commented.
- **Colors** → the `@theme` block at the top of
  [`src/styles/global.css`](src/styles/global.css). `--color-accent` is the
  deep Sumi-shawl vermillion (dividers, hovers); `--color-accent-bright` is a
  lightened version used for text links so they pass WCAG AA contrast on the
  dark background — if you change one, change both and keep the bright one
  readable.
- **Fonts** → change the `@fontsource` imports in
  [`src/layouts/BaseLayout.astro`](src/layouts/BaseLayout.astro) and the
  `--font-serif` / `--font-sans` values in `global.css`. Any
  [Fontsource](https://fontsource.org) font is free and self-hosted.
- **Landing/section photos** (hero, identity crossfade, three door tiles) →
  replace the files in `src/assets/site/` keeping the same filenames, or edit
  the imports in [`src/pages/index.astro`](src/pages/index.astro).

## 6. How the site fits together

```
src/
  config/site.ts        ← titles, taglines, contacts, category descriptions
  styles/global.css     ← colors, fonts, shared styles
  content/posts/*.md    ← one file per post (all three categories)
  content.config.ts     ← the post schema (validated at build time)
  assets/site/          ← landing page photography
  assets/uploads/       ← post photos (also where the CMS uploads)
  layouts/BaseLayout    ← <head>, header, footer shell
  components/           ← post card, pagination, category header, footer…
  scripts/              ← GSAP landing motion, scroll reveals, lightbox
  pages/                ← landing, about, gallery, 404
    admin/index.astro                 ← Decap CMS admin panel shell
    [category]/[...page].astro        ← /events/, /events/2/ … (12 per page)
    [category]/[year]/index.astro     ← /events/2026/ (year filter)
    [category]/[year]/[slug].astro    ← individual posts
public/admin/config.yml ← Decap CMS configuration (fields, media folder)
```

All motion (GSAP scroll animations, reveals, hover zooms) respects
`prefers-reduced-motion` — visitors who opt out see everything instantly with
no animation.

## 7. Before going live — placeholder checklist

- [ ] Replace the generated placeholder images in `src/assets/site/` and
      `src/assets/uploads/` with real photographs
- [ ] Replace the three sample posts in `src/content/posts/`
- [ ] Finalize tagline + identity line in `src/config/site.ts`
- [ ] Set the real contact email in `src/config/site.ts`
- [ ] Set the real map coordinates in `src/config/site.ts`
- [ ] Write the real history and commanding officer details in
      `src/pages/about.astro`
- [ ] Set the final domain in `astro.config.mjs` (`site:`)

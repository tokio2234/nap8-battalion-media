/**
 * Site-wide settings. Edit this file to change the title, tagline,
 * contact details, and category descriptions — no other file needs touching.
 * (Colors and fonts live in src/styles/global.css.)
 */

export const SITE = {
  /** Full site title, shown in the hero and browser tab. */
  title: '8th NAP Battalion, Naltoqa',
  /** Short title, used in the header wordmark and footer. */
  shortTitle: '8th NAP Battalion',
  /** Small line above the hero title. */
  eyebrow: 'Nagaland Armed Police',
  /** Hero tagline — placeholder, replace with the final line. */
  tagline: 'Duty and community in the hills of Nagaland.',
  /** Line shown in the sticky Identity section — placeholder, replace with the final line. */
  identityLine: 'Rooted in Naltoqa. Serving Nagaland.',
  /** Default meta description for pages that don't set their own. */
  description:
    'Stories, events, school news, and cultural life from the 8th NAP Battalion, Naltoqa, Nagaland.',
  /** Contact email shown in the footer and on the About page — placeholder. */
  contactEmail: 'contact@example.com',
  /** Human-readable location, shown in the footer. */
  location: 'Naltoqa, Nagaland',
  /**
   * Map position for the embedded map on the About page.
   * TODO: replace with the battalion's actual coordinates.
   */
  map: { lat: 25.97, lng: 94.52, zoom: 13 },
  /** Social links — leave empty to hide, e.g. { label: 'Instagram', url: 'https://...' } */
  social: [] as { label: string; url: string }[],
};

export type CategorySlug = 'events' | 'school' | 'culture';

export const CATEGORIES: Record<
  CategorySlug,
  { name: string; description: string; intro?: string }
> = {
  events: {
    name: 'Events',
    description: 'Parades, ceremonies, visits, and moments from battalion life.',
  },
  school: {
    name: 'School',
    description: 'News and milestones from the battalion school.',
    // Shown as a static block at the top of the /school page.
    intro:
      'The battalion school serves the children of serving personnel and families from the surrounding villages. Run within the campus at Naltoqa, it follows the state curriculum and gives equal weight to the classroom, the playing field, and the community. This is placeholder text — replace it with the school’s real story.',
  },
  culture: {
    name: 'Culture',
    description: 'Tuluni, Sekrenyi, and community programmes across the district.',
  },
};

export const CATEGORY_SLUGS = Object.keys(CATEGORIES) as CategorySlug[];

export interface PageContentField {
  key: string;
  label: string;
  type: 'text' | 'textarea';
}

export interface PageContentSchema {
  page: string;
  label: string;
  path: string;
  fields: PageContentField[];
}

// Field keys must exactly match the defaults object each *Client.tsx page passes to
// usePageContent() — this is what drives the generic admin edit form.
export const PAGE_CONTENT_SCHEMAS: PageContentSchema[] = [
  {
    page: 'home', label: 'Home', path: '/',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
    ],
  },
  {
    page: 'about', label: 'About', path: '/about',
    fields: [
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
    ],
  },
  {
    page: 'services', label: 'Services', path: '/services',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
    ],
  },
  {
    page: 'industries', label: 'Industries', path: '/industries',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
    ],
  },
  {
    page: 'contact', label: 'Contact', path: '/contact',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
    ],
  },
  {
    page: 'work', label: 'Work', path: '/work',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
    ],
  },
  {
    page: 'pricing', label: 'Pricing', path: '/pricing',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
    ],
  },
  {
    page: 'case-studies', label: 'Case Studies', path: '/case-studies',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
    ],
  },
];

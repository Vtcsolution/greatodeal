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
      { key: 'statAuditLabel', label: 'Hero stat label — audit coverage', type: 'text' },
      { key: 'statIndustriesLabel', label: 'Hero stat label — industries', type: 'text' },
      { key: 'statCostLabel', label: 'Hero stat label — cost saved', type: 'text' },
      { key: 'whatWeBuildTitle', label: '"What We Build" section title', type: 'text' },
      { key: 'whatWeBuildSubtitle', label: '"What We Build" section subtitle', type: 'textarea' },
      { key: 'industriesTitle', label: '"Industries We Serve" section title', type: 'text' },
      { key: 'whyUsTitle', label: '"Why Choose Us" section title', type: 'text' },
      { key: 'techStackTitle', label: '"Technology Stack" section title', type: 'text' },
      { key: 'techStackSubtitle', label: '"Technology Stack" section subtitle', type: 'textarea' },
      { key: 'finalCtaTitle', label: 'Bottom CTA headline', type: 'textarea' },
      { key: 'finalCtaButtonText', label: 'Bottom CTA button text', type: 'text' },
    ],
  },
  {
    page: 'about', label: 'About', path: '/about',
    fields: [
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'statAuditLabel', label: 'Stat label — audit coverage', type: 'text' },
      { key: 'statIndustriesLabel', label: 'Stat label — industries', type: 'text' },
      { key: 'statSatisfactionLabel', label: 'Stat label — client satisfaction', type: 'text' },
      { key: 'statCostLabel', label: 'Stat label — cost saved', type: 'text' },
      { key: 'storyTitle', label: '"Our Story" section title', type: 'textarea' },
      { key: 'missionTitle', label: '"Our Mission" section title', type: 'text' },
      { key: 'howWeWorkTitle', label: '"How We Work" section title', type: 'text' },
      { key: 'howWeWorkSubtitle', label: '"How We Work" section subtitle', type: 'textarea' },
      { key: 'whatWeBuildTitle', label: '"What We Build" section title', type: 'text' },
      { key: 'principlesTitle', label: '"Key Principles" section title', type: 'textarea' },
      { key: 'principlesSubtitle', label: '"Key Principles" section subtitle', type: 'textarea' },
      { key: 'pricingModelsTitle', label: '"Pricing Models" section title', type: 'text' },
      { key: 'pricingModelsSubtitle', label: '"Pricing Models" section subtitle', type: 'textarea' },
      { key: 'techStackTitle', label: '"Technology Stack" section title', type: 'text' },
      { key: 'techStackSubtitle', label: '"Technology Stack" section subtitle', type: 'textarea' },
      { key: 'finalCtaTitle', label: 'Bottom CTA headline', type: 'textarea' },
      { key: 'finalCtaSubtitle', label: 'Bottom CTA description', type: 'textarea' },
      { key: 'finalCtaButtonText', label: 'Bottom CTA button text', type: 'text' },
    ],
  },
  {
    page: 'services', label: 'Services', path: '/services',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'textarea' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
      { key: 'statServicesLabel', label: 'Stat label — core services', type: 'text' },
      { key: 'statIndustriesLabel', label: 'Stat label — industries', type: 'text' },
      { key: 'statAuditLabel', label: 'Stat label — audit coverage', type: 'text' },
      { key: 'statCostLabel', label: 'Stat label — cost saved', type: 'text' },
      { key: 'allServicesTitle', label: '"Every Piece, End to End" section title', type: 'text' },
      { key: 'howWeWorkTitle', label: '"How We Work" section title', type: 'text' },
      { key: 'howWeWorkSubtitle', label: '"How We Work" section subtitle', type: 'textarea' },
      { key: 'techTitle', label: '"Technology" section title', type: 'text' },
      { key: 'techSubtitle', label: '"Technology" section subtitle', type: 'textarea' },
      { key: 'finalCtaTitle', label: 'Bottom CTA headline', type: 'textarea' },
      { key: 'finalCtaSubtitle', label: 'Bottom CTA description', type: 'textarea' },
      { key: 'finalCtaButtonText', label: 'Bottom CTA button text', type: 'text' },
    ],
  },
  {
    page: 'industries', label: 'Industries', path: '/industries',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
      { key: 'statFocusLabel', label: 'Stat label — focus industries', type: 'text' },
      { key: 'statYearsLabel', label: 'Stat label — years in operation', type: 'text' },
      { key: 'statAuditLabel', label: 'Stat label — audit coverage', type: 'text' },
      { key: 'statSatisfactionLabel', label: 'Stat label — client satisfaction', type: 'text' },
      { key: 'approachTitle', label: '"How We Approach" section title', type: 'text' },
      { key: 'approachSubtitle', label: '"How We Approach" section subtitle', type: 'textarea' },
      { key: 'allIndustriesTitle', label: '"Every Sector We Serve" section title', type: 'text' },
      { key: 'finalCtaTitle', label: 'Bottom CTA headline', type: 'textarea' },
      { key: 'finalCtaSubtitle', label: 'Bottom CTA description', type: 'textarea' },
      { key: 'finalCtaButtonText', label: 'Bottom CTA button text', type: 'text' },
    ],
  },
  {
    page: 'contact', label: 'Contact', path: '/contact',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
      { key: 'formTitle', label: 'Form card title', type: 'text' },
      { key: 'sidebarTitle', label: 'Sidebar title', type: 'text' },
      { key: 'whyContactTitle', label: '"Why Contact Us?" title', type: 'text' },
      { key: 'whatsappTitle', label: '"Prefer WhatsApp?" title', type: 'text' },
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
      { key: 'customBarText', label: '"Need something custom?" text', type: 'text' },
      { key: 'customBarButtonText', label: '"Need something custom?" button text', type: 'text' },
    ],
  },
  {
    page: 'case-studies', label: 'Case Studies', path: '/case-studies',
    fields: [
      { key: 'heroBadge', label: 'Hero badge (small eyebrow text)', type: 'text' },
      { key: 'heroTitle', label: 'Hero headline', type: 'text' },
      { key: 'heroSubtitle', label: 'Hero description', type: 'textarea' },
      { key: 'ctaText', label: 'Hero button text', type: 'text' },
      { key: 'statProjectsLabel', label: 'Stat label — projects completed', type: 'text' },
      { key: 'statIndustriesLabel', label: 'Stat label — industries', type: 'text' },
      { key: 'statSatisfactionLabel', label: 'Stat label — client satisfaction', type: 'text' },
      { key: 'statCountriesLabel', label: 'Stat label — countries served', type: 'text' },
      { key: 'finalCtaTitle', label: 'Bottom CTA headline', type: 'textarea' },
      { key: 'finalCtaSubtitle', label: 'Bottom CTA description (currently claims "200+ companies")', type: 'textarea' },
      { key: 'finalCtaButtonText', label: 'Bottom CTA primary button text', type: 'text' },
      { key: 'finalCtaSecondaryButtonText', label: 'Bottom CTA secondary button text', type: 'text' },
    ],
  },
];

export type CtaLink = {
  label: string;
  href: string;
  primary: boolean;
};

export type FeatureColumn = {
  title: string;
  description: string;
  bullets: string[];
};

export type ClientChannel = {
  name: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export type TrustSignal = {
  name: string;
  description: string;
  href?: string;
  badge?: string;
};

export type HeroFeature = {
  id: string;
  title: string;
  description: string;
};

export type HeroCopy = {
  brandName: string;
  brandLogoSrc: string;
  brandLogoAlt: string;
  eyebrowTag: string;
  eyebrowLabel: string;
  title: string;
  description: string;
  whyHeading: string;
  whyDescription: string;
  whyFeatures: HeroFeature[];
};

export type SectionIntroCopy = {
  eyebrow: string;
  title: string;
  description: string;
};

export type StatHighlight = {
  value: string;
  description: string;
};

export type IntegrationsCopy = {
  intro: SectionIntroCopy;
  stats: StatHighlight[];
  windowTitle: string;
  imageAlt: string;
};

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterCopy = {
  description: string;
  license: string;
  resourcesHeading: string;
  connectHeading: string;
  resources: FooterLink[];
  connect: FooterLink[];
  copyright: string;
};

export type AssistantFaq = {
  keywords: string[];
  reply: string;
};

export type AssistantSuggestion = {
  label: string;
  prompt: string;
  reply?: string;
};

export type AssistantCopy = {
  name: string;
  tagline: string;
  initialMessage: string;
  inputLabel: string;
  inputPlaceholder: string;
  submitAria: string;
  closeAria: string;
  buttonLabel: string;
  faqs: AssistantFaq[];
  fallbackReplies: string[];
  suggestions: AssistantSuggestion[];
};

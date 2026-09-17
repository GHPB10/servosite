import { SERVO_TECH_FAVICON_DATA_URI } from '../components/ServoTechLogoIcon';

export interface BrandingConfig {
  logoType: 'icon' | 'image';
  logoImageUrl: string;
  brandNamePrefix: string;
  brandNameSuffix: string;
  brandSubtitle: string;
  faviconUrl: string;
}

export const DEFAULT_FAVICON_SVG = SERVO_TECH_FAVICON_DATA_URI;

export const DEFAULT_BRANDING: BrandingConfig = {
  logoType: 'icon',
  logoImageUrl: '',
  brandNamePrefix: 'SERVO',
  brandNameSuffix: 'TECH',
  brandSubtitle: 'Soluções em Tecnologia',
  faviconUrl: DEFAULT_FAVICON_SVG
};

export const BRANDING_STORAGE_KEY = 'servotech_branding_config';

export function loadBrandingConfig(): BrandingConfig {
  try {
    const saved = localStorage.getItem(BRANDING_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return {
        ...DEFAULT_BRANDING,
        ...parsed,
        faviconUrl: parsed.faviconUrl || DEFAULT_FAVICON_SVG
      };
    }
  } catch (err) {
    console.error('Erro ao carregar branding do localStorage:', err);
  }
  return DEFAULT_BRANDING;
}

export function saveBrandingConfig(config: BrandingConfig) {
  try {
    localStorage.setItem(BRANDING_STORAGE_KEY, JSON.stringify(config));
    applyFavicon(config.faviconUrl);
  } catch (err) {
    console.error('Erro ao salvar branding no localStorage:', err);
  }
}

export function applyFavicon(url: string) {
  if (typeof document === 'undefined') return;
  const href = url || DEFAULT_FAVICON_SVG;
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.href = href;

  let appleLink = document.querySelector<HTMLLinkElement>("link[rel='apple-touch-icon']");
  if (!appleLink) {
    appleLink = document.createElement('link');
    appleLink.rel = 'apple-touch-icon';
    document.head.appendChild(appleLink);
  }
  appleLink.href = href;
}

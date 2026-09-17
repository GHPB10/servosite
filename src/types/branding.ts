import { SERVO_TECH_FAVICON_DATA_URI } from '../components/ServoTechLogoIcon';
import defaultBrandingJson from '../data/branding.json';

export interface BrandingConfig {
  logoType: 'icon' | 'image';
  logoImageUrl: string;
  logoScale?: number; // Escala multiplicadora (ex: 1, 1.25, 1.5, 1.8, 2.2)
  logoHeightNavbar?: number; // Altura em pixels no topo (ex: 48, 56, 64, 80)
  logoHeightFooter?: number; // Altura em pixels no rodapé (ex: 52, 64, 76, 96)
  brandNamePrefix: string;
  brandNameSuffix: string;
  brandSubtitle: string;
  faviconUrl: string;
}

export const DEFAULT_FAVICON_SVG = SERVO_TECH_FAVICON_DATA_URI;

export const DEFAULT_BRANDING: BrandingConfig = {
  logoType: 'image',
  logoImageUrl: '/6.png',
  logoScale: 1.5,
  logoHeightNavbar: 56,
  logoHeightFooter: 64,
  brandNamePrefix: 'SERVO',
  brandNameSuffix: 'TECH',
  brandSubtitle: 'Soluções em Tecnologia',
  faviconUrl: DEFAULT_FAVICON_SVG,
  ...(defaultBrandingJson as Partial<BrandingConfig>)
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
        faviconUrl: parsed.faviconUrl || DEFAULT_BRANDING.faviconUrl || DEFAULT_FAVICON_SVG
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

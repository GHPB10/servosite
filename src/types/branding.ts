export interface BrandingConfig {
  logoType: 'icon' | 'image';
  logoImageUrl: string;
  brandNamePrefix: string;
  brandNameSuffix: string;
  brandSubtitle: string;
  faviconUrl: string;
}

export const DEFAULT_FAVICON_SVG = `data:image/svg+xml,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="50%" stop-color="#0284c7"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="64" height="64" rx="18" fill="url(#g)"/>
  <g fill="none" stroke="#ffffff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M32 16L12 25l20 9 20-9-20-9z"/>
    <path d="M12 36l20 9 20-9"/>
    <path d="M12 47l20 9 20-9"/>
  </g>
</svg>
`)}`;

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

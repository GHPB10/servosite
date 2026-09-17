import { PageId } from '../types';
import { BrandingConfig } from '../types/branding';
import { COMPANY_INFO, NAV_ITEMS } from '../data/content';
import { EditableText } from './EditableText';
import { ServoTechLogoIcon } from './ServoTechLogoIcon';
import { ServoTechLogo } from './ServoTechLogo';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  ExternalLink, 
  Instagram, 
  Facebook, 
  Linkedin, 
  Settings 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenConsultation: (topic?: string) => void;
  onOpenAdminConfig?: () => void;
  branding?: BrandingConfig;
}

export function Footer({ 
  onNavigate, 
  onOpenConsultation,
  onOpenAdminConfig,
  branding
}: FooterProps) {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-slate-950 text-slate-300 border-t border-slate-800">
      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            {/* Brand Logo Oficial */}
            <div className="flex items-center">
              {branding?.logoType === 'image' && branding?.logoImageUrl ? (
                <img
                  src={branding.logoImageUrl}
                  alt={branding.brandNamePrefix ? `${branding.brandNamePrefix} ${branding.brandNameSuffix || ''}` : 'Logo'}
                  style={{
                    height: `${(branding.logoHeightFooter || 60) * (branding.logoScale || 1.4)}px`,
                    maxHeight: '110px'
                  }}
                  className="w-auto max-w-[280px] sm:max-w-[340px] object-contain"
                />
              ) : (
                <ServoTechLogo className="h-12 sm:h-14 w-auto max-w-[240px] sm:max-w-[280px]" />
              )}
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm empty:hidden">
              <EditableText
                contentKey="footer_brand_desc"
                defaultText=""
                className="text-slate-400"
                multiline
              />
            </p>

            {/* Social Media Buttons requested by user */}
            <div className="pt-2">
              <p className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-2">Conecte-se conosco:</p>
              <div className="flex items-center gap-2">
                <a
                  href={COMPANY_INFO.social?.instagram || 'https://instagram.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-pink-400 hover:border-pink-500/40 text-xs font-semibold transition-colors"
                  aria-label="Instagram Servo Tech"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>Instagram</span>
                </a>
                <a
                  href={COMPANY_INFO.social?.facebook || 'https://facebook.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-blue-400 hover:border-blue-500/40 text-xs font-semibold transition-colors"
                  aria-label="Facebook Servo Tech"
                >
                  <Facebook className="w-3.5 h-3.5" />
                  <span>Facebook</span>
                </a>
                <a
                  href={COMPANY_INFO.social?.linkedin || 'https://linkedin.com'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-sky-400 hover:border-sky-500/40 text-xs font-semibold transition-colors"
                  aria-label="LinkedIn Servo Tech"
                >
                  <Linkedin className="w-3.5 h-3.5" />
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="footer-diagnostic-btn"
                onClick={() => onOpenConsultation('Diagnóstico Financeiro Gratuito')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-bold transition-all cursor-pointer"
              >
                <EditableText contentKey="footer_btn_diagnostic" defaultText="Solicitar Diagnóstico Gratuito" className="text-sky-300 font-bold" />
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Soluções */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Soluções</p>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => handleNav('bpo')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  BPO Financeiro Especializado
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('erp')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Odvix ERP (Gestão & Vendas)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('crm')}
                  className="hover:text-sky-400 transition-colors text-left"
                >
                  Servo CRM (Pipeline Comercial)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('parceria')}
                  className="hover:text-sky-400 transition-colors text-left text-sky-300 font-medium"
                >
                  Partner Contábil (Parceria)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bpo')}
                  className="hover:text-sky-400 transition-colors text-left text-slate-400"
                >
                  Conciliação Bancária Diária
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('bpo')}
                  className="hover:text-sky-400 transition-colors text-left text-slate-400"
                >
                  DRE & Relatórios Gerenciais
                </button>
              </li>
            </ul>
          </div>

          {/* Navegação Rápida */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Institucional</p>
            <ul className="space-y-2 text-xs">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNav(item.id)}
                    className="hover:text-sky-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNav('contato')}
                  className="hover:text-sky-400 transition-colors text-left text-slate-400"
                >
                  Perguntas Frequentes (FAQ)
                </button>
              </li>
            </ul>
          </div>

          {/* Atendimento & Contato */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-white uppercase tracking-wider">Atendimento</p>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-center gap-2 text-slate-300">
                <Phone className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.phone}</span>
              </p>
              <p className="flex items-center gap-2 text-slate-300">
                <Mail className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                <span>{COMPANY_INFO.email}</span>
              </p>
              <p className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.hours}</span>
              </p>
              <p className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                <span>{COMPANY_INFO.address}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="border-t border-slate-900 bg-slate-950 py-6 text-slate-400 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>© {new Date().getFullYear()} {COMPANY_INFO.legalName} Todos os direitos reservados. {COMPANY_INFO.subtitle}.</p>
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] text-slate-400">
              <span>Privacidade & LGPD</span>
              <span>•</span>
              <span>Termos de Uso</span>
              <span>•</span>
              <span className="text-sky-400 font-medium">BPO Financeiro Consultivo</span>
              {onOpenAdminConfig && (
                <>
                  <span>•</span>
                  <button
                    type="button"
                    onClick={onOpenAdminConfig}
                    className="p-1 rounded-md text-slate-600 hover:text-sky-400 hover:bg-slate-900 transition-all cursor-pointer"
                    title="Configurações (Acesso Restrito)"
                    aria-label="Configurações do Administrador"
                  >
                    <Settings className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

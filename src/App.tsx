import { useState, useEffect } from 'react';
import { PageId } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { LeadModal } from './components/LeadModal';
import { AdminConfigModal } from './components/AdminConfigModal';
import { FloatingEditBar } from './components/FloatingEditBar';
import { BannerItem, INITIAL_BANNERS } from './types/banner';
import { BrandingConfig, loadBrandingConfig, saveBrandingConfig, applyFavicon } from './types/branding';
import { ContentProvider, useContent } from './context/ContentContext';

// Section Pages
import { HomeSection } from './sections/HomeSection';
import { BpoSection } from './sections/BpoSection';
import { ErpSection } from './sections/ErpSection';
import { CrmSection } from './sections/CrmSection';
import { ParceriaSection } from './sections/ParceriaSection';
import { SobreSection } from './sections/SobreSection';
import { ContatoSection } from './sections/ContatoSection';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTopic, setModalTopic] = useState('BPO Financeiro');

  const { setIsAdmin } = useContent();

  // Admin Config Modal state (Banners & Sheets)
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  // Dynamic Branding State (Logo and Favicon)
  const [branding, setBranding] = useState<BrandingConfig>(() => loadBrandingConfig());

  useEffect(() => {
    applyFavicon(branding.faviconUrl);
  }, [branding.faviconUrl]);

  const handleSaveBranding = (newBranding: BrandingConfig) => {
    setBranding(newBranding);
    saveBrandingConfig(newBranding);
  };

  // Dynamic Banners State (with localStorage persistence)
  const [banners, setBanners] = useState<BannerItem[]>(() => {
    try {
      const saved = localStorage.getItem('servotech_banners');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Falha ao carregar banners do localStorage:', e);
    }
    return INITIAL_BANNERS;
  });

  // Google Sheets state
  const [spreadsheetId, setSpreadsheetId] = useState<string>(() => {
    return localStorage.getItem('servotech_spreadsheet_id') || '1nC5YzPBCzT-weT5lIrhI_wl2UoEgv0vpmBvxaIWoVUE';
  });
  const [sheetTabName, setSheetTabName] = useState<string>(() => {
    return localStorage.getItem('servotech_sheet_tab') || 'site';
  });
  const [webhookUrl, setWebhookUrl] = useState<string>(() => {
    return localStorage.getItem('servotech_sheets_webhook_url') || '';
  });

  const handleOpenConsultation = (topic?: string) => {
    if (topic) setModalTopic(topic);
    setIsModalOpen(true);
  };

  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveBanners = (newBanners: BannerItem[]) => {
    setBanners(newBanners);
    localStorage.setItem('servotech_banners', JSON.stringify(newBanners));
  };

  const handleConfigChange = (id: string, tab: string, newWebhookUrl?: string) => {
    setSpreadsheetId(id);
    setSheetTabName(tab);
    localStorage.setItem('servotech_spreadsheet_id', id);
    localStorage.setItem('servotech_sheet_tab', tab);
    if (newWebhookUrl !== undefined) {
      setWebhookUrl(newWebhookUrl);
      localStorage.setItem('servotech_sheets_webhook_url', newWebhookUrl);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-sky-500/20 selection:text-sky-300">
      {/* Sticky Header Navbar */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
        branding={branding}
      />

      {/* Main Content Area */}
      <main className="flex-grow pt-20 lg:pt-28 pb-20 sm:pb-24">
        {currentPage === 'home' && (
          <HomeSection
            onNavigate={handleNavigate}
            onOpenConsultation={handleOpenConsultation}
            banners={banners}
          />
        )}
        {currentPage === 'bpo' && (
          <BpoSection onOpenConsultation={handleOpenConsultation} />
        )}
        {currentPage === 'erp' && (
          <ErpSection onOpenConsultation={handleOpenConsultation} />
        )}
        {currentPage === 'crm' && (
          <CrmSection onOpenConsultation={handleOpenConsultation} />
        )}
        {currentPage === 'parceria' && (
          <ParceriaSection 
            onOpenConsultation={handleOpenConsultation}
            spreadsheetId={spreadsheetId}
            sheetTabName={sheetTabName}
            webhookUrl={webhookUrl}
          />
        )}
        {currentPage === 'sobre' && (
          <SobreSection onOpenConsultation={handleOpenConsultation} />
        )}
        {currentPage === 'contato' && (
          <ContatoSection 
            onOpenConsultation={handleOpenConsultation}
            spreadsheetId={spreadsheetId}
            sheetTabName={sheetTabName}
            webhookUrl={webhookUrl}
          />
        )}
      </main>

      {/* Corporate High-Trust Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenConsultation={handleOpenConsultation}
        onOpenAdminConfig={() => setIsAdminModalOpen(true)}
        branding={branding}
      />

      {/* Floating Sticky WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Floating Edit Bar for Admin directly across all pages */}
      <FloatingEditBar
        onOpenAdminLogin={() => setIsAdminModalOpen(true)}
      />

      {/* Conversion & Demo Modal */}
      <LeadModal
        isOpen={isModalOpen}
        initialTopic={modalTopic}
        spreadsheetId={spreadsheetId}
        sheetTabName={sheetTabName}
        webhookUrl={webhookUrl}
        onClose={() => setIsModalOpen(false)}
      />

      {/* Exclusivo ADM: Gestão de Banners, Planilha Google & Identidade Visual (Logomarca e Favicon) */}
      <AdminConfigModal
        isOpen={isAdminModalOpen}
        onClose={() => {
          setIsAdminModalOpen(false);
          setIsAdmin(localStorage.getItem('servotech_admin_auth') === 'true');
        }}
        banners={banners}
        onSaveBanners={handleSaveBanners}
        spreadsheetId={spreadsheetId}
        sheetTabName={sheetTabName}
        webhookUrl={webhookUrl}
        onConfigChange={handleConfigChange}
        branding={branding}
        onSaveBranding={handleSaveBranding}
      />
    </div>
  );
}

export default function App() {
  return (
    <ContentProvider>
      <AppContent />
    </ContentProvider>
  );
}

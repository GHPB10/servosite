export interface BannerItem {
  id: string;
  type: 'image' | 'video';
  title?: string;
  subtitle?: string;
  url: string; // URL da imagem ou do vídeo (MP4, WebM, etc. ou embed)
  linkUrl?: string; // Link opcional ao clicar
  buttonText?: string;
  durationSeconds: number; // Tempo que este slide fica ativo antes de passar
  active: boolean;
  order: number;
}

export const INITIAL_BANNERS: BannerItem[] = [
  {
    id: 'banner-1',
    type: 'image',
    title: 'BPO Financeiro Especializado',
    subtitle: 'Gestão de contas a pagar, receber, conciliação e relatórios gerenciais com analistas dedicados.',
    url: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1920&q=80',
    linkUrl: '#contato',
    buttonText: 'Solicitar Diagnóstico Gratuito',
    durationSeconds: 5,
    active: true,
    order: 1
  },
  {
    id: 'banner-2',
    type: 'image',
    title: 'Softwares de Gestão Integrados',
    subtitle: 'Odvix ERP & Servo CRM: controle financeiro, fiscal, estoque e pipeline comercial em tempo real.',
    url: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1920&q=80',
    linkUrl: '#erp',
    buttonText: 'Conhecer os Softwares',
    durationSeconds: 6,
    active: true,
    order: 2
  },
  {
    id: 'banner-3',
    type: 'image',
    title: 'Economia Real vs Equipe CLT',
    subtitle: 'Reduza até 70% dos custos fixos operacionais sem encargos trabalhistas ou riscos jurídicos.',
    url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1920&q=80',
    linkUrl: '#bpo',
    buttonText: 'Calcular Economia',
    durationSeconds: 5,
    active: true,
    order: 3
  }
];

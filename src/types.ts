export type PageId = 'home' | 'bpo' | 'erp' | 'crm' | 'parceria' | 'sobre' | 'contato';

export interface NavItem {
  id: PageId;
  label: string;
  badge?: string;
}

export interface StatItem {
  value: string;
  label: string;
  sublabel: string;
}

export interface ValuePillar {
  id: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface BpoServiceItem {
  title: string;
  description: string;
  impact: string;
  icon: string;
}

export interface TimelineStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface ErpModule {
  id: string;
  title: string;
  category: string;
  description: string;
  features: string[];
  icon: string;
  badge?: string;
  demoStats: { label: string; value: string }[];
}

export interface CrmStage {
  id: string;
  title: string;
  color: string;
  leads: {
    id: string;
    company: string;
    contact: string;
    value: number;
    daysInStage: number;
    source: string;
    tags: string[];
  }[];
}

export interface FaqItem {
  question: string;
  answer: string;
  category: 'bpo' | 'erp' | 'crm' | 'geral';
}

export interface ContactFormData {
  nome: string;
  empresa: string;
  email: string;
  telefone: string;
  faturamento?: string;
  assunto: string;
  mensagem: string;
}

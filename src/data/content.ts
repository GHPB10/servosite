import {
  NavItem,
  StatItem,
  ValuePillar,
  BpoServiceItem,
  TimelineStep,
  ErpModule,
  CrmStage,
  FaqItem
} from '../types';

export const COMPANY_INFO = {
  name: 'Servo Tech',
  tagline: 'Soluções em Tecnologia',
  subtitle: 'Soluções em Tecnologia',
  legalName: 'Servo Tech — Soluções em Tecnologia Ltda.',
  phone: '(41) 3073-9426',
  whatsapp: '554130739426', // Formatted for wa.me
  whatsappDisplay: '(41) 3073-9426',
  email: 'contato@servotech.com.br',
  hours: 'Segunda a Sexta, das 08h30 às 18h00',
  address: 'Curitiba, PR — Atendimento Nacional 100% Digital',
  social: {
    instagram: 'https://instagram.com/servotech',
    facebook: 'https://facebook.com/servotech',
    linkedin: 'https://linkedin.com/company/servotech',
  }
};

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Início' },
  { id: 'bpo', label: 'BPO Financeiro' },
  { id: 'erp', label: 'Odvix ERP' },
  { id: 'crm', label: 'Servo CRM' },
  { id: 'parceria', label: 'Parceria' },
  { id: 'sobre', label: 'Sobre Nós' },
  { id: 'contato', label: 'Contato' },
];

export const HERO_STATS: StatItem[] = [
  { value: '+R$ 300M', label: 'Volume Gerenciado', sublabel: 'Através de nossas soluções' },
  { value: '+80%', label: 'De Economia', sublabel: 'Através da aplicação de nossas soluções' },
  { value: '+1.000', label: 'Clientes Impactados', sublabel: 'Pelas nossas soluções' },
  { value: '100%', label: 'Suporte Humanizado', sublabel: 'Dedicado para todas as soluções' },
];

export const VALUE_PILLARS: ValuePillar[] = [
  {
    id: 'previsibilidade',
    title: 'Previsibilidade de Caixa',
    description: 'Acompanhe recebimentos e desembolsos futuros em tempo real. Tome decisões com base em números consolidados e auditados.',
    iconName: 'TrendingUp',
    tag: 'Visão de Futuro',
  },
  {
    id: 'automacao',
    title: 'Rotinas Automatizadas',
    description: 'Leitura de extratos bancários, emissão ágil de notas fiscais e boletos sem retrabalho manual ou erros de digitação.',
    iconName: 'Cpu',
    tag: 'Eficiência Operacional',
  },
  {
    id: 'reducao-custo',
    title: 'Economia Financeira Real',
    description: 'Elimine os custos de contratações CLT individuais, licenças de software avulsas e riscos de passivos trabalhistas.',
    iconName: 'PiggyBank',
    tag: 'Alta Economia',
  },
  {
    id: 'decisao-estrategica',
    title: 'Governança & Relatórios',
    description: 'DRE gerencial, acompanhamento de margens de lucro e consultoria periódica para direcionar o crescimento do seu negócio.',
    iconName: 'LineChart',
    tag: 'Gestão Estratégica',
  },
];

export const BPO_SERVICES: BpoServiceItem[] = [
  {
    title: 'Gestão de Contas a Pagar e Receber',
    description: 'Controle diário de vencimentos, agendamento seguro no internet banking e régua de cobrança preventiva amigável de clientes inadimplentes.',
    impact: '100% de pagamentos em dia, zero multas e juros por esquecimento.',
    icon: 'Receipt',
  },
  {
    title: 'Conciliação Bancária Diária',
    description: 'Verificação diária de todas as contas correntes, cartões e gateways de pagamento comparados com as notas fiscais emitidas.',
    impact: 'Saldo real e auditado todas as manhãs no seu WhatsApp ou e-mail.',
    icon: 'CheckCheck',
  },
  {
    title: 'Emissão de Notas Fiscais e Boletos',
    description: 'Faturamento rápido de produtos e serviços (NF-e, NFS-e) com parametrização fiscal correta e envio automático ao cliente.',
    impact: 'Economia de 3h diárias que sua equipe gastava com portais de prefeituras.',
    icon: 'FileText',
  },
  {
    title: 'Relatórios e DRE Simplificados',
    description: 'Demonstrativo de Resultados do Exercício (DRE) em regime de competência e caixa, margem de contribuição e ponto de equilíbrio.',
    impact: 'Clareza total sobre o que é lucro real vs. dinheiro temporário no caixa.',
    icon: 'BarChart3',
  },
];

export const BPO_TIMELINE: TimelineStep[] = [
  {
    step: '01',
    title: 'Diagnóstico & Mapeamento',
    duration: 'Semana 1',
    description: 'Analisamos o fluxo atual, mapeamos contas bancárias, planos de contas, gateways e identificamos gargalos e custos ocultos.',
    deliverables: ['Mapeamento de processos', 'Plano de contas estruturado', 'Alinhamento de acessos seguros'],
  },
  {
    step: '02',
    title: 'Implementação & Parametrização',
    duration: 'Semana 2',
    description: 'Configuração do ERP/sistemas, parametrização dos fluxos de aprovação, integração bancária e treinamento inicial dos sócios.',
    deliverables: ['Software parametrizado', 'Fluxo de aprovação estabelecido', 'Painel de acompanhamento ativo'],
  },
  {
    step: '03',
    title: 'Operação Diária Servo Tech',
    duration: 'Contínuo',
    description: 'Nossa equipe sênior assume a operação diária: conciliação, agendamento de pagamentos, faturamento e suporte direto.',
    deliverables: ['Agendamentos diários', 'Conciliação em D+1', 'Suporte dedicado via WhatsApp'],
  },
  {
    step: '04',
    title: 'Relatórios & Reunião Estratégica',
    duration: 'Quinzenal / Mensal',
    description: 'Apresentação executiva com DRE consolidado, análise de margens, alertas de redução de custos e direcionamento financeiro.',
    deliverables: ['DRE Gerencial e Fluxo de Caixa', 'Reunião com consultor sênior', 'Plano de ação corretivo'],
  },
];

export const ERP_MODULES: ErpModule[] = [
  {
    id: 'estoque-vendas',
    title: 'Controle de Estoque & Vendas',
    category: 'Operacional & PDV',
    description: 'Gestão completa de entradas, saídas, múltiplos depósitos, inventário em tempo real, ponto de pedido automático e emissão de orçamentos e pedidos de venda.',
    features: [
      'Giro de estoque e cálculo de reposição automática',
      'Cadastro detalhado com grade de tamanhos, cores e lotes',
      'Orçamentos com envio automático por WhatsApp e e-mail',
      'Integração direta com o checkout de vendas'
    ],
    icon: 'PackageSearch',
    badge: 'Mais Utilizado',
    demoStats: [
      { label: 'Giro de Estoque Médio', value: '+34%' },
      { label: 'Ruptura de Estoque', value: '-82%' }
    ]
  },
  {
    id: 'fiscal-notas',
    title: 'Emissão Fiscal Simplificada',
    category: 'Fiscal & Tributário',
    description: 'Emita NF-e, NFS-e (em mais de 1.500 prefeituras) e NFC-e em menos de 10 segundos, com cálculo tributário automático e envio ao contador.',
    features: [
      'Cálculo automático de ICMS, PIS, COFINS, ISS e Simples',
      'Certificado digital A1 em nuvem com alta segurança',
      'Armazenamento e download de XMLs para contabilidade',
      'Cancelamento e carta de correção em 1 clique'
    ],
    icon: 'ShieldCheck',
    badge: 'Homologado SEFAZ',
    demoStats: [
      { label: 'Tempo de Emissão', value: '8 seg.' },
      { label: 'Cidades Integradas', value: '1.500+' }
    ]
  },
  {
    id: 'fluxo-caixa',
    title: 'Gestão de Fluxo de Caixa & Contas',
    category: 'Financeiro Integrado',
    description: 'Sincronização bancária direta, conciliação OFX/API instantânea, centro de custos, planos de contas gerenciais e projeção de saldo.',
    features: [
      'Conciliação bancária inteligente com leitura de extrato',
      'Previsão orçamentária por departamento / projeto',
      'Régua de cobrança automatizada via PIX e boleto',
      'Visão consolidada de múltiplas contas correntes'
    ],
    icon: 'Wallet',
    demoStats: [
      { label: 'Inadimplência', value: '-45%' },
      { label: 'Tempo de Conciliação', value: 'Instantâneo' }
    ]
  },
  {
    id: 'relatorios-dre',
    title: 'Relatórios Gerenciais & DRE',
    category: 'Gestão Executiva',
    description: 'Dashboards dinâmicos com DRE gerencial, curva ABC de clientes e produtos, margem de contribuição e ponto de equilíbrio sem planilhas complexas.',
    features: [
      'DRE por competência e por regime de caixa',
      'Curva ABC de faturamento por cliente e produto',
      'Exportação em PDF executivo e Excel em segundos',
      'Indicadores de rentabilidade e EBITDA em tempo real'
    ],
    icon: 'BarChart2',
    demoStats: [
      { label: 'Precisão Gerencial', value: '100%' },
      { label: 'Geração de Relatórios', value: '1 clique' }
    ]
  },
];

export const INITIAL_CRM_STAGES: CrmStage[] = [
  {
    id: 'leads',
    title: 'Novos Leads',
    color: 'bg-blue-500',
    leads: [
      { id: '1', company: 'Grupo Nova Aliança', contact: 'Mariana Duarte', value: 38000, daysInStage: 1, source: 'Campanha Google', tags: ['BPO Financeiro', 'Urgente'] },
      { id: '2', company: 'LogTech Express', contact: 'Carlos Silveira', value: 18500, daysInStage: 2, source: 'Indicação', tags: ['ERP + CRM'] },
    ]
  },
  {
    id: 'qualificacao',
    title: 'Qualificação',
    color: 'bg-indigo-500',
    leads: [
      { id: '3', company: 'Vanguard Engenharia', contact: 'Rafael Borges', value: 52000, daysInStage: 3, source: 'Site Servo Tech', tags: ['BPO', '20+ funcionários'] },
      { id: '4', company: 'Clínica OdontoPrime', contact: 'Dra. Fernanda', value: 14000, daysInStage: 2, source: 'WhatsApp', tags: ['Odvix ERP'] },
    ]
  },
  {
    id: 'proposta',
    title: 'Proposta Apresentada',
    color: 'bg-amber-500',
    leads: [
      { id: '5', company: 'Soluções Industriais Alfa', contact: 'Rodrigo Mendonça', value: 76000, daysInStage: 4, source: 'Evento B2B', tags: ['BPO Completo', 'Contrato Anual'] },
      { id: '6', company: 'Distribuidora Monte Real', contact: 'Patrícia Lima', value: 29000, daysInStage: 1, source: 'Indicação', tags: ['ERP Odvix'] },
    ]
  },
  {
    id: 'negociacao',
    title: 'Em Negociação',
    color: 'bg-sky-500',
    leads: [
      { id: '7', company: 'Nexus Tech Consultoria', contact: 'Lucas Barreto', value: 44000, daysInStage: 2, source: 'Inbound', tags: ['Combo BPO + ERP'] },
    ]
  },
  {
    id: 'fechado',
    title: 'Fechado Ganho 🎉',
    color: 'bg-emerald-500',
    leads: [
      { id: '8', company: 'BioHealth Cosméticos', contact: 'Camila Rossi', value: 65000, daysInStage: 0, source: 'Parceiro', tags: ['BPO Financeiro'] },
      { id: '9', company: 'Supermercados Estrela', contact: 'André Valente', value: 92000, daysInStage: 0, source: 'Indicação', tags: ['Odvix + BPO'] },
    ]
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'geral',
    question: 'A Servo Tech é um banco ou fintech?',
    answer: 'Não! É fundamental esclarecer: a Servo Tech NÃO é banco, NÃO é fintech e NÃO é instituição financeira. Somos uma empresa especializada em Soluções em Tecnologia, combinando softwares avançados de gestão (Odvix ERP e Servo CRM) com a terceirização operacional do setor financeiro (BPO Financeiro). Não fazemos empréstimos e não custodiamos seu capital. Toda a movimentação financeira acontece na sua própria conta bancária existente, onde nossos analistas apenas agendam as contas e você mantém 100% do controle de aprovação pelo seu token pessoal.'
  },
  {
    category: 'bpo',
    question: 'Por que terceirizar a equipe gera uma economia astronômica em relação a contratar no CLT um por um?',
    answer: 'Para montar um departamento financeiro interno mínimo, sua empresa precisaria contratar individualmente: 1 Assistente de Contas a Pagar/Receber (~R$ 3.000), 1 Analista Financeiro/Tesouraria (~R$ 4.500) e 1 Faturista/Fiscal (~R$ 3.800). No regime CLT, os encargos e benefícios (INSS patronal 20%, FGTS 8%, Sistema S/RAT, provisão de férias + 1/3, 13º salário, VT, VR, plano de saúde, licenças de software e equipamentos) praticamente dobram a folha, elevando o custo para mais de R$ 20.000 a R$ 25.000 mensais. Além disso, há o risco de turnover, atestados, férias de 30 dias onde o financeiro para, e custos pesadíssimos de rescisão trabalhista. Com o BPO da Servo Tech, você paga uma mensalidade fixa previsível até 70% menor, sem nenhum passivo trabalhista, e conta com uma equipe multidisciplinar sênior operando sem interrupções com softwares de ponta inclusos.'
  },
  {
    category: 'bpo',
    question: 'Como funciona a segurança bancária? A Servo Tech pode movimentar meu dinheiro?',
    answer: 'NUNCA. A Servo Tech opera com o mais rigoroso protocolo de segurança corporativa. Nossos analistas utilizam exclusivamente usuários secundários de operação (sem poderes de aprovação ou transferência), responsáveis unicamente por preparar relatórios e agendar os lotes de pagamentos. A autorização final (via token bancário, biometria ou assinatura digital) é realizada 100% pelo empresário ou sócio administrador.'
  },
  {
    category: 'bpo',
    question: 'Quanto tempo demora a implantação do BPO Financeiro na minha empresa?',
    answer: 'Nossa metodologia ágil de onboarding realiza a transição completa entre 7 e 14 dias úteis, sem interromper suas operações diárias. Na primeira semana estruturamos o diagnóstico e parametrização; na segunda, nossa equipe já assume a rotina diária em paralelo com você.'
  },
  {
    category: 'erp',
    question: 'O Odvix ERP funciona para empresas de quais portes e segmentos?',
    answer: 'O Odvix ERP foi desenvolvido especialmente para micro, pequenas e médias empresas nos setores de Comércio, Serviços, Distribuição e Indústrias Leves. Possui módulos sob medida que se adaptam desde negócios no Simples Nacional até empresas no Lucro Presumido e Real.'
  },
  {
    category: 'crm',
    question: 'É possível integrar o Servo CRM com o Odvix ERP e o BPO?',
    answer: 'Sim! Uma das grandes forças da Servo Tech é a convergência nativa entre o CRM comercial e o ERP financeiro. Quando uma oportunidade é marcada como "Ganha" no CRM, o pedido e o faturamento podem ser gerados instantaneamente no ERP e integrados ao fluxo do BPO.'
  },
  {
    category: 'geral',
    question: 'Como recebo suporte no dia a dia?',
    answer: 'Cada cliente conta com um Gerente de Contas dedicado e canal direto via WhatsApp corporativo ((41) 3073-9426), além de reuniões quinzenais/mensais de alinhamento estratégico por videoconferência com nossos consultores seniores.'
  }
];

export const TESTIMONIALS = [
  {
    quote: 'Terceirizar nosso financeiro com a Servo Tech foi a virada de chave da nossa empresa. Saímos de planilhas desorganizadas para relatórios quinzenais impecáveis e economizamos mais de R$ 5.000 por mês.',
    author: 'Marcos Vinicius',
    role: 'CEO & Fundador',
    company: 'Apex Logística & Transportes',
    results: '+R$ 62.000 economizados no ano',
    rating: 5
  },
  {
    quote: 'O Odvix ERP integrado ao BPO nos deu controle total de estoque e emissão fiscal em segundos. Não me preocupo mais se as contas estão pagas ou se há faturas atrasadas.',
    author: 'Beatriz Vasconcelos',
    role: 'Diretora Financeira',
    company: 'Rede FarmaMais',
    results: '0 divergências fiscais em 18 meses',
    rating: 5
  },
  {
    quote: 'O Servo CRM organizou todo o nosso funil de vendas. Nossos consultores aumentaram a taxa de conversão em 40% porque nenhum lead fica mais sem follow-up.',
    author: 'Guilherme Toledo',
    role: 'Head de Vendas',
    company: 'Nexus Software B2B',
    results: '+40% na conversão de propostas',
    rating: 5
  }
];

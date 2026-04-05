export interface Project {
  id: string;
  color: string;
  en: {
    title: string;
    desc: string;
    tag: string;
    body: string;
  };
  ru: {
    title: string;
    desc: string;
    tag: string;
    body: string;
  };
  links: { label: string; href: string; labelRu?: string }[];
  kbTopics: { label: string; href: string; labelRu?: string; hrefRu?: string }[];
}

export const projects: Project[] = [
  {
    id: 'hyrahmo-com',
    color: '#10b981',
    en: {
      title: 'hyrahmo.com',
      desc: 'This site. Astro + Quartz on Cloudflare Workers.',
      tag: 'Active',
      body: 'Personal site and knowledge base on a single domain. Astro handles the landing, blog, and project pages. Quartz powers the knowledge base at /kb/. Everything deploys to Cloudflare Workers as static assets.',
    },
    ru: {
      title: 'hyrahmo.com',
      desc: 'Этот сайт. Astro + Quartz на Cloudflare Workers.',
      tag: 'Активен',
      body: 'Персональный сайт и база знаний на одном домене. Astro отвечает за лендинг, блог и проекты. Quartz — за базу знаний на /kb/. Деплоится на Cloudflare Workers как статика.',
    },
    links: [
      { label: 'GitHub', href: 'https://github.com/hyrahmo/hyrahmo-com' },
    ],
    kbTopics: [
      { label: 'Software', href: '/kb/en/engineering/software/', labelRu: 'Разработка', hrefRu: '/kb/ru/engineering/software/' },
    ],
  },
  {
    id: 'ai-research',
    color: '#8b5cf6',
    en: {
      title: 'AI Research',
      desc: 'LLMs, agents, computer vision — notes and experiments.',
      tag: 'Active',
      body: 'Exploring large language models, autonomous agents, and computer vision. Building tools on top of them. Documenting findings in the knowledge base.',
    },
    ru: {
      title: 'AI Research',
      desc: 'LLM, агенты, компьютерное зрение — заметки и эксперименты.',
      tag: 'Активен',
      body: 'Исследую большие языковые модели, автономных агентов и компьютерное зрение. Строю инструменты поверх них. Документирую результаты в базе знаний.',
    },
    links: [],
    kbTopics: [
      { label: 'AI Notes', href: '/kb/en/engineering/ai/', labelRu: 'Заметки по ИИ', hrefRu: '/kb/ru/engineering/ai/' },
      { label: 'Software', href: '/kb/en/engineering/software/', labelRu: 'Разработка', hrefRu: '/kb/ru/engineering/software/' },
    ],
  },
  {
    id: 'quant-finance',
    color: '#2563eb',
    en: {
      title: 'Quant Finance',
      desc: 'Algo trading, market models, HFT research.',
      tag: 'Planned',
      body: 'Research into algorithmic trading, high-frequency trading, and quantitative market models. Focus on math-heavy strategies and systematic approaches.',
    },
    ru: {
      title: 'Квант. финансы',
      desc: 'Алготрейдинг, модели рынков, HFT.',
      tag: 'Планы',
      body: 'Исследование алгоритмического трейдинга, высокочастотной торговли и количественных моделей рынков. Фокус на математически обоснованных стратегиях.',
    },
    links: [],
    kbTopics: [
      { label: 'Quant Notes', href: '/kb/en/finance/quant/', labelRu: 'Заметки по кванту', hrefRu: '/kb/ru/finance/quant/' },
      { label: 'Math', href: '/kb/en/science/math/', labelRu: 'Математика', hrefRu: '/kb/ru/science/math/' },
    ],
  },
];

export function getProject(id: string) {
  return projects.find(p => p.id === id);
}

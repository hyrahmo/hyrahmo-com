export interface Project {
  id: string;
  color: string;
  en: { title: string; desc: string; tag: string; body: string };
  ru: { title: string; desc: string; tag: string; body: string };
  links: { label: string; href: string; labelRu?: string }[];
  kbTopics: { label: string; href: string; labelRu?: string; hrefRu?: string }[];
}

export const projects: Project[] = [
  // === ACTIVE ===
  {
    id: 'hyrahmo',
    color: '#ffffff',
    en: {
      title: 'Hyrahmo',
      desc: 'Personal brand. YouTube, blog, build in public.',
      tag: 'Active',
      body: 'The main public identity. Essay-format content with voiceover, RU + EN. YouTube channel, blog, knowledge base — all connected. Living Application for Fall 2027.',
    },
    ru: {
      title: 'Hyrahmo',
      desc: 'Личный бренд. YouTube, блог, build in public.',
      tag: 'Активен',
      body: 'Главная публичная оболочка. Эссе-формат с закадровым голосом, RU + EN. YouTube, блог, база знаний — всё связано. Living Application для поступления Fall 2027.',
    },
    links: [
      { label: 'YouTube', href: 'https://youtube.com/@hyrahmo' },
      { label: 'Site', href: 'https://hyrahmo.com', labelRu: 'Сайт' },
    ],
    kbTopics: [],
  },
  {
    id: 'the-cat-economy',
    color: '#f59e0b',
    en: {
      title: 'The Cat Economy',
      desc: 'Animated economics channel. Cat mascot, Russian.',
      tag: 'In Development',
      body: 'Russian-language 2D animated YouTube channel about economics. Geometric cat mascot. Content plan for ~30 videos, first one about housing prices. SVG icons ready, script written.',
    },
    ru: {
      title: 'Котэкономика',
      desc: 'Анимационный канал про экономику. Кот-маскот.',
      tag: 'В разработке',
      body: 'Русскоязычный 2D-анимационный канал про экономику. Геометрический кот-маскот. Контент-план на ~30 видео, первое — «Почему у тебя никогда не будет квартиры». SVG-иконки готовы, скрипт написан.',
    },
    links: [
      { label: 'YouTube', href: 'https://youtube.com/@thecateconomyru' },
      { label: 'Site', href: 'https://thecateconomy.xyz', labelRu: 'Сайт' },
    ],
    kbTopics: [
      { label: 'Economics', href: '/kb/en/finance/business/', labelRu: 'Экономика', hrefRu: '/kb/ru/finance/business/' },
    ],
  },
  {
    id: 'bossto',
    color: '#e11d48',
    en: {
      title: 'BOSSTO',
      desc: 'Anonymous animated economics channel. Russian.',
      tag: 'In Development',
      body: 'Anonymous Russian animated channel about economics. Competitive analysis focus (ТИНЬКОФФ, Простая экономика). 12 videos planned, first — about Tajikistan remittance dependency. Warm light branding, serif typography.',
    },
    ru: {
      title: 'BOSSTO',
      desc: 'Анонимный анимационный канал про экономику.',
      tag: 'В разработке',
      body: 'Анонимный русскоязычный анимационный канал про экономику. Конкурентный анализ (ТИНЬКОФФ, Простая экономика). 12 видео в плане. Тёплый светлый фон, serif-типографика.',
    },
    links: [
      { label: 'Site', href: 'https://bossto.blog', labelRu: 'Сайт' },
      { label: 'Telegram', href: 'https://t.me/bosstoru' },
    ],
    kbTopics: [
      { label: 'Economics', href: '/kb/en/finance/business/', labelRu: 'Экономика', hrefRu: '/kb/ru/finance/business/' },
    ],
  },
  {
    id: 'econmade',
    color: '#2563eb',
    en: {
      title: 'EconMade',
      desc: 'Global economics media brand. Multilingual.',
      tag: 'Planned',
      body: 'Global media brand about economics and finance with localization by language. The international counterpart to The Cat Economy.',
    },
    ru: {
      title: 'EconMade',
      desc: 'Глобальный медиабренд про экономику. Мультиязычный.',
      tag: 'Планы',
      body: 'Глобальный медиабренд про экономику и финансы с локализацией по языкам. Международная версия Котэкономики.',
    },
    links: [
      { label: 'Site', href: 'https://econmade.xyz', labelRu: 'Сайт' },
    ],
    kbTopics: [
      { label: 'Economics', href: '/kb/en/finance/business/', labelRu: 'Экономика', hrefRu: '/kb/ru/finance/business/' },
    ],
  },
  {
    id: 'algorama',
    color: '#8b5cf6',
    en: {
      title: 'Algorama',
      desc: 'Animated explainers: tech, psychology, AI, systems.',
      tag: 'Planned',
      body: 'Media brand with minimalist white animation: psychology, intelligence, technology, systems, AI, lifehacks. RU first, then multilingual.',
    },
    ru: {
      title: 'Алгорама',
      desc: 'Анимационные объяснения: технологии, психология, AI, системы.',
      tag: 'Планы',
      body: 'Медиа-бренд с минималистичной белой анимацией: психология, интеллект, технологии, системы, AI, лайфхаки.',
    },
    links: [
      { label: 'YouTube', href: 'https://youtube.com/@algoramaz' },
    ],
    kbTopics: [
      { label: 'AI', href: '/kb/en/engineering/ai/', labelRu: 'ИИ', hrefRu: '/kb/ru/engineering/ai/' },
    ],
  },
  {
    id: 'aetlas',
    color: '#10b981',
    en: {
      title: 'AETLAS',
      desc: 'SaaS for creators + personal AI system.',
      tag: 'In Development',
      body: 'Two incarnations. First: SaaS for creators — multi-platform content manager (Next.js + Supabase). Second: personal AI operating system "Jarvis" — FastAPI + pgvector + Telegram bot. Full codebase written (1766 lines Python, Docker Compose).',
    },
    ru: {
      title: 'AETLAS',
      desc: 'SaaS для авторов + персональная AI-система.',
      tag: 'В разработке',
      body: 'Два воплощения. Первое — SaaS для авторов: мультиплатформенный контент-менеджер (Next.js + Supabase). Второе — персональная AI-операционная система «Jarvis»: FastAPI + pgvector + Telegram-бот. Код написан (1766 строк Python, Docker Compose).',
    },
    links: [
      { label: 'Domain', href: 'https://aetlas.pro', labelRu: 'Домен' },
    ],
    kbTopics: [
      { label: 'Software', href: '/kb/en/engineering/software/', labelRu: 'Разработка', hrefRu: '/kb/ru/engineering/software/' },
      { label: 'AI', href: '/kb/en/engineering/ai/', labelRu: 'ИИ', hrefRu: '/kb/ru/engineering/ai/' },
    ],
  },
  {
    id: 'n6s',
    color: '#06b6d4',
    en: {
      title: 'n6s (Nautilus)',
      desc: 'Quantitative hedge fund. Math × code × finance.',
      tag: 'Long-term',
      body: 'Long-term project at the intersection of mathematics, code, and finance. Horizon 2026–2035.',
    },
    ru: {
      title: 'n6s (Nautilus)',
      desc: 'Количественный хедж-фонд. Математика × код × финансы.',
      tag: 'Долгосрочный',
      body: 'Долгосрочный проект на стыке математики, кода и финансов. Горизонт 2026–2035.',
    },
    links: [
      { label: 'Site', href: 'https://n6s.xyz', labelRu: 'Сайт' },
    ],
    kbTopics: [
      { label: 'Quant', href: '/kb/en/finance/quant/', labelRu: 'Квант', hrefRu: '/kb/ru/finance/quant/' },
      { label: 'Math', href: '/kb/en/science/math/', labelRu: 'Математика', hrefRu: '/kb/ru/science/math/' },
    ],
  },
  {
    id: 'suntzufun',
    color: '#ef4444',
    en: {
      title: 'Suntzufun',
      desc: 'Gaming, streaming, CS2, esports content.',
      tag: 'Planned',
      body: 'Separate gaming/streaming project, Russian first. Focus on CS/esports and content around streams.',
    },
    ru: {
      title: 'Suntzufun',
      desc: 'Игры, стримы, CS2, киберспортивный контент.',
      tag: 'Планы',
      body: 'Отдельный игровой/стриминговый проект, русский язык. Фокус на CS/киберспорт и контент вокруг стримов.',
    },
    links: [],
    kbTopics: [
      { label: 'CS2', href: '/kb/en/strategy/cs2/', labelRu: 'CS2', hrefRu: '/kb/ru/strategy/cs2/' },
    ],
  },
];

export function getProject(id: string) {
  return projects.find(p => p.id === id);
}

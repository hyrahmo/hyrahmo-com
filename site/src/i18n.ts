export const languages = {
  en: 'English',
  ru: 'Русский',
};

export const defaultLang = 'en';

export const ui = {
  en: {
    'nav.about': 'About',
    'nav.projects': 'Projects',
    'nav.notes': 'Notes',
    'nav.contact': 'Contact',
    'hero.tag': 'builder / thinker / systems person',
    'hero.line1': 'I build things',
    'hero.line2': 'and share what I learn.',
    'hero.desc': 'Projects, ideas, and a growing knowledge base — all in one place.',
    'hero.projects': 'View Projects',
    'hero.notes': 'Notes',
    'section.what': 'What I Do',
    'card.build': 'Build',
    'card.build.desc': 'Products, tools, and systems that solve real problems.',
    'card.learn': 'Learn',
    'card.learn.desc': 'Constantly exploring new ideas and documenting the journey.',
    'card.share': 'Share',
    'card.share.desc': 'Open knowledge base with notes, insights, and connections.',
    'about.title': 'About',
    'about.p1': "I'm HYRAHMO. I build products, explore systems, and document what I learn along the way.",
    'about.p2.pre': 'This site is both a portfolio and a living knowledge base. The ',
    'about.p2.main': 'main site',
    'about.p2.mid': ' is the polished side — projects, ideas, proof of work. The ',
    'about.p2.notes': 'notes',
    'about.p2.post': ' section is the raw side — connections, a digital garden.',
    'about.p3': 'I believe in learning in public, building useful things, and keeping things simple.',
    'projects.title': 'Projects',
    'projects.subtitle': "Things I've built and worked on.",
    'projects.this': 'This site',
    'projects.this.desc': 'Personal site and knowledge base. Astro + Quartz on Cloudflare Workers.',
    'projects.soon': 'More coming soon',
    'projects.soon.desc': 'New projects are in the works. Stay tuned.',
    'contact.title': 'Contact',
    'contact.desc': 'Want to collaborate, ask a question, or just say hi?',
    '404.title': '404',
    '404.text': "This page doesn't exist.",
    '404.back': 'Go home',
    'footer.notes': 'Notes',
  },
  ru: {
    'nav.about': 'Обо мне',
    'nav.projects': 'Проекты',
    'nav.notes': 'Заметки',
    'nav.contact': 'Контакт',
    'hero.tag': 'строю / думаю / систематизирую',
    'hero.line1': 'Я строю вещи',
    'hero.line2': 'и делюсь тем, что узнаю.',
    'hero.desc': 'Проекты, идеи и растущая база знаний — всё в одном месте.',
    'hero.projects': 'Проекты',
    'hero.notes': 'Заметки',
    'section.what': 'Чем занимаюсь',
    'card.build': 'Строю',
    'card.build.desc': 'Продукты, инструменты и системы, которые решают реальные задачи.',
    'card.learn': 'Учусь',
    'card.learn.desc': 'Постоянно исследую новые идеи и документирую процесс.',
    'card.share': 'Делюсь',
    'card.share.desc': 'Открытая база знаний с заметками, инсайтами и связями.',
    'about.title': 'Обо мне',
    'about.p1': 'Я HYRAHMO. Создаю продукты, исследую системы и документирую всё, что узнаю.',
    'about.p2.pre': 'Этот сайт — одновременно портфолио и живая база знаний. ',
    'about.p2.main': 'Главная',
    'about.p2.mid': ' — отполированная сторона: проекты, идеи, результаты. ',
    'about.p2.notes': 'Заметки',
    'about.p2.post': ' — сырая сторона: связи, цифровой сад.',
    'about.p3': 'Верю в открытое обучение, полезные вещи и простоту.',
    'projects.title': 'Проекты',
    'projects.subtitle': 'То, что я построил и над чем работаю.',
    'projects.this': 'Этот сайт',
    'projects.this.desc': 'Персональный сайт и база знаний. Astro + Quartz на Cloudflare Workers.',
    'projects.soon': 'Скоро ещё',
    'projects.soon.desc': 'Новые проекты в работе. Следите за обновлениями.',
    'contact.title': 'Контакт',
    'contact.desc': 'Хочешь сотрудничать, задать вопрос или просто написать?',
    '404.title': '404',
    '404.text': 'Такой страницы не существует.',
    '404.back': 'На главную',
    'footer.notes': 'Заметки',
  },
} as const;

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as keyof typeof ui;
  return defaultLang;
}

export function t(lang: keyof typeof ui, key: keyof typeof ui[typeof defaultLang]) {
  return ui[lang][key] || ui[defaultLang][key];
}

export function getLocalePath(lang: keyof typeof ui, path: string) {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}

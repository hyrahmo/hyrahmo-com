import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';

const CONTENT = 'kb/content';

// Topic definitions with titles and short descriptions per language
const topics = {
  'engineering/ai': {
    en: { title: 'AI', desc: 'LLMs, agents, computer vision' },
    ru: { title: 'ИИ', desc: 'LLM, агенты, компьютерное зрение' },
    zh: { title: '人工智能', desc: 'LLM、智能体、计算机视觉' },
    es: { title: 'IA', desc: 'LLMs, agentes, visión artificial' },
    de: { title: 'KI', desc: 'LLMs, Agenten, Computer Vision' },
    fr: { title: 'IA', desc: 'LLMs, agents, vision par ordinateur' },
    pt: { title: 'IA', desc: 'LLMs, agentes, visão computacional' },
    ar: { title: 'الذكاء الاصطناعي', desc: 'نماذج اللغة، الوكلاء، الرؤية الحاسوبية' },
  },
  'engineering/robotics': {
    en: { title: 'Robotics', desc: 'Hardware, electronics, mechatronics' },
    ru: { title: 'Робототехника', desc: 'Железо, электроника, мехатроника' },
    zh: { title: '机器人', desc: '硬件、电子、机电一体化' },
    es: { title: 'Robótica', desc: 'Hardware, electrónica, mecatrónica' },
    de: { title: 'Robotik', desc: 'Hardware, Elektronik, Mechatronik' },
    fr: { title: 'Robotique', desc: 'Matériel, électronique, mécatronique' },
    pt: { title: 'Robótica', desc: 'Hardware, eletrônica, mecatrônica' },
    ar: { title: 'الروبوتات', desc: 'الأجهزة، الإلكترونيات، الميكاترونكس' },
  },
  'engineering/software': {
    en: { title: 'Software', desc: 'Backend, systems, architecture' },
    ru: { title: 'Разработка', desc: 'Backend, системы, архитектура' },
    zh: { title: '软件工程', desc: '后端、系统、架构' },
    es: { title: 'Software', desc: 'Backend, sistemas, arquitectura' },
    de: { title: 'Software', desc: 'Backend, Systeme, Architektur' },
    fr: { title: 'Logiciel', desc: 'Backend, systèmes, architecture' },
    pt: { title: 'Software', desc: 'Backend, sistemas, arquitetura' },
    ar: { title: 'البرمجيات', desc: 'الخلفية، الأنظمة، الهندسة المعمارية' },
  },
  'finance/business': {
    en: { title: 'Business', desc: 'Digital products, growth, monetization' },
    ru: { title: 'Бизнес', desc: 'Цифровые продукты, рост, монетизация' },
    zh: { title: '商业', desc: '数字产品、增长、变现' },
    es: { title: 'Negocios', desc: 'Productos digitales, crecimiento, monetización' },
    de: { title: 'Business', desc: 'Digitale Produkte, Wachstum, Monetarisierung' },
    fr: { title: 'Business', desc: 'Produits numériques, croissance, monétisation' },
    pt: { title: 'Negócios', desc: 'Produtos digitais, crescimento, monetização' },
    ar: { title: 'الأعمال', desc: 'المنتجات الرقمية، النمو، تحقيق الدخل' },
  },
  'finance/crypto': {
    en: { title: 'Crypto', desc: 'Blockchain, DeFi, tokenomics' },
    ru: { title: 'Крипто', desc: 'Блокчейн, DeFi, токеномика' },
    zh: { title: '加密货币', desc: '区块链、DeFi、代币经济学' },
    es: { title: 'Cripto', desc: 'Blockchain, DeFi, tokenomics' },
    de: { title: 'Krypto', desc: 'Blockchain, DeFi, Tokenomics' },
    fr: { title: 'Crypto', desc: 'Blockchain, DeFi, tokenomics' },
    pt: { title: 'Cripto', desc: 'Blockchain, DeFi, tokenomics' },
    ar: { title: 'العملات المشفرة', desc: 'البلوكتشين، التمويل اللامركزي' },
  },
  'finance/quant': {
    en: { title: 'Quant', desc: 'Algo trading, HFT, market models' },
    ru: { title: 'Квант', desc: 'Алготрейдинг, HFT, модели рынков' },
    zh: { title: '量化金融', desc: '算法交易、高频交易、市场模型' },
    es: { title: 'Quant', desc: 'Trading algorítmico, HFT, modelos de mercado' },
    de: { title: 'Quant', desc: 'Algo-Trading, HFT, Marktmodelle' },
    fr: { title: 'Quant', desc: 'Trading algo, HFT, modèles de marché' },
    pt: { title: 'Quant', desc: 'Trading algorítmico, HFT, modelos de mercado' },
    ar: { title: 'التمويل الكمي', desc: 'التداول الخوارزمي، النماذج الكمية' },
  },
  'science/math': {
    en: { title: 'Math', desc: 'Linear algebra, statistics, probability' },
    ru: { title: 'Математика', desc: 'Линейная алгебра, статистика, вероятность' },
    zh: { title: '数学', desc: '线性代数、统计学、概率论' },
    es: { title: 'Matemáticas', desc: 'Álgebra lineal, estadística, probabilidad' },
    de: { title: 'Mathematik', desc: 'Lineare Algebra, Statistik, Wahrscheinlichkeit' },
    fr: { title: 'Maths', desc: 'Algèbre linéaire, statistiques, probabilités' },
    pt: { title: 'Matemática', desc: 'Álgebra linear, estatística, probabilidade' },
    ar: { title: 'الرياضيات', desc: 'الجبر الخطي، الإحصاء، الاحتمالات' },
  },
  'science/physics': {
    en: { title: 'Physics', desc: 'Quantum mechanics, thermodynamics' },
    ru: { title: 'Физика', desc: 'Квантовая механика, термодинамика' },
    zh: { title: '物理', desc: '量子力学、热力学' },
    es: { title: 'Física', desc: 'Mecánica cuántica, termodinámica' },
    de: { title: 'Physik', desc: 'Quantenmechanik, Thermodynamik' },
    fr: { title: 'Physique', desc: 'Mécanique quantique, thermodynamique' },
    pt: { title: 'Física', desc: 'Mecânica quântica, termodinâmica' },
    ar: { title: 'الفيزياء', desc: 'ميكانيكا الكم، الديناميكا الحرارية' },
  },
  'strategy/chess': {
    en: { title: 'Chess', desc: 'Openings, strategy, endgames' },
    ru: { title: 'Шахматы', desc: 'Дебюты, стратегия, эндшпили' },
    zh: { title: '国际象棋', desc: '开局、战略、残局' },
    es: { title: 'Ajedrez', desc: 'Aperturas, estrategia, finales' },
    de: { title: 'Schach', desc: 'Eröffnungen, Strategie, Endspiele' },
    fr: { title: 'Échecs', desc: 'Ouvertures, stratégie, finales' },
    pt: { title: 'Xadrez', desc: 'Aberturas, estratégia, finais' },
    ar: { title: 'الشطرنج', desc: 'الافتتاحيات، الاستراتيجية، نهايات اللعب' },
  },
  'strategy/cs2': {
    en: { title: 'CS2', desc: 'Tactics, utility, economy' },
    ru: { title: 'CS2', desc: 'Тактика, утилиты, экономика' },
    zh: { title: 'CS2', desc: '战术、道具、经济' },
    es: { title: 'CS2', desc: 'Tácticas, utilidad, economía' },
    de: { title: 'CS2', desc: 'Taktiken, Utility, Wirtschaft' },
    fr: { title: 'CS2', desc: 'Tactiques, utilitaires, économie' },
    pt: { title: 'CS2', desc: 'Táticas, utilitários, economia' },
    ar: { title: 'CS2', desc: 'التكتيكات، الأدوات، الاقتصاد' },
  },
  'strategy/poker': {
    en: { title: 'Poker', desc: 'GTO, ranges, risk management' },
    ru: { title: 'Покер', desc: 'GTO, диапазоны, управление рисками' },
    zh: { title: '扑克', desc: 'GTO、范围、风险管理' },
    es: { title: 'Póker', desc: 'GTO, rangos, gestión de riesgo' },
    de: { title: 'Poker', desc: 'GTO, Ranges, Risikomanagement' },
    fr: { title: 'Poker', desc: 'GTO, ranges, gestion du risque' },
    pt: { title: 'Pôquer', desc: 'GTO, ranges, gestão de risco' },
    ar: { title: 'البوكر', desc: 'نظرية اللعبة المثلى، إدارة المخاطر' },
  },
  'meta/learning': {
    en: { title: 'Learning', desc: 'Spaced repetition, Zettelkasten, methodology' },
    ru: { title: 'Обучение', desc: 'Интервальное повторение, Zettelkasten, методология' },
    zh: { title: '学习方法', desc: '间隔重复、Zettelkasten、方法论' },
    es: { title: 'Aprendizaje', desc: 'Repetición espaciada, Zettelkasten, metodología' },
    de: { title: 'Lernen', desc: 'Spaced Repetition, Zettelkasten, Methodik' },
    fr: { title: 'Apprentissage', desc: 'Répétition espacée, Zettelkasten, méthodologie' },
    pt: { title: 'Aprendizagem', desc: 'Repetição espaçada, Zettelkasten, metodologia' },
    ar: { title: 'التعلم', desc: 'التكرار المتباعد، زتلكاستن، المنهجية' },
  },
  'meta/biohacking': {
    en: { title: 'Biohacking', desc: 'Sleep, nutrition, neurochemistry' },
    ru: { title: 'Биохакинг', desc: 'Сон, питание, нейрохимия' },
    zh: { title: '生物黑客', desc: '睡眠、营养、神经化学' },
    es: { title: 'Biohacking', desc: 'Sueño, nutrición, neuroquímica' },
    de: { title: 'Biohacking', desc: 'Schlaf, Ernährung, Neurochemie' },
    fr: { title: 'Biohacking', desc: 'Sommeil, nutrition, neurochimie' },
    pt: { title: 'Biohacking', desc: 'Sono, nutrição, neuroquímica' },
    ar: { title: 'البيوهاكينغ', desc: 'النوم، التغذية، الكيمياء العصبية' },
  },
};

// Section names per language
const sections = {
  engineering: {
    en: 'Engineering', ru: 'Инженерия', zh: '工程', es: 'Ingeniería',
    de: 'Technik', fr: 'Ingénierie', pt: 'Engenharia', ar: 'الهندسة',
  },
  finance: {
    en: 'Finance', ru: 'Финансы', zh: '金融', es: 'Finanzas',
    de: 'Finanzen', fr: 'Finance', pt: 'Finanças', ar: 'المالية',
  },
  science: {
    en: 'Science', ru: 'Наука', zh: '科学', es: 'Ciencia',
    de: 'Wissenschaft', fr: 'Science', pt: 'Ciência', ar: 'العلوم',
  },
  strategy: {
    en: 'Strategy', ru: 'Стратегия', zh: '策略', es: 'Estrategia',
    de: 'Strategie', fr: 'Stratégie', pt: 'Estratégia', ar: 'الاستراتيجية',
  },
  meta: {
    en: 'Meta', ru: 'Мета', zh: '元技能', es: 'Meta',
    de: 'Meta', fr: 'Méta', pt: 'Meta', ar: 'ميتا',
  },
};

const langs = ['en', 'ru', 'zh', 'es', 'de', 'fr', 'pt', 'ar'];

const langLabels = {
  en: '🇺🇸 English', ru: '🇷🇺 Русский', zh: '🇨🇳 中文', es: '🇪🇸 Español',
  de: '🇩🇪 Deutsch', fr: '🇫🇷 Français', pt: '🇧🇷 Português', ar: '🇸🇦 العربية',
};

const langShort = {
  en: 'English', ru: 'Русский', zh: '中文', es: 'Español',
  de: 'Deutsch', fr: 'Français', pt: 'Português', ar: 'العربية',
};

// Generate translation links for a topic page
function transLinks(lang, topicPath) {
  return langs
    .filter(l => l !== lang)
    .map(l => `**[[${l}/${topicPath}/index|${langShort[l]}]]**`)
    .join(' · ');
}

// Generate topic pages
for (const [topicPath, langData] of Object.entries(topics)) {
  for (const lang of langs) {
    const t = langData[lang];
    const filePath = join(CONTENT, lang, topicPath, 'index.md');

    const content = `---
title: "${t.title}"
date: 2025-12-21
lastmod: 2026-04-04
lang: ${lang}
description: "${t.desc}"
tags: [${lang}]
draft: false
---

> [!note] 🌍
> ${transLinks(lang, topicPath)}

# ${t.title}

${t.desc}.
`;

    mkdirSync(dirname(filePath), { recursive: true });
    writeFileSync(filePath, content);
  }
}

// Generate language index pages
const langIndex = {
  en: { title: 'English', desc: 'Notes in English' },
  ru: { title: 'Русский', desc: 'Заметки на русском' },
  zh: { title: '中文', desc: '中文笔记' },
  es: { title: 'Español', desc: 'Notas en español' },
  de: { title: 'Deutsch', desc: 'Notizen auf Deutsch' },
  fr: { title: 'Français', desc: 'Notes en français' },
  pt: { title: 'Português', desc: 'Notas em português' },
  ar: { title: 'العربية', desc: 'ملاحظات بالعربية' },
};

for (const lang of langs) {
  const idx = langIndex[lang];
  const filePath = join(CONTENT, lang, 'index.md');

  // Build topic list grouped by section
  let topicList = '';
  const sectionGroups = {};

  for (const [topicPath, langData] of Object.entries(topics)) {
    const [section] = topicPath.split('/');
    if (!sectionGroups[section]) sectionGroups[section] = [];
    sectionGroups[section].push({ path: topicPath, ...langData[lang] });
  }

  for (const [section, items] of Object.entries(sectionGroups)) {
    const sectionName = sections[section][lang];
    topicList += `### ${sectionName}\n`;
    for (const item of items) {
      topicList += `- **[[${lang}/${item.path}/index|${item.title}]]** — ${item.desc}\n`;
    }
    topicList += '\n';
  }

  const otherLangs = langs
    .filter(l => l !== lang)
    .map(l => `**[[${l}/index|${langShort[l]}]]**`)
    .join(' · ');

  const content = `---
title: "${idx.title}"
date: 2025-12-21
lastmod: 2026-04-04
lang: ${lang}
description: "${idx.desc}"
tags: [${lang}]
draft: false
---

> [!note] 🌍
> ${otherLangs}

${topicList}`;

  writeFileSync(filePath, content);
}

console.log('Done. All content filled.');

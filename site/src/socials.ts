export interface Social {
  label: string;
  url: string;
  handle: string;
}

// English-facing socials
export const socialsEn: Social[] = [
  { label: 'GitHub', url: 'https://github.com/hyrahmo', handle: '@hyrahmo' },
  { label: 'X / Twitter', url: 'https://x.com/hyrahmo', handle: '@hyrahmo' },
  { label: 'Telegram', url: 'https://t.me/hyrahmo', handle: '@hyrahmo' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/hyrahmo', handle: 'hyrahmo' },
];

// Russian-facing socials
export const socialsRu: Social[] = [
  { label: 'GitHub', url: 'https://github.com/hyrahmo', handle: '@hyrahmo' },
  { label: 'X / Twitter', url: 'https://x.com/hyrahmoru', handle: '@hyrahmoru' },
  { label: 'Telegram', url: 'https://t.me/hyrahmoru', handle: '@hyrahmoru' },
  { label: 'LinkedIn', url: 'https://linkedin.com/in/hyrahmo', handle: 'hyrahmo' },
];

export function getSocials(lang: string) {
  return lang === 'ru' ? socialsRu : socialsEn;
}

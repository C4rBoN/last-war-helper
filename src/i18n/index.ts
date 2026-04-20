import { Lang } from '../types/player.types';
import { EN } from './en';
import { FR } from './fr';

const translations: Record<Lang, Record<string, string>> = { fr: FR, en: EN };

export function t(lang: Lang, key: string, params?: Record<string, string | number>): string {
  const template = translations[lang][key] ?? translations['en'][key] ?? key;
  if (!params) return template;
  return Object.entries(params).reduce(
    (s, [k, v]) => s.replace(`{{${k}}}`, String(v)),
    template
  );
}

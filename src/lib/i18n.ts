import * as rosettaModule from 'rosetta';
import type { Locale } from '$lib/types';

export type { Locale };

const rosetta = (rosettaModule as any).default ?? rosettaModule;
const i18n = rosetta();

export const LOCALES: Locale[] = ['en', 'es', 'fr', 'vi', 'zh'];
export const DEFAULT_LOCALE: Locale = 'en';

const modules = import.meta.glob('/messages/*.json', { eager: true });

// Load all locales immediately at module init time
for (const [path, mod] of Object.entries(modules)) {
  const locale = path.replace('/messages/', '').replace('.json', '') as Locale;
  const messages = (mod as any).default ?? mod;
  i18n.set(locale, messages);
}

export function loadLocale(locale: Locale) {
  // All locales already loaded — just switch
  i18n.locale(locale);
}

export function t(key: string, params?: Record<string, unknown>, locale?: Locale): string {
  return i18n.t(key, params, locale) as string;
}

export function setLocale(locale: Locale) {
  i18n.locale(locale);
}

export function getLocale(): string {
  return i18n.locale() as string;
}

export default i18n;
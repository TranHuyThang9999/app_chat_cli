// Internationalization configuration
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const;

export type SupportedLanguage = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

export const LANGUAGE_STORAGE_KEY = 'app_chat_language';

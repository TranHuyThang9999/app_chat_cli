# Multilingual System Documentation

## Overview
This application now supports multiple languages with a comprehensive internationalization (i18n) system. Currently supports **English** and **Vietnamese**, with easy extensibility for additional languages.

## Features

### ✅ Implemented Features
- **Language Context**: Centralized language state management
- **Translation System**: Organized translation files with nested keys
- **Language Switcher**: User-friendly dropdown with flag emojis
- **Persistent Storage**: Language preference saved in localStorage
- **Fallback System**: Automatic fallback to English if translation missing
- **Type Safety**: Full TypeScript support for translation keys

### 🌍 Supported Languages
- **English (en)** - Default language
- **Vietnamese (vi)** - Full translation support

## File Structure

```
src/
├── config/
│   └── i18n.ts                 # Language configuration
├── contexts/
│   └── LanguageContext.tsx     # Language state management
├── locales/
│   ├── en.ts                   # English translations
│   └── vi.ts                   # Vietnamese translations
└── components/
    ├── LanguageSwitcher.tsx    # Language selection component
    └── MultilingualDemo.tsx    # Demo component
```

## Usage

### Basic Translation
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { t } = useLanguage();
  
  return <h1>{t('app.welcome')}</h1>;
}
```

### Language Switching
```tsx
import { useLanguage } from '@/contexts/LanguageContext';

function MyComponent() {
  const { setLanguage, availableLanguages } = useLanguage();
  
  return (
    <select onChange={(e) => setLanguage(e.target.value)}>
      {Object.entries(availableLanguages).map(([code, name]) => (
        <option key={code} value={code}>{name}</option>
      ))}
    </select>
  );
}
```

### Language Switcher Component
```tsx
import LanguageSwitcher from '@/components/LanguageSwitcher';

// With label
<LanguageSwitcher showLabel={true} size="medium" />

// Compact version
<LanguageSwitcher showLabel={false} size="small" />
```

## Translation File Structure

### English (src/locales/en.ts)
```typescript
export const en = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    // ...
  },
  navigation: {
    dashboard: 'Dashboard',
    chat: 'Chat',
    // ...
  },
  auth: {
    signIn: 'Sign In',
    username: 'Username',
    // ...
  },
  // ...
} as const;
```

### Vietnamese (src/locales/vi.ts)
```typescript
export const vi = {
  common: {
    loading: 'Đang tải...',
    error: 'Lỗi',
    // ...
  },
  navigation: {
    dashboard: 'Bảng điều khiển',
    chat: 'Trò chuyện',
    // ...
  },
  auth: {
    signIn: 'Đăng nhập',
    username: 'Tên đăng nhập',
    // ...
  },
  // ...
} as const;
```

## Adding New Languages

### Step 1: Update Configuration
Add new language to `src/config/i18n.ts`:
```typescript
export const SUPPORTED_LANGUAGES = {
  en: 'English',
  vi: 'Tiếng Việt',
  fr: 'Français',  // New language
  es: 'Español',   // Another new language
} as const;
```

### Step 2: Create Translation File
Create `src/locales/fr.ts`:
```typescript
export const fr = {
  common: {
    loading: 'Chargement...',
    error: 'Erreur',
    // ... translate all keys from en.ts
  },
  // ... translate all sections
} as const;
```

### Step 3: Update Language Context
Add to translations object in `src/contexts/LanguageContext.tsx`:
```typescript
import { fr } from '@/locales/fr';

const translations = {
  en,
  vi,
  fr,  // Add new language
} as const;
```

### Step 4: Add Flag Emoji
Update `src/components/LanguageSwitcher.tsx`:
```typescript
const flagEmojis = {
  en: '🇺🇸',
  vi: '🇻🇳',
  fr: '🇫🇷',  // Add flag for new language
} as const;
```

## Translation Keys Reference

### Common Keys
- `common.loading` - Loading indicator text
- `common.error` - Generic error message
- `common.success` - Success message
- `common.cancel` - Cancel button
- `common.save` - Save button

### Navigation Keys
- `navigation.dashboard` - Dashboard menu item
- `navigation.chat` - Chat menu item
- `navigation.settings` - Settings menu item
- `navigation.login` - Login button
- `navigation.logout` - Logout button
- `navigation.register` - Register button

### Authentication Keys
- `auth.signIn` - Sign in button text
- `auth.signingIn` - Signing in loading text
- `auth.username` - Username field label
- `auth.password` - Password field label
- `auth.enterUsername` - Username placeholder
- `auth.enterPassword` - Password placeholder
- `auth.usernameRequired` - Username validation message
- `auth.passwordRequired` - Password validation message
- `auth.invalidCredentials` - Invalid login error
- `auth.loginSuccess` - Successful login message
- `auth.loginFailed` - Failed login message
- `auth.dontHaveAccount` - "Don't have account" text
- `auth.signUp` - Sign up link text

### App Branding Keys
- `app.name` - Application name
- `app.welcome` - Welcome message
- `app.welcomeBack` - Welcome back message
- `app.redirecting` - Redirecting message

### Home Page Keys
- `home.title` - Home page title
- `home.description` - Home page description
- `home.getStarted` - Getting started instruction
- `home.features` - Features section title
- `home.gettingStarted` - Getting started section title
- `home.featuresList.*` - Individual feature items
- `home.gettingStartedList.*` - Individual getting started items

### Language Keys
- `language.selectLanguage` - Language selector label
- `language.currentLanguage` - Current language label

## Best Practices

### 1. Translation Key Naming
- Use descriptive, hierarchical keys: `auth.username` not `username`
- Group related translations: `auth.*`, `navigation.*`, `common.*`
- Use camelCase for nested keys: `featuresList.realtimeMessaging`

### 2. Translation Content
- Keep translations concise but clear
- Consider cultural context for different languages
- Maintain consistency in tone and terminology
- Test with longer text to ensure UI doesn't break

### 3. Development Workflow
- Always add new keys to English first
- Translate to all supported languages
- Test language switching functionality
- Verify UI layout with different text lengths

### 4. Performance Considerations
- Translations are loaded statically (no runtime API calls)
- Language preference is cached in localStorage
- Minimal re-renders when switching languages

## Testing the System

### Manual Testing
1. Open the application
2. Use the language switcher in the header
3. Verify all text updates immediately
4. Refresh the page and confirm language persists
5. Check both desktop and mobile views

### Demo Component
Visit the home page to see the `MultilingualDemo` component that showcases:
- All translation categories
- Real-time language switching
- Current language display
- Instructions for adding new languages

## Troubleshooting

### Common Issues

1. **Translation not found**: Check if key exists in translation file
2. **Fallback not working**: Verify English translation exists for the key
3. **Language not persisting**: Check localStorage permissions
4. **Type errors**: Ensure new keys are added to TypeScript types

### Debug Mode
Add this to see current language and available translations:
```tsx
const { language, t, availableLanguages } = useLanguage();
console.log('Current language:', language);
console.log('Available languages:', availableLanguages);
console.log('Translation test:', t('app.welcome'));
```

## Future Enhancements

### Potential Improvements
- **Pluralization**: Handle singular/plural forms
- **Date/Number Formatting**: Locale-specific formatting
- **RTL Support**: Right-to-left language support
- **Dynamic Loading**: Load translations on demand
- **Translation Management**: Admin interface for translations
- **Auto-detection**: Detect user's browser language

### Integration Ideas
- **API Integration**: Fetch translations from CMS
- **Professional Translation**: Integration with translation services
- **A/B Testing**: Test different translations
- **Analytics**: Track language usage statistics

---

## Quick Start Summary

1. **Use translations**: Import `useLanguage` hook and call `t('key.path')`
2. **Switch languages**: Use `<LanguageSwitcher />` component
3. **Add new language**: Follow the 4-step process above
4. **Test thoroughly**: Verify all text updates and UI remains intact

The multilingual system is now fully integrated and ready for production use! 🚀

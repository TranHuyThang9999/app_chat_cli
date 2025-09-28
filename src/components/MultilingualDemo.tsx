'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';

export default function MultilingualDemo() {
  const { t, language } = useLanguage();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          🌍 Multilingual System Demo
        </h2>
        <p className="text-gray-600 mb-4">
          This demonstrates the multilingual capabilities of your application. 
          Switch between languages using the dropdown below.
        </p>
        <LanguageSwitcher />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* App Information */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            App Information
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>App Name:</strong> {t('app.name')}</p>
            <p><strong>Welcome Message:</strong> {t('app.welcome')}</p>
            <p><strong>Current Language:</strong> {language.toUpperCase()}</p>
          </div>
        </div>

        {/* Navigation Labels */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Navigation Labels
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Dashboard:</strong> {t('navigation.dashboard')}</p>
            <p><strong>Chat:</strong> {t('navigation.chat')}</p>
            <p><strong>Settings:</strong> {t('navigation.settings')}</p>
            <p><strong>Login:</strong> {t('navigation.login')}</p>
            <p><strong>Logout:</strong> {t('navigation.logout')}</p>
          </div>
        </div>

        {/* Authentication Labels */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Authentication Labels
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Username:</strong> {t('auth.username')}</p>
            <p><strong>Password:</strong> {t('auth.password')}</p>
            <p><strong>Sign In:</strong> {t('auth.signIn')}</p>
            <p><strong>Sign Up:</strong> {t('auth.signUp')}</p>
            <p><strong>Success Message:</strong> {t('auth.loginSuccess')}</p>
          </div>
        </div>

        {/* Common Labels */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">
            Common Labels
          </h3>
          <div className="space-y-2 text-sm">
            <p><strong>Loading:</strong> {t('common.loading')}</p>
            <p><strong>Error:</strong> {t('common.error')}</p>
            <p><strong>Success:</strong> {t('common.success')}</p>
            <p><strong>Cancel:</strong> {t('common.cancel')}</p>
            <p><strong>Save:</strong> {t('common.save')}</p>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">
          💡 How to Add More Languages
        </h3>
        <ol className="text-sm text-blue-800 space-y-1">
          <li>1. Add new language code to <code>src/config/i18n.ts</code></li>
          <li>2. Create translation file in <code>src/locales/</code></li>
          <li>3. Import and add to translations object in <code>LanguageContext.tsx</code></li>
          <li>4. Add flag emoji to <code>LanguageSwitcher.tsx</code></li>
        </ol>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { SupportedLanguage } from '@/config/i18n';

interface LanguageSwitcherProps {
  className?: string;
  showLabel?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export default function LanguageSwitcher({ 
  className = '', 
  showLabel = true,
  size = 'medium' 
}: LanguageSwitcherProps) {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const sizeClasses = {
    small: 'text-xs px-2 py-1',
    medium: 'text-sm px-3 py-2',
    large: 'text-base px-4 py-3',
  };

  const handleLanguageChange = (newLanguage: SupportedLanguage) => {
    setLanguage(newLanguage);
    setIsOpen(false);
  };

  const flagEmojis = {
    en: '🇺🇸',
    vi: '🇻🇳',
  };

  return (
    <div className={`relative inline-block text-left ${className}`}>
      {showLabel && (
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {t('language.selectLanguage')}
        </label>
      )}
      
      <div>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`
            inline-flex justify-between items-center w-full rounded-md border border-gray-300 
            shadow-sm bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-blue-500 transition-colors
            ${sizeClasses[size]}
          `}
          aria-expanded="false"
          aria-haspopup="true"
        >
          <div className="flex items-center space-x-2">
            <span className="text-lg">{flagEmojis[language]}</span>
            <span className="font-medium">{availableLanguages[language]}</span>
          </div>
          <svg
            className={`-mr-1 ml-2 h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 z-20 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1" role="menu" aria-orientation="vertical">
              {Object.entries(availableLanguages).map(([code, name]) => (
                <button
                  key={code}
                  onClick={() => handleLanguageChange(code as SupportedLanguage)}
                  className={`
                    flex items-center space-x-3 w-full px-4 py-2 text-sm hover:bg-gray-100 
                    transition-colors text-left
                    ${language === code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'}
                  `}
                  role="menuitem"
                >
                  <span className="text-lg">{flagEmojis[code as SupportedLanguage]}</span>
                  <span className="font-medium">{name}</span>
                  {language === code && (
                    <svg
                      className="ml-auto h-4 w-4 text-blue-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

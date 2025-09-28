'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from './LoginModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { userToken, logout, isLoading } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  // Force re-render when userToken changes
  const [_, forceUpdate] = useState({});
  
  useEffect(() => {
    // This effect will run whenever userToken changes
    forceUpdate({});
  }, [userToken]);

  return (
    <header className="bg-white shadow-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">AC</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">{t('app.name')}</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('navigation.dashboard')}</Link>
            <Link href="/chat" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('navigation.chat')}</Link>
            <Link href="/settings" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">{t('navigation.settings')}</Link>
          </nav>

           {/* User Menu */}
           <div className="hidden md:flex items-center space-x-4">
             {isLoading ? (
               <div className="flex items-center space-x-2">
                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                 <span className="text-gray-600 text-sm">{t('common.loading')}</span>
               </div>
             ) : userToken ? (
               <div className="flex items-center space-x-3">
                 <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                   <span className="text-gray-600 text-sm font-medium">U</span>
                 </div>
                 <button
                   onClick={logout}
                   className="text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                 >
                   {t('navigation.logout')}
                 </button>
               </div>
             ) : (
               <>
                 <button 
                   onClick={handleLoginClick}
                   className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                 >
                   {t('navigation.login')}
                 </button>
                 <Link href="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">{t('navigation.register')}</Link>
               </>
             )}
             {/* Language Switcher */}
             <LanguageSwitcher size="small" showLabel={false} />
           </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button onClick={() => setMobileOpen(!mobileOpen)} className="text-gray-700 hover:text-blue-600 p-2">
              <span className="sr-only">Open main menu</span>
              {/* Hamburger icon */}
              <div className="space-y-1">
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
                <span className="block w-6 h-0.5 bg-gray-700"></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">{t('navigation.dashboard')}</Link>
            <Link href="/chat" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">{t('navigation.chat')}</Link>
            <Link href="/settings" className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium">{t('navigation.settings')}</Link>
             {isLoading ? (
               <div className="flex items-center space-x-2 px-3 py-2">
                 <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                 <span className="text-gray-600 text-sm">{t('common.loading')}</span>
               </div>
             ) : userToken ? (
               <button onClick={logout} className="w-full text-left text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-base font-medium">{t('navigation.logout')}</button>
             ) : (
               <>
                 <button 
                   onClick={handleLoginClick}
                   className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                 >
                   {t('navigation.login')}
                 </button>
                 <Link href="/register" className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium">{t('navigation.register')}</Link>
               </>
             )}
             {/* Mobile Language Switcher */}
             <div className="px-3 py-2">
               <LanguageSwitcher size="small" showLabel={true} />
             </div>
          </div>
        </div>
      )}
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={handleCloseLoginModal} 
      />
    </header>
  );
}
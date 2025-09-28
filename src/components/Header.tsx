'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import LoginModal from './LoginModal';
import RegistrationModal from './RegistrationModal';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const { userToken, userProfile, logout, isLoading } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);

  const handleLoginClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setLoginModalOpen(true);
  };

  const handleCloseLoginModal = () => {
    setLoginModalOpen(false);
  };

  const handleRegisterClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setRegistrationModalOpen(true);
  };

  const handleCloseRegistrationModal = () => {
    setRegistrationModalOpen(false);
  };

  // The component will automatically re-render when userToken changes
  // because it's a prop from AuthContext

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
                 <Link href="/profile" className="cursor-pointer">
                   {userProfile?.avatar ? (
                     <img 
                       src={userProfile.avatar} 
                       alt={userProfile.nickName || userProfile.userName} 
                       className="w-8 h-8 rounded-full object-cover"
                     />
                   ) : userProfile?.nickName || userProfile?.userName ? (
                     <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                       <span className="text-white text-sm font-medium">
                         {(userProfile.nickName || userProfile.userName).charAt(0).toUpperCase()}
                       </span>
                     </div>
                   ) : (
                     <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                       <span className="text-gray-600 text-sm font-medium">U</span>
                     </div>
                   )}
                 </Link>
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
                 <button 
                   onClick={handleRegisterClick}
                   className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                 >
                   {t('navigation.register')}
                 </button>
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
               <div className="px-3 py-2">
                 <div className="flex items-center justify-between">
                   <Link href="/profile" className="flex items-center space-x-2 cursor-pointer">
                     {userProfile?.avatar ? (
                       <img 
                         src={userProfile.avatar} 
                         alt={userProfile.nickName || userProfile.userName} 
                         className="w-8 h-8 rounded-full object-cover"
                       />
                     ) : userProfile?.nickName || userProfile?.userName ? (
                       <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                         <span className="text-white text-sm font-medium">
                           {(userProfile.nickName || userProfile.userName).charAt(0).toUpperCase()}
                         </span>
                       </div>
                     ) : (
                       <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                         <span className="text-gray-600 text-sm font-medium">U</span>
                       </div>
                     )}
                     <span className="text-gray-700 font-medium">
                       {userProfile?.nickName || userProfile?.userName || 'User'}
                     </span>
                   </Link>
                   <button
                     onClick={logout}
                     className="text-red-600 hover:text-red-800 px-3 py-1 rounded-md text-sm font-medium transition-colors"
                   >
                     {t('navigation.logout')}
                   </button>
                 </div>
                 <div className="mt-2">
                   <Link 
                     href="/profile" 
                     className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                   >
                     {t('navigation.profile')}
                   </Link>
                 </div>
               </div>
             ) : (
               <>
                 <button 
                   onClick={handleLoginClick}
                   className="w-full text-left text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-base font-medium"
                 >
                   {t('navigation.login')}
                 </button>
                 <button 
                   onClick={handleRegisterClick}
                   className="block bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-base font-medium"
                 >
                   {t('navigation.register')}
                 </button>
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
      
      {/* Registration Modal */}
      <RegistrationModal 
        isOpen={registrationModalOpen} 
        onClose={handleCloseRegistrationModal} 
      />
    </header>
  );
}
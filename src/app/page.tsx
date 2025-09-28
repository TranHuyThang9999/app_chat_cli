'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import MultilingualDemo from '@/components/MultilingualDemo';

export default function HomePage() {
  const router = useRouter();
  const { userToken, isLoading } = useAuth();
  const { t } = useLanguage();

  // Remove duplicate redirect logic - AuthContext handles this automatically
  // useEffect(() => {
  //   if (!isLoading) {
  //     if (userToken) {
  //       router.push('/dashboard');
  //     }
  //   }
  // }, [router, userToken, isLoading]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">AC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {t('app.name')}
          </h1>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">{t('common.loading')}</span>
          </div>
        </div>
      </div>
    );
  }

  // AuthContext automatically redirects logged-in users to dashboard
  // No need for redirect logic here - just show home page normally

  // Show home page for non-authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-blue-600 rounded-lg flex items-center justify-center mb-8">
            <span className="text-white font-bold text-3xl">AC</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {t('home.title')}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {t('home.description')}
          </p>
          
          <div className="space-y-4">
            <p className="text-gray-500">
              Click the <span className="font-semibold text-blue-600">{t('navigation.login')}</span> button in the header to get started
            </p>
            
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded-lg shadow p-6 max-w-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🚀 {t('home.features')}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t('home.featuresList.realtimeMessaging')}</li>
                  <li>• {t('home.featuresList.crossTabSync')}</li>
                  <li>• {t('home.featuresList.modernUI')}</li>
                  <li>• {t('home.featuresList.responsiveLayout')}</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 max-w-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  💡 {t('home.gettingStarted')}
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• {t('home.gettingStartedList.clickLogin')}</li>
                  <li>• {t('home.gettingStartedList.enterCredentials')}</li>
                  <li>• {t('home.gettingStartedList.startChatting')}</li>
                  <li>• {t('home.gettingStartedList.tryMultipleTabs')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multilingual Demo Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <MultilingualDemo />
      </div>
    </div>
  );
}

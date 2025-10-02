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
    <div>page home</div>
  );
}

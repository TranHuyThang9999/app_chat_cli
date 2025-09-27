'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { userToken } = useAuth();

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (userToken) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  }, [router, userToken]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
          <span className="text-white font-bold text-2xl">AC</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          App Chat
        </h1>
        <p className="text-gray-600">
          Redirecting...
        </p>
      </div>
    </div>
  );
}

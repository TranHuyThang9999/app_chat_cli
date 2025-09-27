'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { userToken, isLoading } = useAuth();

  useEffect(() => {
    // Only redirect after loading is complete
    if (!isLoading) {
      if (userToken) {
        router.push('/dashboard');
      } else {
        // Don't redirect to login page anymore, stay on home page
        // User can click Login button in header to open modal
      }
    }
  }, [router, userToken, isLoading]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">AC</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            App Chat
          </h1>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // If user is logged in, redirect to dashboard
  if (userToken) {
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
            Redirecting to dashboard...
          </p>
        </div>
      </div>
    );
  }

  // Show home page for non-authenticated users
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="mx-auto h-24 w-24 bg-blue-600 rounded-lg flex items-center justify-center mb-8">
            <span className="text-white font-bold text-3xl">AC</span>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to App Chat
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            A modern chat application that connects people around the world. 
            Built with Next.js and designed for seamless communication.
          </p>
          
          <div className="space-y-4">
            <p className="text-gray-500">
              Click the <span className="font-semibold text-blue-600">Login</span> button in the header to get started
            </p>
            
            <div className="flex justify-center space-x-4">
              <div className="bg-white rounded-lg shadow p-6 max-w-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  🚀 Features
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Real-time messaging</li>
                  <li>• Cross-tab synchronization</li>
                  <li>• Modern UI design</li>
                  <li>• Responsive layout</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6 max-w-sm">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  💡 Getting Started
                </h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Click Login in header</li>
                  <li>• Enter your credentials</li>
                  <li>• Start chatting!</li>
                  <li>• Try multiple tabs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

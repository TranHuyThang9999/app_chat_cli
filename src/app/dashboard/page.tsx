'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import CrossTabTest from '@/components/CrossTabTest';

export default function DashboardPage() {
  const { userToken, isLoading } = useAuth();
  const router = useRouter();

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoading && !userToken) {
      router.push('/login');
    }
  }, [userToken, isLoading, router]);

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto h-16 w-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <span className="text-white font-bold text-2xl">AC</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!userToken) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Welcome to Dashboard
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                You are successfully logged in!
              </p>
              <div className="bg-white rounded-lg shadow p-6 max-w-md mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  User Status
                </h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status:</span>
                    <span className="text-green-600 font-medium">Online</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Token:</span>
                    <span className="text-gray-800 font-mono text-sm">
                      {userToken ? 'Active' : 'Not Available'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cross-Tab Sync:</span>
                    <span className="text-blue-600 font-medium">Enabled</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">
                  🧪 Cross-Tab Test
                </h3>
                <p className="text-sm text-blue-700 mb-3">
                  Open this app in multiple tabs and try logging in/out in one tab. 
                  Watch how other tabs automatically sync!
                </p>
                <div className="text-xs text-blue-600">
                  💡 The status indicator in the bottom-right corner shows real-time sync status.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cross-tab test component */}
      {/* <CrossTabTest /> */}
    </div>
  );
}
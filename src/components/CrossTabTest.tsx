'use client';

import React from 'react';
import { useAuth } from '@/contexts/AuthContext';

export default function CrossTabTest() {
  const { userToken, isLoading } = useAuth();

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm">
      <h3 className="font-semibold text-gray-800 mb-2">Cross-Tab Sync Test</h3>
      <div className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <div className={`w-3 h-3 rounded-full ${isLoading ? 'bg-yellow-400' : userToken ? 'bg-green-400' : 'bg-red-400'}`}></div>
          <span className="text-gray-600">
            {isLoading ? 'Loading...' : userToken ? 'Logged In' : 'Not Logged In'}
          </span>
        </div>
        <div className="text-xs text-gray-500">
          Status: {userToken ? 'Authenticated' : 'Unauthenticated'}
        </div>
        <div className="text-xs text-gray-500">
          Token: {userToken ? `${userToken.substring(0, 10)}...` : 'None'}
        </div>
      </div>
      <div className="mt-3 text-xs text-gray-500">
        💡 Try logging in/out in another tab to see real-time sync!
      </div>
    </div>
  );
}

'use client';

import { useAuth } from '@/contexts/AuthContext';

export default function DashboardPage() {
  const { userToken } = useAuth();

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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
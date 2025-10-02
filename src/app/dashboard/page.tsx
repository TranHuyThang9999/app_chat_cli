'use client';

import { useRequireAuth } from '@/hooks/useRequireAuth';
import CrossTabTest from '@/components/CrossTabTest';
import UserProfile from '@/components/UserProfile';
import UserList from '@/components/UserList';

export default function DashboardPage() {
  const { isLoading } = useRequireAuth();

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

  return (
    <div>
      <UserList />
    </div>
  );
}
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const withAuth = <P extends object>(WrappedComponent: React.ComponentType<P>) => {
  const WithAuthComponent: React.FC<P> = (props) => {
    const { userToken, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!isLoading && !userToken) {
        router.push('/');
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

    return <WrappedComponent {...props} />;
  };

  // Set display name for debugging
  WithAuthComponent.displayName = `WithAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return WithAuthComponent;
};
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export const useRequireAuth = () => {
  const { userToken, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !userToken) {
      router.push('/');
    }
  }, [userToken, isLoading, router]);

  return { userToken, isLoading };
};
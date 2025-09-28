// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { userService, UserProfile } from '@/services/user/user.service';

interface AuthContextType {
  userToken: string | null;
  userProfile: UserProfile | null;
  setUserToken: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Load token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
    setIsLoading(false);
  }, []);

  // Fetch user profile when token changes
  useEffect(() => {
    if (token) {
      fetchUserProfile();
    } else {
      setUserProfile(null);
    }
  }, [token]);

  // Listen for storage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'token') {
        if (e.newValue) {
          // Token was set in another tab
          setToken(e.newValue);
        } else {
          // Token was removed in another tab
          setToken(null);
        }
      }
    };

    // Listen for storage events
    window.addEventListener('storage', handleStorageChange);

    // Also listen for custom events for same-tab updates
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === 'token') {
        if (e.detail.newValue) {
          setToken(e.detail.newValue);
        } else {
          setToken(null);
        }
      }
    };

    window.addEventListener('customStorageChange', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('customStorageChange', handleCustomStorageChange as EventListener);
    };
  }, []);

  const fetchUserProfile = async () => {
    if (!token) return;
    
    try {
      const profileData = await userService.getProfile(token);
      setUserProfile(profileData);
    } catch (err) {
      console.error('Error fetching user profile:', err);
      // Don't set error state, just keep profile as null
    }
  };

  const setUserToken = (t: string) => {
    setToken(t);
    localStorage.setItem('token', t);
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('customStorageChange', {
      detail: { key: 'token', newValue: t }
    }));
    
    // Add a small delay to ensure state is updated before navigation
    setTimeout(() => {
      router.push('/dashboard');
    }, 100);
  };

  const logout = () => {
    setToken(null);
    setUserProfile(null);
    localStorage.removeItem('token');
    
    // Dispatch custom event for same-tab updates
    window.dispatchEvent(new CustomEvent('customStorageChange', {
      detail: { key: 'token', newValue: null }
    }));
    
    // Don't redirect to login page, let user stay on current page
    // They can click Login button in header to open modal
  };

  return (
    <AuthContext.Provider value={{ 
      userToken: token, 
      userProfile, 
      setUserToken, 
      logout, 
      isLoading,
      fetchUserProfile
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
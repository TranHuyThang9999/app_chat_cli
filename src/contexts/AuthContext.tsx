// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  token: string | null;
  setUserToken: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  const setUserToken = (t: string) => {
    setToken(t);
    localStorage.setItem('token', t);
    router.push('/dashboard');
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ token, setUserToken, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

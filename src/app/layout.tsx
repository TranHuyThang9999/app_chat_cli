// app/layout.tsx
'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import React, { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head />
      <body>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

'use client';

import React from 'react';
import TestUpdateProfile from '@/components/TestUpdateProfile';
import { ProtectedRoute } from '@/components/ProtectedRoute';

export default function TestUpdateProfilePage() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-xl rounded-lg overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h1 className="text-2xl font-bold text-gray-800">Profile Update Test</h1>
              <p className="mt-1 text-sm text-gray-600">
                Test the profile update API functionality
              </p>
            </div>
            <div className="p-6">
              <TestUpdateProfile />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
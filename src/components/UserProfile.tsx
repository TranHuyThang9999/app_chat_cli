'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { userService, UserProfile as UserProfileType } from '@/services/user/user.service';

export default function UserProfile() {
  const { userToken } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (userToken) {
      fetchUserProfile();
    }
  }, [userToken]);

  const fetchUserProfile = async () => {
    if (!userToken) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const profileData = await userService.getProfile(userToken);
      setProfile(profileData);
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(t('profile.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">{t('common.loading')}</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span className="ml-2 text-red-800">{error}</span>
        </div>
        <button 
          onClick={fetchUserProfile}
          className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 text-sm"
        >
          {t('common.retry')}
        </button>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <div className="flex items-center">
          <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <span className="ml-2 text-yellow-800">{t('profile.noData')}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <div className="relative">
            {profile.avatar ? (
              <img 
                src={profile.avatar} 
                alt={profile.nickName || profile.userName} 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-600 text-xl font-bold">
                  {profile.nickName?.charAt(0) || profile.userName.charAt(0)}
                </span>
              </div>
            )}
          </div>
          <div className="ml-4">
            <h2 className="text-xl font-bold text-gray-900">
              {profile.nickName || profile.userName}
            </h2>
            <p className="text-gray-600">{profile.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.personalInfo')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.username')}:</span>
                <span className="text-gray-900">{profile.userName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.nickname')}:</span>
                <span className="text-gray-900">{profile.nickName || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.email')}:</span>
                <span className="text-gray-900">{profile.email || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.phone')}:</span>
                <span className="text-gray-900">{profile.phoneNumber || '-'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">{t('profile.additionalInfo')}</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.gender')}:</span>
                <span className="text-gray-900">
                  {profile.gender === 1 ? t('profile.male') : 
                   profile.gender === 2 ? t('profile.female') : 
                   t('profile.notSpecified')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.age')}:</span>
                <span className="text-gray-900">{profile.age || '-'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.birthDate')}:</span>
                <span className="text-gray-900">
                  {profile.birthDate ? new Date(profile.birthDate).toLocaleDateString() : '-'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">{t('profile.address')}:</span>
                <span className="text-gray-900">{profile.address || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">{t('profile.memberSince')}:</span>
            <span className="text-gray-900">
              {profile.createdAt ? new Date(profile.createdAt).toLocaleDateString() : '-'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
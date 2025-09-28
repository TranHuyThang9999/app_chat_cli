'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { userService, UserProfile as UserProfileType, UpdateProfileData } from '@/services/user/user.service';

export default function UserProfile() {
  const { userToken } = useAuth();
  const { t } = useLanguage();
  const [profile, setProfile] = useState<UserProfileType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);
  const [formData, setFormData] = useState<UpdateProfileData>({
    nickName: '',
    avatar: '',
    gender: 0,
    birthDate: '',
    age: 0,
    email: '',
    phoneNumber: '',
    address: ''
  });

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
      
      const profileData = await userService.getProfile();
      setProfile(profileData);
      
      // Initialize form data with current profile data
      setFormData({
        nickName: profileData.nickName || '',
        avatar: profileData.avatar || '',
        gender: profileData.gender || 0,
        birthDate: profileData.birthDate || '',
        age: profileData.age || 0,
        email: profileData.email || '',
        phoneNumber: profileData.phoneNumber || '',
        address: profileData.address || ''
      });
    } catch (err: any) {
      console.error('Error fetching user profile:', err);
      setError(t('profile.fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'gender' || name === 'age' ? parseInt(value) || 0 : value
    }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    try {
      setUpdating(true);
      setUpdateError(null);
      
      // Filter out unchanged fields
      const updateData: UpdateProfileData = {};
      Object.keys(formData).forEach(key => {
        const typedKey = key as keyof UpdateProfileData;
        // Type guard to ensure we're working with the correct types
        if (formData[typedKey] !== undefined && formData[typedKey] !== profile[typedKey]) {
          // Use type assertion to satisfy TypeScript
          updateData[typedKey] = formData[typedKey] as any;
        }
      });
      
      // If no changes, just toggle edit mode
      if (Object.keys(updateData).length === 0) {
        setIsEditing(false);
        return;
      }
      
      const updatedProfile = await userService.updateProfile(updateData);
      setProfile(updatedProfile);
      setIsEditing(false);
    } catch (err: any) {
      console.error('Error updating user profile:', err);
      setUpdateError(err.message || t('profile.updateError'));
    } finally {
      setUpdating(false);
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
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
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
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
            >
              {t('profile.edit')}
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleUpdateProfile}
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
              >
                {updating ? t('common.saving') : t('common.save')}
              </button>
            </div>
          )}
        </div>

        {updateError && (
          <div className="mb-4 bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center">
              <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="ml-2 text-red-800">{updateError}</span>
            </div>
          </div>
        )}

        {isEditing ? (
          <form onSubmit={handleUpdateProfile} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.nickname')}
                </label>
                <input
                  type="text"
                  name="nickName"
                  value={formData.nickName || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.email')}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.phone')}
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.age')}
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.gender')}
                </label>
                <select
                  name="gender"
                  value={formData.gender || 0}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value={0}>{t('profile.notSpecified')}</option>
                  <option value={1}>{t('profile.male')}</option>
                  <option value={2}>{t('profile.female')}</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.birthDate')}
                </label>
                <input
                  type="date"
                  name="birthDate"
                  value={formData.birthDate ? formData.birthDate.split('T')[0] : ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, birthDate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.avatar')}
                </label>
                <input
                  type="text"
                  name="avatar"
                  value={formData.avatar || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder={t('profile.avatarPlaceholder') || 'Enter avatar URL'}
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('profile.address')}
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address || ''}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-4">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 text-sm"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                disabled={updating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm disabled:opacity-50"
              >
                {updating ? t('common.saving') : t('common.save')}
              </button>
            </div>
          </form>
        ) : (
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
        )}

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
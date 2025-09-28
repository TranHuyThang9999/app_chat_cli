// Example of how to use the apiClient with automatic token attachment
// This is just for demonstration - you can delete this file

import apiClient from "../api.config";


// Example service that automatically includes the auth token
export const exampleUserService = {
  // This call will automatically include the Authorization header with the token
  getProfile: async () => {
    const response = await apiClient.get('/api/Users/profile');
    return response.data;
  },
  
  // This call will also automatically include the Authorization header
  updateProfile: async (profileData: any) => {
    const response = await apiClient.put('/api/Users/profile', profileData);
    return response.data;
  },
  
  // This call will also automatically include the Authorization header
  changePassword: async (passwordData: { oldPassword: string; newPassword: string }) => {
    const response = await apiClient.post('/api/Users/change-password', passwordData);
    return response.data;
  }
};
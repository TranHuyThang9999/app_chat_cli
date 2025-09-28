import apiClient from '../api.config';

export interface UserProfile {
  nickName: string;
  avatar: string;
  gender: number;
  birthDate: string;
  age: number;
  email: string;
  userName: string;
  password: string;
  phoneNumber: string;
  address: string;
  id: number;
  createdAt: string;
  updatedAt: string;
  active: boolean;
  deleted: boolean;
  deletedBy: string | null;
  deletedAt: string | null;
  createdBy: number;
  updatedBy: number;
}

export const userService = {
  /**
   * Fetch user profile information
   * @returns User profile data
   */
  getProfile: async (): Promise<UserProfile> => {
    try {
      const response = await apiClient.get('/api/Users/profile');
      
      if (response.data.code === 0) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      throw error;
    }
  }
};
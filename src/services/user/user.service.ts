import apiClient from '../api.config';
import { AxiosResponse } from 'axios';

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

// Define pagination response structure
export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  pageIndex: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

// Define the user list response structure
export interface UserListResponse {
  code: number;
  message: string;
  data: PaginatedResponse<UserProfile>;
}

// Define a type for profile update parameters (excluding read-only fields)
export interface UpdateProfileData {
  nickName?: string;
  avatar?: string;
  gender?: number;
  birthDate?: string;
  age?: number;
  email?: string;
  phoneNumber?: string;
  address?: string;
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
  },

  /**
   * Update user profile information
   * @param profileData - Partial profile data to update
   * @returns Updated user profile data
   */
  updateProfile: async (profileData: UpdateProfileData): Promise<UserProfile> => {
    try {
      const response: AxiosResponse<any> = await apiClient.patch('/api/Users/profile', profileData);
      
      if (response.data.code === 0) {
        return response.data.data;
      } else {
        throw new Error(response.data.message || 'Failed to update profile');
      }
    } catch (error) {
      throw error;
    }
  },

  /**
   * Fetch list of users with pagination
   * @param pageIndex - Page number (default: 1)
   * @param pageSize - Number of items per page (default: 10)
   * @returns Paginated user list
   */
  getUserList: async (pageIndex: number = 1, pageSize: number = 10): Promise<UserListResponse> => {
    try {
      const response: AxiosResponse<UserListResponse> = await apiClient.get('/api/Users', {
        params: {
          pageIndex,
          pageSize
        }
      });
      
      if (response.data.code === 0) {
        return response.data;
      } else {
        throw new Error(response.data.message || 'Failed to fetch user list');
      }
    } catch (error) {
      throw error;
    }
  }
};
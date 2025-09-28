import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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
   * @param token - Authentication token
   * @returns User profile data
   */
  getProfile: async (token: string): Promise<UserProfile> => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/Users/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'accept': '*/*'
        }
      });
      
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
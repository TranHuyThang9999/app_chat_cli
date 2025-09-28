import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token to all requests
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Get token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    
    // If token exists, add it to the Authorization header
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common response patterns
apiClient.interceptors.response.use(
  (response) => {
    // You can process responses here if needed
    return response;
  },
  (error) => {
    // Handle common error cases
    if (error.response?.status === 401) {
      // Token expired or invalid, clear local storage
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        // Optionally redirect to login page
        // window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export default apiClient;
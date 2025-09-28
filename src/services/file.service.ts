import apiClient from './api.config';

export interface FileUploadResponse {
  fileName: string;
  originalFileName: string;
  fileSize: number;
  contentType: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface FileUploadResult {
  code: number;
  message: string;
  data: FileUploadResponse;
}

export interface MultiFileUploadResult {
  code: number;
  message: string;
  data: FileUploadResponse[];
}

export const fileService = {
  /**
   * Upload a file to the server
   * @param file - The file to upload
   * @param customFileName - Optional custom file name
   * @returns Promise with upload result
   */
  uploadFile: async (file: File, customFileName?: string): Promise<FileUploadResult> => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      if (customFileName) {
        formData.append('customFileName', customFileName);
      }

      const response = await apiClient.post<FileUploadResult>('/api/File/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  },

  /**
   * Upload multiple files to the server
   * @param files - Array of files to upload
   * @returns Promise with upload results
   */
  uploadMultipleFiles: async (files: File[]): Promise<MultiFileUploadResult> => {
    try {
      const formData = new FormData();
      
      files.forEach(file => {
        formData.append('files', file);
      });

      const response = await apiClient.post<MultiFileUploadResult>('/api/File/upload-multiple', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response.data;
    } catch (error) {
      throw error;
    }
  }
};
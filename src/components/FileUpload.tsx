'use client';

import React, { useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { message, Upload, Button, Spin } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { fileService, FileUploadResult, MultiFileUploadResult } from '@/services/file.service';
import { useLanguage } from '@/contexts/LanguageContext';

const { Dragger } = Upload;

export interface FileUploadRef {
  uploadFile: (file: File, customFileName?: string) => Promise<FileUploadResult>;
  uploadMultipleFiles: (files: File[]) => Promise<MultiFileUploadResult>;
}

interface FileUploadProps {
  onUploadSuccess?: (result: FileUploadResult | MultiFileUploadResult) => void;
  onUploadError?: (error: any) => void;
  accept?: string;
  multiple?: boolean;
  showUploadButton?: boolean;
  customFileName?: string;
}

const FileUpload = forwardRef<FileUploadRef, FileUploadProps>((props, ref) => {
  const { 
    onUploadSuccess, 
    onUploadError, 
    accept = 'image/*', 
    multiple = false, 
    showUploadButton = true,
    customFileName 
  } = props;
  
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Expose uploadFile method to parent components
  useImperativeHandle(ref, () => ({
    uploadFile: async (file: File, customName?: string) => {
      return await handleSingleFileUpload(file, customName);
    },
    uploadMultipleFiles: async (files: File[]) => {
      return await handleMultipleFilesUpload(files);
    }
  }));

  const handleSingleFileUpload = async (file: File, customName?: string): Promise<FileUploadResult> => {
    setLoading(true);
    try {
      const result = await fileService.uploadFile(file, customName || customFileName);
      
      if (result.code === 0) {
        message.success(t('file.uploadSuccess') || 'File uploaded successfully');
        onUploadSuccess?.(result);
        return result;
      } else {
        throw new Error(result.message || t('file.uploadFailed') || 'File upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || error.message || t('file.uploadFailed') || 'File upload failed');
      onUploadError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleMultipleFilesUpload = async (files: File[]): Promise<MultiFileUploadResult> => {
    setLoading(true);
    try {
      const result = await fileService.uploadMultipleFiles(files);
      
      if (result.code === 0) {
        message.success(t('file.uploadSuccess') || 'Files uploaded successfully');
        onUploadSuccess?.(result);
        return result;
      } else {
        throw new Error(result.message || t('file.uploadFailed') || 'File upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || error.message || t('file.uploadFailed') || 'File upload failed');
      onUploadError?.(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (info: any) => {
    const { file } = info;
    
    if (file.status === 'removed') {
      setFileList(prev => prev.filter(f => f.uid !== file.uid));
      return;
    }
    
    // For multiple uploads, we keep all files
    if (multiple) {
      setFileList(prev => {
        // Check if file already exists in the list
        const exists = prev.some(f => f.uid === file.uid);
        if (!exists) {
          return [...prev, file];
        }
        return prev;
      });
    } else {
      // For single upload, we only keep the latest file
      setFileList([file]);
    }
    
    if (file.status === 'done') {
      // File is selected, but not yet uploaded
      return;
    }
  };

  const handleUpload = async () => {
    if (fileList.length === 0) {
      message.warning(t('file.selectFileFirst') || 'Please select a file first');
      return;
    }

    if (multiple) {
      // Upload multiple files
      const files = fileList.map(f => f.originFileObj || f);
      await handleMultipleFilesUpload(files);
    } else {
      // Upload single file
      const file = fileList[0].originFileObj || fileList[0];
      await handleSingleFileUpload(file);
    }
  };

  const handleRemove = (file: any) => {
    setFileList(prev => prev.filter(f => f.uid !== file.uid));
    return true;
  };

  const uploadProps = {
    accept,
    multiple,
    fileList,
    onChange: handleFileChange,
    onRemove: handleRemove,
    beforeUpload: () => false, // Prevent automatic upload
  };

  return (
    <div className="file-upload-component">
      <Dragger {...uploadProps}>
        <p className="ant-upload-drag-icon">
          <UploadOutlined />
        </p>
        <p className="ant-upload-text">{t('file.dragDrop') || 'Click or drag file to this area to upload'}</p>
        <p className="ant-upload-hint">
          {multiple 
            ? (t('file.supportMultiple') || 'Support for multiple file upload.')
            : (t('file.supportSingle') || 'Support for a single file upload.')}
        </p>
      </Dragger>
      
      {showUploadButton && (
        <div className="mt-4 flex justify-center">
          <Button 
            type="primary" 
            onClick={handleUpload} 
            loading={loading}
            disabled={fileList.length === 0}
            icon={<UploadOutlined />}
          >
            {loading ? t('file.uploading') || 'Uploading...' : t('file.upload') || 'Upload'}
          </Button>
        </div>
      )}
      
      {loading && (
        <div className="mt-4 flex justify-center items-center">
          <Spin />
          <span className="ml-2 text-gray-600">{t('file.uploading') || 'Uploading...'}</span>
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
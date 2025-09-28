'use client';

import React, { useState, useRef } from 'react';
import { Button, message, Input, Card, Tabs } from 'antd';
import { fileService, FileUploadResult, MultiFileUploadResult } from '@/services/file.service';
import { useLanguage } from '@/contexts/LanguageContext';

const { TabPane } = Tabs;

const DirectFileUploadExample = () => {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('single');
  const fileInputRef = useRef<HTMLInputElement>(null!);
  const multiFileInputRef = useRef<HTMLInputElement>(null!);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    await uploadSingleFile(file);
  };

  const handleMultipleFilesChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    const filesArray = Array.from(files);
    await uploadMultipleFiles(filesArray);
  };

  const uploadSingleFile = async (file: File): Promise<void> => {
    setLoading(true);
    try {
      const result: FileUploadResult = await fileService.uploadFile(file);
      
      if (result.code === 0) {
        message.success(t('file.uploadSuccess') || 'File uploaded successfully');
        setUploadedFileUrl(result.data.fileUrl);
      } else {
        throw new Error(result.message || t('file.uploadFailed') || 'File upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || error.message || t('file.uploadFailed') || 'File upload failed');
    } finally {
      setLoading(false);
    }
  };

  const uploadMultipleFiles = async (files: File[]): Promise<void> => {
    setLoading(true);
    try {
      const result: MultiFileUploadResult = await fileService.uploadMultipleFiles(files);
      
      if (result.code === 0) {
        message.success(t('file.uploadSuccess') || 'Files uploaded successfully');
        setUploadedFiles(result.data);
      } else {
        throw new Error(result.message || t('file.uploadFailed') || 'File upload failed');
      }
    } catch (error: any) {
      console.error('Upload error:', error);
      message.error(error.response?.data?.message || error.message || t('file.uploadFailed') || 'File upload failed');
    } finally {
      setLoading(false);
    }
  };

  const triggerFileInput = (ref: React.RefObject<HTMLInputElement>) => {
    ref.current?.click();
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t('file.upload') || 'Direct File Upload'}</h2>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={t('file.supportSingle') || 'Single File Upload'} key="single">
          <Card title={t('file.upload') || 'Upload File'}>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              accept="image/*"
            />
            
            <div className="flex flex-col items-center space-y-4">
              <Button 
                onClick={() => triggerFileInput(fileInputRef)} 
                loading={loading}
                type="primary"
              >
                {t('file.selectFile') || 'Select File'}
              </Button>
              
              {loading && (
                <div className="text-gray-500">
                  {t('file.uploading') || 'Uploading...'}
                </div>
              )}
            </div>
          </Card>
          
          {uploadedFileUrl && (
            <Card title={t('file.uploadSuccess') || 'Upload Success'} className="mt-4">
              <div className="text-center">
                <p className="mb-4">{t('file.uploadSuccess') || 'File uploaded successfully!'}</p>
                <img 
                  src={uploadedFileUrl} 
                  alt="Uploaded file" 
                  className="max-w-full h-auto rounded-lg mx-auto"
                />
                <p className="mt-2 text-sm text-gray-500 break-all">{uploadedFileUrl}</p>
              </div>
            </Card>
          )}
        </TabPane>
        
        <TabPane tab={t('file.supportMultiple') || 'Multiple File Upload'} key="multiple">
          <Card title={t('file.upload') || 'Upload Multiple Files'}>
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={handleMultipleFilesChange}
              className="hidden"
              accept="image/*"
              multiple
            />
            
            <div className="flex flex-col items-center space-y-4">
              <Button 
                onClick={() => triggerFileInput(multiFileInputRef)} 
                loading={loading}
                type="primary"
              >
                {t('file.selectFile') || 'Select Files'}
              </Button>
              
              {loading && (
                <div className="text-gray-500">
                  {t('file.uploading') || 'Uploading...'}
                </div>
              )}
            </div>
          </Card>
          
          {uploadedFiles.length > 0 && (
            <Card title={t('file.uploadSuccess') || 'Upload Success'} className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <p className="mb-4 col-span-full">{t('file.uploadSuccess') || 'Files uploaded successfully!'}</p>
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="border rounded p-2">
                    <img 
                      src={file.fileUrl} 
                      alt={file.originalFileName} 
                      className="max-w-full h-auto rounded-lg mx-auto"
                    />
                    <p className="mt-2 text-sm text-gray-500 break-all">{file.originalFileName}</p>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabPane>
      </Tabs>
    </div>
  );
};

export default DirectFileUploadExample;
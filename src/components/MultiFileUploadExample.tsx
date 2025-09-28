'use client';

import React, { useRef, useState } from 'react';
import { Button, Card, Image, message } from 'antd';
import FileUpload, { FileUploadRef } from './FileUpload';
import { useLanguage } from '@/contexts/LanguageContext';

const MultiFileUploadExample = () => {
  const { t } = useLanguage();
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);

  const handleUploadSuccess = (result: any) => {
    console.log('Upload success:', result);
    if (Array.isArray(result.data)) {
      // Multiple files upload
      setUploadedFiles(prev => [...prev, ...result.data]);
    } else {
      // Single file upload
      setUploadedFiles(prev => [...prev, result.data]);
    }
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t('file.upload') || 'File Upload'}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card title={t('file.dragDrop') || 'Drag & Drop Upload'}>
          <FileUpload
            ref={fileUploadRef}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            accept="image/*"
            multiple={true}
          />
        </Card>
        
        {uploadedFiles.length > 0 && (
          <Card title={t('file.uploadSuccess') || 'Upload Success'}>
            <div className="grid grid-cols-1 gap-4">
              <p className="mb-4">{t('file.uploadSuccess') || 'Files uploaded successfully!'}</p>
              {uploadedFiles.map((file, index) => (
                <div key={index} className="border rounded p-2">
                  <Image
                    src={file.fileUrl}
                    alt={file.originalFileName}
                    className="max-w-full h-auto rounded-lg"
                  />
                  <p className="mt-2 text-sm text-gray-500 break-all">{file.originalFileName}</p>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default MultiFileUploadExample;
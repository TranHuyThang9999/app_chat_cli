'use client';

import React, { useRef, useState } from 'react';
import { Button, Card, Image, message, Tabs } from 'antd';
import FileUpload, { FileUploadRef } from './FileUpload';
import MultiFileUploadExample from './MultiFileUploadExample';
import { useLanguage } from '@/contexts/LanguageContext';

const { TabPane } = Tabs;

const FileUploadExample = () => {
  const { t } = useLanguage();
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('single');

  const handleUploadSuccess = (result: any) => {
    console.log('Upload success:', result);
    setUploadedFileUrl(result.data.fileUrl);
  };

  const handleUploadError = (error: any) => {
    console.error('Upload error:', error);
  };

  // Example of programmatically uploading a file
  const handleProgrammaticUpload = async () => {
    // This is just an example - in a real app, you would get the file from an input or drag/drop
    message.info(t('file.selectFileFirst') || 'Please select a file first using the upload component');
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">{t('file.upload') || 'File Upload'}</h2>
      
      <Tabs activeKey={activeTab} onChange={setActiveTab}>
        <TabPane tab={t('file.supportSingle') || 'Single File Upload'} key="single">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card title={t('file.dragDrop') || 'Drag & Drop Upload'}>
              <FileUpload
                ref={fileUploadRef}
                onUploadSuccess={handleUploadSuccess}
                onUploadError={handleUploadError}
                accept="image/*"
                multiple={false}
              />
            </Card>
            
            {uploadedFileUrl && (
              <Card title={t('file.uploadSuccess') || 'Upload Success'}>
                <div className="text-center">
                  <p className="mb-4">{t('file.uploadSuccess') || 'File uploaded successfully!'}</p>
                  <Image
                    src={uploadedFileUrl}
                    alt="Uploaded file"
                    className="max-w-full h-auto rounded-lg"
                  />
                  <p className="mt-2 text-sm text-gray-500 break-all">{uploadedFileUrl}</p>
                </div>
              </Card>
            )}
          </div>
          
          <div className="mt-6">
            <Button onClick={handleProgrammaticUpload}>
              {t('file.upload') || 'Programmatic Upload'}
            </Button>
          </div>
        </TabPane>
        
        <TabPane tab={t('file.supportMultiple') || 'Multiple File Upload'} key="multiple">
          <MultiFileUploadExample />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FileUploadExample;
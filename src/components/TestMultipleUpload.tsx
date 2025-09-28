'use client';

import React from 'react';
import { Card, Button, message } from 'antd';
import { fileService } from '@/services/file.service';

const TestMultipleUpload = () => {
  const handleTestUpload = async () => {
    try {
      // This is just a test component to verify the API works
      // In a real app, you would get files from an input element
      message.info('This is a test component. In a real app, you would select files to upload.');
    } catch (error) {
      console.error('Test error:', error);
      message.error('Test failed');
    }
  };

  return (
    <Card title="Test Multiple File Upload" className="m-4">
      <p>This component tests the multiple file upload functionality.</p>
      <Button type="primary" onClick={handleTestUpload}>
        Test Upload
      </Button>
    </Card>
  );
};

export default TestMultipleUpload;
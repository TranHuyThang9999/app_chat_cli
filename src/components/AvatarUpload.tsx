'use client';

import React, { useRef, useState } from 'react';
import { Button, message, Modal } from 'antd';
import { CameraOutlined } from '@ant-design/icons';
import FileUpload, { FileUploadRef } from './FileUpload';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface AvatarUploadProps {
  onAvatarUpdate: (avatarUrl: string) => void;
}

const AvatarUpload = ({ onAvatarUpdate }: AvatarUploadProps) => {
  const { t } = useLanguage();
  const { userProfile } = useAuth();
  const fileUploadRef = useRef<FileUploadRef>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleUploadSuccess = (result: any) => {
    console.log('Avatar upload success:', result);
    onAvatarUpdate(result.data.fileUrl);
    setIsModalVisible(false);
  };

  const handleUploadError = (error: any) => {
    console.error('Avatar upload error:', error);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Button 
        type="primary" 
        shape="circle" 
        icon={<CameraOutlined />} 
        onClick={showModal}
        className="absolute bottom-0 right-0 transform translate-x-1/4 translate-y-1/4"
      />
      
      <Modal
        title={t('profile.updateAvatar') || 'Update Avatar'}
        open={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <div className="py-4">
          <FileUpload
            ref={fileUploadRef}
            onUploadSuccess={handleUploadSuccess}
            onUploadError={handleUploadError}
            accept="image/*"
            multiple={false}
            showUploadButton={true}
          />
        </div>
      </Modal>
    </>
  );
};

export default AvatarUpload;
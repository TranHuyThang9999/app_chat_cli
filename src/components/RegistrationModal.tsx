'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import axios from 'axios';
import { useLanguage } from '@/contexts/LanguageContext';

interface RegistrationFormValues {
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
}

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RegistrationModal({ isOpen, onClose }: RegistrationModalProps) {
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const onFinish = async (values: RegistrationFormValues) => {
    setLoading(true);
    try {
      // Prepare data for API call
      const registerData = {
        nickName: values.userName, // Use username as nickname
        avatar: '', // Will be set on backend
        gender: 0, // Default value
        birthDate: null, // Will be set later by user
        age: 0, // Will be set later by user
        email: values.email,
        userName: values.userName,
        password: values.password,
        phoneNumber: '', // Will be set later by user
        address: '' // Will be set later by user
      };

      // Make API call to register user
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const response = await axios.post(`${apiUrl}/api/Users`, registerData, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.data.code === 0) {
        message.success(t('auth.registerSuccess'));
        // Close the modal after successful registration
        onClose();
        // Reset the form
        form.resetFields();
      } else {
        message.error(response.data.message || t('auth.registerFailed'));
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      message.error(error.response?.data?.message || error.message || t('auth.registerFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AC</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">{t('auth.createAccount')}</span>
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={400}
      centered
      className="registration-modal"
    >
      <div className="py-4">
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          requiredMark={false}
        >
          <Form.Item
            label={t('auth.username')}
            name="userName"
            rules={[{ required: true, message: t('auth.usernameRequired') }]}
          >
            <Input placeholder={t('auth.enterUsername')} />
          </Form.Item>
          
          <Form.Item
            label={t('auth.email')}
            name="email"
            rules={[
              { required: true, message: t('auth.emailRequired') },
              { type: 'email', message: t('auth.emailInvalid') }
            ]}
          >
            <Input placeholder={t('auth.enterEmail')} />
          </Form.Item>
          
          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password placeholder={t('auth.enterPassword')} />
          </Form.Item>
          
          <Form.Item
            label={t('auth.confirmPassword')}
            name="confirmPassword"
            dependencies={['password']}
            rules={[
              { required: true, message: t('auth.confirmPasswordRequired') },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error(t('auth.passwordsNotMatch')));
                },
              }),
            ]}
          >
            <Input.Password placeholder={t('auth.enterConfirmPassword')} />
          </Form.Item>
          
          <Button 
            type="primary" 
            htmlType="submit" 
            loading={loading} 
            block
          >
            {loading ? t('auth.registering') : t('auth.register')}
          </Button>
        </Form>
      </div>
    </Modal>
  );
}
'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import axios from 'axios';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface LoginFormValues {
  userName: string;
  password: string;
}

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const { setUserToken } = useAuth();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);


  
  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await axios.post(`${apiUrl}/api/Auth/login`, values, {
        headers: { 'Content-Type': 'application/json' },
      });
      if (res.data.code === 401) {
        message.error(t('auth.invalidCredentials'));
        return;
      }
      console.log(res.data);
      setUserToken(res.data.token);
      message.success(t('auth.loginSuccess'));
      onClose();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        const errorMsg = err.response?.data || err.message;
        message.error(errorMsg);
      } else if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error(t('auth.loginFailed'));
      }
    } finally {
      setLoading(false);
    }
  };
  

  const handleCancel = () => {
    onClose();
  };

  return (
    <Modal
      title={
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">AC</span>
          </div>
          <span className="text-xl font-semibold text-gray-900">{t('auth.signIn')}</span>
        </div>
      }
      open={isOpen}
      onCancel={handleCancel}
      footer={null}
      width={400}
      centered
      className="login-modal"
    >
      <div className="py-4">
        <p className="text-gray-600 text-center mb-6">
          {t('app.welcomeBack')}
        </p>
        
        <Form<LoginFormValues>
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ userName: '', password: '' }}
        >
          <Form.Item
            label={t('auth.username')}
            name="userName"
            rules={[{ required: true, message: t('auth.usernameRequired') }]}
          >
            <Input size="large" placeholder={t('auth.enterUsername')} />
          </Form.Item>

          <Form.Item
            label={t('auth.password')}
            name="password"
            rules={[{ required: true, message: t('auth.passwordRequired') }]}
          >
            <Input.Password size="large" placeholder={t('auth.enterPassword')} />
          </Form.Item>

          <Form.Item className="mb-0">
            <Button 
              type="primary" 
              htmlType="submit" 
              block 
              loading={loading} 
              size="large"
              className="h-12 text-base font-medium"
            >
              {loading ? t('auth.signingIn') : t('auth.signIn')}
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            {t('auth.dontHaveAccount')}{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              {t('auth.signUp')}
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}

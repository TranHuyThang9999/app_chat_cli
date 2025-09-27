'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Form, Input, Button, message, Modal } from 'antd';
import { useAuth } from '@/contexts/AuthContext';

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
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}/api/Auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || 'Login failed');
      }

      const data = await res.json();
      setUserToken(data.token);
      message.success('Login successful!');
      onClose(); // Close modal after successful login
    } catch (err: unknown) {
      if (err instanceof Error) {
        message.error(err.message);
      } else {
        message.error('Login failed');
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
          <span className="text-xl font-semibold text-gray-900">Sign In</span>
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
          Welcome back to App Chat
        </p>
        
        <Form<LoginFormValues>
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ userName: '', password: '' }}
        >
          <Form.Item
            label="Username"
            name="userName"
            rules={[{ required: true, message: 'Please input your username' }]}
          >
            <Input size="large" placeholder="Enter your username" />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password' }]}
          >
            <Input.Password size="large" placeholder="Enter your password" />
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
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </Form.Item>
        </Form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Don't have an account?{' '}
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              Sign up
            </button>
          </p>
        </div>
      </div>
    </Modal>
  );
}

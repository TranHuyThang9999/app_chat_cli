// app/login/page.tsx
'use client';

import '@ant-design/v5-patch-for-react-19';
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '@/contexts/AuthContext';

interface LoginFormValues {
  userName: string;
  password: string;
}

export default function LoginPage() {
  const { setUserToken } = useAuth();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5232/api/Auth/login', {
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-xl">AC</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back to App Chat
          </p>
        </div>

        <div className="bg-white py-8 px-6 shadow rounded-lg">
          <Form<LoginFormValues>
            layout="vertical"
            onFinish={onFinish}
            initialValues={{ userName: '', password: '' }} // ← sử dụng initialValues thay defaultValue
          >
            <Form.Item
              label="Username"
              name="userName"
              rules={[{ required: true, message: 'Please input your username' }]}
            >
              <Input size="middle" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password' }]}
            >
              <Input.Password size="middle" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block loading={loading} size="large">
                Sign In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
}

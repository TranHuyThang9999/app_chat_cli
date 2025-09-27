// app/login/page.tsx
'use client';

import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const { setUserToken } = useAuth(); // giả sử AuthContext có hàm lưu token
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: { userName: string; password: string }) => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:5232/api/Auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error('Login failed');

      const data = await res.json();
      setUserToken(data.token); // lưu token vào context hoặc localStorage
      message.success('Login successful!');
    } catch (err: any) {
      message.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: '50px auto' }}>
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Username" name="userName" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

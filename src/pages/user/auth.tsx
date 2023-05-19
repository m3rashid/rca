import React, { useState } from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { Form, Input, Button, Typography, message, Modal, Alert } from 'antd';
import Head from 'next/head';
import Loading from 'rca/components/loading';
import axios from 'axios';

const Auth: NextPage = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const { data: session } = useSession();
  const [loading, setLoading] = React.useState(false);
  const [authType, setAuthType] = useState<'login' | 'register'>('login');

  React.useEffect(() => {
    if (session) {
      router.replace('/');
    }
    if (router.query.redirect && router.query.redirect === 'exam-register') {
      message.warning('Please Sign in First');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const createAccount = async (
    name: string,
    email: string,
    password: string
  ) => {
    if (!name || !email || !password)
      message.error('Please enter all the fields');

    const res = await axios.post('/api/user/create-account', {
      email,
      password,
      name,
    });
  };

  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      if (authType === 'register')
        await createAccount(values.name, values.email, values.password);

      const res = await signIn('credentials', {
        ...values,
        callbackUrl: '/',
        redirect: false,
      });

      if (!res?.ok) throw new Error('Login failed!');

      message.success('Login successful!');
      if (router.query.redirect && router.query.redirect === 'exam-register') {
        router.replace('/exam/register');
      }
    } catch (err: any) {
      message.error(err.message || 'Login failed!');
    } finally {
      setLoading(false);
    }
  };

  const reset = () => form.resetFields();

  const onFinishFailed = (errorInfo: any) => {
    console.log({ errorInfo });
  };

  const forgotPassword = () => {};

  if (loading) return <Loading loading={loading} />;

  return (
    <div
      className='center-all'
      style={{ height: 'calc(100vh - 158px)', flexDirection: 'column' }}
    >
      <Head>
        <title>
          {authType === 'register' ? 'Create Account' : 'Login'} | RCA
        </title>
      </Head>

      <div className='bg-white w-full max-w-xl p-2 sm:p-4 mx-2 sm:mx-4 rounded-md shadow-md'>
        <Typography.Title className='text-center' level={2}>
          {authType === 'register' ? 'Create Account' : 'Login'}
        </Typography.Title>

        <br />

        <Form
          form={form}
          name='login-form'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          {authType === 'register' && (
            <Form.Item
              label='Name'
              name='name'
              rules={[{ required: true, message: 'Please enter your name' }]}
            >
              <Input size='large' />
            </Form.Item>
          )}

          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input size='large' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password size='large' />
          </Form.Item>

          <Form.Item>
            <div className='flex items-center justify-center gap-2'>
              <Button type='primary' size='large' htmlType='submit'>
                {authType === 'register' ? 'Create Account' : 'Login'}
              </Button>

              <Button onClick={reset}>Reset</Button>

              {authType === 'login' && (
                <Button size='large' type='link' onClick={forgotPassword}>
                  Forgot password
                </Button>
              )}
            </div>
          </Form.Item>
        </Form>

        <div className='flex items-center justify-center gap-2'>
          {authType === 'register' ? (
            <Button
              size='large'
              type='link'
              onClick={() => setAuthType('login')}
            >
              Already Have an Account ? Login Here
            </Button>
          ) : (
            <Button
              size='large'
              type='link'
              onClick={() => setAuthType('register')}
            >
              Don&apos;t Have an Account yet ? Create Account
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;

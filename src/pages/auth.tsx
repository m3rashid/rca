import React from 'react';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/react';
import { Form, Input, Button, Typography, message } from 'antd';
import Head from 'next/head';
import Loading from 'rca/components/loading';

const Auth: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [form] = Form.useForm();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    if (session) {
      router.replace('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onFinish = async (values: any) => {
    try {
      setLoading(true);

      const { email } = values;
      if (!email) {
        form.setFields([
          {
            name: 'username',
            errors: ['Please input your username or email!'],
          },
          { name: 'email', errors: ['Please input your username or email!'] },
        ]);
        return;
      }
      const res = await signIn('credentials', {
        ...values,
        callbackUrl: '/',
        redirect: false,
      });

      if (!res?.ok) throw new Error('Login failed!');

      message.success('Login successful!');
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
        <title>Login | RCA</title>
      </Head>

      <Typography.Title level={2}>Login Here</Typography.Title>

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
        <Form.Item
          label='Email'
          name='email'
          rules={[
            { required: true, message: 'Please enter your email' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label='Password'
          name='password'
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>

          <Button style={{ marginLeft: 10 }} onClick={reset}>
            Reset
          </Button>

          <Button type='link' onClick={forgotPassword}>
            Forgot password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Auth;

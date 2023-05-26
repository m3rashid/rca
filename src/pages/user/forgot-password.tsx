import { Button, Form, Input, Typography, message } from 'antd';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { uiAtom } from 'rca/utils/atoms';
import React, { useState } from 'react';
import { useRecoilValue } from 'recoil';

interface IProps {}

const ForgotPassword: React.FC<IProps> = () => {
  const [isStep2, setIsStep2] = useState(false);
  const { isMobile } = useRecoilValue(uiAtom);
  const router = useRouter();
  const [form] = Form.useForm();
  const reset = () => form.resetFields();

  const handleSubmit = async (values: any) => {
    if (!isStep2) {
      if (!values.email) {
        message.error('Email is required');
        return;
      }
      try {
        await axios.post('/api/user/forgot-password');
      } catch (err) {
        console.log(err);
        message.error(
          'Could not send mail to your email, check your email again'
        );
      }
      setIsStep2(true);
      return;
    }
    console.log(values);
    if (!values.email || !values.otp) {
      message.error('Email is required');
      message.error('OTP is required');
      return;
    }
    try {
    } catch (err) {
      console.log(err);
      message.error(
        'Could not update your password, try again after a few minutes'
      );
    }
  };

  return (
    <div
      className='center-all'
      style={{ height: 'calc(100vh - 158px)', flexDirection: 'column' }}
    >
      <Head>
        <title>Forgot Password | RCA</title>
      </Head>

      <div className='bg-white w-full max-w-xl p-2 sm:p-4 mx-2 sm:mx-4 rounded-md shadow-md'>
        <Typography.Title className='text-center' level={2}>
          Forgot Password
        </Typography.Title>

        <br />

        <Form
          form={form}
          name='login-form'
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          style={{ maxWidth: 600, width: '100%' }}
          initialValues={{ remember: true }}
          onFinish={handleSubmit}
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input
              placeholder='Enter your Email'
              size={isMobile ? 'middle' : 'large'}
            />
          </Form.Item>

          {isStep2 ? (
            <Form.Item
              label='OTP'
              name='otp'
              rules={[
                {
                  required: true,
                  message: 'Please enter OTP received on your email',
                },
              ]}
            >
              <Input
                placeholder='Enter the OTP received'
                size={isMobile ? 'middle' : 'large'}
              />
            </Form.Item>
          ) : null}

          <Form.Item>
            <div className='flex items-center justify-center gap-2'>
              <Button
                type='primary'
                size={isMobile ? 'middle' : 'large'}
                htmlType='submit'
              >
                Send Email
              </Button>

              <Button size={isMobile ? 'middle' : 'large'} onClick={reset}>
                Reset
              </Button>
            </div>
          </Form.Item>
        </Form>

        <div className='flex items-center justify-center gap-2'>
          <Button
            size={isMobile ? 'middle' : 'large'}
            type='link'
            onClick={() => router.push('/user/auth')}
          >
            Remember Password or Create new Account
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

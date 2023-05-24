import { Button, Form, Input, Typography } from 'antd';
import { NextPage } from 'next';
import Head from 'next/head';
import { uiAtom } from 'rca/utils/atoms';
import React from 'react';
import { useRecoilValue } from 'recoil';

const ChangePassword: NextPage = () => {
  const { isMobile } = useRecoilValue(uiAtom);
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    console.log({ values });
  };

  const onFinishFailed = async (errInfo: any) => {
    console.log({ errInfo });
  };

  return (
    <div
      className='center-all p-4'
      style={{ height: 'calc(100vh - 158px)', flexDirection: 'column' }}
    >
      <Head>
        <title>Change Password | RCA</title>
      </Head>

      <Typography.Title level={2}>Change Password</Typography.Title>
      <br />

      <Form
        form={form}
        name='login-form'
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600, width: '100%' }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label='Current Password'
          name='current'
          rules={[
            { required: true, message: 'Please enter your current password!' },
          ]}
        >
          <Input.Password size={isMobile ? 'middle' : 'large'} />
        </Form.Item>

        <Form.Item
          label='New Password'
          name='new'
          rules={[
            { required: true, message: 'Please enter your new password!' },
          ]}
        >
          <Input.Password size={isMobile ? 'middle' : 'large'} />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type='primary' htmlType='submit'>
            Update Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ChangePassword;

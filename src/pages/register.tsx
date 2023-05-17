import { Form, Steps } from 'antd';
import Head from 'next/head';
import React from 'react';

interface IProps {}

const Register: React.FC<IProps> = () => {
  const [form] = Form.useForm();

  return (
    <>
      <Head>
        <title>RCA | Register</title>
      </Head>

      <div className='m-4 p-4 bg-white rounded-md shadow-md'>
        <Form form={form} title='Registration'>
          <Steps
            current={1}
            items={[
              {
                title: 'Basic Information',
              },
            ]}
          />
        </Form>
      </div>
    </>
  );
};

export default Register;

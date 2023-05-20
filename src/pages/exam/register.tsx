import {
  BookOutlined,
  DollarCircleOutlined,
  FileImageOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
} from '@ant-design/icons';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Button, Form, message, Steps } from 'antd';
import { useSession } from 'next-auth/react';
import React, { Fragment, useEffect, useState } from 'react';

import {
  defaultPayload,
  IRegisterPayload,
} from 'rca/components/register/stepper';
import Address from 'rca/components/register/address';
import Uploads from 'rca/components/register/uploads';
import Payment from 'rca/components/register/payment';
import Education from 'rca/components/register/education';
import BasicInfo from 'rca/components/register/basicInfo';
import Agreements from 'rca/components/register/agreements';
import EarlierCompetitiveExamsContainer from 'rca/components/register/earlierCompetitiveExams';
import axios from 'axios';

interface IProps {}

const Register: React.FC<IProps> = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const session = useSession({
    required: true,
    onUnauthenticated: () => {
      router.replace('/user/auth?redirect=exam-register');
    },
  });
  const [payload, setPayload] = useState<IRegisterPayload>(defaultPayload);

  useEffect(() => {
    if (session.status === 'loading') return;
    else if (session.status !== 'authenticated') {
      router.replace('/user/auth?redirect=exam-register');
    }
    // @ts-ignore
    else if (session.data?.user?.type === 'ADMIN') {
      router.replace('/user/auth');
    }
  }, []);

  const goToPreviousStep = () => {
    if (payload.currentStep === 0) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const goToNextStep = () => {
    if (payload.currentStep === steps.length - 1) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const commonStepStyles: React.CSSProperties = {};

  const steps = [
    <BasicInfo payload={payload} setPayload={setPayload} />,
    <Address payload={payload} setPayload={setPayload} />,
    <Education payload={payload} setPayload={setPayload} />,
    <EarlierCompetitiveExamsContainer
      payload={payload}
      setPayload={setPayload}
    />,
    <Uploads payload={payload} setPayload={setPayload} />,
    <Payment payload={payload} setPayload={setPayload} />,
    <Agreements payload={payload} setPayload={setPayload} />,
  ];

  const handleRegister = async () => {
    try {
      // validate fields
      const { data } = await axios.post('/api/user/register', {
        ...payload,
        // @ts-ignore
        user: session.data?.user?._id,
      });
      console.log(data);
      message.success('Successfully registered');
    } catch (err: any) {
      console.log(err);
      message.error('Something went wrong');
    }
  };

  return (
    <Fragment>
      <Head>
        <title>RCA | Register</title>
      </Head>

      <div className='flex gap-4 flex-col m-2 sm:m-4 sm:flex-row justify-center sm:mt-10'>
        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md h-full'>
          <Steps
            direction='vertical'
            className='overflow-x-auto style-scroll-bar py-2'
            current={payload.currentStep}
            items={[
              {
                title: 'Basic Information',
                icon: <InfoCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Addresses',
                icon: <HomeOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Education Details',
                icon: <BookOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Previous Exams',
                icon: <ReconciliationOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Uploads',
                icon: <FileImageOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Payment',
                icon: <DollarCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
              {
                title: 'Agreement',
                icon: <SolutionOutlined />,
                subTitle: '',
                style: commonStepStyles,
              },
            ]}
          />
        </div>

        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full max-w-lg h-full'>
          <Form
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            form={form}
            onFinish={handleRegister}
          >
            {steps[payload.currentStep]}

            <div className='flex justify-between gap-2 mt-10'>
              <Button
                size='large'
                disabled={payload.currentStep === 0}
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
              <Button
                size='large'
                disabled={payload.currentStep === steps.length - 1}
                onClick={goToNextStep}
              >
                Next
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;

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
import { getSession, useSession } from 'next-auth/react';
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
import { NextPage } from 'next';
import { IRegistration, Registration } from 'rca/models/registration';
import { validateRegister } from 'rca/components/register/validate';

type IProps = IRegistration | null;

const Register: NextPage<IProps> = (props) => {
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
      // @ts-ignore
    } else if (session.data?.user?.type === 'ADMIN') {
      router.replace('/user/auth');
    } else if (
      props &&
      Object.keys(props).length > 0 &&
      props.registerComplete
    ) {
      router.replace('/user/profile');
    }
  }, []);

  console.log({ props });

  const setStep = (step: number) => () => {
    setPayload((prev) => ({ ...prev, currentStep: step }));
  };

  const goToPreviousStep = () => {
    if (payload.currentStep === 0) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep - 1 }));
  };

  const goToNextStep = () => {
    if (payload.currentStep === steps.length - 1) return;
    setPayload((prev) => ({ ...prev, currentStep: prev.currentStep + 1 }));
  };

  const commonStepStyles: React.CSSProperties = {
    cursor: 'pointer',
  };

  const steps = [
    <BasicInfo payload={payload} setPayload={setPayload} />,
    <Address payload={payload} setPayload={setPayload} />,
    <Education payload={payload} setPayload={setPayload} />,
    <EarlierCompetitiveExamsContainer
      payload={payload}
      setPayload={setPayload}
    />,
    <Agreements payload={payload} setPayload={setPayload} />,
    <Uploads payload={payload} setPayload={setPayload} />,
    <Payment payload={payload} setPayload={setPayload} />,
  ];

  const handleRegister = async () => {
    try {
      const errors = validateRegister(payload);

      if (errors.length > 0) {
        message.error(
          <div className='w-full max-w-[350px] flex gap-2 flex-col items-center'>
            {errors.map((t) => (
              <Fragment key={t}>
                <div className='w-full bg-red-200 rounded-md px-2 py-1'>
                  {t}
                </div>
              </Fragment>
            ))}
          </div>
        );
        return;
      }

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
                onClick: setStep(0),
              },
              {
                title: 'Addresses',
                icon: <HomeOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(1),
              },
              {
                title: 'Education Details',
                icon: <BookOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(2),
              },
              {
                title: 'Previous Exams',
                icon: <ReconciliationOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(3),
              },
              {
                title: 'Agreement',
                icon: <SolutionOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(4),
              },
              {
                title: 'Uploads',
                icon: <FileImageOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(5),
              },
              {
                title: 'Payment',
                icon: <DollarCircleOutlined />,
                subTitle: '',
                style: commonStepStyles,
                onClick: setStep(6),
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

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  try {
    // @ts-ignore
    if (!session || !session.user?._id) return { props: {} };
    // @ts-ignore
    const res = await Registration.findOne({ user: session.user._id })
      .populate('user')
      .populate('testCenter')
      .lean();

    if (!res) return { props: {} };
    return { props: res };
  } catch (err) {
    return { props: {} };
  }
};

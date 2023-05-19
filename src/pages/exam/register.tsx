import { Button, Form, Steps, Typography, message } from 'antd';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IAddress } from 'rca/models/registration';
import { IRegistration } from 'rca/models/registration';
import React, { useEffect, useState } from 'react';

import Address from 'rca/components/register/address';
import Agreements from 'rca/components/register/agreements';
import BasicInfo from 'rca/components/register/basicInfo';
import EarlierCompetitiveExamsContainer from 'rca/components/register/earlierCompetitiveExams';
import Education from 'rca/components/register/education';
import Uploads from 'rca/components/register/uploads';
import {
  BookOutlined,
  FileImageOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  ReconciliationOutlined,
  SolutionOutlined,
} from '@ant-design/icons';

interface IProps {}

const defaultAddress: IAddress = {
  city: '',
  country: '',
  postalCode: '',
  state: '',
};

export type IRegisterPayload = Omit<IRegistration, 'user'> & {
  user?: IRegistration['user'];
};

const initialRegistrationPayload: IRegisterPayload = {
  currentStep: 0,
  gender: '',
  fatherName: '',
  motherName: '',
  dateOfBirth: '' as any,
  mobileNumber: '',
  phoneNumber: '',
  permanentAddress: defaultAddress,
  correspondenceAddress: defaultAddress,
  education: [],
  testCenter: '' as any,
  earlierCompetitiveExams: [],
  agreeToTerms: { informationIsCorrect: false, rightToChange: false },
  photograph: '',
  signature: '',
  aadharCard: '',
  lastSemesterCertificate: '',
};

const Register: React.FC<IProps> = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const session = useSession();
  const [payload, setPayload] = useState<IRegisterPayload>(
    initialRegistrationPayload
  );

  useEffect(() => {
    if (session.status !== 'authenticated') {
      router.replace('/auth?redirect=exam-register');
    }
    // @ts-ignore
    else if (session.data?.user?.type === 'ADMIN') {
      router.replace('/auth');
    }
  }, []);

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
    <Uploads payload={payload} setPayload={setPayload} />,
    <Agreements payload={payload} setPayload={setPayload} />,
  ];

  return (
    <>
      <Head>
        <title>RCA | Register</title>
      </Head>

      <div className='flex gap-2 flex-col m-2 sm:m-4 sm:flex-row justify-center sm:mt-10'>
        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full sm:max-w-sm h-full'>
          <Steps
            direction='vertical'
            className='overflow-x-auto style-scroll-bar py-2'
            current={payload.currentStep}
            items={[
              {
                title: 'Basic Information',
                icon: <InfoCircleOutlined />,
                subTitle: '',
                onClick: setStep(0),
                style: commonStepStyles,
              },
              {
                title: 'Addresses',
                icon: <HomeOutlined />,
                subTitle: '',
                onClick: setStep(1),
                style: commonStepStyles,
              },
              {
                title: 'Education Details',
                icon: <BookOutlined />,
                subTitle: '',
                onClick: setStep(2),
                style: commonStepStyles,
              },
              {
                title: 'Previous Exams',
                icon: <ReconciliationOutlined />,
                subTitle: '',
                onClick: setStep(3),
                style: commonStepStyles,
              },
              {
                title: 'Uploads',
                icon: <FileImageOutlined />,
                subTitle: '',
                onClick: setStep(4),
                style: commonStepStyles,
              },
              {
                title: 'Agreement',
                icon: <SolutionOutlined />,
                subTitle: '',
                onClick: setStep(5),
                style: commonStepStyles,
              },
            ]}
          />
        </div>

        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full sm:max-w-sm md:max-w-lg h-full'>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
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
    </>
  );
};

export default Register;

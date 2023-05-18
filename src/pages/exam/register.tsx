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

const steps = [
  <BasicInfo />,
  <Address />,
  <Education />,
  <EarlierCompetitiveExamsContainer />,
  <Uploads />,
  <Agreements />,
];

interface IProps {}

const defaultAddress: IAddress = {
  city: '',
  country: '',
  postalCode: '',
  state: '',
};

type RegisterPayload = Omit<IRegistration, 'user'> & {
  user?: IRegistration['user'];
};

const initialRegistrationPayload: RegisterPayload = {
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
  const [payload, setPayload] = useState<RegisterPayload>(
    initialRegistrationPayload
  );

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/auth');
    }
    // @ts-ignore
    else if (session.data?.user?.type === 'ADMIN') {
      router.replace('/auth');
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

  return (
    <>
      <Head>
        <title>RCA | Register</title>
      </Head>

      <div className='flex gap-2 flex-col m-2 sm:m-4 sm:flex-row justify-center sm:mt-10'>
        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full sm:max-w-sm h-full'>
          <Steps
            progressDot
            direction='vertical'
            className='overflow-x-auto style-scroll-bar'
            current={payload.currentStep}
            items={[
              { title: 'Basic Information' },
              { title: 'Addresses' },
              { title: 'Education Details' },
              { title: 'Previous Exams' },
              { title: 'Uploads' },
              { title: 'Agreement' },
            ]}
          />
        </div>

        <div className='p-2 sm:p-4 bg-white rounded-md shadow-md w-full sm:max-w-sm md:max-w-lg h-full'>
          <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} form={form}>
            {steps[payload.currentStep]}

            <div className='flex justify-between gap-2 mt-10'>
              <Button
                disabled={payload.currentStep === 0}
                onClick={goToPreviousStep}
              >
                Previous
              </Button>
              <Button
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

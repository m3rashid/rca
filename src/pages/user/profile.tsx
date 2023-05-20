import { Button } from 'antd';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { Config } from 'rca/models/configs';
import { getSession } from 'next-auth/react';
import { useReactToPrint } from 'react-to-print';
import { IProfileProps } from 'rca/components/admitCard';
import AdminContainer from 'rca/components/adminContainer';
import { IRegistration, Registration } from 'rca/models/registration';
import mongoose from 'mongoose';
import { ITestCenter, TestCenter } from 'rca/models/testCenter';
const AdmitCardTemplate = dynamic(() => import('rca/components/admitCard'), {
  ssr: false,
});

interface IProps {
  registration: IRegistration;
  testCenter: ITestCenter;
  dateOfExam: string;
  timeOfExam: string;
}

const Profile: NextPage<IProps | null> = (props) => {
  const data: IProfileProps['data'] = {
    ...(props?.registration as IRegistration),
    testCenter: props?.testCenter.address as any,
    dateOfExam: props?.dateOfExam as string,
    timeOfExam: props?.timeOfExam as string,
  };

  const printContainerRef = useRef(null);
  const printPdf = useReactToPrint({
    content: () => printContainerRef.current,
  });

  return (
    <AdminContainer>
      <div className='flex my-2 mr-2 justify-end'>
        <Button type='primary' onClick={printPdf}>
          Print Admit Card
        </Button>
      </div>

      {props && (
        <AdmitCardTemplate printContainerRef={printContainerRef} data={data} />
      )}
    </AdminContainer>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  // @ts-ignore
  if (!session || !session.user?._id) return { props: {} };

  const configs = await Config.find().lean();
  const registration = await Registration.findOne({
    // @ts-ignore
    user: new mongoose.Types.ObjectId(session.user?._id),
  }).populate('user');

  const testCenter = await TestCenter.findById(registration?.testCenter).lean();

  if (!testCenter || !registration || !configs || configs.length === 0) {
    return { props: {} };
  }

  const dateOfExam = configs.find((c) => c.name === 'dateOfExam')?.value;
  const timeOfExam = configs.find((c) => c.name === 'timeOfExam')?.value;
  if (!dateOfExam || !timeOfExam) return { props: {} };

  return {
    props: {
      registration: JSON.parse(JSON.stringify(registration)),
      testCenter: JSON.parse(JSON.stringify(testCenter)),
      dateOfExam,
      timeOfExam,
    },
  };
};

import { Button } from 'antd';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { Config } from 'rca/models/configs';
import { getSession } from 'next-auth/react';
import { useReactToPrint } from 'react-to-print';
import { IProfileProps } from 'rca/components/admitCard';
import AdminContainer from 'rca/components/adminContainer';
const AdmitCardTemplate = dynamic(() => import('rca/components/admitCard'), {
  ssr: false,
});

const Profile: NextPage<IProfileProps['data'] | null> = (props) => {
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
        <AdmitCardTemplate printContainerRef={printContainerRef} data={props} />
      )}
    </AdminContainer>
  );
};

export default Profile;

export const getServerSideProps = async (ctx: any) => {
  const session = await getSession(ctx);
  let props: IProfileProps | null = null;
  // @ts-ignore
  if (!session || !session.user?._id) return { props };
  // @ts-ignore
  const registration = await Registration.findOne({ user: session.user._id })
    .populate('user')
    .populate('testCenter');

  const configs = await Config.find({
    $or: [{ name: 'dateOfExam' }, { name: 'timeOfExam' }],
  });

  props = {
    ...registration,
    dateOfExam: configs.find((c) => c.name === 'dateOfExam')?.value,
    timeOfExam: configs.find((c) => c.name === 'timeOfExam')?.value,
  };
  return { props };
};

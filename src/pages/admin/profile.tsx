import { NextPage } from 'next';
import dynamic from 'next/dynamic';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IProfileProps } from 'rca/components/admitCard';
import AdminContainer from 'rca/components/adminContainer';
import { Button } from 'antd';
const AdmitCardTemplate = dynamic(() => import('rca/components/admitCard'), {
  ssr: false,
});

const Profile: NextPage<IProfileProps> = (props) => {
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

      <AdmitCardTemplate
        printContainerRef={printContainerRef}
        data={props.data}
      />
    </AdminContainer>
  );
};

export default Profile;

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

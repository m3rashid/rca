import { Typography } from 'antd';
import dynamic from 'next/dynamic';
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { IRegistration } from 'rca/models/registration';
import { ITestCenter } from 'rca/models/testCenter';
import { useRouter } from 'next/router';
import axios from 'axios';

const AdmitCardTemplate = dynamic(
  () => import('rca/components/admitCard/index'),
  { ssr: false }
);

interface IProfileProps {
  data: IRegistration & {
    timeOfExam: string;
    dateOfExam: string;
  };
  printContainerRef: React.MutableRefObject<null>;
}

interface IProps {
  registration: IRegistration;
  testCenter: ITestCenter;
  dateOfExam: string;
  timeOfExam: string;
}

const Profile = () => {
  const router = useRouter();
  const [props, setProps] = useState<IProps | null>(null);

  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.post('/api/user/get-profile');
      if (!data || !data.registration || !data.registration.registerComplete) {
        router.push('/exam/register');
        return;
      }
      setProps(data);
    };
    getData().then().catch(console.log);
  }, []);

  const data: IProfileProps['data'] = {
    ...(props?.registration as IRegistration),
    testCenter: props?.testCenter?.address as any,
    dateOfExam: props?.dateOfExam as string,
    timeOfExam: props?.timeOfExam as string,
  };

  const printContainerRef = useRef(null);
  const printPdf = useReactToPrint({
    content: () => printContainerRef.current,
  });

  return (
    <Fragment>
      {/* <div className='flex my-2 mr-2 justify-end'>
        <Button type='primary' onClick={printPdf}>
          Print Admit Card
        </Button>
      </div> */}

      <div className='flex items-center flex-col justify-center min-h-[500px]'>
        <Typography.Title level={3}>
          You have already registered for the exam
        </Typography.Title>
        <Typography.Text>
          Your Response was recorded. You will get admit card here in a few days
        </Typography.Text>
      </div>

      {/* <AdmitCardTemplate printContainerRef={printContainerRef} data={data} /> */}
    </Fragment>
  );
};

export default Profile;

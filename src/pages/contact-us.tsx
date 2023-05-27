import { Typography } from 'antd';
import Head from 'next/head';
import UserHeader from 'rca/components/userHeader';
import React from 'react';

interface IProps {}

const ContactUs: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>RCA - Contact</title>
      </Head>

      <UserHeader>
        <div className='lg:py-12 md:px-8 xl:px-32 md:relative md:z-10 px-4 text-xl'>
          <Typography.Title level={2}>Emails</Typography.Title>
          <p>shiblirca@gmail.com</p>
          <p> admissionsatshiblirca@gmail.com</p>

          <br />

          <Typography.Title level={2}>Contacts</Typography.Title>
          <p>8655835557</p>
        </div>
      </UserHeader>
    </>
  );
};

export default ContactUs;

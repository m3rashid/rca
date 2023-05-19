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
        <div>Contact</div>
      </UserHeader>
    </>
  );
};

export default ContactUs;

import Head from 'next/head';
import UserHeader from 'rca/components/userHeader';
import React from 'react';

interface IProps {}

const AboutUs: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>RCA - About</title>
      </Head>

      <UserHeader>
        <div>AboutUs</div>
      </UserHeader>
    </>
  );
};

export default AboutUs;

import Head from 'next/head';
import UserHeader from 'rca/components/userHeader';
import React from 'react';

interface IProps {}

const Testimonials: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>RCA - Testimonials</title>
      </Head>

      <UserHeader>
        <div>Testimonials</div>
      </UserHeader>
    </>
  );
};

export default Testimonials;

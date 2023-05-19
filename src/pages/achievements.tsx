import Head from 'next/head';
import UserHeader from 'rca/components/userHeader';
import React from 'react';

interface IProps {}

const Achievements: React.FC<IProps> = () => {
  return (
    <>
      <Head>
        <title>RCA - Achievements</title>
      </Head>

      <UserHeader>
        <div>Achievements</div>
      </UserHeader>
    </>
  );
};

export default Achievements;

import AdminContainer from 'rca/components/adminContainer';
import { NextPage } from 'next';
import React from 'react';

const Profile: NextPage = () => {
  return (
    <AdminContainer>
      <div className='m-4 bg-white rounded-md shadow-md'>
        <div>Profile</div>;
      </div>
    </AdminContainer>
  );
};

export default Profile;

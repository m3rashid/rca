import AdminContainer from "rca/components/adminContainer";
import { NextPage } from "next";
import React from "react";
import { AdmitCardTemplate } from "rca/components/admitcard/admitcard";

const Profile: NextPage = () => {
  return (
    <AdminContainer>
      {/* <div className='m-4 bg-white rounded-md shadow-md'>
        <div>Profile</div>;
      </div> */}
      <AdmitCardTemplate
     

      />
    </AdminContainer>
  );
};

export default Profile;

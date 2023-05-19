import AdminContainer from 'rca/components/adminContainer';
import React from 'react';

interface IProps {}

const CurrentAffairs: React.FC<IProps> = () => {
  return (
    <>
      <AdminContainer>
        <div className='m-4 bg-white rounded-md shadow-md'>
          <div>CurrentAffairs</div>
        </div>
      </AdminContainer>
    </>
  );
};

export default CurrentAffairs;

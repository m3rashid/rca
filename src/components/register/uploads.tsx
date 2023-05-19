import { IRegisterPayload } from 'rca/pages/exam/register';
import React from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Uploads: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <>
      <div>Uploads</div>
    </>
  );
};

export default Uploads;

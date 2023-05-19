import { IRegisterPayload } from 'rca/pages/exam/register';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Uploads: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <Fragment>
      <div>Uploads</div>
    </Fragment>
  );
};

export default Uploads;

import React, { Fragment } from 'react';
import { IRegisterPayload } from 'rca/components/register/stepper';
import { Form, Upload } from 'antd';
import ImageUploader from '../uploadImage';

interface IDraggerUpload {
  handleImageChange: (info: any) => void;
}

const DraggerUpload: React.FC<IDraggerUpload> = ({ handleImageChange }) => {
  return (
    <Upload.Dragger
      onChange={handleImageChange}
      multiple={false}
      style={{ padding: 10 }}
    >
      <p className='ant-upload-text'>
        Click or drag file to this area to upload
      </p>

      <p className='ant-upload-hint'>Choose a single image from your device</p>
    </Upload.Dragger>
  );
};

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Uploads: React.FC<IProps> = ({ payload, setPayload }) => {
  const handleImageChange = (info: any) => {};

  return (
    <Fragment>
      <ImageUploader label='Photograph' name='photograph' required />
      <ImageUploader label='Aadhar Card' name='aadharCard' required />
      <ImageUploader label='Signature' name='signature' required />
      <ImageUploader
        label='Last Semester Certificate'
        name='lastSemesterCertificate'
      />
    </Fragment>
  );
};

export default Uploads;

import React, { Fragment } from 'react';
import { IRegisterPayload } from 'rca/components/register/stepper';
import { Form, Upload } from 'antd';

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
      <Form.Item name='photograph' label='Photograph'>
        <DraggerUpload handleImageChange={handleImageChange} />
      </Form.Item>

      <Form.Item name='aadharCard' label='Aadhar Card'>
        <DraggerUpload handleImageChange={handleImageChange} />
      </Form.Item>

      <Form.Item name='signature' label='Signature'>
        <DraggerUpload handleImageChange={handleImageChange} />
      </Form.Item>

      <Form.Item
        name='lastSemesterCertificate'
        label='Last Semester Certificate'
      >
        <DraggerUpload handleImageChange={handleImageChange} />
      </Form.Item>
    </Fragment>
  );
};

export default Uploads;

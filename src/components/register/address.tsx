import { Form, Input, Typography } from 'antd';
import { IRegisterPayload } from 'rca/pages/exam/register';
import React from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const AddressContainer: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <>
      <Form.Item name='city' label='City'>
        <Input size='large' />
      </Form.Item>

      <Form.Item name='state' label='State'>
        <Input size='large' />
      </Form.Item>

      <Form.Item name='postalCode' label='Postal Code'>
        <Input size='large' />
      </Form.Item>
    </>
  );
};

const Address: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <>
      <Typography.Text>Permanent Address</Typography.Text>
      <AddressContainer payload={payload} setPayload={setPayload} />

      <Typography.Text>Correspondence Address</Typography.Text>
      <AddressContainer payload={payload} setPayload={setPayload} />
    </>
  );
};

export default Address;

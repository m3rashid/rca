import { Form, Input, Typography } from 'antd';
import React from 'react';

interface IProps {}

const AddressContainer = () => {
  return (
    <>
      <Form.Item name='city' label='City'>
        <Input />
      </Form.Item>

      <Form.Item name='state' label='State'>
        <Input />
      </Form.Item>

      <Form.Item name='postalCode' label='Postal Code'>
        <Input />
      </Form.Item>
    </>
  );
};

const Address = () => {
  return (
    <>
      <Typography.Text>Permanent Address</Typography.Text>
      <AddressContainer />

      <Typography.Text>Correspondence Address</Typography.Text>
      <AddressContainer />
    </>
  );
};

export default Address;

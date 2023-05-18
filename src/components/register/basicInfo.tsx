import { DatePicker, Form, Input, Select } from 'antd';
import React from 'react';

interface IProps {}

const BasicInfo = () => {
  return (
    <>
      <Form.Item name='gender' label='Gender'>
        <Select
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' },
          ]}
        />
      </Form.Item>

      <Form.Item label='Father Name' name='fatherName'>
        <Input />
      </Form.Item>

      <Form.Item label='Mother Name' name='motherName'>
        <Input />
      </Form.Item>

      <Form.Item label='Date of Birth' name='dateOfBirth'>
        <DatePicker />
      </Form.Item>

      <Form.Item label='Mobile Number' name='mobileNumber'>
        <Input type='tel' />
      </Form.Item>

      <Form.Item label='Phone Number' name='phoneNumber'>
        <Input type='tel' />
      </Form.Item>
    </>
  );
};

export default BasicInfo;

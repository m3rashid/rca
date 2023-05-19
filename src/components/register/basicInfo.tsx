import { DatePicker, Form, Input, Select } from 'antd';
import { IRegisterPayload } from 'rca/pages/exam/register';
import React from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const BasicInfo: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <>
      <Form.Item name='gender' label='Gender'>
        <Select
          placeholder='Select Gender'
          size='large'
          options={[
            { label: 'Male', value: 'M' },
            { label: 'Female', value: 'F' },
            { label: 'Other', value: 'O' },
          ]}
        />
      </Form.Item>

      <Form.Item label='Father Name' name='fatherName'>
        <Input size='large' placeholder="Enter Father's name" />
      </Form.Item>

      <Form.Item label='Mother Name' name='motherName'>
        <Input size='large' placeholder="Enter Mother's name" />
      </Form.Item>

      <Form.Item label='Date of Birth' name='dateOfBirth'>
        <DatePicker
          style={{ width: '100%' }}
          size='large'
          placeholder='Enter Date of Birth'
        />
      </Form.Item>

      <Form.Item label='Mobile Number' name='mobileNumber'>
        <Input type='tel' size='large' placeholder='Enter Mobile Number' />
      </Form.Item>

      <Form.Item label='Phone Number' name='phoneNumber'>
        <Input type='tel' size='large' placeholder='Enter Phone Number' />
      </Form.Item>
    </>
  );
};

export default BasicInfo;

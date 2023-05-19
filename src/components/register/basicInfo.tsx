import { DatePicker, Form, Input, Select } from 'antd';
import dayjs from 'dayjs';
import { IRegisterPayload } from 'rca/pages/exam/register';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const BasicInfo: React.FC<IProps> = ({ payload, setPayload }) => {
  const onChange = (name: string, value: any) => {
    setPayload((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Fragment>
      <Form.Item name='gender' label='Gender'>
        <Select
          value={payload.gender}
          onChange={(val) => onChange('gender', val)}
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
        <Input
          size='large'
          placeholder="Enter Father's name"
          value={payload.fatherName}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Form.Item>

      <Form.Item label='Mother Name' name='motherName'>
        <Input
          size='large'
          placeholder="Enter Mother's name"
          value={payload.motherName}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Form.Item>

      <Form.Item label='Date of Birth' name='dateOfBirth'>
        <DatePicker
          style={{ width: '100%' }}
          size='large'
          placeholder='Enter Date of Birth'
          value={dayjs(payload.dateOfBirth)}
          onChange={(val) => onChange('dateOfBirth', val)}
        />
      </Form.Item>

      <Form.Item label='Mobile Number' name='mobileNumber'>
        <Input
          type='tel'
          size='large'
          placeholder='Enter Mobile Number'
          value={payload.mobileNumber}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Form.Item>

      <Form.Item label='Phone Number' name='phoneNumber'>
        <Input
          type='tel'
          size='large'
          placeholder='Enter Phone Number'
          value={payload.phoneNumber}
          onChange={(e) => onChange(e.target.name, e.target.value)}
        />
      </Form.Item>
    </Fragment>
  );
};

export default BasicInfo;

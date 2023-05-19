import { Form, Input, InputNumber, Typography } from 'antd';
import { IRegisterPayload } from 'rca/components/register/stepper';
import React, { Fragment } from 'react';

interface IInnerProps {
  address: IRegisterPayload['permanentAddress'];
  onChange: (name: string, value: any) => void;
  name: 'permanentAddress' | 'correspondenceAddress';
}

const AddressContainer: React.FC<IInnerProps> = ({
  address,
  onChange,
  name,
}) => {
  return (
    <Fragment>
      <Form.Item
        name={`${name}.state`}
        label='State'
        rules={[{ required: true }]}
      >
        <Input
          size='large'
          placeholder='Enter State'
          value={address.state}
          onChange={(e) => onChange('state', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.city`}
        label='City'
        rules={[{ required: true }]}
      >
        <Input
          size='large'
          placeholder='Enter City'
          value={address.city}
          onChange={(e) => onChange('city', e.target.value)}
        />
      </Form.Item>

      <Form.Item
        name={`${name}.postalCode`}
        label='Postal Code'
        rules={[{ required: true }]}
      >
        <InputNumber
          size='large'
          placeholder='Postal Code'
          value={address.postalCode}
          className='w-full'
          onChange={(val) => onChange('postalCode', val)}
        />
      </Form.Item>
    </Fragment>
  );
};

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Address: React.FC<IProps> = ({ payload, setPayload }) => {
  const onPermanentAddressChange = (name: string, value: any) => {
    setPayload((prev) => ({
      ...prev,
      permanentAddress: {
        ...prev.permanentAddress,
        [name]: value,
      },
    }));
  };

  const onCorrespondenceAddressChange = (name: string, value: any) => {
    setPayload((prev) => ({
      ...prev,
      correspondenceAddress: {
        ...prev.correspondenceAddress,
        [name]: value,
      },
    }));
  };

  return (
    <Fragment>
      <Typography.Title level={4}>Permanent Address</Typography.Title>
      <AddressContainer
        name='permanentAddress'
        address={payload.permanentAddress}
        onChange={onPermanentAddressChange}
      />

      <br />
      <br />

      <Typography.Title level={4}>Correspondence Address</Typography.Title>
      <AddressContainer
        name='correspondenceAddress'
        address={payload.correspondenceAddress}
        onChange={onCorrespondenceAddressChange}
      />
    </Fragment>
  );
};

export default Address;

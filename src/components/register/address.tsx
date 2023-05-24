import { Checkbox, Form, Input, InputNumber, Typography } from 'antd';
import { IRegisterPayload } from 'rca/components/register/stepper';
import React, { Fragment, useState } from 'react';

interface IInnerProps {
  address: IRegisterPayload['correspondenceAddress'];
  onChange: (name: string, value: any) => void;
  name: 'permanentAddress' | 'correspondenceAddress';
  disabled: boolean;
}

const AddressContainer: React.FC<IInnerProps> = ({
  address,
  onChange,
  name,
  disabled,
}) => {
  return (
    <Fragment>
      <Form.Item
        name={`${name}.state`}
        label='State'
        rules={[{ required: true }]}
      >
        <Input
          disabled={disabled}
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
          disabled={disabled}
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
          disabled={disabled}
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
  const [isSameAddress, setIsSameAddress] = useState(false);

  const onPermanentAddressChange = (name: string, value: any) => {
    if (isSameAddress) return;
    setPayload((prev) => ({
      ...prev,
      permanentAddress: { ...prev.permanentAddress, [name]: value },
    }));
  };

  const onCorrespondenceAddressChange = (name: string, value: any) => {
    setPayload((prev) => ({
      ...prev,
      correspondenceAddress: { ...prev.correspondenceAddress, [name]: value },
      ...(isSameAddress
        ? { permanentAddress: { ...prev.correspondenceAddress, [name]: value } }
        : {}),
    }));
  };

  const onSameAddressCheck = (val: boolean) => {
    setIsSameAddress(val);
    if (val) {
      setPayload((prev) => ({
        ...prev,
        permanentAddress: prev.correspondenceAddress,
      }));
    }
  };

  console.log(payload);

  return (
    <Fragment>
      <Typography.Title level={4}>Correspondence Address</Typography.Title>
      <AddressContainer
        disabled={false}
        name='correspondenceAddress'
        address={payload.correspondenceAddress}
        onChange={onCorrespondenceAddressChange}
      />

      <br />
      <br />

      <Typography.Title level={4}>Permanent Address</Typography.Title>
      <Checkbox onChange={(e) => onSameAddressCheck(e.target.checked)} />
      <Typography.Text className='ml-2'>
        Same as Correspondence Address
      </Typography.Text>

      <AddressContainer
        disabled={isSameAddress}
        name='permanentAddress'
        address={payload.permanentAddress}
        onChange={onPermanentAddressChange}
      />
    </Fragment>
  );
};

export default Address;

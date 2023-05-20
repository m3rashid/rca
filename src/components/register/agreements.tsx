import { Button, Checkbox, Form, Input, Select } from 'antd';
import axios from 'axios';
import { IRegisterPayload } from 'rca/components/register/stepper';
import { ITestCenter } from 'rca/models/testCenter';
import React, { Fragment, useEffect, useState } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Agreements: React.FC<IProps> = ({ payload, setPayload }) => {
  const [testCentres, setTestCenters] = useState<ITestCenter[]>([]);
  const onChange = (name: string, value: boolean) => {
    setPayload((prev) => ({
      ...prev,
      agreeToTerms: {
        ...prev.agreeToTerms,
        [name]: value,
      },
    }));
  };

  useEffect(() => {
    const getTestCenters = async () => {
      const { data } = await axios.get('/api/admin/test-centers');
      setTestCenters(data.data);
    };
    getTestCenters().then().catch(console.log);
  }, []);

  return (
    <Fragment>
      <Form.Item
        name='informationIsCorrect'
        label='Information given by me is correct'
      >
        <Checkbox
          onChange={(e) => onChange('informationIsCorrect', e.target.checked)}
          checked={payload.agreeToTerms.informationIsCorrect}
        />
      </Form.Item>

      <Form.Item
        name='rightToChange'
        label='Any Details in the application can be changed by the university at any time'
      >
        <Checkbox
          onChange={(e) => onChange('rightToChange', e.target.checked)}
          checked={payload.agreeToTerms.rightToChange}
        />
      </Form.Item>

      <Form.Item name='testCenter' label='Choose your Test Center'>
        <Select
          options={testCentres.map((t: ITestCenter) => ({
            label: t.address,
            value: t._id,
          }))}
          value={payload.testCenter as any}
          onChange={(value) =>
            setPayload((prev) => ({ ...prev, testCenter: value as any }))
          }
        />
      </Form.Item>

      <Form.Item className='w-full'>
        <Button size='large' onClick={() => {}}>
          Cancel
        </Button>

        <Button type='primary' htmlType='submit' size='large'>
          Register
        </Button>
      </Form.Item>
    </Fragment>
  );
};

export default Agreements;

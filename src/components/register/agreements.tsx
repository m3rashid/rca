import { Button, Checkbox, Form } from 'antd';
import { IRegisterPayload } from 'rca/components/register/stepper';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Agreements: React.FC<IProps> = ({ payload, setPayload }) => {
  const onChange = (name: string, value: boolean) => {
    setPayload((prev) => ({
      ...prev,
      agreeToTerms: {
        ...prev.agreeToTerms,
        [name]: value,
      },
    }));
  };

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

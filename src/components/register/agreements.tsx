import { Checkbox, Form } from 'antd';
import { IRegisterPayload } from 'rca/pages/exam/register';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Agreements: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <Fragment>
      <Form.Item
        name='informationIsCorrect'
        label='Information given by me is correct'
      >
        <Checkbox />
      </Form.Item>

      <Form.Item
        name='rightToChange'
        label='Any Details in the application can be changed by the university at any time'
      >
        <Checkbox />
      </Form.Item>
    </Fragment>
  );
};

export default Agreements;

import { Checkbox, Form } from 'antd';
import React from 'react';

interface IProps {}

const Agreements = () => {
  return (
    <>
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
    </>
  );
};

export default Agreements;

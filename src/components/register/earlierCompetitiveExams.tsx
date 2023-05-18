import { Button, Checkbox, Form, Input } from 'antd';
import React, { Fragment } from 'react';

interface IProps {}

const EarlierCompetitiveExamsContainer = () => {
  return (
    <>
      <Form.List name='earlierCompetitiveExams'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment>
                <Form.Item label='Name' name='name'>
                  <Input />
                </Form.Item>

                <Form.Item label='Year' name='year'>
                  <Input />
                </Form.Item>

                <Form.Item label='Cleared' name='cleared'>
                  <Checkbox />
                </Form.Item>

                <Button type='dashed' onClick={() => remove(index)}>
                  Remove
                </Button>
              </Fragment>
            ))}

            <Button onClick={() => add()}>Add Earlier Competitive Exams</Button>
          </Fragment>
        )}
      </Form.List>
    </>
  );
};

export default EarlierCompetitiveExamsContainer;

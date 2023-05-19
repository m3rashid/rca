import { Button, Checkbox, Form, Input } from 'antd';
import { IRegisterPayload } from 'rca/components/register/stepper';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const EarlierCompetitiveExamsContainer: React.FC<IProps> = ({
  payload,
  setPayload,
}) => {
  return (
    <Fragment>
      <Form.List name='earlierCompetitiveExams'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment>
                <Form.Item label='Name' name='name'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item label='Year' name='year'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item label='Cleared' name='cleared'>
                  <Checkbox />
                </Form.Item>

                <Button
                  type='dashed'
                  className='w-full mb-10'
                  onClick={() => remove(index)}
                >
                  Remove
                </Button>
              </Fragment>
            ))}

            <Button
              size='large'
              type='dashed'
              style={{ width: '100%' }}
              onClick={() => add()}
            >
              Add Earlier Competitive Exams
            </Button>
          </Fragment>
        )}
      </Form.List>
    </Fragment>
  );
};

export default EarlierCompetitiveExamsContainer;

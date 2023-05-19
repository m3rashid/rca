import { Button, DatePicker, Form, Input } from 'antd';
import { IRegisterPayload } from 'rca/pages/exam/register';
import React, { Fragment } from 'react';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Education: React.FC<IProps> = ({ payload, setPayload }) => {
  return (
    <Fragment>
      <Form.List name='education'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment key={field.key}>
                <Form.Item name='degree' label='Degree'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item name='percentage' label='Percentage'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item name='division' label='Division'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item name='board' label='Board'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item name='institutionName' label='Institution Name'>
                  <Input size='large' />
                </Form.Item>

                <Form.Item name='passYear' label='Pass Year'>
                  <DatePicker
                    style={{ width: '100%' }}
                    showHour={false}
                    showMinute={false}
                    showNow={false}
                    showSecond={false}
                    showTime={false}
                    showToday={false}
                    size='large'
                  />
                </Form.Item>

                <Button
                  size='large'
                  type='dashed'
                  onClick={() => remove(index)}
                  className='w-full mb-10'
                >
                  Remove Education
                </Button>
              </Fragment>
            ))}

            <Button
              size='large'
              type='dashed'
              onClick={() => add()}
              className='w-full'
            >
              Add Education
            </Button>
          </Fragment>
        )}
      </Form.List>
    </Fragment>
  );
};

export default Education;

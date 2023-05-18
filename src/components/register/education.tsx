import { Button, DatePicker, Form, Input } from 'antd';
import React, { Fragment } from 'react';

interface IProps {}

const Education = () => {
  return (
    <>
      <Form.List name='education'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment key={field.key}>
                <Form.Item name='degree' label='Degree'>
                  <Input />
                </Form.Item>

                <Form.Item name='percentage' label='Percentage'>
                  <Input />
                </Form.Item>

                <Form.Item name='division' label='Division'>
                  <Input />
                </Form.Item>

                <Form.Item name='board' label='Board'>
                  <Input />
                </Form.Item>

                <Form.Item name='institutionName' label='Institution Name'>
                  <Input />
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
                  />
                </Form.Item>

                <Button
                  type='dashed'
                  onClick={() => remove(index)}
                  className='w-full mb-10'
                >
                  Remove Education
                </Button>
              </Fragment>
            ))}

            <Button type='dashed' onClick={() => add()} className='w-full'>
              Add Education
            </Button>
          </Fragment>
        )}
      </Form.List>
    </>
  );
};

export default Education;

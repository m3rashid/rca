import { Button, DatePicker, Form, Input } from 'antd';
import dayjs from 'dayjs';
import { IRegisterPayload } from 'rca/components/register/stepper';
import { uiAtom } from 'rca/utils/atoms';
import React, { Fragment } from 'react';
import { useRecoilValue } from 'recoil';

interface IProps {
  payload: IRegisterPayload;
  setPayload: React.Dispatch<React.SetStateAction<IRegisterPayload>>;
}

const Education: React.FC<IProps> = ({ payload, setPayload }) => {
  const { isMobile } = useRecoilValue(uiAtom);

  const onEducationChange = (name: string, value: any, index: number) => {
    setPayload((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => {
        if (i === index) {
          return {
            ...edu,
            [name]: value,
          };
        }

        return edu;
      }),
    }));
  };

  return (
    <Fragment>
      <Form.List name='education'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment key={field.key}>
                <Form.Item
                  name='degree'
                  label='Degree'
                  rules={[{ required: true }]}
                >
                  <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Degree'
                    value={payload.education[index]?.degree}
                    onChange={(e) => {
                      onEducationChange('degree', e.target.value, index);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='percentage'
                  label='Percentage'
                  rules={[{ required: true }]}
                >
                  <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Degree'
                    value={payload.education[index]?.percentage}
                    onChange={(e) => {
                      onEducationChange('percentage', e.target.value, index);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='division'
                  label='Division'
                  rules={[{ required: true }]}
                >
                  <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Division'
                    value={payload.education[index]?.division}
                    onChange={(e) => {
                      onEducationChange('division', e.target.value, index);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='board'
                  label='Board'
                  rules={[{ required: true }]}
                >
                  <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Education Board'
                    value={payload.education[index]?.board}
                    onChange={(e) => {
                      onEducationChange('board', e.target.value, index);
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='institutionName'
                  label='Institution Name'
                  rules={[{ required: true }]}
                >
                  <Input
                    size={isMobile ? 'middle' : 'large'}
                    placeholder='Enter Institution Name'
                    value={payload.education[index]?.institutionName}
                    onChange={(e) => {
                      onEducationChange(
                        'institutionName',
                        e.target.value,
                        index
                      );
                    }}
                  />
                </Form.Item>

                <Form.Item
                  name='passYear'
                  label='Pass Year'
                  rules={[{ required: true }]}
                >
                  <DatePicker
                    placeholder='Enter Passing Year'
                    style={{ width: '100%' }}
                    showHour={false}
                    showMinute={false}
                    showNow={false}
                    showSecond={false}
                    showTime={false}
                    showToday={false}
                    size={isMobile ? 'middle' : 'large'}
                    value={dayjs(payload.education[index]?.institutionName)}
                    onChange={(val) => {
                      onEducationChange('institutionName', val, index);
                    }}
                  />
                </Form.Item>

                <Button
                  size={isMobile ? 'middle' : 'large'}
                  type='dashed'
                  onClick={() => remove(index)}
                  className='w-full mb-10'
                >
                  Remove Education
                </Button>
              </Fragment>
            ))}

            <Button
              size={isMobile ? 'middle' : 'large'}
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

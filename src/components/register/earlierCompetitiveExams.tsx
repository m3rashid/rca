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
  const onEarlierCompetitiveExamsChange = (
    name: string,
    value: any,
    index: number
  ) => {
    setPayload((prev) => ({
      ...prev,
      earlierCompetitiveExams: prev.earlierCompetitiveExams.map((exam, i) => {
        if (i === index) {
          return {
            ...exam,
            [name]: value,
          };
        }

        return exam;
      }),
    }));
  };

  return (
    <Fragment>
      <Form.List name='earlierCompetitiveExams'>
        {(fields, { add, remove }) => (
          <Fragment>
            {fields.map((field, index) => (
              <Fragment key={field.key}>
                <Form.Item
                  label='Name'
                  name='name'
                  rules={[{ required: true }]}
                >
                  <Input
                    size='large'
                    placeholder='Enter Exam Name'
                    value={payload.earlierCompetitiveExams[index]?.name}
                    onChange={(e) =>
                      onEarlierCompetitiveExamsChange(
                        e.target.name,
                        e.target.value,
                        index
                      )
                    }
                  />
                </Form.Item>

                <Form.Item
                  label='Year'
                  name='year'
                  rules={[{ required: true }]}
                >
                  <Input
                    size='large'
                    placeholder='Enter Exam Year'
                    value={payload.earlierCompetitiveExams[index]?.year}
                    onChange={(e) =>
                      onEarlierCompetitiveExamsChange(
                        e.target.name,
                        e.target.value,
                        index
                      )
                    }
                  />
                </Form.Item>

                <Form.Item
                  label='Cleared'
                  name='cleared'
                  rules={[{ required: true }]}
                >
                  <Checkbox
                    checked={payload.earlierCompetitiveExams[index]?.cleared}
                    onChange={(e) =>
                      onEarlierCompetitiveExamsChange(
                        'cleared',
                        e.target.checked,
                        index
                      )
                    }
                  />
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

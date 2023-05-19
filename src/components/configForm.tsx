import { Button, Form, Input } from 'antd';
import React from 'react';

interface IProps {
  formName: string;
  formLabel: string;
  formRules: [{ required: boolean; message: string }];
  children: React.ReactNode;
  onSubmit: () => void;
  onError: () => void;
}

const ConfigForm: React.FC<IProps> = ({
  formName,
  formLabel,
  formRules,
  children,
  onSubmit,
  onError,
}) => {
  return (
    <Form
      layout='horizontal'
      name={formName}
      initialValues={{ remember: true }}
      onFinish={onSubmit}
      onFinishFailed={onError}
    >
      <Form.Item label={formLabel} name={formName} rules={formRules}>
        {children}
      </Form.Item>

      <Form.Item>
        <Button type='primary' htmlType='submit'>
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ConfigForm;

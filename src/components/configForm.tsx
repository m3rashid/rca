import { Button, Form } from 'antd';
import React from 'react';

interface IProps {
    formName: string;
    formLabel: string;
    formRules: [{ required: boolean; message: string }];
    formInitialValue?: string;
    children: React.ReactNode;
    onSubmit: () => void;
    onError: () => void;
}

const ConfigForm: React.FC<IProps> =
    ({
         formName,
         formLabel,
         formRules,
         formInitialValue,
         children,
         onSubmit,
         onError,
     }) => {

        return (
            <Form
                layout='horizontal'
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 24 }}
                initialValues={{ [formName]: formInitialValue }}
                onFinish={onSubmit}
                onFinishFailed={onError}
                labelWrap
            >
                <Form.Item
                    label={formLabel}
                    name={formName}
                    rules={formRules}
                >
                    {children}
                </Form.Item>

                <Form.Item labelCol={{ span: 8 }} style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '10px',

                }}>
                    <Button type='primary' htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        );
    };

export default ConfigForm;

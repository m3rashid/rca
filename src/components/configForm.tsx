import { Button, Col, Form, Input, Row } from 'antd';
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
                // name={formName}
                labelCol={{ span: 6 }}
                labelAlign="left"
                wrapperCol={{ span: 24 }}
                initialValues={{[formName]: formInitialValue}}
                onFinish={onSubmit}
                onFinishFailed={onError}
                labelWrap={true}
                // autoComplete='off'
            >
                {/*<Row gutter={24}>*/}
                {/*    <Col span={20}>*/}
                        <Form.Item
                            label={formLabel}
                            // labelCol={{ span: 8 }}
                            name={formName}
                            rules={formRules}
                            // initialValue={formInitialValue || 'uhit'}
                        >
                            {children}
                        </Form.Item>
                    {/*</Col>*/}
                    {/*<Col span={4}  >*/}
                        <Form.Item labelCol={{ span: 8 }} style={{
                            // backgroundColor: 'red',
                            display: 'flex',

                            justifyContent: 'flex-end',
                            paddingRight: '10px',

                        }} >
                            <Button type='primary' htmlType='submit'>
                                Submit
                            </Button>
                        </Form.Item>
                    {/*</Col>*/}
                {/*</Row>*/}



            </Form>
        );
    };

export default ConfigForm;

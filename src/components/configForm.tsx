import { Button, Form, Input } from "antd";
import React from "react";

interface IProps {
    formName: string
    formLabel: string
    formRules: [{ required: boolean, message: string }]
    children: React.ReactNode
    onSubmit: () => void
    onError: () => void
}

const ConfigForm: React.FC<IProps> = ({ formName, formLabel, formRules, children, onSubmit, onError }) => {
    return (
        <Form
            layout='horizontal'
            name={formName}
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 24 }}
            initialValues={{ remember: true }}
            onFinish={onSubmit}
            onFinishFailed={onError}
            autoComplete="off"
        >
            <Form.Item
                label={formLabel}
                labelCol={{ span: 8 }}
                name={formName}
                rules={formRules}
            >
                {children}
            </Form.Item>

            <Form.Item
                labelCol={{ span: 8 }}>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
}

export default ConfigForm
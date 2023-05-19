'use client'

import { Form, Input } from "antd";
import ReactQuill from "react-quill";
import React from "react";

interface IProps {
    quillValue: string;
    setValue: (value: string) => void;
}

const NoticeForm: React.FC<IProps> = ({ quillValue, setValue }) => {
    return (
        <>
            <Form.Item
                label='Title'
                name='title'
                rules={[
                    { required: true, message: 'Please enter title' },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Issued By'
                name='issuedBy'
                rules={[
                    { required: true, message: 'Please enter Name' },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Description'
                name='description'
                rules={[
                    { required: true, message: 'Please enter description' },
                ]}
            >
                <ReactQuill
                    theme='snow'
                    value={quillValue}
                    onChange={setValue}
                    style={
                        { height: '100px',
                            marginBottom: '40px',}
                    }
                />

            </Form.Item>
        </>
    );
}

export default NoticeForm;
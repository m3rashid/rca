'use client'

import { DatePicker, Form, Input } from "antd";
import React from "react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';

interface IProps {
    quillValue: string;
    setValue: (value: string) => void;
}

const EventForm: React.FC<IProps> = ({ quillValue, setValue }) => {
    return (
        <>
            <Form.Item
                label='Event Name'
                name='name'
                rules={[{ required: true, message: 'Please enter event name' }]}
            >
                <Input/>
            </Form.Item>

            <Form.Item
                label='Location'
                name='location'
                rules={[
                    { required: true, message: 'Please enter event location' },
                ]}
            >
                <Input/>
            </Form.Item>

            <Form.Item label='Details' name='description'>
                <ReactQuill
                    theme='snow'
                    value={quillValue}
                    onChange={setValue}
                    style={
                        {
                            height: '100px',
                            marginBottom: '40px',
                        }
                    }
                />
            </Form.Item>

            <Form.Item
                label='Start Date'
                name='startDate'
                rules={[
                    {
                        required: true,
                        message: 'Please enter event start date/time',
                    },
                ]}
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item
                label='End Date'
                name='endDate'
                rules={[
                    {
                        required: true,
                        message: 'Please enter event end date/time',
                    },
                ]}
            >
                <DatePicker showTime/>
            </Form.Item>

            <Form.Item label='Contact' name='contact'>
                <Input/>
            </Form.Item>
        </>
    )
}

export default EventForm;
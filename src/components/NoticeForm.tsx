'use client';

import React from 'react';
import { Form, Input } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

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
        rules={[{ required: true, message: 'Please enter title' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label='Issued By' name='issuedBy'>
        <Input placeholder='Enter Issued By' />
      </Form.Item>

      <Form.Item label='Description' name='description'>
        <ReactQuill
          theme='snow'
          value={quillValue}
          onChange={setValue}
          style={{
            height: '100px',
            marginBottom: '40px',
          }}
        />
      </Form.Item>
    </>
  );
};

export default NoticeForm;

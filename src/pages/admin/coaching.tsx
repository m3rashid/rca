import React from 'react';
import Head from 'next/head';
import { Form, Input, TableProps } from 'antd';
import { ICoaching } from 'rca/models/coaching';
import { NextPage } from 'next';
import CustomTable from 'rca/components/table';
import AdminContainer from 'rca/components/adminContainer';
import { coachingsAtom } from 'rca/utils/atoms';

const Coaching: NextPage = () => {
  const columns: TableProps<ICoaching>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Contact', dataIndex: 'contact' },
    { title: 'Email', dataIndex: 'email' },
    {
      title: 'Website',
      dataIndex: 'website',
      render: (text) => (
        <a href={text} target='_blank'>
          {text}
        </a>
      ),
    },
  ];

  return (
    <AdminContainer>
      <Head>
        <title>RCA | Coaching</title>
      </Head>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<ICoaching>
          tableTitle='Coachings'
          endpoint={{
            get: '/api/admin/coaching',
            post: '/api/admin/coaching',
            put: '/api/admin/coaching',
            delete: '/api/admin/coaching',
          }}
          tableColumns={columns}
          recoilAtom={coachingsAtom}
          addButtonLabel='Add Coaching'
          AddFormInner={
            <>
              <Form.Item
                label='Name'
                name='name'
                rules={[
                  { required: true, message: 'Please enter coaching name' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Location'
                name='location'
                rules={[
                  { required: true, message: 'Please enter coaching location' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Contact'
                name='contact'
                rules={[
                  { required: true, message: 'Please enter mobile number' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { type: 'email', message: 'Has to be proper email type' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label='Description' name='description'>
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item
                label='Website'
                name='website'
                rules={[
                  {
                    validator: (_, value: string) => {
                      if (
                        value.startsWith('http://') ||
                        value.startsWith('https://')
                      ) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        'Website has to start with http:// or https://'
                      );
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Coaching;

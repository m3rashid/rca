import React from 'react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { NextPage } from 'next';
import { DatePicker, Form, Input, TableProps } from 'antd';
import { IEvent } from 'rca/models/event';
import CustomTable from 'rca/components/table';
import AdminContainer from 'rca/components/adminContainer';
import { eventsAtom } from 'rca/utils/atoms';

const Events: NextPage = () => {
  const columns: TableProps<IEvent>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Location', dataIndex: 'location' },
    { title: 'Description', dataIndex: 'description' },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      width: 170,
      render: (value) => dayjs(value).format('DD-MM-YYYY HH:mm A'),
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      width: 170,
      render: (value) => dayjs(value).format('DD-MM-YYYY HH:mm A'),
    },
    { title: 'Contact', dataIndex: 'contact', width: 120 },
  ];

  return (
    <AdminContainer>
      <Head>
        <title>RCA | Events</title>
      </Head>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IEvent>
          tableTitle='Events'
          endpoint={{
            get: '/api/admin/events',
            post: '/api/admin/events',
            put: '/api/admin/events',
            delete: '/api/admin/events',
          }}
          tableColumns={columns}
          addButtonLabel='Add Event'
          recoilAtom={eventsAtom}
          AddFormInner={
            <>
              <Form.Item
                label='Event Name'
                name='name'
                rules={[{ required: true, message: 'Please enter event name' }]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item
                label='Location'
                name='location'
                rules={[
                  { required: true, message: 'Please enter event location' },
                ]}
              >
                <Input size='large' />
              </Form.Item>

              <Form.Item label='Details' name='description'>
                <Input.TextArea rows={4} />
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
                <DatePicker showTime />
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
                <DatePicker showTime />
              </Form.Item>

              <Form.Item label='Contact' name='contact'>
                <Input size='large' />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Events;

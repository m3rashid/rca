import React, { useState } from 'react';
import dayjs from 'dayjs';
import Head from 'next/head';
import { NextPage } from 'next';
import { TableProps } from 'antd';
import { IEvent } from 'rca/models/event';
import CustomTable from 'rca/components/table';
import AdminContainer from 'rca/components/adminContainer';
import { eventsAtom } from 'rca/utils/atoms';
import dynamic from "next/dynamic";

const EventForm = dynamic(
    () => import('rca/components/EventForm'),
    { ssr: false }
)

const Events: NextPage = () => {
    const [quillValue, setQuillValue] = useState('');

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
                        <EventForm quillValue={quillValue} setValue={setQuillValue}/>
                    }
                />
            </div>
        </AdminContainer>
    );
};

export default Events;

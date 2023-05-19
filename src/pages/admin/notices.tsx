import React, { useState } from 'react'
import AdminContainer from "rca/components/adminContainer";
import Head from "next/head";
import CustomTable from "rca/components/table";
import { noticeAtom } from "rca/utils/atoms";
import { TableProps } from "antd";
import { INotice } from "rca/models/notice";
import dynamic from "next/dynamic";

const NoticeForm = dynamic(
    () => import('rca/components/NoticeForm'),
    { ssr: false }
);

interface IProps {
}

const Notices: React.FC<IProps> = () => {
    const [quillValue, setQuillValue] = useState('');

    const columns: TableProps<INotice>['columns'] = [
        { title: 'Title', dataIndex: 'title' },
        { title: 'Name', dataIndex: 'name' },
        { title: 'Issued By', dataIndex: 'issuedBy' },
    ];

    return (
        <AdminContainer>
            <Head>
                <title>RCA | Notices</title>
            </Head>

            <div className='m-4 bg-white rounded-md shadow-md'>
                <CustomTable<INotice>
                    tableTitle='Notices'
                    endpoint={{
                        get: '/api/admin/notices',
                        post: '/api/admin/notices',
                        put: '/api/admin/notices',
                        delete: '/api/admin/notices',
                    }}
                    scroll={{ x: 800 }}
                    tableColumns={columns}
                    addButtonLabel='Add Notice'
                    recoilAtom={noticeAtom}
                    AddFormInner={
                        <NoticeForm quillValue={quillValue} setValue={setQuillValue}/>
                    }
                />
            </div>
        </AdminContainer>
    );
}

export default Notices
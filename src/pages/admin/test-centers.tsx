import React from 'react'
import { Form, Input, TableProps } from "antd";
import { ITestCenter } from "rca/models/testCenter";
import AdminContainer from "rca/components/adminContainer";
import Head from "next/head";
import CustomTable from "rca/components/table";
import { testCenterAtom } from "rca/utils/atoms";

interface IProps {
}

const TestCentres: React.FC<IProps> = () => {
    const columns: TableProps<ITestCenter>['columns'] = [
        { title: 'Code Name', dataIndex: 'codeName' },
        { title: 'Address', dataIndex: 'address' },
        { title: 'Mobile Number', dataIndex: 'mobileNumber' },
        { title: 'Email', dataIndex: 'email' },
        { title: 'Phone Number', dataIndex: 'phoneNumber' }
    ]

    return (
        <AdminContainer>
            <Head>
                <title>RCA | Test Centres</title>
            </Head>

            <div className='m-4 bg-white rounded-md shadow-md'>
                <CustomTable<ITestCenter>
                    tableTitle='Gallery'
                    endpoint={{
                        get: '/api/admin/test-centers',
                        post: '/api/admin/test-centers',
                        put: '/api/admin/test-centers',
                        delete: '/api/admin/test-centers',
                    }}
                    scroll={{ x: 800 }}
                    tableColumns={columns}
                    addButtonLabel='Add Test Center'
                    recoilAtom={testCenterAtom}
                    AddFormInner={
                        <>
                            <Form.Item
                                label='Code Name'
                                name='codeName'
                                rules={[
                                    { required: true, message: 'Please enter code name' },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label='Address'
                                name='address'
                                rules={[
                                    { required: true, message: 'Please enter address' },
                                ]}
                            >
                                <Input.TextArea/>
                            </Form.Item>

                            <Form.Item
                                label='Mobile Number'
                                name='mobileNumber'
                                rules={[
                                    { required: true, message: 'Please enter mobile number' },
                                ]}
                            >
                                <Input/>
                            </Form.Item>

                            <Form.Item
                                label='Email'
                                name='email'
                                rules={[
                                    { required: true, message: 'Please enter email' },
                                ]}
                            >
                                <Input/>
                            </Form.Item>
                        </>
                    }
                />
            </div>
        </AdminContainer>
    )
}

export default TestCentres
import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { Form, Input, TableProps } from 'antd';
import { IUser } from 'rca/models/user';
import CustomTable, {
  FormResponseError,
  ICustomTableProps,
} from 'rca/components/table';
import AdminContainer from 'rca/components/adminContainer';
import { usersAtom } from 'rca/utils/atoms';

const Users: NextPage = (props: { data?: IUser[] }) => {
  const columns: TableProps<IUser>['columns'] = [
    { title: 'Name', dataIndex: 'name' },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Username', dataIndex: 'username' },
    {
      title: 'Role',
      dataIndex: 'type',
      render: (type) => type?.split('_').join(' '),
    },
  ];

  const formValidation: ICustomTableProps<IUser>['customFormValidation'] = (
    values
  ) => {
    const errors: FormResponseError[] = [];

    if (values.password.length < 6) {
      errors.push({
        field: 'password',
        message: 'Password must be at least 6 characters long',
      });
    }
    if (values.password !== values.confirmPassword) {
      errors.push({
        field: 'confirmPassword',
        message: 'Passwords do not match',
      });
    }
    if (!values.username && !values.email) {
      errors.push({
        field: 'username',
        message: 'Please enter username or email',
      });
      errors.push({
        field: 'email',
        message: 'Please enter username or email',
      });
    }

    return errors;
  };

  return (
    <AdminContainer>
      <Head>
        <title>RCA | Users</title>
      </Head>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IUser>
          tableTitle='Users'
          endpoint={{
            get: '/api/admin/user',
            post: '/api/create-user',
            put: '/api/admin/user',
            delete: '/api/admin/user',
          }}
          tableColumns={columns}
          recoilAtom={usersAtom}
          addButtonLabel='Add User'
          customFormValidation={formValidation}
          AddFormInner={
            <>
              <Form.Item
                label='Name'
                name='name'
                rules={[{ required: true, message: 'Please enter user name' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label='Email'
                name='email'
                rules={[
                  { type: 'email', message: 'Email is not a valid email' },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label='Username' name='username'>
                <Input />
              </Form.Item>

              <Form.Item
                label='Password'
                name='password'
                rules={[
                  { required: true, message: 'Please enter user password' },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label='Confirm Password'
                name='confirmPassword'
                rules={[
                  { required: true, message: 'Please confirm above password' },
                ]}
              >
                <Input.Password />
              </Form.Item>
            </>
          }
        />
      </div>
    </AdminContainer>
  );
};

export default Users;

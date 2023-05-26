import axios from 'axios';
import Head from 'next/head';
import { TableProps } from 'antd';
import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import CustomTable from 'rca/components/table';
import { registrationAtom } from 'rca/utils/atoms';
import { IRegistration } from 'rca/models/registration';
import AdminContainer from 'rca/components/adminContainer';

interface IProps {}

const Registration: React.FC<IProps> = () => {
  const columns: TableProps<IRegistration>['columns'] = [];
  const [registrations, setRegistrations] = useRecoilState(registrationAtom);

  useEffect(() => {
    const getData = async () => {
      if (registrations.length > 0) return;
      const { data } = await axios.get('/api/admin/registration');
      setRegistrations(data);
    };
    getData().then().catch(console.log);
  }, []);

  return (
    <AdminContainer>
      <Head>
        <title>RCA | Events</title>
      </Head>

      <div className='m-4 bg-white rounded-md shadow-md'>
        <CustomTable<IRegistration>
          tableTitle='Registration'
          endpoint={{
            get: '/api/admin/registration',
            post: '/api/admin/registration',
            put: '/api/admin/registration',
            delete: '/api/admin/registration',
          }}
          tableColumns={columns}
          addButtonLabel='Add Event'
          recoilAtom={registrationAtom}
          AddFormInner={<></>}
        />
      </div>
    </AdminContainer>
  );
};

export default Registration;

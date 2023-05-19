import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import AdminMenu from 'rca/components/adminMenu';

interface IProps extends PropsWithChildren {}

const AdminContainer: React.FC<IProps> = ({ children }) => {
  const session = useSession();

  return (
    <>
      {session.status === 'authenticated' &&
        // @ts-ignore
        session.data.user?.type === 'ADMIN' && <AdminMenu />}

      {children}
    </>
  );
};

export default AdminContainer;

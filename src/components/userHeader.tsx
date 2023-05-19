import { Layout } from 'antd';
import { useSession } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';
import HeaderNavigation from './generalMenu';
import constants from 'rca/constants';

interface IProps extends PropsWithChildren {}

const UserHeader: React.FC<IProps> = ({ children }) => {
  const session = useSession();

  return (
    <>
      {/* @ts-ignore */}
      {(!session || (session && session.user?.type !== 'ADMIN')) && (
        <Layout.Header style={{ backgroundColor: constants.appThemeColor }}>
          <HeaderNavigation />
        </Layout.Header>
      )}
			
      {children}
    </>
  );
};

export default UserHeader;

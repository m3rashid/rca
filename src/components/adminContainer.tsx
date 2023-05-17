import React, { PropsWithChildren } from 'react';

interface IProps extends PropsWithChildren {}

const AdminContainer: React.FC<IProps> = ({ children }) => {
  return <>{children}</>;
};

export default AdminContainer;

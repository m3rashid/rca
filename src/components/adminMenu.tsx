import { Menu, MenuProps } from 'antd';
import { useRouter } from 'next/router';
import React from 'react';

interface IProps {}

const AdminMenu: React.FC<IProps> = () => {
  const router = useRouter();

  const subHeaderItems: MenuProps['items'] = [
    // {
    //   key: 'subHeader1',
    //   label: 'Users',
    //   onClick: () => router.push('/admin/users'),
    // },
    {
      key: 'subHeader2',
      label: 'Gallery',
      onClick: () => router.push('/admin/gallery'),
    },
    {
      key: 'subHeader3',
      label: 'Events',
      onClick: () => router.push('/admin/events'),
    },
    {
      key: 'subHeader4',
      label: 'Notices',
      onClick: () => router.push('/admin/notices'),
    },
    {
      key: 'subHeader5',
      label: 'Test Centers',
      onClick: () => router.push('/admin/test-centers'),
    },
    {
      key: 'subHeader6',
      label: 'Current Affairs',
      onClick: () => router.push('/admin/current-affairs'),
    },
    {
      key: 'subHeader7',
      label: 'Miscellaneous',
      onClick: () => router.push('/admin/misc'),
    },
  ];

  return (
    <>
      <Menu
        theme='light'
        mode='horizontal'
        items={subHeaderItems}
        style={{ justifyContent: 'center' }}
      />
    </>
  );
};

export default AdminMenu;

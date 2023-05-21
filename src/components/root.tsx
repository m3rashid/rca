import React, { PropsWithChildren, useLayoutEffect } from 'react';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Image,
  Layout,
  Menu,
  MenuProps,
  Tabs,
  theme,
  Typography,
} from 'antd';
import enUs from 'antd/locale/en_US';
import constants from 'rca/constants';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  AndroidOutlined,
  AppleOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { uiAtom } from 'rca/utils/atoms';
import HeaderNavigation from './generalMenu';

interface IContainerProps extends PropsWithChildren {}
const AppContainer: React.FC<IContainerProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [ui, setUi] = useRecoilState(uiAtom);
  const session = useSession();

  useLayoutEffect(() => {
    const setWindowWidth = () => {
      const windowWidth = window.innerWidth;
      if (windowWidth > 576) setUi((prev) => ({ ...prev, isMobile: false }));
      else setUi((prev) => ({ ...prev, isMobile: true }));
    };
    setWindowWidth();
    window.addEventListener('resize', setWindowWidth);
    return () => window.removeEventListener('resize', setWindowWidth);
  }, []);

  const commonHeaderItems: MenuProps['items'] = [];

  const adminHeaderItems: MenuProps['items'] =
    // @ts-ignore
    session.status === 'authenticated' && session.data.user?.type === 'ADMIN'
      ? [
          {
            key: 'current-affairs',
            label: 'Admin - Current Affairs',
            onClick: () => router.push('/admin/current-affairs'),
          },
          {
            key: 'events',
            label: 'Admin - Events',
            onClick: () => router.push('/admin/events'),
          },
          {
            key: 'gallery',
            label: 'Admin - Gallery',
            onClick: () => router.push('/admin/gallery'),
          },
          {
            key: 'site-settings',
            label: 'Admin - Site Settings',
            onClick: () => router.push('/admin/site-settings'),
          },
          {
            key: 'notices',
            label: 'Admin - Notices',
            onClick: () => router.push('/admin/notices'),
          },
          {
            key: 'test-centres',
            label: 'Admin - Test Centers',
            onClick: () => router.push('/admin/test-centers'),
          },
        ]
      : [];

  const userHeaderItems: MenuProps['items'] =
    // @ts-ignore
    session.status === 'authenticated' && session.data.user?.type === 'USER'
      ? [
          {
            key: 'register',
            label: 'Register for Exam',
            onClick: () => router.push('/exam/register'),
          },
          {
            key: 'profile',
            label: 'Profile',
            onClick: () => router.push('/user/profile'),
          },
        ]
      : [];

  const rightHeaderItems: MenuProps['items'] =
    session.status === 'authenticated'
      ? [
          ...commonHeaderItems,
          {
            key: 'changePassword',
            label: 'Change Password',
            onClick: () => router.push('/user/change-password'),
          },
          ...adminHeaderItems,
          ...userHeaderItems,
          {
            key: 'logout',
            label: 'Logout',
            onClick: async () => {
              await signOut({ redirect: false });
              router.push('/');
            },
          },
        ]
      : [
          ...commonHeaderItems,
          {
            key: 'login',
            label: 'Login',
            onClick: () => router.push('/user/auth'),
          },
        ];

  return (
    <ConfigProvider
      locale={enUs}
      theme={{
        token: {
          fontFamily: 'Poppins, sans-serif',
          colorPrimary: constants.appThemeColor,
          colorBgTextHover: constants.appThemeColor,
          colorFill: constants.appThemeColor,
        },
      }}
    >
      <Layout>
        {!session && (
          <div className='cssmarquee'>
            <h1 className='text-white'>
              Applications are open for the residential coaching program
              2023-24.
              <span
                className='text-blue-800 cursor-pointer'
                onClick={() => router.push('/admin/profile')}
              >
                {' '}
                Click Here.
              </span>
            </h1>
          </div>
        )}
        <Layout.Header
          style={{ backgroundColor: colorBgContainer }}
          className='px-4'
        >
          <div className='flex gap-3 items-center justify-between'>
            <div
              className='flex items-center justify-between gap-4'
              onClick={() => router.push('/')}
            >
              <div>
                <Image
                  preview={false}
                  src='/logo.png'
                  height={48}
                  width={48}
                  style={{ padding: 0, margin: 0 }}
                />
              </div>
              <Typography.Title level={4} style={{ padding: 0, margin: 0 }}>
                {ui.isMobile
                  ? 'Shibli RCA'
                  : 'Shibli Residential Coaching Academy'}
              </Typography.Title>
            </div>

            <Dropdown
              arrow
              menu={{ items: rightHeaderItems, className: 'w-[200px]' }}
            >
              <Button icon={<UserOutlined />}>
                {ui.isMobile ? '' : 'Options'}
              </Button>
            </Dropdown>
          </div>
        </Layout.Header>

        <Layout.Content style={{ minHeight: 'calc(100vh - 150px)' }}>
          {children}
        </Layout.Content>
        <Layout.Footer style={{ textAlign: 'center' }}>
          RCA - {new Date().getFullYear()} &copy; All rights reserved
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default AppContainer;

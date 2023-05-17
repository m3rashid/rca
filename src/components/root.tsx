import React, { PropsWithChildren, useLayoutEffect } from 'react';
import {
  Button,
  ConfigProvider,
  Dropdown,
  Image,
  Layout,
  Menu,
  MenuProps,
  theme,
  Typography,
} from 'antd';
import enUs from 'antd/locale/en_US';
import constants from 'rca/constants';
import { useRouter } from 'next/router';
import { UserOutlined } from '@ant-design/icons';
import { signOut, useSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { uiAtom } from 'rca/utils/atoms';

interface IContainerProps extends PropsWithChildren {}
const AppContainer: React.FC<IContainerProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const router = useRouter();
  const [ui, setUi] = useRecoilState(uiAtom);
  const { data: session } = useSession();

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

  const subHeaderItems: MenuProps['items'] = [
    {
      key: 'subHeader1',
      label: 'Users',
      onClick: () => router.push('/admin/users'),
    },
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
      label: 'Coaching',
      onClick: () => router.push('/admin/coaching'),
    },
  ];

  const commonHeaderItems: MenuProps['items'] = [
    {
      key: 'rightHeader1',
      label: 'Language',
      // TODO: open a modal to change the language of the website
      // TODO: save the default language setting in localStorage
      onClick: () => {},
    },
  ];

  const rightHeaderItems: MenuProps['items'] = session
    ? [
        ...commonHeaderItems,
        {
          key: 'rightHeader2',
          label: 'Profile',
          onClick: () => router.push('/admin/profile'),
        },
        {
          key: 'rightHeader3',
          label: 'Change Password',
          onClick: () => router.push('/admin/change-password'),
        },
        // @ts-ignore
        ...(session.user && session.user.type === 'ADMIN'
          ? [
              {
                key: 'rightHeader4',
                label: 'Add User',
                onClick: () => router.push('/admin/add-user'),
              },
            ]
          : []),
        {
          key: 'rightHeader5',
          label: 'Logout',
          onClick: async () => {
            await signOut({ redirect: false });
            router.push('/auth');
          },
        },
      ]
    : [
        ...commonHeaderItems,
        {
          key: 'rightHeader2',
          label: 'Login',
          onClick: () => router.push('/auth'),
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
              {!ui.isMobile && (
                <Typography.Title level={4} style={{ padding: 0, margin: 0 }}>
                  Residential Coaching Academy
                </Typography.Title>
              )}
            </div>
            <Dropdown arrow menu={{ items: rightHeaderItems }}>
              <Button icon={<UserOutlined />}>
                {ui.isMobile ? '' : 'Options'}
              </Button>
            </Dropdown>
          </div>
        </Layout.Header>

        {session && (
          <Menu
            theme='light'
            mode='horizontal'
            items={subHeaderItems}
            style={{ justifyContent: 'center' }}
          />
        )}

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

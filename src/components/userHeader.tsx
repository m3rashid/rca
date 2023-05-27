import Link from 'next/link';
import constants from 'rca/constants';
import { Col, Layout, Row } from 'antd';
import { useSession } from 'next-auth/react';
import React, { Fragment, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

interface IProps extends PropsWithChildren {}

const UserHeader: React.FC<IProps> = ({ children }) => {
  const session = useSession();
  const router = useRouter();

  const headerItems = [
    { to: '/', label: 'Home' },
    { to: '/contact-us', label: 'Contacts' },
    { to: '/about-us', label: 'About' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/testimonials', label: 'Testimonials' },
  ];

  return (
    <Fragment>
      {/* @ts-ignore */}
      {(!session || (session && session.user?.type !== 'ADMIN')) && (
        <Layout.Header style={{ backgroundColor: constants.appThemeColor }}>
          <Row gutter={24} justify='center' className='text-white'>
            {headerItems.map((item, index) => {
              return (
                <Col>
                  <Link href={item.to}>
                    <h1 className='text-white m-0'>{item.label}</h1>
                  </Link>
                </Col>
              );
            })}
          </Row>
        </Layout.Header>
      )}

      <div className='cssMarquee'>
        <h1 className='text-white'>
          Applications are open for the residential coaching program 2023-24
          <span
            className='text-blue-800 cursor-pointer mx-2 font-mono'
            onClick={() => router.push('/exam/register')}
          >
            Register Here
          </span>
          ::
          <a
            href='https://drive.google.com/file/d/1hHcbN0_D7GNY2O8gCELy8VbCFqn_LULX/view'
            target='_blank'
            className='text-blue-800 cursor-pointer mx-2 font-mono'
          >
            Download Instructions Pdf
          </a>
        </h1>
      </div>
      {children}
    </Fragment>
  );
};

export default UserHeader;

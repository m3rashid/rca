import React from 'react';
import { Col, Dropdown, Row } from 'antd';
import Link from 'next/link';

const HeaderNavigation = () => {
  const headerItems = [
    { to: '/', label: 'Home' },
    { to: '/about-us', label: 'About Us' },
    { to: '/achievements', label: 'Achievements' },
    { to: '/contact-us', label: 'Contact Us' },
    { to: '/testimonials', label: 'Testimonials' },
  ];
  return (
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
  );
};
export default HeaderNavigation;

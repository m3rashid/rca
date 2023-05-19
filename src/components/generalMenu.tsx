import React from "react";
import { Col, Dropdown, Row } from "antd";
import Link from "next/link";

const HeaderNavigation = () => {
  const headerItems = [
    { to: "/", label: "Home" },
    { to: "/", label: "About Us" },
    { to: "/", label: "Achievements" },
    { to: "/", label: "Contact Us" },
    { to: "/", label: "Testimonials" },
  ];
  return (
    <Row gutter={24} justify="center" className="text-white">
      {headerItems.map((item, index) => {
        return (
          <Col>
            <Link href={item.to}>
              <h1 className="text-white m-0">{item.label}</h1>
            </Link>
          </Col>
        );
      })}
    </Row>
  );
};
export default HeaderNavigation;

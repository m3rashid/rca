import { Col, Row } from "antd";
import React from "react";

const principles = [
  {
    title: "Our Mission",
    color: "#737495",
    content:
      "To identify and guide students who can contribute towards nation building through civil services and help them inculcate Indian values and ethos.",
  },
  {
    title: "Our Vision",
    color: "#68a8ad",
    content:
      "To make sure that innovative and imaginative persons including those from disadvantaged segments of Indian society should join the civil services.",
  },
  {
    title: "Our Values",
    color: "#6c8672",
    content:
      "In order to fulfill the purpose of our organization we promote and practice the following values: Respect, Integrity, Diligence and Motivation.",
  },
  {
    title: "Our Philosophy",
    color: "#f17d80",
    content:
      "Education is the best gift that parents can give.We believe in educating a child during his/her various stages of development while being aware of its motivations and changing interests.",
  },
];

const Principles = () => {
  return (
    <Row
      justify="center"
      className="lg:py-12 md:px-8 xl:px-32 md:relative md:-top-[100px] md:z-10 px-4"
    >
      {principles.map((item, index) => {
        return (
          <Col
            sm={12}
            lg={6}
            style={{
              backgroundColor: item.color,
              display: "flex",
              flexDirection: "column",
            }}
            className="p-12 py-16 text-center text-white items-center justify-center"
          >
            <h1 className="font-bold">{item.title}</h1>
            <p className="text-base">{item.content}</p>
          </Col>
        );
      })}
    </Row>
  );
};

export default Principles;

import { Good } from "../Interface";
import { CheckHeaderSteps } from "../components/CheckHeaderSteps";
import { Button, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useLocation } from "react-router-dom";
import React from "react";
import "../css/BuyView.css";

interface Props {
  goods: Good[];
}

export const CheckOrderView = () => {
  const location = useLocation();
  const goods: Good[] = location.state.goods;
  const check_columns: ColumnsType<Good> = [
    {
      title: "图片",
      key: "book_pic",
      width: "20%",
      dataIndex: "items",
      render: (value, record) => (
        <div className={"order_pic"}>
          <img alt={record.book.pics[0]} src={record.book.pics[0]} />
        </div>
      ),
    },
    {
      title: "书名",
      dataIndex: "book",
      key: "book_name",
      width: "20%",
      render: (value, record) => (
        <p className={"cart_title"}>{record.book.title}</p>
      ),
    },
    {
      title: "单价",
      dataIndex: "items",
      key: "single_price",
      width: "20%",
      render: (value, record) => <p>{record.book.price}</p>,
    },
    {
      title: "数量",
      dataIndex: "items",
      key: "item_number",
      width: "20%",
      render: (value, record) => (
        <p className={"name_info"}>{record.item_number}</p>
      ),
    },
    {
      title: "总价",
      dataIndex: "items",
      key: "item_price",
      width: "20%",
      render: (value, record) => (
        <p>{record.item_number * record.book.price}</p>
      ),
    },
  ];

  let whole_price = 0;
  const cal_price = () => {
    goods.map((good) => (whole_price += good.book.price * good.item_number));
  };
  cal_price();

  return (
    <>
      <CheckHeaderSteps />
      <div className={"check_table"}>
        <Table columns={check_columns} dataSource={goods}></Table>
      </div>
      <Row className={"price_info"}>
        <Col span={20} />
        <Col span={4}>
          <h1>{"总价: " + whole_price.toString() + "元"}</h1>
        </Col>
      </Row>
      <Row>
        <Col span={20} />
        <Link to={"/submitOrder"}>
          <Button className={"buy_button"}>{"提交订单"}</Button>
        </Link>
      </Row>
    </>
  );
};

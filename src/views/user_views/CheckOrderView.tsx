import { CartItem } from "../../Interface";
import { CheckHeaderSteps } from "../../components/CheckHeaderSteps";
import { Button, Col, Row, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useRef, useState } from "react";
import "../../css/BuyView.css";
import { getCartItems } from "../../services/CartService";
import { createOrder } from "../../services/OrderService";

export const CheckOrderView = () => {
  const location = useLocation();
  const cartItem_ids: Set<number> = location.state.goods;
  const user_id = location.state.user_id;
  const [goods, setGoods] = useState<CartItem[]>();
  let whole_price: React.MutableRefObject<number> = useRef<number>(0);
  // console.log(cartItem_ids);
  useEffect(() => {
    getCartItems(
      cartItem_ids,
      (data: React.SetStateAction<CartItem[] | undefined>) => setGoods(data)
    ).catch((err) => console.error(err));
  }, [cartItem_ids]);

  useEffect(() => cal_price(), [goods]);
  const check_columns: ColumnsType<CartItem> = [
    {
      title: "图片",
      key: "book_pic",
      width: "20%",
      dataIndex: "items",
      render: (value, record) => (
        <div className={"order_pic"}>
          <img alt={record.book.picture} src={record.book.picture} />
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
      key: "number",
      width: "20%",
      render: (value, record) => <p className={"name_info"}>{record.number}</p>,
    },
    {
      title: "总价",
      dataIndex: "items",
      key: "item_price",
      width: "20%",
      render: (value, record) => <p>{record.number * record.book.price}</p>,
    },
  ];

  const cal_price = () => {
    if (goods) {
      whole_price.current = 0;
      goods.map(
        (good) => (whole_price.current += good.book.price * good.number)
      );
    }
  };

  return (
    <>
      <CheckHeaderSteps />
      <div className={"check_table"}>
        <Table columns={check_columns} dataSource={goods}></Table>
      </div>
      <Row className={"price_info"}>
        <Col span={20} />
        <Col span={4}>
          <h1>{"总价: " + whole_price.current + "元"}</h1>
        </Col>
      </Row>
      <Row>
        <Col span={20} />
        <Link to={"/submitOrder"}>
          <Button
            className={"buy_button"}
            onClick={() => {
              createOrder(user_id, goods);
            }}
          >
            {"提交订单"}
          </Button>
        </Link>
      </Row>
    </>
  );
};

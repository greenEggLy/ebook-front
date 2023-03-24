import { Book, Good, User } from "../Interface";
import React, { useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { Typography } from "antd";
import { CartSearch, OrderSearch } from "../components/SearchBar";
import { OrderList } from "../components/OrderList";
import "../css/OrdersView.css";

const { Title } = Typography;

interface Props {
  user: User;
}

export const OrdersView = ({ user }: Props) => {
  const [filterOrders, setFilterOrders] = useState(user.orders);

  const order_columns: ColumnsType<Good> = [
    {
      title: "图片",
      key: "book_pic",
      width: "25%",
      dataIndex: "items",
      render: (value, record) => (
        <div className={"order_pic"}>
          <Link to={"/book/" + record.book.id}>
            <img alt={record.book.pics[0]} src={record.book.pics[0]} />
          </Link>
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
      title: "ISBN",
      dataIndex: "book",
      key: "book_isbn",
      width: "15%",
      render: (value, record) => (
        <p className={"cart_isbn"}>{record.book.ISBN}</p>
      ),
    },
    {
      title: "数量",
      dataIndex: "items",
      key: "item_number",
      width: "15%",
      render: (value, record) => (
        <p className={"name_info"}>{record.item_number}</p>
      ),
    },
    {
      title: "总价",
      dataIndex: "items",
      key: "item_price",
      width: "25%",
      render: (value, record) => (
        <p>{record.item_number * record.book.price}</p>
      ),
    },
  ];

  return (
    <div className={"order"}>
      <div className={"order_title"}>
        <Title>{"订单"}</Title>
      </div>
      <div className={"search_bar"}>
        <OrderSearch allOrders={user.orders} setFilter={setFilterOrders} />
      </div>
      {filterOrders.map((order) => (
        <OrderList order={order} order_columns={order_columns} />
      ))}
    </div>
  );
};

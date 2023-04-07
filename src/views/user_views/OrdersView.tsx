import { Book, Order, OrderItem, User } from "../../Interface";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Typography } from "antd";
import { OrderSearch } from "../../components/SearchBar";
import { OrderList } from "../../components/OrderList";
import "../../css/OrdersView.css";
import { getUser } from "../../services/UserService";
import { getUserOrders } from "../../services/OrderService";

const { Title } = Typography;

interface Props {
  user: User;
}

export const OrdersView = () => {
  // const location = useLocation();
  const navigation = useNavigate();
  const [user, setUser] = useState<User>();
  const [allOrder, setAllOrder] = useState<Order[]>();
  const [filterOrders, setFilterOrders] = useState<Order[]>();
  useEffect(() => {
    getUser((data: React.SetStateAction<User | undefined>) =>
      setUser(data)
    ).catch(console.error);
  }, [navigation]);
  useEffect(() => {
    if (user) {
      getUserOrders(
        user.id,
        (data: React.SetStateAction<Order[] | undefined>) => setAllOrder(data),
        (data: React.SetStateAction<Order[] | undefined>) =>
          setFilterOrders(data)
      ).catch(console.error);
    }
  }, [user]);
  const order_columns: ColumnsType<OrderItem> = [
    {
      title: "图片",
      key: "book_pic",
      width: "25%",
      dataIndex: "items",
      render: (value, record) => (
        <div className={"order_pic"}>
          <Link to={"/book/" + record.book.id}>
            <img alt={record.book.pics[0].url} src={record.book.pics[0].url} />
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
        <p className={"cart_isbn"}>{record.book.isbn}</p>
      ),
    },
    {
      title: "数量",
      dataIndex: "items",
      key: "item_number",
      width: "15%",
      render: (value, record) => <p className={"name_info"}>{record.number}</p>,
    },
    {
      title: "总价",
      dataIndex: "items",
      key: "item_price",
      width: "15%",
      render: (value, record) => <p>{record.number * record.book.price}</p>,
    },
  ];
  if (!user) return <></>;
  if (!filterOrders || !allOrder) return <></>;
  return (
    <div className={"order"}>
      <div className={"order_title"}>
        <Title>{"订单"}</Title>
      </div>
      <div className={"search_bar"}>
        <OrderSearch allOrders={allOrder} setFilter={setFilterOrders} />
      </div>
      {filterOrders.map((order) => (
        <OrderList order={order} order_columns={order_columns} />
      ))}
    </div>
  );
};

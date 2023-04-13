import { ColumnsType } from "antd/es/table";
import { Order, OrderItem, backMsg, User } from "../../Interface";
import { useNavigate } from "react-router-dom";
import { OrderSearch } from "../../components/SearchBar";
import React, { useEffect, useRef, useState } from "react";
import { message, Typography } from "antd";
import { getAllOrder } from "../../services/OrderService";
import { AdminOrderList } from "../../components/AdminOrderList";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { check_session } from "../../services/LoginService";

const { Title } = Typography;

export const OrdersView_admin = () => {
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const [allOrder, setAllOrder] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        if (msg_ref.current.data.userType < 1)
          message.error("没有管理员权限！").then(() => navigation("/"));
        else {
          getAllOrder((data: Order[]) => {
            data = data.sort((a, b) => {
              return b.id - a.id;
            });
            setAllOrder(data);
            setFilterOrders(data);
            console.table(data);
          }).catch((err) => console.error(err));
        }
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  const order_columns: ColumnsType<OrderItem> = [
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
      title: "单价",
      dataIndex: "price",
      key: "book_isbn",
      width: "15%",
    },
    {
      title: "数量",
      dataIndex: "number",
      key: "item_number",
      width: "15%",
    },
    {
      title: "总价",
      key: "item_price",
      width: "15%",
      render: (value, record) => <p>{record.number * record.price}</p>,
    },
  ];
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
        <AdminOrderList order={order} order_columns={order_columns} />
      ))}
    </div>
  );
};

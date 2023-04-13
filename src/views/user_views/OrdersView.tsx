import { Order, OrderItem, backMsg, User } from "../../Interface";
import React, { useEffect, useRef, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { message, Typography } from "antd";
import { OrderSearch } from "../../components/SearchBar";
import { OrderList } from "../../components/OrderList";
import "../../css/OrdersView.css";
import { get_user } from "../../services/UserService";
import { get_orders_by_user } from "../../services/OrderService";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { check_session } from "../../services/LoginService";

const { Title } = Typography;

export const OrdersView = () => {
  // const location = useLocation();
  const navigation = useNavigate();
  const [user, setUser] = useState<User>(emptyUser);
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const [allOrder, setAllOrder] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);
  // useEffect(() => {
  //   getUser((data: User) => {
  //     setUser(data);
  //     user_ref.current = data;
  //   })
  //     .then(() => {
  //       if (!user_ref.current) navigation("/login");
  //     })
  //     .catch((err) => console.error(err));
  // }, [navigation]);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        get_user(msg_ref.current.data.userId, (data: User) =>
          setUser(data)
        ).catch((err) => console.error(err));
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (user.id) {
      console.table(user);
      get_orders_by_user(user.id, (data: Order[]) => {
        data = data.sort((a, b) => {
          if (a.time > b.time) return -1;
          if (a.time < b.time) return 1;
          return 0;
        });
        setAllOrder(data);
        setFilterOrders(data);
      }).catch((err) => console.error(err));
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
            <img alt={record.book.picture} src={record.book.picture} />
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
  if (!user.id) return <></>;
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

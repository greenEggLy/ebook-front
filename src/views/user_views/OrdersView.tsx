import { AuthInfo, Order, OrderItem } from "../../assets/Interface";
import React, { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";
import { Link, useNavigate } from "react-router-dom";
import { DatePicker, message, Typography } from "antd";
import { OrderSearch } from "../../components/GlobalComponents/SearchBar";
import "../../css/OrdersView.css";
import { GetUserOrder } from "../../services/OrderService";
import { EmptyAuth } from "../../assets/data/emptyData";
import { CheckSession } from "../../services/LoginService";
import { getImgPath } from "../../utils/imgPathUtil";
import { sessionCheck } from "../../utils/sessionUtil";
import dayjs from "dayjs";
import { date_forward } from "../../utils/DateUtil";
import { StatOneOrdersByTime } from "../../services/StatService";
import moment from "moment";
import { OrderTab } from "../../components/userComponents/OrderTab";
import { NestTable } from "../../components/userComponents/NestTable";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const OrdersView = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState<AuthInfo>(EmptyAuth);
  const [allOrder, setAllOrder] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);

  const [isDiy, setIsDiy] = useState<boolean>(false);
  const [laterDate, setLaterDate] = useState<Date>(new Date());
  const [earlierDate, setEarlierDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    CheckSession().then((msg) => {
      let status = sessionCheck(msg);
      if (!status.ok)
        message.error(status.msg, 1).then(() => navigation(status.path));
      else {
        setUser(msg.data);
        GetUserOrder(msg.data.id).then((data) => {
          data = data.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
          });
          setAllOrder(data);
          setFilterOrders(data);
        });
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (!user.id) return;
    if (showAll) {
      GetUserOrder(user.id)
        .then((data) => {
          data = data.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
          });
          setAllOrder(data);
          setFilterOrders(data);
        })
        .then(() => window.location.reload);
    } else if (earlierDate && laterDate) {
      StatOneOrdersByTime(
        user.id,
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD")
      )
        .then((data) => {
          data = data.sort((a, b) => {
            if (a.id > b.id) return -1;
            if (a.id < b.id) return 1;
            return 0;
          });
          setAllOrder(data);
          setFilterOrders(data);
        })
        .then(() => window.location.reload);
    }
  }, [earlierDate, laterDate, user.id, showAll]);

  const order_columns: ColumnsType<OrderItem> = [
    {
      title: "图片",
      key: "book_pic",
      width: "25%",
      dataIndex: "items",
      render: (value, record) => (
        <div className={"order_pic"}>
          <Link to={"/book/" + record.book.id}>
            <img alt={record.book.title} src={getImgPath(record.book.cover)} />
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
      <div style={{ marginBottom: "20px" }}>
        <OrderTab
          setEarlierDate={(day: Date) => setEarlierDate(day)}
          setLaterDate={(day: Date) => setLaterDate(day)}
          isDiy={isDiy}
          setIsDiy={setIsDiy}
          setShowAll={setShowAll}
        />
        <RangePicker
          value={showDate}
          onChange={(date_raw, date_format) => {
            // @ts-ignore
            setShowDate(date_raw);
            setEarlierDate(new Date(date_format[0]));
            setLaterDate(date_forward(date_format[1], 1));
            setIsDiy(true);
          }}
        />
      </div>
      <div className={"search_bar"}>
        <OrderSearch allOrders={allOrder} setFilter={setFilterOrders} />
      </div>
      <NestTable all_order={filterOrders} order_columns={order_columns} />
    </div>
  );
};

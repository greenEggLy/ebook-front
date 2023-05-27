import { ColumnsType } from "antd/es/table";
import { Order, OrderItem } from "../../assets/Interface";
import { useNavigate } from "react-router-dom";
import { OrderSearch } from "../../components/GlobalComponents/SearchBar";
import React, { useEffect, useState } from "react";
import { DatePicker, message, Typography } from "antd";
import { getAllOrder, GetOrderByTime } from "../../services/OrderService";
import { check_session } from "../../services/LoginService";
import { adminSessionCheck } from "../../utils/sessionUtil";
import { NestTableAdmin } from "../../components/adminComponents/NestTableAdmin";
import dayjs from "dayjs";
import moment from "moment/moment";
import { OrderTab } from "../../components/GlobalComponents/OrderTab";
import { date_forward } from "../../utils/DateUtil";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const OrdersView_admin = () => {
  const navigation = useNavigate();
  const [allOrder, setAllOrder] = useState<Order[]>([]);
  const [filterOrders, setFilterOrders] = useState<Order[]>([]);

  const [isDiy, setIsDiy] = useState<boolean>(false);
  const [laterDate, setLaterDate] = useState<Date>(new Date());
  const [earlierDate, setEarlierDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();
  const [showAll, setShowAll] = useState(true);

  useEffect(() => {
    check_session().then((res) => {
      let status = adminSessionCheck(res);
      if (!status.ok) {
        message.error(status.msg, 1).then(() => navigation(status.path));
        return;
      }
      getAllOrder().then((data) => {
        data = data.sort((a, b) => {
          if (a.id > b.id) return -1;
          if (a.id < b.id) return 1;
          return 0;
        });
        setAllOrder(data);
        setFilterOrders(data);
      });
    });
  }, [navigation]);

  useEffect(() => {
    if (showAll) {
      getAllOrder()
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
      GetOrderByTime(
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
  }, [earlierDate, laterDate, showAll]);

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
      <NestTableAdmin all_order={filterOrders} order_columns={order_columns} />
    </div>
  );
};

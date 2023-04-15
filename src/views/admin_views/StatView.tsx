import { DatePicker, message, Tabs, TabsProps, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { backMsg, Stat_Money, Stat_Sales, User } from "../../Interface";
import { getUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import {
  get_sorted_money_all,
  get_sorted_sales_all,
} from "../../services/OrderService";
import moment from "moment";
import {
  BarChart_Money,
  BarChart_Sales,
} from "../../components/BarChart_Sales";
import { check_session } from "../../services/LoginService";
import { emptySessionMsg } from "../../emptyData";
import { date_back, date_forward } from "../../utils/DateUtil";
import dayjs from "dayjs";
import { StatTab } from "../../components/StatTab";

const { Title } = Typography;

const { RangePicker } = DatePicker;

export const StatView = () => {
  const navigation = useNavigate();
  const msg_ref = useRef<backMsg>(emptySessionMsg);

  const [isDiy, setIsDiy] = useState<boolean>(false);
  const [laterDate, setLaterDate] = useState<Date>(new Date());
  const [earlierDate, setEarlierDate] = useState<Date>(new Date());
  const [salesFilter, setSalesFilter] = useState<Stat_Sales[]>([]);
  const [moneyFilter, setMoneyFilter] = useState<Stat_Money[]>([]);
  const [showDate, setShowDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        if (msg_ref.current.data.userType < 1)
          message.error("没有管理员权限！").then(() => navigation("/"));
        else {
          setEarlierDate(date_back(7));
          setLaterDate(date_back(0));
        }
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (earlierDate && laterDate) {
      get_sorted_sales_all(
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD"),
        (data: Stat_Sales[]) => setSalesFilter(data)
      ).then(window.location.reload);
    }
  }, [earlierDate, laterDate]);

  useEffect(() => {
    if (earlierDate && laterDate) {
      get_sorted_money_all(
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD"),
        (data: Stat_Money[]) => setMoneyFilter(data)
      ).then(window.location.reload);
    }
  }, [earlierDate, laterDate]);

  return (
    <div>
      <div className={"order_title"}>
        <Title>{"统计"}</Title>
      </div>
      <StatTab
        setEarlierDate={(day: Date) => setEarlierDate(day)}
        setLaterDate={(day: Date) => setLaterDate(day)}
        isDiy={isDiy}
        setIsDiy={setIsDiy}
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
      <BarChart_Sales sales_data={salesFilter} max_number={5} />
      <BarChart_Money money_data={moneyFilter} max_number={5} />
    </div>
  );
};

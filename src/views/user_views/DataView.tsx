import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { backMsg, Stat_Money, Stat_Sales, User } from "../../Interface";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { check_session } from "../../services/LoginService";
import { get_user } from "../../services/UserService";
import { DatePicker, message, Typography } from "antd";
import dayjs from "dayjs";
import { date_back, date_forward } from "../../utils/DateUtil";
import {
  get_sorted_money_all,
  get_sorted_money_one,
  get_sorted_sales_all,
  get_sorted_sales_one,
} from "../../services/OrderService";
import moment from "moment/moment";
import { StatTab } from "../../components/StatTab";
import {
  BarChart_Money,
  BarChart_Sales,
} from "../../components/BarChart_Sales";

const { Title } = Typography;
const { RangePicker } = DatePicker;

export const DataView = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState<User>(emptyUser);
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
        get_user(msg_ref.current.data.userId, (user: User) =>
          setUser(user)
        ).then(() => {
          setEarlierDate(date_back(7));
          setLaterDate(date_back(1));
        });
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (earlierDate && laterDate && user.id) {
      get_sorted_sales_one(
        user.id,
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD"),
        (data: Stat_Sales[]) => setSalesFilter(data)
      ).then(window.location.reload);
    }
  }, [earlierDate, laterDate, user.id]);

  useEffect(() => {
    if (earlierDate && laterDate && user.id) {
      get_sorted_money_one(
        user.id,
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD"),
        (data: Stat_Money[]) => setMoneyFilter(data)
      ).then(window.location.reload);
    }
  }, [earlierDate, laterDate, user.id]);

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

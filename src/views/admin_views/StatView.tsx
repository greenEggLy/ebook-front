import { DatePicker, message, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { backMsg, Stat_Money, Stat_Sales, User } from "../../Interface";
import { getUser } from "../../services/UserService";
import { useNavigate } from "react-router-dom";
import {
  get_sorted_money_between_date,
  get_sorted_sales_bet_date,
} from "../../services/OrderService";
import moment from "moment";
import {
  BarChart_Money,
  BarChart_Sales,
} from "../../components/BarChart_Sales";
import { check_session } from "../../services/LoginService";
import { emptySessionMsg, emptyUser } from "../../emptyData";

const { Title } = Typography;

const { RangePicker } = DatePicker;

export const StatView = () => {
  const user_ref = useRef<User>(null);
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const navigation = useNavigate();

  const [user, setUser] = useState<User>(emptyUser);
  const [earlierDate, setEarlierDate] = useState<Date>(new Date());
  const [laterDate, setLaterDate] = useState<Date>(new Date());
  const [showDate, setShowDate] = useState();
  const [salesFilter, setSalesFilter] = useState<Stat_Sales[]>([]);
  const [moneyFilter, setMoneyFilter] = useState<Stat_Money[]>([]);

  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        if (msg_ref.current.data.userType < 1)
          message.error("没有管理员权限！").then(() => navigation("/"));
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (earlierDate && laterDate) {
      get_sorted_sales_bet_date(
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD"),
        (data: Stat_Sales[]) => setSalesFilter(data)
      ).then(window.location.reload);
    }
  }, [earlierDate, laterDate]);

  useEffect(() => {
    if (earlierDate && laterDate) {
      get_sorted_money_between_date(
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
      <RangePicker
        value={showDate}
        onChange={(date_raw, date_format) => {
          // @ts-ignore
          setShowDate(date_raw);
          setEarlierDate(new Date(date_format[0]));
          setLaterDate(new Date(date_format[1]));
        }}
      />
      <BarChart_Sales sales_data={salesFilter} max_number={5} />
      <BarChart_Money money_data={moneyFilter} max_number={5} />
    </div>
  );
};

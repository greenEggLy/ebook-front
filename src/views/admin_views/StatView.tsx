import { Col, DatePicker, message, Row, Typography } from "antd";
import { useEffect, useState } from "react";
import {
  StatBookMoney,
  StatBookSales,
  StatUserMoney,
} from "../../assets/Interface";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import { BarChart_Sales } from "../../components/adminComponents/BarChart_Sales";
import { CheckSession } from "../../services/LoginService";
import { date_back, date_forward } from "../../utils/DateUtil";
import dayjs from "dayjs";
import { StatTab } from "../../components/adminComponents/StatTab";
import { adminSessionCheck } from "../../utils/sessionUtil";
import { BarChart_Money } from "../../components/adminComponents/BarChart_Money";
import {
  StatBookByMoney,
  StatBookBySales,
  StatUserByMoney,
} from "../../services/StatService";
import { BarChart_UserMoney } from "../../components/adminComponents/BarChart_UserMoney";

const { Title } = Typography;

const { RangePicker } = DatePicker;

export const StatView = () => {
  const navigation = useNavigate();

  const [isDiy, setIsDiy] = useState<boolean>(false);
  const [laterDate, setLaterDate] = useState<Date>(date_back(-1));
  const [earlierDate, setEarlierDate] = useState<Date>(date_back(6));
  const [salesFilter, setSalesFilter] = useState<StatBookSales[]>([]);
  const [moneyFilter, setMoneyFilter] = useState<StatBookMoney[]>([]);
  const [userFilter, setUserFilter] = useState<StatUserMoney[]>([]);
  const [showDate, setShowDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();

  useEffect(() => {
    CheckSession().then((res) => {
      let status = adminSessionCheck(res);
      if (!status.ok)
        message.error(status.msg, 1).then(() => navigation(status.path));
    });
  }, [navigation]);

  useEffect(() => {
    if (earlierDate && laterDate) {
      StatBookBySales(
        moment(earlierDate).format("YYYY-MM-DD"),
        moment(laterDate).format("YYYY-MM-DD")
      )
        .then((res) => setSalesFilter(res))
        .then(() =>
          StatBookByMoney(
            moment(earlierDate).format("YYYY-MM-DD"),
            moment(laterDate).format("YYYY-MM-DD")
          )
        )
        .then((res) => setMoneyFilter(res))
        .then(() =>
          StatUserByMoney(
            moment(earlierDate).format("YYYY-MM-DD"),
            moment(laterDate).format("YYYY-MM-DD")
          )
        )
        .then((res) => setUserFilter(res))
        .then(() => window.location.reload);
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
      <Row>
        <Col span={12}>
          <BarChart_Sales sales_data={salesFilter} max_number={5} />
        </Col>
        <Col span={12}>
          <BarChart_Money money_data={moneyFilter} max_number={5} />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <BarChart_UserMoney stat_data={userFilter} max_number={5} />
        </Col>
      </Row>
    </div>
  );
};

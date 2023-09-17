import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {IAuthInfo, IStatBookMoney, IStatBookSales} from "../../assets/Interface";
import {EmptyAuth} from "../../assets/data/emptyData";
import {CheckSession} from "../../services/LoginService";
import {Col, DatePicker, message, Row, Typography} from "antd";
import dayjs from "dayjs";
import {date_back, date_forward} from "../../utils/DateUtil";
import moment from "moment/moment";
import {StatTab} from "../../components/adminComponents/StatTab";
import {BarChart_Sales} from "../../components/adminComponents/BarChart_Sales";
import {sessionCheck} from "../../utils/sessionUtil";
import {BarChart_Money} from "../../components/adminComponents/BarChart_Money";
import {StatOneBookByMoney, StatOneBookBySales,} from "../../services/StatService";

const {Title} = Typography;
const {RangePicker} = DatePicker;

export const DataView = () => {
    const navigation = useNavigate();
    const [user, setUser] = useState<IAuthInfo>(EmptyAuth);
    const [isDiy, setIsDiy] = useState<boolean>(false);
    const [laterDate, setLaterDate] = useState<Date>(date_back(-1));
    const [earlierDate, setEarlierDate] = useState<Date>(date_back(6));
    const [showDate, setShowDate] = useState<[dayjs.Dayjs, dayjs.Dayjs]>();
    const [salesFilter, setSalesFilter] = useState<IStatBookSales[]>([]);
    const [moneyFilter, setMoneyFilter] = useState<IStatBookMoney[]>([]);
    const [totalNum, setTotalNum] = useState<number>(0);
    const [totalMoney, setTotalMoney] = useState<number>(0);

    useEffect(() => {
        CheckSession().then((msg) => {
            let status = sessionCheck(msg);
            if (!status.ok)
                message.error(status.msg, 1).then(() => navigation(status.path));
            else {
                setUser(msg.data);
            }
        });
    }, [navigation]);

    useEffect(() => {
        if (earlierDate && laterDate && user.id) {
            StatOneBookBySales(
                user.id,
                moment(earlierDate).format("YYYY-MM-DD"),
                moment(laterDate).format("YYYY-MM-DD")
            )
                .then((res) => setSalesFilter(res))
                .then(() =>
                    StatOneBookByMoney(
                        user.id,
                        moment(earlierDate).format("YYYY-MM-DD"),
                        moment(laterDate).format("YYYY-MM-DD")
                    )
                )
                .then((res) => setMoneyFilter(res))
                .then(() => window.location.reload);
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
            <Row>
                <Col span={12}>
                    <h2>
                    <span style={{fontSize: 15}}>
                        {"购买书籍数: "}
                        <text style={{color: "darkred", fontSize: 20}}>
                            {totalNum}
                        </text>
                    </span>
                    </h2>
                    <BarChart_Sales sales_data={salesFilter} max_number={20} setTotalNum={setTotalNum}/>
                </Col>
                <Col span={12}>
                    <h2>
                    <span style={{fontSize: 15}}>
                        {"共花费: "}
                        <text style={{color: "darkred", fontSize: 20}}>
                            {totalMoney}
                        </text>
                        {" ¥"}
                    </span>
                    </h2>
                    <BarChart_Money money_data={moneyFilter} max_number={20} setTotalMoney={setTotalMoney}/>
                </Col>
            </Row>
        </div>
    );
};

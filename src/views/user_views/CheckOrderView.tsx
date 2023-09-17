import {ICartItem} from "../../assets/Interface";
import {CheckHeaderSteps} from "../../components/userComponents/CheckHeaderSteps";
import {Button, Col, message, Row, Table} from "antd";
import {ColumnsType} from "antd/es/table";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import "../../css/BuyView.css";
import {GetCartItems} from "../../services/CartService";
import {createOrder} from "../../services/OrderService";
import {getImgPath} from "../../utils/imgPathUtil";

export const CheckOrderView = () => {
    const location = useLocation();
    const navigation = useNavigate();
    const cartItem_ids: Set<number> = location.state.goods;
    const user_id = location.state.user_id;
    const [goods, setGoods] = useState<ICartItem[]>([]);
    const [cost, setCost] = useState<number>(0);
    useEffect(() => {
        if (!cartItem_ids || !cartItem_ids.size) {
            message.error("请选择购买商品", 1).then(() => navigation("/cart"));
            return;
        }
        GetCartItems(cartItem_ids).then((res) => {
            setGoods(res);
            let price = 0;
            res.forEach((item) => (price += item.number * item.book.price));
            setCost(price);
        });
    }, [cartItem_ids, navigation]);

    const check_columns: ColumnsType<ICartItem> = [
        {
            title: "图片",
            key: "book_pic",
            width: "20%",
            dataIndex: "items",
            render: (value, record) => (
                <div className={"order_pic"}>
                    <img alt={record.book.title} src={getImgPath(record.book.cover)}/>
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
            title: "单价",
            dataIndex: "items",
            key: "single_price",
            width: "20%",
            render: (value, record) => <p>{record.book.price}</p>,
        },
        {
            title: "数量",
            dataIndex: "items",
            key: "number",
            width: "20%",
            render: (value, record) => <p className={"name_info"}>{record.number}</p>,
        },
        {
            title: "总价",
            dataIndex: "items",
            key: "item_price",
            width: "20%",
            render: (value, record) => <p>{record.number * record.book.price}</p>,
        },
    ];

    return (
        <>
            <CheckHeaderSteps/>
            <div className={"check_table"}>
                <Table columns={check_columns} dataSource={goods}></Table>
            </div>
            <Row className={"price_info"}>
                <Col span={20}/>
                <Col span={4}>
                    <h1>{"总价: " + cost + "元"}</h1>
                </Col>
            </Row>
            <Row>
                <Col span={20}/>
                <Button
                    className={"buy_button"}
                    onClick={() => {
                        createOrder(user_id, goods).then((msg) => {
                            if (msg.status === 0)
                                message
                                    .success("订单提交成功", 1)
                                    .then(() => navigation("/submitOrder"));
                            else message.error(msg.msg, 1).then(() => navigation("/cart"));
                        });
                    }}
                >
                    {"提交订单"}
                </Button>
            </Row>
        </>
    );
};

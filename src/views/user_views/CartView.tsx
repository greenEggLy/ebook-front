import React, {useEffect, useState} from "react";
import {Button, Checkbox, Col, message, Row, Table, Typography} from "antd";
import type {ColumnsType} from "antd/es/table";
import {IAuthInfo, IBook, ICartItem} from "../../assets/Interface";
import {Link, useNavigate} from "react-router-dom";
import {CartSearch} from "../../components/GlobalComponents/SearchBar";
import "../../css/CartView.css";
import "../../css/BooksView.css";
import {AddCartItemNum, DeleteCartItem, GetUserCart, MinusCartItemNum,} from "../../services/CartService";
import {EmptyAuth} from "../../assets/data/emptyData";
import {CheckSession} from "../../services/LoginService";
import {getImgPath} from "../../utils/imgPathUtil";
import {sessionCheck} from "../../utils/sessionUtil";

const {Title} = Typography;

export const CartView = () => {
    const navigation = useNavigate();
    const [user, setUser] = useState<IAuthInfo>(EmptyAuth);
    const [allCart, setAllCart] = useState<ICartItem[]>([]);
    const [filterCart, setFilterCart] = useState<ICartItem[]>([]);
    const [chooseGood] = useState<Set<number>>(new Set<number>());

    useEffect(() => {
        CheckSession().then((res) => {
            let status = sessionCheck(res);
            if (!status.ok) {
                message.error(status.msg, 1).then(() => navigation(status.path));
                return;
            }
            setUser(res.data);
            GetUserCart(res.data.id).then((data) => {
                setAllCart(data);
                setFilterCart(data);
            });
        });
    }, [navigation]);

    const cart_columns: ColumnsType<ICartItem> = [
        {
            title: "",
            key: "book_choose",
            width: "5%",
            render: (value: ICartItem) => (
                <Checkbox
                    onChange={(e) => {
                        if (e.target.checked) chooseGood.add(value.id);
                        else chooseGood.delete(value.id);
                    }}
                ></Checkbox>
            ),
        },
        {
            title: "书本图片",
            dataIndex: "book",
            key: "book_pic",
            width: "20%",
            render: (book: IBook) => (
                <div className={"cart_pic"}>
                    <Link to={"/book/" + book.id}>
                        <img alt={book.title} src={getImgPath(book.cover)}/>
                    </Link>
                </div>
            ),
        },
        {
            title: "书名",
            dataIndex: "book",
            key: "book_name",
            width: "15%",
            render: (book: IBook) => <p className={"cart_title"}>{book.title}</p>,
        },

        {
            title: "ISBN",
            dataIndex: "book",
            width: "20%",
            key: "book_isbn",
            render: (book: IBook) => <p className={"cart_isbn"}>{book.isbn}</p>,
        },
        {
            title: "单价",
            dataIndex: "book",
            key: "price",
            width: "20%",
            render: (book: IBook) => <p>{"￥" + book.price}</p>,
        },
        {
            title: "数量",
            dataIndex: "item_number",
            key: "item_number",
            width: "20%",
            render: (_, record) => (
                <div className={"num"}>
                    <Button
                        className={"num_minus"}
                        onClick={() => {
                            if (record.number <= 1) return;
                            MinusCartItemNum(record.id, 1).then(() => {
                                if (user)
                                    GetUserCart(user.id)
                                        .then((cart) => {
                                            setAllCart(cart);
                                            setFilterCart(cart);
                                        })
                                        .then(() => window.location.reload);
                            });
                        }}
                    >
                        {"-"}
                    </Button>
                    <input className={"name_info"} value={record.number}/>
                    <Button
                        className={"num_add"}
                        onClick={() => {
                            AddCartItemNum(record.id, 1).then(() => {
                                if (user)
                                    GetUserCart(user.id)
                                        .then((data) => {
                                            setAllCart(data);
                                            setFilterCart(data);
                                        })
                                        .then(window.location.reload);
                            });
                        }}
                    >
                        {"+"}
                    </Button>
                </div>
            ),
        },
        {
            title: "操作",
            key: "action",
            width: "10%",
            render: (_, record) => (
                <Button
                    className={"del_button"}
                    onClick={() => {
                        DeleteCartItem(record.id).then(() => {
                            let filter = filterCart.filter((item) => item.id !== record.id);
                            setFilterCart(filter);
                        });
                    }}
                >
                    {"删除"}
                </Button>
            ),
        },
    ];
    if (user && allCart)
        return (
            <div className={"cart"}>
                <div className={"cart_title"}>
                    <Title>{"购物车"}</Title>
                </div>
                <div className={"search_bar"}>
                    <CartSearch allData={allCart} setFilter={setFilterCart}/>
                </div>
                <Table
                    columns={cart_columns}
                    dataSource={filterCart.filter((item) => !item.book.deleted)}
                ></Table>
                <Row>
                    <Col span={21}/>
                    <Button
                        className={"buy_button"}
                        onClick={() => {
                            if (!chooseGood.size) message.info("请选择购买物品");
                            else {
                                navigation("/checkOrder", {
                                    state: {goods: chooseGood, user_id: user.id},
                                });
                            }
                        }}
                    >
                        {"购买"}
                    </Button>
                </Row>
            </div>
        );
    else return <></>;
};

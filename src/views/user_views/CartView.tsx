import React, { useEffect, useMemo, useRef, useState } from "react";
import { Checkbox, Table, Space, Button, Row, Col, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Book, CartItem, OrderItem, User } from "../../Interface";
import "../../css/CartView.css";
import "../../css/BooksView.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CartSearch } from "../../components/SearchBar";
import {
  addCartItem,
  addCartItemNum,
  deleteCartItem,
  getUserCart,
  minusCartItemNum,
} from "../../services/CartService";
import { postRequest_1 } from "../../utils/ajax";
import { getUser } from "../../services/UserService";

const { Title } = Typography;

interface Props {
  user: User;
}

export const CartView = () => {
  // const navigation = useNavigate();
  const [user, setUser] = useState<User>();
  const [allCart, setAllCart] = useState<CartItem[]>();
  const [filterCart, setFilterCart] = useState<CartItem[]>();
  const [chooseGood, setChooseGood] = useState<Set<number>>(new Set<number>());

  useEffect(() => {
    getUser((data: React.SetStateAction<User | undefined>) => setUser(data));
  }, []);
  useEffect(() => {
    if (user)
      getUserCart(
        user.id,
        (data: React.SetStateAction<CartItem[] | undefined>) =>
          setAllCart(data),
        (data: React.SetStateAction<CartItem[] | undefined>) =>
          setFilterCart(data)
      ).catch(console.error);
  }, [user]);

  const cart_columns: ColumnsType<OrderItem> = [
    {
      title: "",
      key: "book_choose",
      width: "5%",
      render: (value: OrderItem) => (
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
      render: (book: Book) => (
        <div className={"cart_pic"}>
          <Link to={"/book/" + book.id}>
            <img alt={book.pics[0].url} src={book.pics[0].url} />
          </Link>
        </div>
      ),
    },
    {
      title: "书名",
      dataIndex: "book",
      key: "book_name",
      width: "15%",
      render: (book: Book) => <p className={"cart_title"}>{book.title}</p>,
    },

    {
      title: "ISBN",
      dataIndex: "book",
      width: "20%",
      key: "book_isbn",
      render: (book: Book) => <p className={"cart_isbn"}>{book.isbn}</p>,
    },
    {
      title: "单价",
      dataIndex: "book",
      key: "price",
      width: "20%",
      render: (book: Book) => <p>{"￥" + book.price}</p>,
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
              minusCartItemNum(record.id, 1).then(() => {
                if (user)
                  getUserCart(
                    user.id,
                    (data: React.SetStateAction<CartItem[] | undefined>) =>
                      setAllCart(data),
                    (data: React.SetStateAction<CartItem[] | undefined>) =>
                      setFilterCart(data)
                  ).then(window.location.reload);
              });
            }}
          >
            {"-"}
          </Button>
          <input className={"name_info"} value={record.number} />
          <Button
            className={"num_add"}
            onClick={() => {
              addCartItemNum(record.id, 1).then(() => {
                if (user)
                  getUserCart(
                    user.id,
                    (data: React.SetStateAction<CartItem[] | undefined>) =>
                      setAllCart(data),
                    (data: React.SetStateAction<CartItem[] | undefined>) =>
                      setFilterCart(data)
                  ).then(window.location.reload);
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
            deleteCartItem(record.id).then(() => {
              if (user)
                getUserCart(
                  user.id,
                  (data: React.SetStateAction<CartItem[] | undefined>) =>
                    setAllCart(data),
                  (data: React.SetStateAction<CartItem[] | undefined>) =>
                    setFilterCart(data)
                ).then(window.location.reload);
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
          <CartSearch allData={allCart} setFilter={setFilterCart} />
        </div>
        <Table columns={cart_columns} dataSource={filterCart}></Table>
        <Row>
          <Col span={21} />
          <Link
            to={"/checkOrder"}
            state={{ goods: chooseGood, user_id: user.id }}
          >
            <Button className={"buy_button"} disabled={!chooseGood.size}>
              {"购买"}
            </Button>
          </Link>
        </Row>
      </div>
    );
  else return <></>;
};

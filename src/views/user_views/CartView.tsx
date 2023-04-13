import React, { useEffect, useRef, useState } from "react";
import { Button, Checkbox, Col, message, Row, Table, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Book, CartItem, backMsg, User } from "../../Interface";
import { Link, useNavigate } from "react-router-dom";
import { CartSearch } from "../../components/SearchBar";
import "../../css/CartView.css";
import "../../css/BooksView.css";
import {
  addCartItemNum,
  deleteCartItem,
  get_cart_by_user,
  minusCartItemNum,
} from "../../services/CartService";
import { get_user, getUser } from "../../services/UserService";
import { emptySessionMsg, emptyUser } from "../../emptyData";
import { check_session } from "../../services/LoginService";

const { Title } = Typography;

export const CartView = () => {
  const navigation = useNavigate();
  const [user, setUser] = useState<User>(emptyUser);
  const msg_ref = useRef<backMsg>(emptySessionMsg);
  const [allCart, setAllCart] = useState<CartItem[]>([]);
  const [filterCart, setFilterCart] = useState<CartItem[]>([]);
  const [chooseGood, setChooseGood] = useState<Set<number>>(new Set<number>());

  // useEffect(() => {
  //   getUser((data: User) => {
  //     user_ref.current = data;
  //     setUser(data);
  //   }).then(() => {
  //     if (!user_ref.current) {
  //       navigation("/login");
  //     }
  //   });
  // }, []);
  useEffect(() => {
    check_session((data: backMsg) => (msg_ref.current = data)).then(() => {
      if (msg_ref.current.status >= 0) {
        get_user(msg_ref.current.data.userId, (user: User) =>
          setUser(user)
        ).catch((err) => console.error(err));
      } else {
        message.error(msg_ref.current.msg).then(() => navigation("/login"));
      }
    });
  }, [navigation]);

  useEffect(() => {
    if (user)
      get_cart_by_user(user.id, (data: CartItem[]) => {
        setAllCart(data);
        setFilterCart(data);
      }).catch((err) => console.error(err));
  }, [user]);

  const cart_columns: ColumnsType<CartItem> = [
    {
      title: "",
      key: "book_choose",
      width: "5%",
      render: (value: CartItem) => (
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
            <img alt={book.picture} src={book.picture} />
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
                  get_cart_by_user(user.id, (data: CartItem[]) => {
                    setAllCart(data);
                    setFilterCart(data);
                  }).then(window.location.reload);
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
                  get_cart_by_user(user.id, (data: CartItem[]) => {
                    setAllCart(data);
                    setFilterCart(data);
                  }).then(window.location.reload);
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
                get_cart_by_user(user.id, (data: CartItem[]) => {
                  setAllCart(data);
                  setFilterCart(data);
                }).then(window.location.reload);
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
          <Button
            className={"buy_button"}
            onClick={() => {
              if (!chooseGood.size) message.info("请选择购买物品");
              else {
                navigation("/checkOrder", {
                  state: { goods: chooseGood, user_id: user.id },
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

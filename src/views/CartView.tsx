import React, { useState } from "react";
import { Checkbox, Table, Space, Button, Row, Col } from "antd";
import type { ColumnsType } from "antd/es/table";
import { BookInfo_, CartItem, User } from "../Interface";
import "../css/CartView.css";
import "../css/BooksView.css";
import { Link } from "react-router-dom";
import { CartSearch } from "../components/SearchBar";

interface Props {
  user: User;
}

export const CartView = ({ user }: Props) => {
  const [filterCart, setFilterCart] = useState(user.cart);
  const [chooseGood, setChooseGood] = useState<Set<number>>(new Set<number>());

  const cart_columns: ColumnsType<CartItem> = [
    {
      title: "",
      key: "book_choose",
      // dataIndex: "book",
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
      render: (book: BookInfo_) => (
        <div className={"cart_pic"}>
          <Link to={"/book/" + book.id}>
            <img alt={book.pics[0]} src={book.pics[0]} />
          </Link>
        </div>
      ),
    },
    {
      title: "书名",
      dataIndex: "book",
      key: "book_name",
      width: "15%",
      render: (book: BookInfo_) => <p className={"cart_title"}>{book.title}</p>,
    },

    {
      title: "ISBN",
      dataIndex: "book",
      key: "book_isbn",
      // width: "25%",
      render: (book: BookInfo_) => <p className={"cart_isbn"}>{book.ISBN}</p>,
    },
    {
      title: "单价",
      dataIndex: "book",
      key: "price",
      width: "20%",
      render: (book: BookInfo_) => <p>{"￥" + book.price}</p>,
    },
    {
      title: "数量",
      dataIndex: "item_number",
      key: "item_number",
      width: "15%",
      render: (item_number: number) => (
        <div className={"num"}>
          <Button className={"num_minus"}>{"-"}</Button>
          <input className={"name_info"} value={item_number} />
          <Button className={"num_add"}>{"+"}</Button>
        </div>
      ),
    },
    {
      title: "操作",
      key: "action",
      width: "10%",
      render: () => <Button className={"del_button"}>{"删除"}</Button>,
    },
  ];

  return (
    <div className={"cart"}>
      <div className={"search_bar"}>
        <CartSearch allData={user.cart} setFilter={setFilterCart} />
      </div>
      <Table columns={cart_columns} dataSource={filterCart}></Table>
      <Row>
        <Col span={21} />
        <Button className={"buy_button"} onClick={() => alert(chooseGood.size)}>
          {"购买"}
        </Button>
      </Row>
    </div>
  );
};
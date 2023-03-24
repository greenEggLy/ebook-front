import { Book, Good } from "../Interface";
import { Button, Table } from "antd";
import React from "react";
import { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";

// import { cart_columns } from "../views/CartView";

interface Props {
  cartList: Good[];
}

export const UserCartList = ({ cartList }: Props) => {
  return (
    // <></>
    <Table
      className={"table"}
      size={"large"}
      pagination={{ pageSize: 2 }}
      columns={cart_columns}
      dataSource={cartList}
    ></Table>
  );
};

export const UserBoughtList = ({ cartList }: Props) => {
  return (
    <Table
      className={"table"}
      size={"large"}
      pagination={{ pageSize: 2 }}
      columns={bought_columns}
      dataSource={cartList}
    ></Table>
  );
};

const cart_columns: ColumnsType<Good> = [
  {
    title: "书本图片",
    dataIndex: "book",
    key: "book_pic",
    width: "20%",
    render: (book: Book) => (
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
    render: (book: Book) => <p className={"cart_title"}>{book.title}</p>,
  },

  {
    title: "ISBN",
    dataIndex: "book",
    key: "book_isbn",
    // width: "25%",
    render: (book: Book) => <p className={"cart_isbn"}>{book.ISBN}</p>,
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
    width: "15%",
    render: (item_number: number) => (
      <div className={"num"}>
        {/*<Button className={"num_minus"}>{"-"}</Button>*/}
        <input className={"name_info"} value={item_number} />
        {/*<Button className={"num_add"}>{"+"}</Button>*/}
      </div>
    ),
  },
];

const bought_columns: ColumnsType<Good> = [
  {
    title: "书本图片",
    dataIndex: "book",
    key: "book_pic",
    width: "25%",
    render: (book: Book) => (
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
    width: "20%",
    render: (book: Book) => <p className={"cart_title"}>{book.title}</p>,
  },
  {
    title: "ISBN",
    dataIndex: "book",
    key: "book_isbn",
    render: (book: Book) => <p className={"cart_isbn"}>{book.ISBN}</p>,
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
    width: "15%",
    render: (item_number: number) => (
      <div className={"num"}>
        <p>{item_number}</p>
      </div>
    ),
  },
  // {
  //   title: "操作",
  //   key: "action",
  //   width: "10%",
  //   render: () => <Button className={"del_button"}>{"删除"}</Button>,
  // },
];

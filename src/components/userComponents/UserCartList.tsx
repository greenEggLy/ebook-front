import {IBook, ICartItem} from "../../assets/Interface";
import {Table} from "antd";
import React from "react";
import {ColumnsType} from "antd/es/table";
import {Link} from "react-router-dom";
import {getImgPath} from "../../utils/imgPathUtil";

// import { cart_columns } from "../views/CartView";

interface Props {
    cartList: ICartItem[];
}

export const UserCartList = ({cartList}: Props) => {
    return (
        <Table
            className={"table"}
            size={"large"}
            pagination={{pageSize: 2}}
            columns={cart_columns}
            dataSource={cartList}
        ></Table>
    );
};

const cart_columns: ColumnsType<ICartItem> = [
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
        key: "book_isbn",
        // width: "25%",
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
        width: "15%",
        render: (_, record) => (
            <div className={"num"}>
                {/*<Button className={"num_minus"}>{"-"}</Button>*/}
                <input className={"name_info"} value={record.number}/>
                {/*<Button className={"num_add"}>{"+"}</Button>*/}
            </div>
        ),
    },
];

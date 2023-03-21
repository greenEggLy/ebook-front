import { Card } from "antd";
import { BookInfo_ } from "../Interface";
import React from "react";
import "../css/BooksView.css";

const { Meta } = Card;

interface Props {
  book: BookInfo_;
}

export function BookCard({ book }: Props) {
  return (
    // @ts-ignore
    <Card
      className={"card"}
      hoverable={true}
      cover={<img className={"card_img"} alt="pic" src={book.pics[0]} />}
    >
      <Meta title={book.title} description={"￥" + book.price.toString()} />
    </Card>
  );
}

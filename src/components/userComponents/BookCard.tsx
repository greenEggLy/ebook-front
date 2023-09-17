import {Card} from "antd";
import {IBook} from "../../assets/Interface";
import React from "react";
import "../../css/BooksView.css";
import {getImgPath} from "../../utils/imgPathUtil";

const {Meta} = Card;

interface Props {
    book: IBook;
}

export function BookCard({book}: Props) {
    return (
        <Card
            className={"card"}
            hoverable={true}
            cover={
                <img className={"card_img"} alt="pic" src={getImgPath(book.cover)}/>
            }
        >
            <Meta title={book.title} description={"￥" + book.price.toString()}/>
        </Card>
    );
}

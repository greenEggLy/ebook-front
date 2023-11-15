import BookList from "../../components/userComponents/BookList";
import {BookSearch} from "../../components/GlobalComponents/SearchBar";
import {Button, Col, Input, Row, Typography} from "antd";
import React, {useEffect, useState} from "react";
import "../../css/BooksView.css";
import {IBook} from "../../assets/Interface";
import {GetAllBook} from "../../services/BookService";
import {Text} from "recharts";

const {Title} = Typography;

export const BooksView = () => {
    const [allBooks, setAllBooks] = useState<IBook[]>([]);
    const [filterData, setFilterData] = useState<IBook[]>([]);
    const [titleName, setTitleName] = useState<string>("");
    const [authorName, setAuthorName] = useState<string>("")

    useEffect(() => {
        GetAllBook().then((data: IBook[]) => {
            setAllBooks(data);
            setFilterData(data);
        });
    }, []);

    const findAuthor = (titleName: string) => {
        const url = "http://localhost:8088/micro/query-books/" + titleName;

        fetch("http://localhost:8088" + "/micro/query-books/" + titleName).then(res => res.json()).then(data => {
            setAuthorName(data.data.author);
        })
    }


    return (
        <div>
            <div className={"books_title"}>
                <Title>{"主页"}</Title>
            </div>
            <div className={"search_bar"}>
                <BookSearch allData={allBooks} setFilter={setFilterData}/>
            </div>
            <Row>
                <Col span={10}>
                    <Input value={titleName} onChange={(e) => {
                        setTitleName(e.target.value)
                    }}></Input>
                </Col>
                <Col span={4}>
                    <Button onClick={() => {
                        findAuthor(titleName);
                        setTitleName("");
                    }}>Search</Button>
                </Col>
                <Col span={8}>
                    <Text>{"author name: " + authorName}</Text>
                </Col>
            </Row>
            <div className={"book_list"}>
                {
                    //@ts-ignore
                    <BookList books={filterData}/>
                }
            </div>
        </div>
    );
};

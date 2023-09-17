import BookList from "../../components/userComponents/BookList";
import {BookSearch} from "../../components/GlobalComponents/SearchBar";
import {Typography} from "antd";
import React, {useEffect, useState} from "react";
import "../../css/BooksView.css";
import {IBook} from "../../assets/Interface";
import {GetAllBook} from "../../services/BookService";

const {Title} = Typography;

export const BooksView = () => {
    const [allBooks, setAllBooks] = useState<IBook[]>([]);
    const [filterData, setFilterData] = useState<IBook[]>([]);
    useEffect(() => {
        GetAllBook().then((data: IBook[]) => {
            setAllBooks(data);
            setFilterData(data);
        });
    }, []);
    return (
        <div>
            <div className={"books_title"}>
                <Title>{"主页"}</Title>
            </div>
            <div className={"search_bar"}>
                <BookSearch allData={allBooks} setFilter={setFilterData}/>
            </div>
            <div className={"book_list"}>
                {
                    //@ts-ignore
                    <BookList books={filterData}/>
                }
            </div>
        </div>
    );
};

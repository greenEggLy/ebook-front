import BookList from "../../components/BookList";
import { BookSearch } from "../../components/SearchBar";
import { Typography } from "antd";
import React, { useEffect, useState } from "react";
import "../../css/BooksView.css";
import { Book } from "../../Interface";
import { get_all_books } from "../../services/BookService";

const { Title } = Typography;

export const BooksView = () => {
  const [allBooks, setAllBooks] = useState<Book[]>([]);
  const [filterData, setFilterData] = useState<Book[]>([]);
  useEffect(() => {
    get_all_books((data: Book[]) => {
      setAllBooks(data);
      setFilterData(data);
    }).catch((err) => console.error(err));
  }, []);
  return (
    <div>
      <div className={"books_title"}>
        <Title>{"主页"}</Title>
      </div>
      <div className={"search_bar"}>
        <BookSearch allData={allBooks} setFilter={setFilterData} />
      </div>
      <div className={"book_list"}>
        {
          //@ts-ignore
          <BookList books={filterData} />
        }
      </div>
    </div>
  );
};

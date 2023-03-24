import BookList from "../components/BookList";
import { Books } from "../data";
import { BookSearch } from "../components/SearchBar";
import { Typography } from "antd";
import React, { useState } from "react";
import "../css/BooksView.css";

const { Title } = Typography;

export const BooksView = () => {
  const [filterData, setFilterData] = useState(Books);
  return (
    <div>
      <div className={"books_title"}>
        <Title>{"主页"}</Title>
      </div>
      <div className={"search_bar"}>
        <BookSearch allData={Books} setFilter={setFilterData} />
      </div>
      <div className={"book_list"}>
        <BookList books={filterData} />
      </div>
    </div>
  );
};

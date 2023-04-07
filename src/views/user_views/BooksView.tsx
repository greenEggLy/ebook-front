import BookList from "../../components/BookList";
import { Books } from "../../data";
import { BookSearch } from "../../components/SearchBar";
import { Typography } from "antd";
import React, {
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import "../../css/BooksView.css";
import { Book } from "../../Interface";
import { getAllBooks } from "../../services/BookService";

const { Title } = Typography;

export const BooksView = () => {
  const [allBooks, setAllBooks] = useState<Book[]>();
  const [filterData, setFilterData] = useState<Book[]>();
  useEffect(() => {
    getAllBooks(
      (data: React.SetStateAction<Book[] | undefined>) => setAllBooks(data),
      (data: React.SetStateAction<Book[] | undefined>) => setFilterData(data)
    ).catch(console.error);
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

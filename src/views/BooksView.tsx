import BookList from "../components/BookList";
import { Books } from "../data";
import { BookSearch } from "../components/SearchBar";
import { useState } from "react";
import "../css/BooksView.css";

export const BooksView = () => {
  const [filterData, setFilterData] = useState(Books);
  return (
    <div>
      <div className={"search_bar"}>
        <BookSearch allData={Books} setFilter={setFilterData} />
      </div>
      <div className={"book_list"}>
        <BookList books={filterData} />
      </div>
    </div>
  );
};

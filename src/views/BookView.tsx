import { Book } from "../Interface";
import { Books } from "../data";
import { useState } from "react";
import AddItem from "../components/AddItem";
import "../css/BookView.css";
import { BookViewHeader } from "../components/BookViewHeader";

export const BookView = () => {
  const [item_num, set_item_num] = useState(0);

  function getBook() {
    let routes = document.location.toString().split("/");
    let index = routes.pop();
    return Books.filter((item) => item.id === Number(index))[0];
  }

  const book: Book = getBook();

  return (
    <div className={"book_view"}>
      <BookViewHeader book={book} />
      <div className={"scan"}>
        <PicDisplay book={book} />
        <div className={"info_display"}>
          <div className={"name_info"}>
            <h1 className={"title"}>{book.title}</h1>
            <p className={"detail"}>{"ISBN: " + book.ISBN}</p>
            <p className={"stock"}>{"库存: " + book.left_number}</p>
          </div>
          <div className={"publication"}>
            <span className={"t1"} id={"author"}>
              {"作者: " + book.author + " "}
            </span>
            <span className={"t1"}>{"出版社: " + book.pub}</span>
          </div>
          <p className={"price"}>
            <span className={"yuan"}>{"￥"}</span>
            {book.price}
          </p>
          <div className={"purchase"}>
            <AddItem
              stock={book.left_number}
              item_num={item_num}
              set_item_num={set_item_num}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface pic_props {
  book: Book;
}

const PicDisplay = ({ book }: pic_props) => {
  const [showPic, setShowPic] = useState(book.pics[0]);
  return (
    <div className={"pic_display"}>
      <img className={"big_pic"} alt={book.title} src={showPic} />
      <div className={"pic_slider_box"}>
        <ul className={"pic_slider"}>
          {book.pics.map((item, index) => (
            <li className={"slider_item"}>
              <img
                className={"slider_img"}
                alt={item}
                src={item}
                onClick={() => setShowPic(item)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
